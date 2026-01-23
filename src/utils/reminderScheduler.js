const cron = require('node-cron');
const prisma = require('../prismaClient');
const { sendEmail } = require('./emailService');
const { getInterviewReminderTemplate } = require('./emailTemplates');

const startReminderScheduler = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      const now = new Date();
      const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000);

      // Find interviews starting in the next 30 minutes
      const upcomingInterviews = await prisma.interview.findMany({
        where: {
          status: 'SCHEDULED',
          slot: {
            startTime: {
              gte: now,
              lte: thirtyMinutesFromNow,
            },
          },
        },
        include: {
          candidate: true,
          interviewer: true,
          slot: true,
        },
      });

      for (const interview of upcomingInterviews) {
        // Send to candidate
        const candidateTemplate = getInterviewReminderTemplate(
          interview.candidate.name,
          interview.interviewer.name,
          interview.slot.startTime,
          interview.roundType
        );
        await sendEmail(interview.candidate.email, candidateTemplate.subject, candidateTemplate.html);

        // Send to interviewer
        const interviewerTemplate = getInterviewReminderTemplate(
          interview.interviewer.name,
          interview.interviewer.name, // Self reminder
          interview.slot.startTime,
          interview.roundType
        );
        await sendEmail(interview.interviewer.email, interviewerTemplate.subject, interviewerTemplate.html);
      }
    } catch (error) {
      console.error('Reminder scheduler error:', error);
    }
  });

  console.log('Reminder scheduler started');
};

module.exports = { startReminderScheduler };