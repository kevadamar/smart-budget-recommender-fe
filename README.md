# Smart Budget Recommendation

AI-powered budget recommendation application that helps users track spending, save smarter, and achieve their financial goals.

## Tech Stack

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe development
- **React 18** - UI framework
- **shadcn/ui** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling with Zod validation
- **Recharts** - Data visualization

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smart-budget-recommendation-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development/staging
npm run build:dev

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

### Project Structure

```
src/
├── components/
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── pages/           # Route pages
├── App.tsx          # Main app component with routing
├── main.tsx         # Entry point
└── index.css        # Global styles
```

### Adding New Routes

Add routes in `src/App.tsx` before the catch-all `*` route:

```tsx
<Route path="/new-page" element={<NewPage />} />
```

### Path Aliases

Use these import aliases:
- `@/` → `src/`
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks`

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including:
- GitHub Actions CI/CD setup
- Private server deployment
- Web server configuration (Nginx/Apache)
- Environment variables
- Troubleshooting

## Features

- 📊 Budget tracking and forecasting
- 💬 AI-powered chat for financial advice
- 📈 Interactive data visualizations
- 👤 User profile management
- 🌙 Dark mode support
- 📱 Responsive design

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
