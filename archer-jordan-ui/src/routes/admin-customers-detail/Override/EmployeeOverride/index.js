import React from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
import formatEmployeeRow from '../formatEmployeeRow';
// COMPONENTS
import Button from 'components/common/Button';
import ErrorBlock from 'components/common/ErrorBlock';
import Alert from 'components/common/Alert';
import Filename from '../Filename';
import Title from 'components/text/Title';
import Caption from 'components/text/Caption';
import Icon from 'components/common/Icon';
import OverrideModal from '../OverideModal';
// APOLLO
import { graphql } from 'react-apollo';
import client from 'ApolloClient/index.js';
import uploadEmployeeReports from 'ApolloClient/Mutations/uploadEmployeeReports';
import checkIfEmployeeTotalsExist from 'ApolloClient/Queries/checkIfEmployeeTotalsExist';
import compose from 'lodash/flowRight';

const UploadButton = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

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

const Content = ({ month, year }) => (
  <React.Fragment>
    <Title>A report already exists</Title>
    <Caption>
      At least one employee already has a report for {month}/{year}. Would you
      like to override each employee's report with the current CSV?
    </Caption>
  </React.Fragment>
);

class EmployeeOverride extends React.PureComponent {
  state = {
    loading: false,
    employeeErrors: [],
    employeeFile: null,
    employeeData: null,
    confirmUpdateModal: false,
    employeeSuccess: false,
  };

  onCompleteUpload = async (values = this.state.employeeData) => {
    if (!values) {
      this.setState({ employeeErrors: ['No data found...'], loading: false });
      return;
    }
  
    try {
      let result = await this.props.uploadEmployeeReports({
        variables: { values },
      });
  
      const { success, errors } = result.data.uploadEmployeeReports;
      console.log('Upload result:', success, errors);  // Add debugging info
      if (!success) {
        this.setState({ employeeErrors: errors, loading: false });
        return;
      }
  
      this.setState({
        loading: false,
        employeeFile: null,
        employeeSuccess: true,
        employeeErrors: [],
      });
      console.log('State after upload:', this.state);  // Check state here
    } catch (err) {
      this.setState({
        loading: false,
        employeeErrors: [err.message],
      });
    }
  };
  

  getInvalidFields = (results) => results.reduce((acc, item, i) => {
    if (!item.assignedId || !item.assignedId.trim()) {
      acc.push(`EAID does not exist for row ${i + 1}`);
    }
    return acc;
  }, []);

  getMissingCOIDS = (results) => results.reduce((acc, item, i) => {
    if (!item.companyAssignedId || !item.companyAssignedId.trim()) {
      acc.push(`COID does not exist for row ${i + 1}`);
    }
    return acc;
  }, []);

  checkForDuplicateIDs = (formattedData) => {
    const allIds = formattedData.map((item) => item.assignedId);
    return new Set(allIds).size !== allIds.length;
  };

