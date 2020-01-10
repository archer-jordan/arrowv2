import s3 from 'modules/s3';
import userIsSuperAdmin from 'modules/helpers/userIsSuperAdmin';

const singleUpload = async (parent, args, context) => {
  try {
    // check if user is a super admin
    userIsSuperAdmin(context.user);

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
      key: result['key'], //'Screen Shot 2019-11-25 at 11.27.07 AM (2).png'
      url: result['Location'], // 'https://arrow-bucket-test.s3.amazonaws.com/EmployeeUpdates.csv'
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default singleUpload;
