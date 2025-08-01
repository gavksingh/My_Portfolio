# 📧 EmailJS Setup Guide for Portfolio Contact Form

## 🚀 Quick Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month)
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select Gmail and authorize with your Google account
   - **Outlook**: Select Outlook and authorize with your Microsoft account
   - **Custom SMTP**: Configure custom email settings

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template configuration:

```html
Subject: New Contact from {{from_name}} - Portfolio

Email Body:
Hello Gaurav,

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note the **Template ID**

### Step 4: Get Your Credentials
1. Go to **Account** → **General**
2. Copy your **Public Key**
3. Go to **Email Services** and copy your **Service ID**
4. Go to **Email Templates** and copy your **Template ID**

### Step 5: Update the Code
Replace the placeholder values in `assets/js/main.js`:

```javascript
// Replace these with your actual values:
emailjs.init('YOUR_PUBLIC_KEY_HERE');
emailjs.sendForm('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', this)
```

**Example:**
```javascript
// Your actual configuration will look like this:
emailjs.init('7GfEyqNiPqiQUG4BJ');
emailjs.sendForm('service_rrjftrf', 'template_w6fvd6a', this)
```

## 🔧 Configuration Details

### Current Implementation
- **Service**: Gmail (free tier)
- **Monthly Limit**: 100 emails
- **Form Fields**: Name, Email, Subject, Message
- **Response Time**: Instant delivery
- **Fallback**: Direct email link if service fails

### Template Variables
Make sure your EmailJS template includes these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{subject}}` - Message subject
- `{{message}}` - Message content

### Security Features
- ✅ Client-side validation
- ✅ Rate limiting (EmailJS handles this)
- ✅ Spam protection
- ✅ No backend required
- ✅ GDPR compliant

## 🎨 Form Features
- **Modern Design**: Glass-morphism styling with backdrop blur
- **Responsive**: Works on all devices
- **Animations**: Smooth transitions and loading states
- **Validation**: Real-time form validation
- **Feedback**: Clear success/error messages
- **Accessibility**: WCAG compliant

## 🐛 Troubleshooting

### Common Issues:

1. **"Failed to send message" error**
   - Check your Service ID and Template ID
   - Verify your Public Key is correct
   - Ensure your email service is active

2. **Template variables not working**
   - Make sure template variable names match form field names
   - Check template syntax: `{{variable_name}}`

3. **Emails not arriving**
   - Check spam folder
   - Verify email service configuration
   - Test with a different email address

4. **Console errors**
   - Check browser console for specific error messages
   - Verify EmailJS script is loaded properly
   - Ensure internet connection is stable

### Testing:
1. Fill out the contact form with test data
2. Check the console for any errors
3. Verify email delivery to your inbox
4. Test form validation with invalid data

## 🔄 Alternative Email Services

If you prefer a different email service:

### Option 1: Formspree
- No JavaScript required
- Simple HTML form action
- 50 submissions/month (free)

### Option 2: Netlify Forms
- Perfect if hosting on Netlify
- Built-in spam protection
- 100 submissions/month (free)

### Option 3: Custom Backend
- Full control over email handling
- Requires server setup
- Use Node.js with Nodemailer

## 📊 Monitoring

Keep track of your email usage:
- EmailJS dashboard shows email count
- Set up email notifications for quota limits
- Monitor form submissions for spam

## 🚀 Go Live Checklist

- [ ] EmailJS account created and verified
- [ ] Email service connected (Gmail/Outlook)
- [ ] Template created with correct variables
- [ ] Credentials updated in JavaScript
- [ ] Form tested with real email
- [ ] Spam folder checked
- [ ] Mobile responsiveness verified
- [ ] Error handling tested

---

**Your contact form is now ready! 🎉**

Visitors can reach you directly through your portfolio, and you'll receive their messages instantly in your inbox. 