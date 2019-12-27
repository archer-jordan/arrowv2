const valueExists = value => {
  if (value && value.length === 0) return null;
  if (value && value === 'null') return null;
  if (!value) return null;
  return value;
};

// HEADERS
// 0: "COMPANY NAME"
// 1: "COID"
// 2: "Month(#)"
// 3: "MONTH"
// 4: "YEAR"
// 5: "TOTAL HOURS"
// 6: "TOTAL FRINGE*"
// 7: "TOTAL HEALTH & WELFARE"
// 8: "TOTAL VACATION, HOLIDAY, SICK"
// 9: "*Including Administrative Costs"
// 10: "TOTAL EMPLOYEES"
// 11: "ACTIVE THIS MONTH"
// ==> CUSTOM BENEFITS Employee counts start here
// 12: "LIMITED MEDICAL"
// 13: "TELEDOC"
// 14: "MEC"
// 15: "TERM LIFE INSURANCE"
// 16: "null"
// 17: "null"
// 18: "null"
// 19: "null"
// 20: "*charts below: eligible vs. active this month"
// 21: "TOTAL FRINGE BENEFITS SPEND*"
// ==> CUSTOM BENEFITS values
// 22: "LIMITED MEDICAL"
// 23: "TELEDOC"
// 24: "MEC"
// 25: "TERM LIFE INSURANCE"
// 26: "null"
// 27: "null"
// 28: "null"
// 29: "null"
// 30: "* including H&W, VHS, Administrative Costs"
// 31: "TOTAL CONTRIBUTIONS TO RETIREMENT INCLUDING H&W & VHS"

// VALUES
// 0: "NARCORPS"
// 1: "N00123" // assignedId
// 2: "7"
// 3: "JULY"
// 4: "2019"
// 5: "268.75"
// 6: "100215.33"
// 7: "90256.4"
// 8: "15123.45" // "TOTAL VACATION, HOLIDAY, SICK"
// 9: "*Including Administrative Costs"
// 10: "725"
// 11: "155" // active this month
// 12: "75" // benefit 1
// 13: "52" // benefit 2
// 14: "129" // benefit 3
// 15: "720" // benefit 4
// 16: "" // benefit 5
// 17: "" // benefit 6
// 18: "" // benefit 7
// 19: "" // benefit 8
// 20: "*charts below: eligible vs. active this month"
// ==> CUSTOM BENEFITS values
// 21: "143936.34"
// 22: "55123.45"
// 23: "6789.89"
// 24: "12435.88"
// 25: "69587.12"
// 26: ""
// 27: ""
// 28: ""
// 29: ""
// 30: "* including H&W, VHS, Administrative Costs"
// 31: "75123.56"

const cleanValue = value => {
  return value && valueExists(value) && valueExists(value).replace(/,/g, '');
};

const formatRow = (headersArray, dataArray) => {
  // benefits
  let benefits = [
    // benefit 1
    {
      label: valueExists(headersArray[12]),
      employees: cleanValue(dataArray[12]),
      value: cleanValue(dataArray[22]),
    },
    // benefit 2
    {
      label: valueExists(headersArray[13]),
      employees: cleanValue(dataArray[13]),
      value: cleanValue(dataArray[23]),
    },
    // benefit 3
    {
      label: valueExists(headersArray[14]),
      employees: cleanValue(dataArray[14]),
      value: cleanValue(dataArray[24]),
    },
    // benefit 4
    {
      label: valueExists(headersArray[15]),
      employees: cleanValue(dataArray[15]),
      value: cleanValue(dataArray[25]),
    },
    // benefit 5
    {
      label: valueExists(headersArray[16]),
      employees: cleanValue(dataArray[16]),
      value: cleanValue(dataArray[26]),
    },
    // benefit 6
    {
      label: valueExists(headersArray[17]),
      employees: cleanValue(dataArray[17]),
      value: cleanValue(dataArray[27]),
    },
    // benefit 7
    {
      label: valueExists(headersArray[18]),
      employees: cleanValue(dataArray[18]),
      value: cleanValue(dataArray[28]),
    },
    // benefit 8
    {
      label: valueExists(headersArray[19]),
      employees: cleanValue(dataArray[19]),
      value: cleanValue(dataArray[29]),
    },
  ];

  // remove any empty benefits
  benefits = benefits.filter(item => item.value);

  // return an object with the structure we'd like
  return {
    // the assigned id of the customer/company
    assignedId: dataArray[1],
    month: dataArray[2],
    year: dataArray[4],
    activeThisMonth: cleanValue(dataArray[11]),
    // total hours
    totalHours: cleanValue(dataArray[5]),
    labelForTotalHours: headersArray[5],
    // total fringe
    labelForTotalFringe: headersArray[6],
    totalFringe: cleanValue(dataArray[6]),
    // retirement
    totalRetirement: cleanValue(dataArray[31]),
    labelForTotalRetirement: headersArray[31],
    // total VHS
    totalVHS: cleanValue(dataArray[8]),
    labelForVHS: headersArray[8],
    // captions
    captionForHealthAndWelfare: headersArray[9],
    captionForBenefits: headersArray[30],
    // total fringe benfits spend
    totalFringeBenefitsSpendLabel: headersArray[21],
    totalFringeBenefitsSpend: cleanValue(dataArray[21]),
    // total health and welfare
    totalHealthAndWelfareLabel: headersArray[7],
    totalHealthAndWelfare: cleanValue(dataArray[7]),
    // other values
    totalEmployees: cleanValue(dataArray[10]),
    //  other labels
    labelForAdminCosts: dataArray[9],
    benefits,
    //
    captionForEligibility: headersArray[20],
  };
};

export default formatRow;
