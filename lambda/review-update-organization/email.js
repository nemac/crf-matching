import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const localEndpoint = process.env.AWS_ENDPOINT_URL
  ? { endpoint: process.env.AWS_ENDPOINT_URL }
  : {};

const sesClient = new SESClient({ region: 'us-east-1', ...localEndpoint });

export function buildReviewLink(reviewToken) {
  return `${process.env.FRONTEND_URL}/review-update?token=${reviewToken}`;
}

export async function sendReviewNotificationEmail({
  orgName,
  contactEmail,
  changedFieldCount,
  reviewLink,
}) {
  const params = {
    Source: process.env.SES_SENDER_EMAIL,
    Destination: {
      ToAddresses: [process.env.REVIEW_NOTIFICATION_EMAIL],
    },
    Message: {
      Subject: {
        Data: `Organization update ready for review: ${orgName}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #003366; color: white; padding: 20px; text-align: center; }
                .content { padding: 30px 20px; background-color: #f9f9f9; }
                .button {
                  display: inline-block;
                  padding: 12px 30px;
                  background-color: #0066CC;
                  color: white !important;
                  text-decoration: none;
                  border-radius: 4px;
                  margin: 20px 0;
                }
                .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Climate Resilience Funders</h1>
                </div>
                <div class="content">
                  <h2>Organization Update Ready for Review</h2>
                  <p><strong>Organization:</strong> ${orgName}</p>
                  <p><strong>Contact email:</strong> ${contactEmail}</p>
                  <p><strong>Fields changed:</strong> ${changedFieldCount}</p>
                  <p style="text-align: center;">
                    <a href="${reviewLink}" class="button">Review Update</a>
                  </p>
                  <p>Or copy and paste this link into your browser:</p>
                  <p style="word-break: break-all; background: white; padding: 10px; border: 1px solid #ddd;">
                    ${reviewLink}
                  </p>
                </div>
                <div class="footer">
                  <p>Climate Resilience Funders - Adaptation Registry</p>
                </div>
              </div>
            </body>
            </html>
          `,
          Charset: 'UTF-8',
        },
        Text: {
          Data: `
Organization Update Ready for Review

Organization: ${orgName}
Contact email: ${contactEmail}
Fields changed: ${changedFieldCount}

Review the update here:
${reviewLink}

---
Climate Resilience Funders - Adaptation Registry
          `,
          Charset: 'UTF-8',
        },
      },
    },
  };

  await sesClient.send(new SendEmailCommand(params));
}
