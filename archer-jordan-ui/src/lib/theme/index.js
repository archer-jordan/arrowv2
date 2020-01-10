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
    width: 100vw;
  }

  .ant-calendar-column-header-inner {
    color: #fff !important;
  }

  /* CALENDAR STYLES OVERWRITING ANTD CALENDAR DEFAULT STYLES */

  .ant-calendar-month-panel-tbody {
    font-family: ${theme.fontFamily} !important;
  }
  .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month {
    background: #e5eff5 !important;
    /* ${theme.colors.primary2} !important; */
  }
  .ant-calendar-month-panel-month:hover {
    background: #e5eff5 !important;
  }
  .ant-calendar-header a:hover {
    color: ${theme.colors.primary1} !important;
  }



  .ant-popover-buttons {
    .ant-btn:hover, .ant-btn:focus {
      color: ${theme.colors.primary1}  !important;
      background-color: #fff;
      border-color: ${theme.colors.primary1} !important;
    }
    .ant-btn.ant-btn-primary.ant-btn-sm{
      background: ${theme.colors.primary1} !important;
      border-color: ${theme.colors.primary1} !important;
      color: #fff !important;
    }
  }


  /* ================================================
    TABLE STYLES OVERWRITING ANTD TABLE DEFAULT STYLES 
  ==================================================== */

  th {
    background: #145d92 !important;

  }

  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-down.on {
    color: ${theme.colors.support2} !important;
  }

  .ant-table-thead > tr > th .ant-table-column-sorter .ant-table-column-sorter-inner .ant-table-column-sorter-up.on {
    color: ${theme.colors.support2} !important;
  }

  .ant-table-header-column {
    text-transform: uppercase;
    color: #fff !important;
    letter-spacing: 1.5px;
    font-size: 12px !important;
  }

  /* .ant-table-row {
    cursor: pointer;
  } */




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
