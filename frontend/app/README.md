# Battery Management System - Merged Frontend

This is a merged React application that combines the dashboard and insights functionality from the original separate applications.

## Features

### Dashboard Features
- **Customer Dashboard**: Real-time battery monitoring and management interface
- **Battery Health Monitoring**: Track battery performance, health metrics, and status
- **Performance Analytics**: View detailed performance data and trends
- **User Management**: Customer profile and account management

### Insights Features
- **Battery Insights**: Advanced analytics and insights about battery performance
- **Query Section**: Interactive data querying and analysis tools
- **Features Showcase**: Display of battery technology features and capabilities
- **Enterprise Solutions**: Information about enterprise-grade battery solutions

## Application Structure

```
src/
├── components/
│   ├── ui/                    # Shared UI components (shadcn/ui)
│   ├── Navigation.tsx         # Insights navigation component
│   ├── Hero.tsx              # Insights hero section
│   ├── QuerySection.tsx      # Insights query interface
│   ├── Features.tsx          # Insights features showcase
│   ├── Enterprise.tsx        # Enterprise solutions component
│   └── Footer.tsx            # Insights footer component
├── pages/
│   ├── Index.tsx             # Landing page with navigation to both apps
│   ├── CustomerDashboard.tsx # Main dashboard interface
│   ├── Insights.tsx          # Insights application page
│   └── NotFound.tsx          # 404 error page
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── App.tsx                   # Main application with routing
```

## Routes

- `/` - Landing page with navigation options
- `/dashboard` - Customer dashboard interface
- `/insights` - Battery insights and analytics
- `/*` - 404 Not Found page

## Technology Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **React Router DOM** for routing
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Recharts** for data visualization
- **React Query** for data fetching
- **Lucide React** for icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Design System

The application uses a premium design system with:
- Dark theme optimized for battery monitoring
- Electric blue primary colors
- Glass morphism effects
- Smooth animations and transitions
- Responsive design for all screen sizes

## Merged Components

The following components were merged from the insights application:
- `Navigation.tsx` - Navigation bar for insights
- `Hero.tsx` - Hero section with battery insights
- `QuerySection.tsx` - Data querying interface
- `Features.tsx` - Features showcase
- `Enterprise.tsx` - Enterprise solutions
- `Footer.tsx` - Footer component
- `chart.tsx` - Enhanced chart component for data visualization

## Dependencies

All dependencies from both original applications have been merged, with the latest versions being used where there were conflicts (e.g., Recharts v3.1.0).
