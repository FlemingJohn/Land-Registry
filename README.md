# 🏡 Land Ledger Spark

A modern, decentralized land registry system built with React and TypeScript, featuring a retro terminal-inspired UI design. This application provides a transparent and secure way to manage property registrations, transfers, and blockchain-based transaction tracking.

## ✨ Features

- 🔍 **Property Search & Discovery** - Search and view registered properties with detailed information
- 📝 **Property Registration** - Register new properties on the blockchain with secure document hashing
- 🔄 **Ownership Transfer** - Transfer property ownership with blockchain verification
- 📊 **Transaction History** - View complete transaction logs and property transfer history
- 📈 **Analytics Dashboard** - Real-time statistics on properties, transactions, and total value
- 🎨 **Retro Terminal UI** - Unique cyberpunk-inspired interface with phosphor glow effects
- ⚡ **Real-time Updates** - Live blockchain status and transaction confirmations

## 🚀 Technology Stack

- ⚛️ **React 18** - Modern React with hooks and functional components
- ⚡ **Vite** - Lightning-fast build tool and development server
- 🔷 **TypeScript** - Type-safe development with excellent IDE support
- 🎨 **Tailwind CSS** - Utility-first CSS framework with custom retro styling
- ✨ **Shadcn/UI** - Beautiful, accessible component library built on Radix UI
- 🔄 **React Router** - Client-side routing for seamless navigation
- 🔄 **TanStack Query** - Powerful data fetching and state management
- 📱 **Responsive Design** - Mobile-first approach with modern UI patterns

### Key Dependencies

- **UI Components**: Radix UI primitives for accessibility and interaction
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography
- **Styling**: Class Variance Authority for component variants
- **Charts**: Recharts for data visualization
- **Notifications**: Sonner for elegant toast notifications

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GIT_URL>
   cd land-ledger-spark
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI component library
│   ├── LandRegistry.tsx # Main application component
│   ├── PropertySearch.tsx
│   ├── PropertyRegistration.tsx
│   └── TransactionHistory.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
├── App.tsx             # Main application wrapper
└── main.tsx           # Application entry point
```

## 🎨 Design Features

The application features a unique retro terminal aesthetic with:
- Phosphor green color scheme reminiscent of old CRT monitors
- Terminal-style fonts and animations
- Scanning line effects and matrix-style backgrounds
- Glowing borders and cyberpunk-inspired UI elements

## 🔧 Configuration

The project uses several configuration files:
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `components.json` - Shadcn/UI component configuration
- `vite.config.ts` - Vite build tool configuration
- `tsconfig.json` - TypeScript configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔮 Future Enhancements

- Integration with actual blockchain networks (Ethereum, Polygon, etc.)
- IPFS integration for document storage
- Advanced property mapping with GIS data
- Multi-signature wallet support
- Property valuation algorithms
- Legal document templates
