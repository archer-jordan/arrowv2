import React from "react";
import styled from "styled-components";
import Papa from "papaparse";
import formatRow from "../formatRow";
// COMPONENTS
import Icon from "components/common/Icon";
import Filename from "../Filename";
import Button from "components/common/Button";
import ErrorBlock from "components/common/ErrorBlock";
import OverrideModal from "../OverideModal";
import Title from "components/text/Title";
import Caption from "components/text/Caption";
import Alert from "components/common/Alert";
// APOLLO
import { graphql } from "react-apollo";
import client from "ApolloClient/index.js";
import customerReportQuery from "ApolloClient/Queries/customerReport";
import customerTotalsUpload from "ApolloClient/Mutations/customerTotalsUpload";
import customerReportsByCustomerId from "ApolloClient/Queries/customerReportsByCustomerId";
import compose from "lodash/flowRight";

const UploadButton = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
//re
const Label = styled.label`
  font-weight: 600;
  color: ${(p) => p.theme.colors.support2};
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid ${(p) => p.theme.colors.support2};
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    border: 2px solid ${(p) => p.theme.colors.support1};
    color: ${(p) => p.theme.colors.support1};
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${(p) => p.theme.colors.primary1};
`;

class CustomerOverride extends React.PureComponent {
  state = {
    loading: false,
    companyErrors: [],
  };
  onCompleteCustomerUpload = async (
    data = this.state.companyData,
    overwrite = false
  ) => {
    // call the upload mutation
    try {
      let result = await this.props.customerTotalsUpload({
        variables: {
          values: data,
        },
        refetchQueries: [
          {
            query: customerReportsByCustomerId,
            variables: {
              customerId: this.props.customer.id,
            },
          },
        ],
      });

      if (!result.data.customerTotalsUpload.success) {
        return this.setState({
          companyErrors: result.data.customerTotalsUpload.errors,
          loading: false,
        });
      }

      if (
        result.data.customerTotalsUpload.errors &&
        result.data.customerTotalsUpload.errors.length > 0
      ) {
        return this.setState({
          companyErrors: result.data.customerTotalsUpload.errors,
          loading: false,
        });
      }
      // turn off loading
      this.setState({
        loading: false,
        companyFile: null,
        companyData: null,
        customerSuccess: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  onCustomerUpload = async (results, file) => {
    try {
      // set to loading
      this.setState({ loading: true });

      // check the length and throw an error if we have the incorrect number of columns we were expecting
      if (results.data[1].length !== 32) {
        return this.setState({
          companyErrors: [
            "This sheet does not have the correct number of columns",
          ],
          loading: false,
        });
      }

      // format the data
      const data = formatRow(results.data[0], results.data[1]);

      // check to see if
      let activeThisMonthErrors = [];

      data.eligibility.forEach((item, i) => {
        let activeIsMore =
          parseInt(data.activeThisMonth, 10) >=
          parseInt(data.eligibility[i].employees, 10);

        // throw error if activeThisMonth is smaller than employees in eligibility
        if (!activeIsMore) {
          activeThisMonthErrors.push(
            `Active employees this month (${data.activeThisMonth}) is lower than employees eligible for ${data.eligibility[i].label} (${data.eligibility[i].employees}). Please check your CSV.`
          );
        }
      });

      if (activeThisMonthErrors && activeThisMonthErrors.length > 0) {
        return this.setState({
          companyErrors: activeThisMonthErrors,
          loading: false,
        });
      }

      // verify if we already have data for this month
      const reportExists = await client.query({
        query: customerReportQuery,
        fetchPolicy: "network-only",
        variables: {
          customerId: this.props.customer.id,
          month: data.month,
          year: data.year,
        },
      });

      if (
        reportExists.data &&
        reportExists.data.customerReport &&
        reportExists.data.customerReport.id
      ) {
        return this.setState({
          confirmUpdateModal: true,
          companyData: data,
        });
      }

      this.onCompleteCustomerUpload(data);
    } catch (err) {
      this.setState({
        companyErrors: [err.message],
      });
    }
  };
  handleUpload = (
    file = this.state.companyFile,
    complete = this.onCustomerUpload
  ) => {
    if (file && complete) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete,
      });
    }
  };
  render() {
    return (
      <React.Fragment>
        <OverrideModal
          visible={this.state.confirmUpdateModal}
          onUpdate={() => {
            this.onCompleteCustomerUpload(this.state.companyData, true);
            this.setState({
              confirmUpdateModal: false,
            });
          }}
          onCancel={() => {
            this.setState({
              confirmUpdateModal: false,
              companyData: null,
              companyFile: null,
              loading: false,
            });
          }}
          content={
            <React.Fragment>
              <Title>A report already exists</Title>
              <Caption>
                A report already exists for{" "}
                {this.state.companyData &&
                  `${this.state.companyData.month}/${this.state.companyData.year}`}
                , would you like to override the entire month and generate a new
                report?
              </Caption>
            </React.Fragment>
          }
        />
        <SectionTitle>Company Totals</SectionTitle>
        {/* SHOW PAST UPLOADS */}
        {/* SHOW ERRORS IF THEY EXIST */}
        {this.state.companyErrors && this.state.companyErrors.length > 0 && (
          <div style={{ marginTop: 16, width: 500, maxWidth: "100%" }}>
            <ErrorBlock errors={this.state.companyErrors} />
          </div>
        )}
        {this.state.customerSuccess && (
          <Alert
            message='Upload Success'
            description='Your customer totals were successfully uploaded'
            type='success'
            closable
            showIcon
          />
        )}
        {this.state.companyFile && (
          <Filename
            name={this.state.companyFile.name}
            onClick={() =>
              this.setState({
                companyFile: null,
                companyErrors: [],
              })
            }
          />
        )}
        {/* COMPANY CONFIRM UPLOAD BUTTON */}
        {this.state.companyFile && !this.state.loading && (
          <Button
            style={{ marginTop: 32, marginLeft: 16, width: 100 }}
            onClick={() =>
              this.handleUpload(this.state.companyFile, this.onCustomerUpload)
            }
          >
            Upload File
          </Button>
        )}
        {this.state.companyFile && this.state.loading && (
          <Icon type='loading' style={{ marginLeft: 4 }} />
        )}
        {/* COMPANY SELECT FILE BUTTON */}
        {!this.state.companyFile && (
          <div style={{ marginTop: 32 }}>
            <UploadButton
              name='file'
              type='file'
              id='file'
              onChange={(event) => {
                this.setState({
                  companyFile: event.target.files[0],
                });
              }}
            />{" "}
            <Label htmlFor='file'>Select New File</Label>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(customerTotalsUpload, { name: "customerTotalsUpload" })
)(CustomerOverride);
