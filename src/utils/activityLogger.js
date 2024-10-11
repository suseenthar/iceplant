const Activity = require('@model/activityModel');

const logActivity = async (activityType, description) => {
  try {
    const ActivityCustomer = new Activity({ activityType,description});
    ActivityCustomer.save();
  }  
};

module.exports = logActivity;
