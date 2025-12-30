# Accounting Level Up - Accounting Proficiency Test

A professional accounting proficiency assessment platform with AI-powered admin dashboard for candidate management and lead tracking.

## Features

- **Accounting Test**: 20 comprehensive questions covering accounting fundamentals, VAT, chart of accounts, and financial analysis
- **Instant Results**: Immediate assessment with candidate scoring and level classification (Beginner, Intermediate, Advanced)
- **Lead Capture**: Secure lead collection with email confirmation and WhatsApp integration
- **Admin Dashboard**: Full candidate management, filtering, status tracking, and analytics
- **Secure Authentication**: Admin-only access with row-level security (RLS)
- **Professional Styling**: French-localized UI with Tailwind CSS and shadcn components

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn-ui components
- **Backend**: Supabase (PostgreSQL + Auth + RLS)
- **Forms**: React Hook Form + Zod validation
- **State**: TanStack Query (React Query)
- **Routing**: React Router v6

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd accounting-level-up

# Install dependencies
npm install

# Create .env with your Supabase credentials
echo 'VITE_SUPABASE_URL="your_url"' > .env
echo 'VITE_SUPABASE_PUBLISHABLE_KEY="your_key"' >> .env
```

### Development

```sh
npm run dev
```

Open http://localhost:8080 in your browser.

### Production Build

```sh
npm run build
npm run preview
```

## Project Structure

```
src/
├── pages/           # Route pages (Index, Admin, CandidateDetail)
├── components/      # Reusable components
│   ├── ui/         # shadcn UI components
│   ├── admin/      # Admin-specific components
│   ├── landing/    # Landing page components
│   └── test/       # Test flow components
├── hooks/          # Custom React hooks (useAuth, useAdmin, useTest)
├── integrations/   # External service integrations (Supabase)
├── types/          # TypeScript type definitions
└── lib/            # Utility functions
```

## Admin Dashboard

Access the admin dashboard at `/admin`:
- Email: `khalid@gmail.com` (or your admin email)
- Password: Set during admin account creation

### Features
- View all test results and candidate information
- Filter by level, status, and date
- Update candidate status (New, Contacted, Enrolled, Rejected)
- Add admin notes for follow-up
- View KPIs and conversion analytics
- Export candidate data

## Database Schema

### Tables
- `questions` - Test questions with options
- `candidates` - Test results and lead information
- `user_roles` - Admin role assignment

### Security
- Row Level Security (RLS) enabled on all tables
- Public read access to questions
- Public insert for candidates (anonymous test submissions)
- Admin-only read/update for candidate data
- Secure role checking via `has_role()` function

## Deployment

### Vercel (Recommended)

```sh
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Custom Server

```sh
npm run build
# Deploy the 'dist' folder to your server
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add your feature'`
3. Push branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

Proprietary - Accounting Level Up

## Support

For issues or questions, contact the development team.
