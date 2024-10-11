//WHATSAPP
const twilio = require('twilio');
const Reminderlog = require('@model/reminderlogModel'); 

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const sendWhatsapp= async (reminder) => {
  try {
    var response = await twilioClient.messages.create({
      contentSid: "HXeaab93fe99ca3b166e48f0f6ed18c954",
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:+44${reminder.whatsapp}`,
    });
    
    const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'Whatsapp', status: 'Success',response});
     await reminderLog.save();
     
  } catch (error) {
    const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'Whatsapp', status: 'Failed', response: error });
     await reminderLog.save(); 
   }
};
 

module.exports = sendWhatsapp;