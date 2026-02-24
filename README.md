# Designer's Hub

A modern, responsive design learning platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Course Catalog** - Browse and enroll in design courses
- 👤 **User Authentication** - Login/signup with JWT tokens
- 🔒 **Password Recovery** - Forgot password with email reset
- 📧 **Contact System** - Contact form with email notifications
- 📱 **Responsive Design** - Mobile-first approach
- 🎯 **User Dashboard** - Track enrolled courses and progress

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email**: Nodemailer with SMTP
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/designers-hub.git
cd designers-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# JWT Secret (change this in production)
JWT_SECRET="your-super-secret-jwt-key"

# Email Configuration (Gmail example)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
ADMIN_EMAIL="admin@designershub.com"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### Gmail SMTP Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use your Gmail address as `SMTP_USER` and the App Password as `SMTP_PASS`

### Running the Application

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/forgot-password` - Request password reset

### Contact
- `POST /api/contact` - Send contact form message

## Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # Authentication endpoints
│   └── contact/           # Contact form endpoint
├── pages/                 # Static pages
│   ├── about/            # About page
│   └── contact/          # Contact page
├── src/
│   ├── components/       # Reusable components
│   ├── constants/        # App constants
│   └── contexts/         # React contexts
├── dashboard/            # User dashboard
├── courses/              # Course catalog
├── register/             # Registration page
├── forgot-password/      # Password reset page
└── layout.tsx           # Root layout
```

## Features Overview

### Authentication System
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes and user sessions
- Profile management with avatar

### Email System
- Password reset emails
- Contact form notifications
- Admin notifications for new messages
- HTML email templates

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Accessible components
- Cross-browser compatibility

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email contact@designershub.com or create an issue in the repository.