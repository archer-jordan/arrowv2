import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import FormItem from 'components/common/FormItem';
import Input from 'components/inputs/Input';
import Button from 'components/common/Button';
import Row from 'components/common/Row';
import CompanyTypeInpput from 'components/inputs/CompanyTypeInput';
import Col from 'components/common/Col';
import Icon from 'components/common/Icon';
import ErrorBlock from 'components/common/ErrorBlock';
// APOLLO
import customerIdAlreadyExists from 'ApolloClient/Queries/customerIdAlreadyExists';
import {Query} from 'react-apollo';

const RedText = styled.div`
  color: ${p => p.theme.colors.red2};
`;

const GreenText = styled.div`
  color: #0e7817;
`;

const Container = styled.div`
  min-height: 200px;
  width: 700px;
  max-width: 100%;
  border-radius: 5px;
`;

class CustomerForm extends React.PureComponent {
  state = {
    title: this.props.title || null,
    companyType: this.props.companyType || null,
    assignedId: this.props.assignedId || null,
    ein: this.props.ein || null,
    naics: this.props.naics || null,
    sic: this.props.sic || null,
    street: this.props.street || null,
    zip: this.props.zip || null,
    city: this.props.city || null,
    state: this.props.state || null,
    errors: [],
  };
  isDisabled = () => {
    if (!this.state.title) {
      return true;
    }

    if (!this.state.assignedId) {
      return true;
    }
  };
  onSubmit = () => {
    this.setState({errors: []});

    if (!this.state.title) {
      return this.setState({errors: ['Please provide a title']});
    }
    if (!this.state.assignedId) {
      return this.setState({errors: ['Please provide an ID']});
    }

    this.props.onSubmit({
      title: this.state.title,
      companyType: this.state.companyType,
      assignedId: this.state.assignedId,
      ein: this.state.ein,
      naics: this.state.naics,
      sic: this.state.sic,
      // location
      street: this.state.street,
      zip: this.state.zip,
      city: this.state.city,
      state: this.state.state,
    });
  };
  render() {
    return (
      <Container>
        <Row gutter={16}>
          <Col xs={12}>
            <FormItem label="ID" required>
              <Input
                value={this.state.assignedId}
                onChange={e => this.setState({assignedId: e.target.value})}
              />
              {!this.props.editing &&
                this.state.assignedId !== this.props.assignedId && (
                  <React.Fragment>
                    {this.state.assignedId && this.state.assignedId.length < 3 && (
                      <RedText>
                        <Icon type="close-circle" style={{marginRight: 4}} />
                        Please input at least 3 characters
                      </RedText>
                    )}
                    {this.state.assignedId &&
                      this.state.assignedId.length >= 3 && (
                        <Query
                          query={customerIdAlreadyExists}
                          variables={{assignedId: this.state.assignedId}}
                        >
                          {({data, loading, error}) => {
                            if (loading)
                              return (
                                <div>
                                  <Icon type="loading" />
                                </div>
                              );
                            if (error) return 'Error';
                            return (
                              <div>
                                {!data.customerIdAlreadyExists.exists ? (
                                  <GreenText>
                                    <Icon
                                      type="check-circle"
                                      style={{marginRight: 4}}
                                    />
                                    <strong>{this.state.assignedId}</strong> is
                                    available
                                  </GreenText>
                                ) : (
                                  <RedText>
                                    <Icon
                                      type="close-circle"
                                      style={{marginRight: 4}}
                                    />
                                    <strong>{this.state.assignedId}</strong> is
                                    not available
                                  </RedText>
                                )}
                              </div>
                            );
                          }}
                        </Query>
                      )}
                  </React.Fragment>
                )}
            </FormItem>
          </Col>{' '}
          <Col xs={12}>
            <div style={{height: 90}} />{' '}
          </Col>
          <Col xs={24} />
          <Col xs={12}>
            <FormItem label="Company Name" required>
              <Input
                value={this.state.title}
                onChange={e => this.setState({title: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Company Type">
              <CompanyTypeInpput
                value={this.state.companyType}
                onChange={companyType => this.setState({companyType})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="Company Address">
              <Input
                value={this.state.street}
                onChange={e => this.setState({street: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="EIN">
              <Input
                value={this.state.ein}
                onChange={e => this.setState({ein: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="City">
              <Input
                value={this.state.city}
                onChange={e => this.setState({city: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="NAICS">
              <Input
                value={this.state.naics}
                onChange={e => this.setState({naics: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={6}>
            <FormItem label="State">
              <Input
                value={this.state.state}
                onChange={e => this.setState({state: e.target.value})}
              />
            </FormItem>
          </Col>{' '}
          <Col xs={6}>
            <FormItem label="Zip">
              <Input
                value={this.state.zip}
                onChange={e => this.setState({zip: e.target.value})}
              />
            </FormItem>
          </Col>
          <Col xs={12}>
            <FormItem label="SIC">
              <Input
                value={this.state.sic}
                onChange={e => this.setState({sic: e.target.value})}
              />
            </FormItem>
          </Col>
        </Row>
        {this.state.errors && this.state.errors.length > 0 && (
          <FormItem>
            <ErrorBlock errors={this.state.errors} />
          </FormItem>
        )}
        <FormItem>
          {this.props.onCancel && (
            <Button
              style={{width: 100, marginRight: 16}}
              grey
              onClick={this.props.onCancel}
            >
              Cancel
            </Button>
          )}
          <Button
            disabled={this.props.loading || this.isDisabled()}
            style={{width: 140}}
            onClick={this.onSubmit}
          >
            {!this.props.loading ? this.props.buttonText : '...'}
          </Button>{' '}
        </FormItem>
      </Container>
    );
  }
}

CustomerForm.defaultProps = {
  buttonText: 'Save Changes',
};

export default CustomerForm;
