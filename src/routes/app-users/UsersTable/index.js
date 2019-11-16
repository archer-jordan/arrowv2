import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import styled from "styled-components";

const Text = styled.div`
  font-weight: 600;
  color: #0f466a;
  font-family: ${p => p.theme.fontFamily};
`;

const MockTableHeaderBackground = styled.div`
  background: blue;
  height: 50px;
  position: absolute;
  z-index: 1000;
  top: 0;
`;

const columns = [
  {
    title: "Last Name",
    dataIndex: "id",
    key: "id",
    render: (text, record) => <Text>{record.lastName}</Text>
  },
  {
    title: "First Name",
    render: (text, record) => <Text>{record.firstName}</Text>
  },
  {
    title: "Email",
    render: (text, record) => <Text>{record.email}</Text>
  }
];

class UsersTable extends React.PureComponent {
  render() {
    const { total, loading, current, dataSource, onPageChange } = this.props;
    return (
      <div style={{ position: "relative" }}>
        <MockTableHeaderBackground />
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: 5,
            total,
            current: current || 1,
            onChange: (page, pageSize) => onPageChange(page)
          }}
          loading={loading}
        />{" "}
      </div>
    );
  }
}

export default UsersTable;