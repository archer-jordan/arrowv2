const valueExists = value => {
  if (value && value.length === 0) return null;
  if (value && value === 'null') return null;
  if (!value) return null;
  return value;
};

const formatRow = (headersArray, dataArray) => {
  return {
    customerId: dataArray[1],
    month: dataArray[2],
    year: dataArray[4],
    activeThisMonth: dataArray[11],
    // totals
    totalHours: dataArray[5],
    totalFringe: dataArray[6],
    totalHealthAndWelfare: dataArray[7],
    totalVHS: dataArray[8],
    totalEmployees: dataArray[10],
    // labels
    labelForTotalFringe: headersArray[6],
    labelForTotalHours: headersArray[5],
    labelForVHS: dataArray[30],
    labelForAdminCosts: dataArray[9],
    // benefits
    benefits: [
      // benefit 1
      {
        label: valueExists(headersArray[12]),
        employees: valueExists(dataArray[12]),
        value: valueExists(dataArray[22]),
      },
      // benefit 2
      {
        label: valueExists(headersArray[13]),
        employees: valueExists(dataArray[13]),
        value: valueExists(dataArray[23]),
      },
      // benefit 3
      {
        label: valueExists(headersArray[15]),
        employees: valueExists(dataArray[15]),
        value: valueExists(dataArray[24]),
      },
      // benefit 4
      {
        label: valueExists(headersArray[16]),
        employees: valueExists(dataArray[16]),
        value: valueExists(dataArray[25]),
      },
      // benefit 5
      {
        label: valueExists(headersArray[17]),
        employees: valueExists(dataArray[17]),
        value: valueExists(dataArray[26]),
      },
      // benefit 6
      {
        label: valueExists(headersArray[18]),
        employees: valueExists(dataArray[18]),
        value: valueExists(dataArray[27]),
      },
      // benefit 7
      {
        label: valueExists(headersArray[19]),
        employees: valueExists(dataArray[19]),
        value: valueExists(dataArray[28]),
      },
      // benefit 8
      {
        label: valueExists(headersArray[20]),
        employees: valueExists(dataArray[20]),
        value: valueExists(dataArray[29]),
      },
    ],
  };
};

export default formatRow;
