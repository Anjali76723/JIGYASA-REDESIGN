const { transporter } = require('../config/nodemailer');

/**
 * Sends a detailed inquiry notification email to the administrator (RECEIVER_EMAIL).
 */
const sendInquiryEmail = async (data) => {
  const { name, email, phone, service, message, sourcePage } = data;
  const submissionTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Fallback for sender if EMAIL_USER is not fully set
  const senderAddress = process.env.EMAIL_USER || 'no-reply@jigyasatechnologies.com';

  const mailOptions = {
    from: `"Jigyasa Website Inquiries" <${senderAddress}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Website Inquiry',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Website Inquiry</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
            margin: 0 auto;
            border: 1px solid #e2e8f0;
          }
          .banner {
            background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);
            padding: 32px 24px;
            text-align: center;
          }
          .banner h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.5px;
          }
          .content {
            padding: 32px 24px;
          }
          .section-title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #64748b;
            font-weight: 700;
            margin-bottom: 6px;
            margin-top: 0;
          }
          .value {
            font-size: 15px;
            color: #0f172a;
            margin-bottom: 24px;
            font-weight: 500;
          }
          .row {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 12px;
          }
          .col {
            flex: 1;
            min-width: 250px;
          }
          .message-card {
            background-color: #f8fafc;
            border-left: 4px solid #6366f1;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-line;
            margin-top: 8px;
            font-family: inherit;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px 24px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
          .footer a {
            color: #6366f1;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="banner">
            <h1>New Website Inquiry</h1>
          </div>
          <div class="content">
            <div class="row">
              <div class="col">
                <div class="section-title">Client Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="col">
                <div class="section-title">Email Address</div>
                <div class="value">
                  <a href="mailto:${email}" style="color: #6366f1; text-decoration: none; font-weight: 600;">${email}</a>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="section-title">Phone Number</div>
                <div class="value">${phone || 'Not Provided'}</div>
              </div>
              <div class="col">
                <div class="section-title">Interested Service</div>
                <div class="value" style="color: #0891b2; font-weight: 700;">${service}</div>
              </div>
            </div>

            <div>
              <div class="section-title">Metadata Details</div>
              <div class="value" style="font-size: 13px; color: #64748b; line-height: 1.5;">
                <strong>Submitted At:</strong> ${submissionTime}<br>
                <strong>Source URL Page:</strong> ${sourcePage || '<em>Not available</em>'}
              </div>
            </div>

            <div style="border-top: 1px solid #f1f5f9; margin-top: 24px; padding-top: 24px;">
              <div class="section-title">Message Summary</div>
              <div class="message-card">${message}</div>
            </div>
          </div>
          <div class="footer">
            Sent automatically via SMTP.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

/**
 * Sends a confirmation email to the user acknowledging receipt of their inquiry.
 */
const sendAutoReplyEmail = async (name, toEmail) => {
  const senderAddress = process.env.EMAIL_USER || 'no-reply@jigyasatechnologies.com';

  const mailOptions = {
    from: `"Jigyasa Technologies" <${senderAddress}>`,
    to: toEmail,
    subject: "We've received your inquiry",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Inquiry Received</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #334155;
            margin: 0;
            padding: 20px;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            max-width: 600px;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
            margin: 0 auto;
            border: 1px solid #e2e8f0;
          }
          .banner {
            background: linear-gradient(135deg, #6366f1 0%, #22d3ee 100%);
            padding: 32px 24px;
            text-align: center;
          }
          .banner h1 {
            color: #ffffff;
            margin: 0;
            font-size: 22px;
            font-weight: 800;
          }
          .content {
            padding: 32px 24px;
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
          }
          .signature {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f1f5f9;
            color: #64748b;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px 24px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="banner">
            <h1>We've Received Your Inquiry</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for contacting <strong>Jigyasa Technologies</strong>.</p>
            <p>We have successfully received your inquiry. Our team will review your request details and get back to you as soon as possible.</p>
            <p>Regards,</p>
            <div class="signature">
              <strong>Jigyasa Technologies</strong>
            </div>
          </div>
          <div class="footer">
            This is an automated confirmation of receipt.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendInquiryEmail,
  sendAutoReplyEmail,
};
