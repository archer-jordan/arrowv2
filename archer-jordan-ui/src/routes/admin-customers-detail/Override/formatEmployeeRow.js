// 0: "COMPANY NAME"
// 1: "COID"
// 2: "EAID"
// 3: "Month(#)"
// 4: "MONTH"
// 5: "YEAR"
// 6: "Last Name"
// 7: "First Name"
// 8: "JULY HOURS"
// benefits 1
// 9: "TELEDOC" // benefit #1 label
// 10: "REQUIRED HOURS" // benefit #1 hours
// 11: "AUGUST ELIGIBLITY" // benefit #1 eligibility
// benefits 2
// 12: "LIMITED MEDICAL" // benefit #2 label
// 13: "REQUIRED HOURS" // benefit #2 hours
// 14: "AUGUST ELIGIBLITY" // benefit #2 eligibility
// benefits 3
// 15: "MEC PLAN"
// 16: "REQUIRED HOURS"
// 17: "AUGUST ELIGIBLITY"
// benefits 4
// 18: "TERM LIFE INSURANCE"
// 19: "REQUIRED HOURS"
// 20: "AUGUST ELIGIBLITY"
// benefits 5
// 21: "Null"
// 22: "Null"
// 23: "Null"
// benefits 6
// 24: "Null"
// 25: "Null"
// 26: "Null"
// benefits 7
// 27: "Null"
// 28: "Null"
// 29: "Null"
// benefits 8
// 30: "Null"
// 31: "Null"
// 32: "Null"
// 33: "FRINGE DOLLARS"
// 34: "HEALTH & WELFARE"
// 35: "RETIREMENT"

const valueExists = value => {
  if (value && value.length === 0) return null;
  if (value && value === 'null') return null;
  if (!value) return null;
  return value;
};

// basically remove any commas from the value, if it exists
const cleanValue = value => {
  return value && valueExists(value) && valueExists(value).replace(/,/g, '');
};

const generateBenefits = (headersArray, dataArray) => {
  let benefits = [];

  // benefits 1
  if (dataArray[9] && dataArray[9] !== '') {
    benefits.push({
      label: dataArray[9],
      hours: cleanValue(dataArray[10]),
      eligibility: dataArray[11] === 'Y' ? true : false,
    });
  }

  // benefits 2
  if (dataArray[12] && dataArray[12] !== '') {
    benefits.push({
      label: dataArray[12],
      hours: cleanValue(dataArray[13]),
      eligibility: dataArray[14] === 'Y' ? true : false,
    });
  }

  // benefits 3
  if (dataArray[15] && dataArray[15] !== '') {
    benefits.push({
      label: dataArray[15],
      hours: cleanValue(dataArray[16]),
      eligibility: dataArray[17] === 'Y' ? true : false,
    });
  }

  // benefits 4
  if (dataArray[18] && dataArray[18] !== '') {
    benefits.push({
      label: dataArray[18],
      hours: dataArray[19],
      eligibility: dataArray[20] === 'Y' ? true : false,
    });
  }

  // benefits 5
  if (dataArray[21] && dataArray[21] !== '') {
    benefits.push({
      label: dataArray[21],
      hours: cleanValue(dataArray[22]),
      eligibility: dataArray[23] === 'Y' ? true : false,
    });
  }

  //   // benefits 6
  if (dataArray[24] && dataArray[24] !== '') {
    benefits.push({
      label: dataArray[24],
      hours: cleanValue(dataArray[25]),
      eligibility: dataArray[26] === 'Y' ? true : false,
    });
  }

  // benefits 7
  if (dataArray[27] && dataArray[27] !== '') {
    benefits.push({
      label: dataArray[27],
      hours: cleanValue(dataArray[28]),
      eligibility: dataArray[29] === 'Y' ? true : false,
    });
  }
  // benefits 8
  if (dataArray[30] && dataArray[30] !== '') {
    benefits.push({
      label: dataArray[30],
      hours: cleanValue(dataArray[31]),
      eligibility: dataArray[32] === 'Y' ? true : false,
    });
  }

  return {
    benefits,
  };
};

const formatEmployeeRow = (headersArray, dataArray) => {
  let {benefits} = generateBenefits(headersArray, dataArray);

  return {
    // employee/customer ID
    assignedId: dataArray[2],
    // the assigned ID of the company
    companyAssignedId: dataArray[1],
    month: dataArray[3],
    year: dataArray[5],
    hours: cleanValue(dataArray[8]),
    benefits,
    fringeDollars: cleanValue(dataArray[33]),
    fringeDollarsLabel: headersArray[33],
    healthAndWelfare: cleanValue(dataArray[34]),
    healthAndWelfareLabel: headersArray[34],
    retirement: cleanValue(dataArray[35]),
    retirementLabel: headersArray[35],
  };
};

export default formatEmployeeRow;
