import Mongo from 'modules/mongodb';
import baseFields from '../shared-models/base-fields';

const schema = new Mongo.Schema({
  ...baseFields,
  customerId: String,
  month: String,
  year: String,
  activeThisMonth: Number,
  // totals
  totalHours: Number,
  totalFringe: Number,
  totalHealthAndWelfare: String,
  totalVHS: String,
  totalEmployees: String,
  totalRetirement: String,
  totalFringeBenefitsSpend: String,
  // labels
  labelForVHS: String,
  labelForAdminCosts: String,
  labelForTotalFringe: String,
  labelForTotalHours: String,
  labelForTotalRetirement: String,
  totalHealthAndWelfareLabel: String,
  totalFringeBenefitsSpendLabel: String,
  // captions
  captionForHealthAndWelfare: String,
  captionForEligibility: String,
  captionForBenefits: String,
  // benefits
  benefits: [
    {
      value: String,
      label: String,
    },
  ],
  // eligibility
  eligibility: [
    {
      employees: String,
      label: String,
    },
  ],
});

// create indexes
schema.index({customerId: 1, employeeId: 1, month: 1, year: 1});

const CustomerReports = Mongo.model('CustomerReports', schema);

export default CustomerReports;
