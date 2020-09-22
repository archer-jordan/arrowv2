import React from 'react';
import styled from 'styled-components';
import Table from 'antd/lib/table';
import 'antd/lib/table/style/css';

const Wrapper = styled.div``;

export default (props) => {
  return (
    <Wrapper>
      <Table
        {...props}
        loading={props.loading}
        onRow={props.onRow}
        onChange={props.onChange}
        rowKey={(record) => record.id}
        dataSource={props.dataSource}
        columns={props.columns}
        pagination={{showSizeChanger: false, ...props.pagination}}
      />
    </Wrapper>
  );
};
