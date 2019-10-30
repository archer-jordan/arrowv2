import {createGlobalStyle} from 'styled-components';
import theme from './theme';

export const GlobalStyle = createGlobalStyle`


  /* TOP LEVEL CSS */

  div, a, h1, h2, h3, h4, h5, p, span {
    font-family: ${theme.fontFamily};
    font-size: 16px;
  }

  html, body {
    margin: 0px;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
  }

  a {
    color: #f2495c !important;
  }

  #root {
    height: 100%;
  }


  /* CALENDAR STYLES OVERWRITING ANTD CALENDAR DEFAULT STYLES */

  .ant-calendar-month-panel-tbody {
    font-family: ${theme.fontFamily} !important;
  }
  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {
    background: ${theme.colors.primary1} !important;
  }
  .ant-calendar-month-panel-month:hover {
    background: #e5eff5 !important;
  }
  .ant-calendar-header a:hover {
    color: ${theme.colors.primary1} !important;
  }


  /* TABLE STYLES OVERWRITING ANTD TABLE DEFAULT STYLES */

  th {
    background: #145d92 !important;

  }

  .ant-table-header-column {
    text-transform: uppercase;
    color: #fff !important;
    letter-spacing: 1.5px;
    font-size: 12px !important;
  }

  .ant-table-row {
    cursor: pointer;
  }


  .ant-table-thead > tr > th {
    border-bottom: 0px !important;
  }

  th {
    padding: 8px !important;
  }

  table th:first-child{
    border-top-left-radius: 30px !important;
    border-bottom-left-radius: 30px !important;
    padding-left: 16px !important;
  }

  table th:last-child{
    border-top-right-radius: 30px !important;
    border-bottom-right-radius: 30px !important;
  }

  tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: transparent !important;
  }



`;

export default theme;
