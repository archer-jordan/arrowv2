import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';
import AdminDocs from 'collections/AdminDocs/model';

export default async (root, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

    let query = {};

    if (args.searchText) {
      let regex = new RegExp(args.searchText, 'i');
      query.filename = regex;
    }
    // setup options for query
    let options = {};

    if (args.sortBy && args.sortBy === 'ascCreatedAt') {
      options.sort = {createdAt: -1};
    }
    if (args.sortBy && args.sortBy === 'descCreatedAt') {
      options.sort = {createdAt: 1};
    }
    if (args.sortBy && args.sortBy === 'ascFilename') {
      options.sort = {filename: 1};
    }
    // query documents
    let docs = await AdminDocs.find(query, null, options);
    // return the result
    return docs;
  } catch (err) {
    console.log(err);
    return err;
  }
};
