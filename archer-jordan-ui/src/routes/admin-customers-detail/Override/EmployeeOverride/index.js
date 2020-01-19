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
import {graphql} from 'react-apollo';
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
  color: ${p => p.theme.colors.support2};
  padding: 6px 10px;
  border-radius: 25px;
  border: 2px solid ${p => p.theme.colors.support2};
  background: transparent;
  display: inline-block;
  cursor: pointer;
  &:hover {
    border: 2px solid ${p => p.theme.colors.support1};
    color: ${p => p.theme.colors.support1};
  }
`;

const SectionTitle = styled.div`
  color: #fff;
  padding: 8px 16px;
  border-radius: 25px;
  margin-bottom: 24px;
  background: ${p => p.theme.colors.primary1};
`;

const Content = ({month, year}) => (
  <React.Fragment>
    <Title>A report already exists</Title>
    <Caption>
      At least one employee already has a report for {month}/{year}, would you
      like to override each employees report with the current CSV?
    </Caption>
  </React.Fragment>
);

class EmployeeOverride extends React.PureComponent {
  state = {
    loading: false,
    employeeErrors: [],
  };
  onCompleteUpload = async (values = this.state.employeeData) => {
    try {
      // make sure we have a value parameter
      if (!values) {
        throw new Error('No data found...');
      }
      // update data
      let result = await this.props.uploadEmployeeReports({
        variables: {
          values,
        },
      });

      if (!result.data.uploadEmployeeReports.success) {
        return this.setState({
          companyErrors: result.data.uploadEmployeeReports.errors,
          loading: false,
        });
      }

      if (
        result.data.uploadEmployeeReports.errors &&
        result.data.uploadEmployeeReports.errors.length > 0
      ) {
        return this.setState({
          companyErrors: result.data.uploadEmployeeReports.errors,
          loading: false,
        });
      }

      // reset all state
      this.setState({
        loading: false,
        employeeFile: null,
        employeeSuccess: true,
        employeeErrors: [],
      });
    } catch (err) {
      this.setState({
        loading: false,
        employeeErrors: [err.message],
      });
    }
  };
  getInvalidFields = results => {
    let invalidFields = [];
    results.forEach((item, i) => {
      if (
        !item.assignedId ||
        item.assignedId === '' ||
        item.assignedId === 'NULL' ||
        item.assignedId === 'Null' ||
        item.assignedId === 'null' ||
        item.assignedId === ' '
      ) {
        invalidFields.push(`EAID does not exist for row ${i + 1}`);
      }
    });
    return invalidFields;
  };
  getMissingCOIDS = results => {
    let invalidFields = [];
    results.forEach((item, i) => {
      if (
        !item.companyAssignedId ||
        item.companyAssignedId === '' ||
        item.companyAssignedId === 'NULL' ||
        item.companyAssignedId === 'Null' ||
        item.companyAssignedId === 'null' ||
        item.companyAssignedId === ' '
      ) {
        invalidFields.push(`COID does not exist for row ${i + 1}`);
      }
    });
    return invalidFields;
  };
  checkForDuplicateIDs = formattedData => {
    let allIds = formattedData.map(item => item.assignedId);
    const checkIfArrayIsUnique = myArray => {
      return myArray.length === new Set(myArray).size;
    };
    // check for duplicates
    return checkIfArrayIsUnique(allIds);
  };
  onEmployeeUpload = async (results, file) => {
    this.setState({loading: true});
    try {
      let headersArray = results.data[0];
      let formattedData = [];

      // make sure we have the right number of columns
      if (headersArray.length !== 36) {
        return this.setState({
          employeeErrors: [
            'This CSV does not have the correct number of columns',
          ],
          loading: false,
        });
      }

      results.data.forEach((item, i) => {
        // 0 index item is the header row, which we don't want to include in formatted data
        if (i !== 0 && item[0] !== null && item[0] !== '') {
          let formattedItem = formatEmployeeRow(headersArray, item);
          formattedData.push(formattedItem);
        }
      });

      // 2. Make sure there are no null employee IDs
      let invalidFields = this.getInvalidFields(formattedData);

      if (invalidFields.length > 0) {
        return this.setState({
          loading: false,
          employeeErrors: invalidFields,
        });
      }

      // Make sure there are no null company/customer IDs
      let missingCOIDS = this.getMissingCOIDS(formattedData);

      if (missingCOIDS.length > 0) {
        return this.setState({
          loading: false,
          employeeErrors: missingCOIDS,
        });
      }

      // 3. make sure we don't have any duplicate employee IDs
      let isUniqueArray = this.checkForDuplicateIDs(formattedData);

      if (!isUniqueArray) {
        return this.setState({
          loading: false,
          employeeErrors: ['This spreadsheet has dupliate employee IDs'],
        });
      }

      // 4. make sure each row has the same month/year
      const allEqual = arr => arr.every(v => v === arr[0]); // https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
      let months = formattedData.map(item => item.month); // create an aray of all the months so we can see if they're the same
      let years = formattedData.map(item => item.year); // create an aray of all the years so we can see if they're the same

      if (!allEqual(months)) {
        return this.setState({
          loading: false,
          employeeErrors: [
            'Not all months match in each row of your CSV. Please make sure all rows use the same month.',
          ],
        });
      }
      if (!allEqual(years)) {
        return this.setState({
          loading: false,
          employeeErrors: [
            'Not all years match in each row of your CSV. Please make sure all rows use the same year.',
          ],
        });
      }

      // 5. make sure the COIDs are all equal
      let coids = formattedData.map(item => item.companyAssignedId);
      if (!allEqual(coids)) {
        return this.setState({
          loading: false,
          employeeErrors: [
            'The company ids (COID) do not all match for this CSV',
          ],
        });
      }

      // 6. Make sure the COID in the CSV matches the customer we're currently on (the page we're on)
      if (coids[0] !== this.props.customer.assignedId) {
        return this.setState({
          loading: false,
          employeeErrors: [
            'The company ID you are trying to upload does not match the COID in the CSV',
          ],
        });
      }

      // we want to query and see if any of these employees already have reports for this month
      let employeeTotalsExist = await client.query({
        query: checkIfEmployeeTotalsExist,
        fetchPolicy: 'network-only',
        variables: {
          employeeAssignedIds: formattedData.map(item => item.assignedId),
          month: formattedData[0].month,
          year: formattedData[0].year,
          customerId: this.props.customer.id,
        },
      });

      // if exists true, we already have data for this month and we need to show the confirmation modal
      if (employeeTotalsExist.data.checkIfEmployeeTotalsExist.exists) {
        return this.setState({
          confirmUpdateModal: true,
          employeeData: formattedData,
          employeeErrors:
            employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors,
        });
      }

      // if we got other errors back, show those
      if (
        employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors &&
        employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors.length > 0
      ) {
        return this.setState({
          employeeErrors:
            employeeTotalsExist.data.checkIfEmployeeTotalsExist.errors,
          loading: false,
        });
      }

      // if we get to this point without errors, it's safe to run the upload
      return this.onCompleteUpload(formattedData);
    } catch (err) {
      console.log(err);
      this.setState({
        employeeErrors: [err.message],
      });
    }
  };
  handleUpload = (
    file = this.state.employeeFile,
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
            this.onCompleteUpload(this.state.employeeData);
            this.setState({
              confirmUpdateModal: false,
            });
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
              month={
                this.state.employeeData &&
                this.state.employeeData[0] &&
                this.state.employeeData[0].month
              }
              year={
                this.state.employeeData &&
                this.state.employeeData[0] &&
                this.state.employeeData[0].year
              }
            />
          }
        />
        {/* EMPLOYEE TOTALS  */}
        <SectionTitle style={{marginTop: 40}}>Emloyee Totals</SectionTitle>
        {this.state.employeeSuccess && (
          <Alert
            message="Upload Success"
            description="Your employee totals were successfully uploaded"
            type="success"
            closable
            showIcon
          />
        )}
        {/* SHOW EMPLOYEE TOTALS FILE NAME */}
        {this.state.employeeFile && (
          <Filename
            name={this.state.employeeFile.name}
            onClick={() =>
              this.setState({
                employeeFile: null,
                employeeErrors: [],
                loading: false,
              })
            }
          />
        )}
        {/* LOADING SPINNER */}
        {this.state.loading && <Icon type="loading" />}
        {/* EMPLOYEE CONFIRM UPLOAD BUTTON */}
        {this.state.employeeFile && !this.state.loading && (
          <Button
            style={{marginTop: 32, marginLeft: 16, width: 100}}
            onClick={() =>
              this.handleUpload(this.state.employeeFile, this.onEmployeeUpload)
            }
          >
            Upload File
          </Button>
        )}
        {this.state.employeeErrors && this.state.employeeErrors.length > 0 && (
          <div style={{marginTop: 16, width: 500, maxWidth: '100%'}}>
            {this.state.employeeErrors.slice(0, 4).map(item => (
              <ErrorBlock key={item} error={item} />
            ))}
            {/* We don't want to render 1,000 error blocks if there were many errors. So show the first 4 and tell how many are left over */}
            {this.state.employeeErrors.length > 4 && (
              <ErrorBlock
                error={`And ${this.state.employeeErrors.length -
                  4} more errors`}
              />
            )}
          </div>
        )}
        {/* EMPLOYEE SELECT FILE BUTTON */}
        {!this.state.employeeFile && (
          <div style={{marginTop: 32}}>
            <UploadButton
              name="employee-file"
              type="file"
              id="employee-file"
              onChange={event => {
                this.setState({
                  employeeFile: event.target.files[0],
                  employeeErrors: [],
                });
              }}
            />{' '}
            <Label htmlFor="employee-file">Select New File</Label>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default compose(
  graphql(uploadEmployeeReports, {name: 'uploadEmployeeReports'})
)(EmployeeOverride);
