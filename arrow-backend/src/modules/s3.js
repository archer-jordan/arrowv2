import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: process.env.AWS_REGION_NAME,
});

export default s3;
