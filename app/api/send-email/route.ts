import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { to, message, attachment, filename } = await request.json();

    // Validation
    if (!to || !attachment) {
      return NextResponse.json({ success: false, error: 'Email et pièce jointe requis' }, { status: 400 });
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, ''), // Remove spaces
      },
      tls: { rejectUnauthorized: false },
    });

    // Parse data URI if present: data:<mime>;base64,<data>
    let mime = 'application/octet-stream';
    let base64Data = '';

    if (typeof attachment === 'string') {
      const match = attachment.match(/^data:(.+);base64,(.*)$/s);
      if (match) {
        mime = match[1];
        base64Data = match[2];
      } else {
        // Maybe raw base64 without prefix - assume PDF or PNG depending on filename
        base64Data = attachment;
        if (filename && filename.toLowerCase().endsWith('.pdf')) mime = 'application/pdf';
        else if (filename && filename.toLowerCase().endsWith('.png')) mime = 'image/png';
        else mime = 'application/pdf';
      }
    } else {
      return NextResponse.json({ success: false, error: 'Attachment doit être une chaîne base64 ou data URI' }, { status: 400 });
    }

    const buffer = Buffer.from(base64Data, 'base64');

    const attachName = filename || (`report_${Date.now()}` + (mime === 'application/pdf' ? '.pdf' : mime === 'image/png' ? '.png' : '.bin'));

    // Send email
    await transporter.sendMail({
      from: `"Tokyo 2020 Olympics Dashboard" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Tokyo 2020 Olympics Dashboard Report',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: linear-gradient(135deg, #0085C7 0%, #1E3A8A 100%); padding: 30px; text-align: center; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { padding: 30px; background: #f5f5f5; }
              .card { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🏅 Tokyo 2020 Olympics Dashboard</h1>
            </div>
            <div class="content">
              <div class="card">
                <h2>Dashboard Report</h2>
                <p>${message || 'Please find attached the Power BI dashboard snapshot.'}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
              </div>
              <div class="card">
                <h3>Dashboard Features</h3>
                <ul>
                  <li>📊 Interactive Power BI reports</li>
                  <li>🤖 ML-powered medal predictions</li>
                  <li>📧 Email report sharing</li>
                  <li>📄 PDF export functionality</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p>Tokyo 2020 Olympics Dashboard | Created by Amine Manai</p>
              <p>Powered by Power BI, Next.js & TensorFlow.js</p>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: attachName,
          content: buffer,
          contentType: mime,
        },
      ],
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to send email' }, { status: 500 });
  }
}
