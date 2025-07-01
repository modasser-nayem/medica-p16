const emailWrapper = (content: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f7f7f7;">
    <div style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="background-color: #003366; padding: 20px; color: white; text-align: center;">
        <img src="https://res.cloudinary.com/ddogx3fld/image/upload/f_auto,q_auto/v1748947688/booktel/booktel_logo.png" alt="Hotel Logo" style="height: 50px;" />
        <h2 style="margin: 10px 0;">Booktel</h2>
      </div>
      <div style="padding: 20px;">
        ${content}
      </div>
      <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} Booktel. All rights reserved.
      </div>
    </div>
  </div>
`;

const accountCreationEmail = (userName: string) =>
  emailWrapper(`
  <h3>Hello ${userName},</h3>
  <p>Welcome to our medica.com! Your account has been successfully created.</p>
  <p>Now you can easily use application.</p>
  <p>Thank You!</p>
`);

const forgotPasswordEmail = (
  userName: string,
  resetLink: string,
  resetWithin: string,
) =>
  emailWrapper(`
  <h3>Hi ${userName},</h3>
  <p>We received a request to reset your password. Click the button below to proceed:</p>
  <p>Reset your password within ${resetWithin} mins!</p>
  <br>
  <p>
    <a href="${resetLink}" style="background-color: #003366; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
  </p>
  <br>
  <p>If you didn’t request this, you can safely ignore this email.</p>
`);

export const mailTemplate = {
  accountCreationEmail,
  forgotPasswordEmail,
};
