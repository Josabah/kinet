import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false });
    }

    try {
        const { name, email, company, projectType, message, website } = req.body;

        // Honeypot anti-spam
        if (website) {
            return res.status(400).json({ success: false });
        }

        // Server-side validation
        if (!name || !email || !projectType || !message) {
            return res.status(400).json({ success: false });
        }

        const from = process.env.CONTACT_EMAIL_FROM ?? 'contact@kinetsolutions.dev';
        const to = process.env.CONTACT_EMAIL_TO;
        if (!to) {
            console.error('CONTACT_EMAIL_TO is not set');
            return res.status(500).json({ success: false });
        }

        await resend.emails.send({
            from,
            to,
            replyTo: email,
            subject: `New Inquiry - ${projectType}`,
            html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false });
    }
}