  onEmployeeUpload = async (results) => {
    this.setState({ loading: true });

    try {
      const headersArray = results.data[0];
      if (headersArray.length !== 36) {
        this.setState({
          employeeErrors: ['This CSV does not have the correct number of columns'],
          loading: false,
        });
        return;
      }

      const formattedData = results.data
        .slice(1) // Skip header
        .filter((item) => item[0] !== null && item[0] !== '')
        .map((item) => formatEmployeeRow(headersArray, item));

      const invalidFields = this.getInvalidFields(formattedData);
      if (invalidFields.length > 0) {
        this.setState({ employeeErrors: invalidFields, loading: false });
        return;
      }

      const missingCOIDS = this.getMissingCOIDS(formattedData);
      if (missingCOIDS.length > 0) {
        this.setState({ employeeErrors: missingCOIDS, loading: false });
        return;
      }

      if (this.checkForDuplicateIDs(formattedData)) {
        this.setState({ employeeErrors: ['This spreadsheet has duplicate employee IDs'], loading: false });
        return;
      }

      const months = formattedData.map((item) => item.month);
      const years = formattedData.map((item) => item.year);
      const coids = formattedData.map((item) => item.companyAssignedId);

      const allEqual = (arr) => arr.every((v) => v === arr[0]);

      if (!allEqual(months)) {
        this.setState({
          employeeErrors: ['Not all months match in each row of your CSV. Please make sure all rows use the same month.'],
          loading: false,
        });
        return;
      }

      if (!allEqual(years)) {
        this.setState({
          employeeErrors: ['Not all years match in each row of your CSV. Please make sure all rows use the same year.'],
          loading: false,
        });
        return;
      }

      if (!allEqual(coids)) {
        this.setState({
          employeeErrors: ['The company IDs (COID) do not all match for this CSV.'],
          loading: false,
        });
        return;
      }

      if (coids[0] !== this.props.customer.assignedId) {
        this.setState({
          employeeErrors: ['The company ID you are trying to upload does not match the COID in the CSV.'],
          loading: false,
        });
        return;
      }

      const { data } = await client.query({
        query: checkIfEmployeeTotalsExist,
        fetchPolicy: 'network-only',
        variables: {
          employeeAssignedIds: formattedData.map((item) => item.assignedId),
          month: formattedData[0].month,
          year: formattedData[0].year,
          customerId: this.props.customer.id,
        },
      });

      if (data.checkIfEmployeeTotalsExist.exists) {
        this.setState({
          confirmUpdateModal: true,
          employeeData: formattedData,
          employeeErrors: data.checkIfEmployeeTotalsExist.errors,
        });
        return;
      }

      if (data.checkIfEmployeeTotalsExist.errors.length > 0) {
        this.setState({
          employeeErrors: data.checkIfEmployeeTotalsExist.errors,
          loading: false,
        });
        return;
      }

      this.onCompleteUpload(formattedData);
    } catch (err) {
      console.error('Error during upload:', err);
      this.setState({
        employeeErrors: [err.message],
        loading: false,
      });
    }
  };

  handleUpload = (file = this.state.employeeFile) => {
    if (file) {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        complete: this.onEmployeeUpload,
      });
    }
  };

  render() {
    const {
      confirmUpdateModal,
      employeeFile,
      employeeErrors,
      employeeSuccess,
      loading,
    } = this.state;

    return (
      <React.Fragment>
        <OverrideModal
          visible={confirmUpdateModal}
          onUpdate={() => {
            this.onCompleteUpload(this.state.employeeData);
            this.setState({ confirmUpdateModal: false });
          }}
          onCancel={() => {
            this.setState({
              confirmUpdateModal: false,
              employeeData: null,
              employeeFile: null,
              loading: false,
            });
          }}
          content={
            <Content
              month={this.state.employeeData?.[0]?.month}
              year={this.state.employeeData?.[0]?.year}
            />
          }
        />
        <SectionTitle style={{ marginTop: 40 }}>Employee Totals</SectionTitle>
        {employeeSuccess && (
          <Alert
            message="Upload Success"
            description="Your employee totals were successfully uploaded"
            type="success"
            closable
            showIcon
          />
        )}
        {employeeFile && (
          <Filename
            name={employeeFile.name}
            onClick={() =>
              this.setState({
                employeeFile: null,
                employeeErrors: [],
                employeeSuccess: false,
              })
            }
          />
        )}
        {employeeErrors.length > 0 && <ErrorBlock errors={employeeErrors} />}
        <UploadButton
          type="file"
          id="employee-upload"
          accept=".csv"
          disabled={loading}
          onChange={(e) => {
            this.setState({
              employeeFile: e.target.files[0],
              employeeErrors: [],
              employeeSuccess: false,
            });
          }}
        />
        <Label htmlFor="employee-upload">
          <Icon icon="upload" size={18} />
          &nbsp;Upload CSV
        </Label>
        <Button
          type="primary"
          text="Upload Employee CSV"
          onClick={() => this.handleUpload()}
          loading={loading}
          style={{ marginLeft: 8 }}
        />
      </React.Fragment>
    );
  }
}

export default compose(graphql(uploadEmployeeReports, { name: 'uploadEmployeeReports' }))(EmployeeOverride);
