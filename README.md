# 🚀 Nexus Dashboard

> Enterprise-grade analytics dashboard with real-time data visualization, built with modern React best practices.

![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3-cyan)

## ✨ Features

### 🎨 Modern UI/UX
- **Glassmorphism Design** - Frosted glass effects with backdrop blur
- **Smooth Animations** - Framer Motion for fluid transitions
- **Dark Theme** - Professional dark mode with accent colors
- **Responsive Layout** - Mobile-first design approach

### 🛠️ Technical Excellence
- **TypeScript** - Full type safety with strict mode
- **Zustand** - Lightweight state management with persistence
- **Recharts** - Beautiful, responsive charts
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool

### 📦 Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd nexus-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript type check |

## 🎯 Key Implementation Details

### State Management
- Zustand store with localStorage persistence
- Type-safe actions and selectors
- Optimized re-renders

### Custom Hooks
- `useDebounce` - Debounce values for search
- `useLocalStorage` - Type-safe localStorage
- `useWindowSize` - Responsive breakpoints
- `useClickOutside` - Click outside detection
- `useIntersectionObserver` - Lazy loading

### UI Components
- **StatCard** - Animated metric cards with trends
- **Sidebar** - Collapsible navigation with user profile
- **Header** - Search, notifications, theme toggle
- **RevenueChart** - Interactive area/bar charts
- **TransactionsTable** - Sortable transaction list

## 🎨 Design System

### Colors
```css
Primary:    #0ea5e9 (Sky Blue)
Accent:     #22d3ee (Cyan)
Background: #0a0a0f (Dark)
Card:       #12121a (Dark Card)
```

### Typography
- **Inter** - Primary sans-serif
- **JetBrains Mono** - Code/monospace

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

Built with ❤️ using modern web technologies