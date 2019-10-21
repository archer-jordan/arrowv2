import {createGlobalStyle} from 'styled-components';
import theme from './theme';

export const GlobalStyle = createGlobalStyle`

  div, a, h1, h2, h3, h4, h5, p, span {
    font-family: ${theme.fontFamily};
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

  .ant-table-header-column {
    text-transform: uppercase;
    color: #9FB3C8;
    letter-spacing: 1.5px;
    font-size: 12px !important;
  }

  .ant-table-row {
    cursor: pointer;
  }

  tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #e5eff5 !important;
  }



`;

export default theme;
