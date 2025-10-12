# SMM Website - UHQ

A modern, responsive Social Media Marketing (SMM) dashboard built with Next.js, TypeScript, and Tailwind CSS using the Atomic Design pattern.

## Features

- 🎨 **Modern Dark Theme** with gradient accents
- 📱 **Fully Responsive** design for all devices
- ⚛️ **Atomic Design Pattern** for maintainable components
- 🎯 **TypeScript** for type safety
- 🎨 **Tailwind CSS** for styling
- 📊 **Interactive Dashboard** with metrics and charts
- 🚀 **Next.js 15** with App Router

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Design Pattern**: Atomic Design
- **Icons**: Custom SVG icons

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Atomic Design Components
│   ├── atoms/            # Basic building blocks
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Icon.tsx
│   │   ├── Input.tsx
│   │   └── Typography.tsx
│   ├── molecules/        # Simple component groups
│   │   ├── ChartCard.tsx
│   │   ├── HeaderActions.tsx
│   │   ├── MetricCard.tsx
│   │   └── NavItem.tsx
│   └── organisms/        # Complex UI components
│       ├── ChartsSection.tsx
│       ├── Header.tsx
│       ├── MetricsGrid.tsx
│       ├── MobileNav.tsx
│       └── Sidebar.tsx
└── styles/
    └── globals.css       # Global styles and Tailwind
```

## Getting Started

1. **Install dependencies**:

   ```bash
   bun install
   ```

2. **Run the development server**:

   ```bash
   bun run dev
   ```

3. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run check` - Check for type error
- `bun run lint` - Run ESLint

## Design System

### Colors

- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Purple**: Purple gradient (#a855f7 to #581c87)
- **Pink**: Pink gradient (#ec4899 to #831843)
- **Dark**: Dark theme colors (#0f172a to #f8fafc)

### Components

#### Atoms

- **Button**: Multiple variants (primary, secondary, outline, ghost, gradient)
- **Card**: Different styles (default, gradient, glass)
- **Icon**: Custom SVG icon system
- **Input**: Form input with validation states
- **Typography**: Consistent text styling

#### Molecules

- **MetricCard**: Display key metrics with trends
- **ChartCard**: Container for charts and data visualization
- **NavItem**: Navigation menu items
- **HeaderActions**: Header action buttons

#### Organisms

- **Sidebar**: Main navigation sidebar
- **Header**: Top header with actions
- **MobileNav**: Mobile-responsive navigation
- **MetricsGrid**: Grid of metric cards
- **ChartsSection**: Charts and data visualization section

## Responsive Design

The dashboard is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Customization

### Adding New Icons

Add new icons to the `Icon` component in `src/components/atoms/Icon.tsx`:

```typescript
const iconMap: { [key: string]: React.ReactNode } = {
  // ... existing icons
  newIcon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {/* SVG content */}
    </svg>
  ),
}
```

### Adding New Colors

Extend the color palette in `tailwind.config.js`:

```javascript
colors: {
  // ... existing colors
  newColor: {
    50: '#...',
    // ... other shades
  }
}
```

## License

MIT License - feel free to use this project for your own purposes.
