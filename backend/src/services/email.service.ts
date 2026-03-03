// backend/src/services/email.service.ts

import * as nodemailer from 'nodemailer';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        this.transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
          port: parseInt(process.env.EMAIL_PORT || '2525'),
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
        console.log('✅ Email service initialized with SMTP');
      } catch (error) {
        console.error('⚠️ Failed to initialize email service:', error);
        this.transporter = null;
      }
    } else {
      console.log('⚠️ Email credentials not found - using console logging mode');
    }
  }

  async sendPasswordResetEmail(to: string, resetToken: string): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`;

    // No transporter configured — log to console as fallback
    if (!this.transporter) {
      console.log('\n' + '='.repeat(80));
      console.log('📧 PASSWORD RESET EMAIL (No SMTP configured)');
      console.log('='.repeat(80));
      console.log('To:', to);
      console.log('Reset URL:', resetUrl);
      console.log('Reset Token:', resetToken);
      console.log('='.repeat(80) + '\n');
      return;
    }

    const mailOptions = {
      from: `"InkScratch" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Password Reset Request - InkScratch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #0A0A0F 0%, #1a0a0a 100%);
              padding: 30px;
              border-radius: 10px;
            }
            .content {
              background: #111118;
              padding: 30px;
              border-radius: 8px;
              border: 1px solid rgba(255,107,53,0.2);
            }
            .logo {
              font-size: 24px;
              font-weight: 900;
              letter-spacing: 2px;
              background: linear-gradient(135deg, #FF6B35, #E63946);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 24px;
            }
            .button {
              display: inline-block;
              padding: 14px 32px;
              background: linear-gradient(135deg, #FF6B35, #E63946);
              color: white !important;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .footer {
              margin-top: 20px;
              color: rgba(255,255,255,0.3);
              text-align: center;
              font-size: 12px;
              font-family: monospace;
            }
            p { color: rgba(255,255,255,0.7); }
            h2 { color: #FF6B35; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="logo">INKSCRATCH</div>
              <h2>Password Reset Request</h2>
              <p>Hello,</p>
              <p>You requested to reset your password for your InkScratch account.</p>
              <p>Click the button below to reset your password:</p>
              <a href="${resetUrl}" class="button">RESET PASSWORD</a>
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #FF6B35; font-family: monospace; font-size: 12px;">${resetUrl}</p>
              <p><strong style="color: #E63946;">This link will expire in 1 hour.</strong></p>
              <p>If you didn't request this, please ignore this email.</p>
              <p>Best regards,<br>The InkScratch Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} INKSCRATCH — All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Password Reset Request — InkScratch

        You requested to reset your password.
        Click this link to reset your password: ${resetUrl}

        This link will expire in 1 hour.
        If you didn't request this, please ignore this email.

        The InkScratch Team
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset email sent to:', to);
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw new Error('Failed to send password reset email');
    }
  }

  async sendPasswordResetConfirmation(to: string): Promise<void> {
    if (!this.transporter) {
      console.log('\n' + '='.repeat(80));
      console.log('📧 PASSWORD RESET CONFIRMATION (No SMTP configured)');
      console.log('='.repeat(80));
      console.log('To:', to);
      console.log('Message: Password reset successful');
      console.log('='.repeat(80) + '\n');
      return;
    }

    const mailOptions = {
      from: `"InkScratch" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Password Reset Successful - InkScratch',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              background: linear-gradient(135deg, #0A0A0F 0%, #1a0a0a 100%);
              padding: 30px;
              border-radius: 10px;
            }
            .content {
              background: #111118;
              padding: 30px;
              border-radius: 8px;
              border: 1px solid rgba(34,197,94,0.2);
            }
            .logo {
              font-size: 24px;
              font-weight: 900;
              letter-spacing: 2px;
              background: linear-gradient(135deg, #FF6B35, #E63946);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 24px;
            }
            .footer {
              margin-top: 20px;
              color: rgba(255,255,255,0.3);
              text-align: center;
              font-size: 12px;
              font-family: monospace;
            }
            p { color: rgba(255,255,255,0.7); }
            h2 { color: #4ADE80; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <div class="logo">INKSCRATCH</div>
              <h2>Password Reset Successful ✓</h2>
              <p>Hello,</p>
              <p>Your password has been successfully reset.</p>
              <p>You can now log in with your new password.</p>
              <p>If you didn't make this change, please contact our support team immediately.</p>
              <p>Best regards,<br>The InkScratch Team</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} INKSCRATCH — All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Password reset confirmation sent to:', to);
    } catch (error) {
      console.error('❌ Error sending confirmation email:', error);
      // Don't throw — password was already reset successfully
    }
  }
}