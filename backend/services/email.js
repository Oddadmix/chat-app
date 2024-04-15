const { Resend } = require('resend');

function sendOtp(email, otp) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please verify your email',
    html: `<p>Please use this one time password: ${otp}</p>`,
  });
}

function sendInvite(email, chatId) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'You have been invited',
    html: `<p>You have an invitation for this chat: <a href="${process.env.PUBLIC_URL}/?chatId=${chatId}">Chat Link</a></p>`,
  });
}

module.exports = {
  sendOtp,
  sendInvite,
};
