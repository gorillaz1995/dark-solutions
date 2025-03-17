import PortfolioGrid from "./Portpick";

/**
 * Portfolio component wrapper
 * This component imports and exports the PortfolioGrid component from Portpick.tsx
 * Allows using the component without 'use client' directive in parent components
 */
export default function Portfolio() {
  return <PortfolioGrid />;
}
