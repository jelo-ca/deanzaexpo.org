# DAX Website

A modern React-based website for DAX, De Anza College's student-led innovation expo. This platform showcases student projects, features speakers, highlights sponsors, and provides an admin dashboard for content management.

## 🚀 Features

- **Project Showcase**: Display student innovation projects with descriptions, images, and repository links
- **Speaker Profiles**: Feature event speakers with bios, roles, and talk information
- **Sponsor Recognition**: Highlight event sponsors and partners
- **Interactive UI**: Responsive design with smooth animations and user-friendly navigation
- **Admin Dashboard**: Secure content management system for updating projects and speakers
- **Real-time Data**: Powered by Supabase for dynamic content updates

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router
- **Backend**: Supabase (Database & Authentication)
- **Styling**: CSS with custom animations
- **Icons**: React Icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database setup)

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jelo-ca/deanzaexpo.org.git
   cd dax-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   The project uses Supabase for data storage. Environment variables are configured in `public/env.js`. For development, the file contains demo credentials. For production deployment, update with your own Supabase project credentials:

   ```javascript
   window.__ENV__ = {
     SUPABASE_URL: "your-supabase-url",
     SUPABASE_ANON_KEY: "your-supabase-anon-key",
   };
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📖 Usage

### Public Access

- Visit the homepage to explore the expo information
- Browse featured projects and speakers
- View sponsor information and FAQ

### Admin Access

1. Navigate to `/admin/login`
2. Authenticate with admin credentials
3. Access the dashboard at `/admin` to:
   - Add, edit, or remove projects
   - Manage speaker information
   - Upload images to the media bucket

## 🗂️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── button/         # Button component
│   ├── card/           # Card component
│   ├── carousel/       # Carousel component
│   └── ticker/         # Ticker component
├── data/               # Static data files
├── lib/                # Utility libraries and API functions
│   ├── apiProjects.js  # Project data operations
│   ├── apiSpeakers.js  # Speaker data operations
│   ├── auth.js         # Authentication utilities
│   ├── supabaseClient.js # Supabase client configuration
│   └── upload.js       # File upload utilities
├── pages/              # Main page components
│   ├── AdminDashboard.jsx # Admin management interface
│   ├── AdminLogin.jsx     # Admin authentication
│   └── Home.jsx           # Main homepage
└── sections/           # Homepage section components
    ├── about/          # About section
    ├── faq/            # FAQ section
    ├── footer/         # Footer
    ├── header/         # Navigation header
    ├── hero/           # Hero banner
    ├── projects/       # Projects showcase
    ├── speakers/       # Speakers section
    ├── sponsors/       # Sponsors section
    └── team/           # Team section
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Setting up a development environment
- Code style and standards
- Submitting pull requests
- Reporting issues

## 📞 Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: Join community discussions on [GitHub Discussions](https://github.com/your-repo/discussions)

## 👥 Maintainers

- Anjoelo Calderon - Project Lead

## 📄 License

This project is private and proprietary. See LICENSE file for details (if applicable).

---

_Built with ❤️ for De Anza College students_
