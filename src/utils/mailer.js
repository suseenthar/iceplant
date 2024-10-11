// utils/mailer.js
const  Mail = require('@sendgrid/mail');
const Reminderlog = require('@model/reminderlogModel'); 

Mail.setApiKey(process.env.SENDGRID_API_KEY);  
const sendEmail = async (reminder) => {
  
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.5; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
    <h2 style="color: #2e6da4;">Reminder Email</h2>
    <p>Hi there,</p>
    <p>This is your friendly reminder to stay on top of your tasks!</p>
    <p>`+ reminder.description +`</p>
    <ul style="list-style-type: disc; padding-left: 20px;">
      <li>Task 1: Complete your project report.</li>
      <li>Task 2: Attend the meeting at 2:00 PM.</li>
      <li>Task 3: Reply to important emails.</li>
    </ul>
    <p>Keep up the great work! Don’t forget to take breaks when needed.</p>
    <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px;">Go to Your Dashboard</a>
    <p style="margin-top: 20px; font-size: 12px; color: #555;">This is an automated email. Please do not reply.</p>
  </div>
`;

  const mailcontents = {
    "to": reminder.email,
    "from": process.env.FROM_EMAIL,
    "subject": 'Reminder : '+ reminder.title,
    "text": reminder.description,
    "html": htmlContent,
     tracking_settings: {
      open_tracking: {
        enable: true,  
        substitution_tag: '<%open_track%>'  
      },
    },
  }; 
 
  try {
    var response = await Mail.send(mailcontents);
    const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'Email', status: 'Success',response});
    const log =  await reminderLog.save();
      
  } catch (error) { 
    if (error.response) {
      const reminderLog = new Reminderlog({reminder_id: reminder.id,channel: 'Email', status: 'Failed', response: error.response });
      await reminderLog.save(); 
    } 
  }
};

module.exports = sendEmail;
