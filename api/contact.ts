import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'web-application': 'Web application',
  'mobile-app': 'Mobile app',
  'ai-product': 'AI product',
  'internal-tool': 'Internal tool',
  mvp: 'MVP',
  'not-sure': 'Not sure yet',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false });
  }

  try {
    const { name, email, projectType, message, existingWebsite, _hp } = req.body;

    if (_hp) {
      return res.status(400).json({ success: false });
    }

    if (!name || !email || !projectType || !message) {
      return res.status(400).json({ success: false });
    }

    const from = process.env.CONTACT_EMAIL_FROM ?? 'contact@kinetsolutions.dev';
    const to = process.env.CONTACT_EMAIL_TO ?? 'contact@kinetsolutions.dev';
    const projectLabel = PROJECT_TYPE_LABELS[projectType] ?? projectType;

    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New inquiry — ${projectLabel}`,
      html: `
        <h2>New contact submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Building:</strong> ${projectLabel}</p>
        ${existingWebsite ? `<p><strong>Existing website:</strong> ${existingWebsite}</p>` : ''}
        <p><strong>Project:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong on our end. Please try again later.',
    });
  }
}
