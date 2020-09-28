import React from 'react';
import styled from 'styled-components';
// COMPONENTS
import MessagesTable from './MessagesTable';
import Tabs from 'components/common/Tabs';
import Row from 'components/common/Row';
import Col from 'components/common/Col';
import TextInput from 'components/inputs/TextInput';
import CustomerDropdown from 'components/inputs/CustomerDropdown';
import SupportTypeInput from 'components/inputs/SupportTypeInput';
import MessageDetail from './MessageDetail';
// APOLLO
import {Query} from 'react-apollo';
import supportMessages from 'ApolloClient/Queries/supportMessages';

const {TabPane} = Tabs;

const Container = styled.div`
  width: 900px;
  margin: auto;
  max-width: 100%;
  margin-top: 40px;
`;

const TabWrapper = styled.div`
  .ant-tabs-nav .ant-tabs-tab-active {
    color: ${(p) => p.theme.colors.primary5} !important;
  }
  .ant-tabs-ink-bar {
    background-color: ${(p) => p.theme.colors.primary5} !important;
  }
  .ant-tabs-tab:hover {
    color: ${(p) => p.theme.colors.primary4} !important;
  }
`;

const PAGE_SIZE = 5;

class AdminSupport extends React.PureComponent {
  state = {
    skip: 0,
    tab: '1',
    customerId: null,
    messageType: null,
    current: 1,
    viewMessageDetail: null, // will hold a message object if one is selected
  };
  render() {
    let variables = {
      skip: this.state.skip,
      limit: PAGE_SIZE,
    };

    if (this.state.tab === '2') {
      variables.status = 'open';
    }

    if (this.state.tab === '3') {
      variables.status = 'closed';
    }

    if (this.state.customerId) {
      variables.customerId = this.state.customerId;
    }

    if (this.state.messageType) {
      variables.messageType = this.state.messageType;
    }

    if (this.state.searchText) {
      variables.searchText = this.state.searchText;
    }

    if (this.state.viewMessageDetail) {
      return (
        <Container>
          <MessageDetail
            goBack={() => this.setState({viewMessageDetail: null})}
            supportMessage={this.state.viewMessageDetail}
          />
        </Container>
      );
    }

    return (
      <Container>
        <TabWrapper>
          <Tabs
            defaultActiveKey={this.state.tab}
            onChange={(tab) => {
              this.setState({
                tab,
                skip: 0,
                current: 1,
              });
            }}
          >
            <TabPane tab="All" key="1"></TabPane>
            <TabPane tab="Open" key="2"></TabPane>
            <TabPane tab="Closed" key="3"></TabPane>
          </Tabs>
        </TabWrapper>
        <Row style={{height: 65, marginTop: 8}} gutter={24}>
          <Col xs={12}>
            <TextInput
              dark
              width={'450px'}
              onChange={(e) => this.setState({searchText: e.target.value})}
              label="Search by email or ticket ID"
              value={this.state.searchText}
              marginBottom="8px"
            />
          </Col>
          <Col xs={5}>
            <CustomerDropdown
              value={this.state.customerId}
              onChange={(customerId) => {
                this.setState({customerId});
              }}
            />
          </Col>
          <Col xs={7}>
            <SupportTypeInput
              value={this.state.messageType}
              onChange={(messageType) => {
                this.setState({messageType});
              }}
            />
          </Col>
        </Row>
        <Query
          query={supportMessages}
          variables={variables}
          fetchPolicy="network-only"
        >
          {({loading, error, data}) => {
            if (error) return 'error';
            return (
              <MessagesTable
                onSelect={(message) =>
                  this.setState({viewMessageDetail: message})
                }
                dataSource={
                  (data && data.supportMessages.supportMessages) || []
                }
                total={!loading ? data.supportMessages.count : null}
                current={this.state.current}
                onPageChange={(page) =>
                  this.setState({
                    skip: page === 1 ? 0 : (page - 1) * PAGE_SIZE,
                    current: page,
                  })
                }
                loading={loading}
              />
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default AdminSupport;
