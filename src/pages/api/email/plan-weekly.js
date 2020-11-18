/** @format */

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const config = {
  api: {
    bodyParser: true
  }
};

export default async (req, res) => {
  const { email, plan } = req.body;

  try {
    await sgMail.send({
      from: process.env.SENDGRID_EMAIL,
      to: email,
      templateId: process.env.SENDGRID_PLAN_WEEKLY_TEMPLATE_ID,
      dynamicTemplateData: {
        plan
      }
    });

    res.statusCode = 200;
    res.json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.statusCode = 400;
    res.json({ message: 'failed' });

    if (error.response) {
      console.error(error.response.body);
    }
  }
};
