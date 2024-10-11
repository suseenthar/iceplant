// cron/reminderCron.js
const cron = require('node-cron');
const Reminder = require('@model/reminderModel');
const sendEmail = require('@utils/mailer');
const sendSMS = require('@utils/sms');
const sendWhatsapp = require('@utils/whatsapp');

// Daily Cron Job (Runs every day at 9 AM)
cron.schedule('* * * * *', async () => {
  const today = new Date();
  console.log('Checking for daily reminders...');

  const reminders = await Reminder.find({ recurrence: 'Daily' });
  

  reminders.forEach(async (reminder) => { 
    if (shouldSendReminder(reminder, today)) {
        await sendEmail(reminder);
        await sendSMS(reminder);
        await sendWhatsapp(reminder);
        reminder.lastSent = today;
        await reminder.save();
    }
  });
});

// Weekly Cron Job (Runs every Monday at 8 AM)
cron.schedule('0 8 * * 1', async () => {
  const today = new Date();
  console.log('Checking for weekly reminders...');

  const reminders = await Reminder.find({ recurrence: 'Weekly' });

  reminders.forEach(async (reminder) => {
    if (shouldSendReminder(reminder, today)) {
      await sendEmail(reminder.id, reminder.email, 'Weekly Reminder', reminder.message);
      reminder.lastSent = today;
      await reminder.save();
    }
  });
});

// Monthly Cron Job (Runs on the 1st of every month at 8 AM)
cron.schedule('0 8 1 * *', async () => {
  const today = new Date();
  console.log('Checking for monthly reminders...');

  const reminders = await Reminder.find({ recurrence: 'Monthly' });

  reminders.forEach(async (reminder) => { 
    if (shouldSendReminder(reminder, today)) {
      await sendEmail(reminder.id, reminder.email, 'Monthly Reminder', reminder.message);
      reminder.lastSent = today;
      await reminder.save();
    }
  });
});

// Yearly Cron Job (Runs on January 1st at 8 AM)
cron.schedule('0 8 1 1 *', async () => {
  const today = new Date();
  console.log('Checking for yearly reminders...');

  const reminders = await Reminder.find({ recurrence: 'Yearly' });

  reminders.forEach(async (reminder) => {
    if (shouldSendReminder(reminder, today)) {
      await sendEmail(reminder.id, reminder.email, 'Yearly Reminder', reminder.message);
      reminder.lastSent = today;
      await reminder.save();
    }
  });
});

// Function to check if a reminder should be sent
function shouldSendReminder(reminder, today) {
  if (!reminder.lastSent) return true; // if never sent before
  const lastSentDate = new Date(reminder.lastSent);
  const diffInDays = Math.floor((today - lastSentDate) / (1000 * 60 * 60 * 24));

  switch (reminder.frequency) {
    case 'Daily':
      return diffInDays >= 1;
    case 'Weekly':
      return diffInDays >= 7;
    case 'Monthly':
      return today.getMonth() !== lastSentDate.getMonth();
    case 'Yearly':
      return today.getFullYear() !== lastSentDate.getFullYear();
    default:
      return false;
  }
}

module.exports = cron;
