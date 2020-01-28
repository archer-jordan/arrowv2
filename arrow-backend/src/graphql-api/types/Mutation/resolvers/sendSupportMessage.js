import emailTransporter from 'modules/email.js';
import SupportMessages from 'collections/SupportMessages/model';
import moment from 'moment';

const sendSupportMessage = async (root, args, context) => {
  // make sure a user exists
  if (!context.user) throw new Error('You must be signed in to do that');
  //
  try {
    const {
      name,
      email,
      subject,
      message,
      status,
      messageType,
      customerId,
    } = args.params;
    // insert the document
    let doc = new SupportMessages({
      name,
      email,
      subject,
      message,
      status,
      messageType,
      customerId,
      userId: context.user.id,
      createdAt: moment().valueOf(),
    });
    // save document
    await doc.save();
    // send the admin an email
    await emailTransporter.sendMail({
      to: process.env.CONSTANTS_SUPPORT_EMAIL,
      from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
      subject: `[Support Request] ${doc._id}`,
      text: `Message from ${name} (${email}) with subject: ${subject} and body: ${message}`,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendSupportMessage;
