import saveUser from './saveUser';
import saveCustomer from './saveCustomer';
import registerAccount from './registerAccount';
import newEmployeesUpload from './newEmployeesUpload';
import saveEmployee from './saveEmployee';
import customerTotalsUpload from './customerTotalsUpload';
import checkEmployeesCSV from './checkEmployeesCSV';
import updateEmployeesUpload from './updateEmployeesUpload';
import impersonateCustomer from './impersonateCustomer';
import singleUpload from './singleUpload';
import saveAttachment from './saveAttachment';
import deleteAttachment from './deleteAttachment';
import uploadEmployeeReports from './uploadEmployeeReports';
import sendSupportMessage from './sendSupportMessage';
import createNewUser from './createNewUser';
import createSuperAdminUser from './createSuperAdminUser';
import deleteCustomer from './deleteCustomer';
import deleteUser from './deleteUser';
import makeEmployeeAnAdmin from './makeEmployeeAnAdmin';
import updateSupportStatus from './updateSupportStatus';

export const MutationResolvers = {
  Mutation: {
    // accountsjs comes with a createUser mutation, which we are overwriting here
    // so that users can no create their own accounts.
    // Instead we'll use our custom createNewUser
    createUser: () => null,
    createNewUser,
    createSuperAdminUser,
    deleteCustomer,
    deleteUser,
    saveUser,
    sendSupportMessage,
    saveCustomer,
    registerAccount,
    newEmployeesUpload,
    saveEmployee,
    customerTotalsUpload,
    checkEmployeesCSV,
    updateEmployeesUpload,
    singleUpload,
    impersonateCustomer,
    saveAttachment,
    deleteAttachment,
    uploadEmployeeReports,
    makeEmployeeAnAdmin,
    updateSupportStatus,
  },
};
