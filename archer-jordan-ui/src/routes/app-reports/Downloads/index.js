import React from 'react';
import Button from 'components/common/Button';
import Papa from 'papaparse';

class DownloadXL extends React.PureComponent {
  state = {
    loading: false,
  };
  downloadFile = (dataSource, exportFilename = 'data.csv') => {
    let data = Papa.unparse([dataSource], {header: true});
    let csvData = new Blob([data], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(csvData, exportFilename);
    } else {
      // In FF link must be added to DOM to be clicked
      let link = document.createElement('a');
      link.href = window.URL.createObjectURL(csvData);
      link.setAttribute('download', exportFilename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    this.setState({downloading: false});
  };
  onDownload = () => {
    const {report} = this.props;

    let formattedReport = {
      Month: report.month,
      Year: report.year,
      'Active Employees': report.activeThisMonth,
      [report.labelForTotalHours]: report.totalHours,
      'Total Fringe': report.totalFringe,
      [report.labelForVHS]: report.totalVHS,
      [report.labelForTotalRetirement]: report.totalRetirement,
      [report.totalHealthAndWelfareLabel]: report.totalHealthAndWelfare,
      [report.totalFringeBenefitsSpendLabel]: report.totalFringeBenefitsSpend,
    };
    report.eligibility.forEach(item => {
      formattedReport[`Eligibility: ${item.label}`] = item.employees;
    });
    report.benefits.forEach(item => {
      formattedReport[item.label] = item.value;
    });

    this.downloadFile(formattedReport, `${report.month}-${report.year}.csv`);
  };

  render() {
    return (
      <div>
        <Button
          style={{width: 200}}
          onClick={this.onDownload}
          loading={this.state.loading}
        >
          Download Report
        </Button>
      </div>
    );
  }
}

export default DownloadXL;
