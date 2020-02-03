import emailTransporter from 'modules/email.js';
import SupportMessages from 'collections/SupportMessages/model';
import Customers from 'collections/Customers/model';
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

    let customer = await Customers.findOne({_id: customerId});
    // save document
    await doc.save();
    // send the admin an email
    await emailTransporter.sendMail({
      to: process.env.CONSTANTS_SUPPORT_EMAIL,
      from: `ARROW <${process.env.CONSTANTS_SEND_EMAIL}>`,
      subject: `[ Support Request ] ${doc._id}`,
      html: `
      <div>
        <div>FROM: <strong>${name}</strong> </div>
        <div>CUSTOMER: <strong>${customer.assignedId ||
          customer.title}</strong></div>
        <div>EMAIL: <strong>${email}</strong></div>
        ${subject ? `<div>BODY: <strong>${subject}</strong></div>` : ''}
        ${message ? `<div>BODY: <strong>${message}</strong></div>` : ''}
        ${messageType ? `<div>TYPE: <strong>${messageType}</strong></div>` : ''}
      </div>`,
    });
  } catch (err) {
    console.log(err);
  }
};

export default sendSupportMessage;
