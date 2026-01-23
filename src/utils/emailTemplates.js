// Email templates
const getInterviewBookedTemplate = (userName, interviewerName, startTime, roundType) => ({
  subject: 'Interview Scheduled - Smart Interview Platform',
  html: `
    <h2>Hello ${userName},</h2>
    <p>Your interview has been successfully scheduled!</p>
    <p><strong>Interviewer:</strong> ${interviewerName}</p>
    <p><strong>Round:</strong> ${roundType}</p>
    <p><strong>Time:</strong> ${new Date(startTime).toLocaleString()}</p>
    <p>Please be ready 5 minutes before the scheduled time.</p>
    <br>
    <p>Best regards,<br>Smart Interview Platform Team</p>
  `,
});

const getInterviewReminderTemplate = (userName, interviewerName, startTime, roundType) => ({
  subject: 'Interview Reminder - Starts in 30 Minutes',
  html: `
    <h2>Hi ${userName},</h2>
    <p>This is a reminder for your upcoming interview.</p>
    <p><strong>Interviewer:</strong> ${interviewerName}</p>
    <p><strong>Round:</strong> ${roundType}</p>
    <p><strong>Time:</strong> ${new Date(startTime).toLocaleString()}</p>
    <p>Please join on time.</p>
    <br>
    <p>Best regards,<br>Smart Interview Platform Team</p>
  `,
});

const getFeedbackSubmittedTemplate = (candidateName, interviewerName, roundType) => ({
  subject: 'Interview Feedback Available',
  html: `
    <h2>Hello ${candidateName},</h2>
    <p>Your interview feedback has been submitted by ${interviewerName}.</p>
    <p><strong>Round:</strong> ${roundType}</p>
    <p>You can view your feedback in your dashboard.</p>
    <br>
    <p>Best regards,<br>Smart Interview Platform Team</p>
  `,
});

module.exports = {
  getInterviewBookedTemplate,
  getInterviewReminderTemplate,
  getFeedbackSubmittedTemplate,
};