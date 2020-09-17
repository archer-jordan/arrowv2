import s3 from 'modules/s3';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const singleUpload = async (parent, args, {user}) => {
  try {
    // check if user is a super admin
    if (!user || !user.id) {
      throw new Error('You must be logged in to do that');
    }

    if (!user.roles) {
      throw new Error('You do not have the relevant role to do that');
    }

    // if a user is not a superAdmin AND not a referral partner, than they can't upload documents
    if (
      !user.roles.includes('referral') &&
      !user.roles.includes('superAdmin')
    ) {
      throw new Error('You do not have the relevant role to do that');
    }

    // https://www.apollographql.com/docs/apollo-server/data/file-uploads/
    const file = await args.file;
    const {createReadStream, filename, encoding, mimetype} = file;
    const fileStream = createReadStream();

    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: fileStream,
    };

    const result = await s3.upload(uploadParams).promise();

    return {
      filename,
      mimetype,
      encoding,
      key: result['key'] || result['Key'], //'Screen Shot 2019-11-25 at 11.27.07 AM (2).png' // why Key and key? See: https://github.com/aws/aws-sdk-js/issues/918
      url: result['Location'], // 'https://arrow-bucket-test.s3.amazonaws.com/EmployeeUpdates.csv'
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default singleUpload;
