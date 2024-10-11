//SMS
const twilio = require('twilio');
const Reminderlog = require('@model/reminderlogModel'); 

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const sendSMS= async (reminder) => {
  try {
   var response = await twilioClient.messages.create({
      body: reminder.description,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: reminder.mobile,
    });
     const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'SMS', status: 'Success', response });
     await reminderLog.save();
  } catch (error) {
    const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'SMS', status: 'Failed', response: error });
     await reminderLog.save(); 
  }
};

 module.exports = sendSMS;
