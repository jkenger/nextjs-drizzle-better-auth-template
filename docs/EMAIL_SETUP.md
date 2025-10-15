# Email Setup Guide

Password reset and email verification require email configuration. This guide covers the most common email providers.

## Option 1: Resend (Recommended)

[Resend](https://resend.com) is the easiest to set up and has a generous free tier.

### Setup Steps

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add to your `.env`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

4. Install the Resend package and React Email (required by Resend):

```bash
npm install resend @react-email/render @react-email/components
```

5. Update `lib/auth.ts` to use Resend:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  // ... existing config
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev", // For testing - use your verified domain in production
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        `,
      });
    },
  },
});
```

**Important Notes:**
- **For testing/development:** Use `from: "onboarding@resend.dev"` - works immediately without verification
- **For production:** Verify your domain at [resend.com/domains](https://resend.com/domains) and use `from: "noreply@yourdomain.com"`

### Email Verification Setup

To enable email verification on signup, update `lib/auth.ts`:

```typescript
emailVerification: {
  sendOnSignUp: true, // Enable verification emails
  autoSignInAfterVerification: true,
  sendVerificationEmail: async ({ user, url }) => {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: user.email,
      subject: "Verify your email address",
      html: `
        <h2>Welcome!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${url}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
      `,
    });
  },
},
```

The template includes:
- `/verify-email` - Verification page with token handling
- `/resend-verification` - Request new verification email

## Option 2: Gmail SMTP

Use Gmail's SMTP server (requires App Password if 2FA is enabled).

### Setup Steps

1. Enable 2FA on your Google account
2. Generate an App Password:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Under "2-Step Verification", click "App passwords"
   - Generate a new app password

3. Add to your `.env`:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=your-email@gmail.com
```

4. Install Nodemailer:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

5. Update `lib/auth.ts`:

```typescript
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const auth = betterAuth({
  // ... existing config
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset Your Password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${url}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
        `,
      });
    },
  },
});
```

## Option 3: Other SMTP Providers

Most email providers support SMTP:

### SendGrid

```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_FROM=noreply@yourdomain.com
```

### Mailgun

```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASSWORD=your-mailgun-smtp-password
SMTP_FROM=noreply@yourdomain.com
```

### AWS SES

```bash
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=your-ses-smtp-username
SMTP_PASSWORD=your-ses-smtp-password
SMTP_FROM=verified-email@yourdomain.com
```

## Development/Testing

For local development, you can use [Ethereal Email](https://ethereal.email/) to test emails without actually sending them:

```typescript
// For development only
const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// After sending, get preview URL
const info = await transporter.sendMail({ ... });
console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
```

## Email Templates

For production, consider using proper email templates:

1. **React Email** - Build emails with React components
   ```bash
   npm install react-email @react-email/components
   ```

2. **MJML** - Responsive email markup language
   ```bash
   npm install mjml
   ```

## Troubleshooting

### "Invalid credentials"
- Check your API key or SMTP password
- For Gmail, ensure you're using an App Password, not your regular password

### Emails not sending
- Check spam folder
- Verify email provider credentials
- Check firewall/port restrictions (especially port 587)

### "Domain not verified"
- Most providers require domain verification for production
- Follow your provider's domain verification steps

## Production Checklist

- [ ] Use environment variables for credentials
- [ ] Verify your sending domain
- [ ] Set up SPF and DKIM records
- [ ] Test password reset flow
- [ ] Monitor email delivery rates
- [ ] Set up bounce/complaint handling
- [ ] Add unsubscribe links (for marketing emails)
