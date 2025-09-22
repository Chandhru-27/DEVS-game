# DEVS Gaming Leaderboard

A real-time leaderboard application built with Next.js 14, TypeScript, and Tailwind CSS 4.

## Features

- **Real-time Updates**: Simulated WebSocket-like updates every 3-5 seconds
- **Animated Background**: Moving particles and twinkling stars with CSS animations
- **Glassmorphism Design**: Frosted glass effect with backdrop blur
- **Responsive Design**: Mobile-first approach with responsive grid layout
- **TypeScript**: Full type safety with custom interfaces
- **Trophy System**: Visual indicators for top 3 players (🥇🥈🥉)

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Custom CSS animations** for background effects

## Project Structure

```
src/
├── app/
│   ├── leaderboard/
│   │   └── page.tsx          # Leaderboard page
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   └── Leaderboard.tsx       # Main leaderboard component
├── services/
│   └── leaderboardService.ts # Realtime data simulation
├── styles/
│   └── globals.css           # Global styles and animations
└── types/
    └── leaderboard.ts        # TypeScript interfaces
```

## Custom Tailwind Colors

- `midnight`: #0b0c1a (dark navy)
- `moonwhite`: #e6e8f0 (light text)
- `cloudgray`: #a0a0b0 (secondary text)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Navigate to `/leaderboard` to see the real-time leaderboard

## Features in Detail

### Animated Background

- CSS pseudo-elements create moving particle effects
- Twinkling stars with opacity animations
- Gradient background from midnight to dark navy

### Real-time Simulation

- Mock service simulates WebSocket updates
- Players' scores increase randomly every 3-5 seconds
- Automatic re-ranking based on scores
- Smooth transitions and animations

### Responsive Design

- Mobile-first approach
- Responsive grid layout
- Touch-friendly interactions
- Optimized for all screen sizes

### Glassmorphism Effects

- Backdrop blur for frosted glass effect
- Semi-transparent backgrounds
- Subtle borders and shadows
- Hover effects with scale transforms

## Customization

The leaderboard can be easily customized by:

1. **Modifying mock data** in `src/services/leaderboardService.ts`
2. **Updating colors** in `tailwind.config.ts`
3. **Changing animations** in `src/styles/globals.css`
4. **Adding new features** to the `Leaderboard` component

## Performance

- Optimized CSS animations using `transform` and `opacity`
- Efficient React state management
- Minimal re-renders with proper dependency arrays
- Background animations use CSS pseudo-elements for better performance
