/**
 * Modern design system color tokens
 */
export const Colors = {
  // Brand colors
  primary: '#4C3BFF',      // Royal Indigo
  primaryGlow: 'rgba(76, 59, 255, 0.15)',
  
  // Backgrounds
  background: '#F3F7FA',   // Light blue-gray background
  surface: '#FFFFFF',      // Pure White card surface
  surfaceHover: '#F4F7FF',
  
  // Interactive elements
  accent: '#4C3BFF',       
  accentGlow: 'rgba(76, 59, 255, 0.1)',
  
  // Progress bar custom styling (kept for backwards compatibility/fallback)
  progressTrack: 'rgba(0, 0, 0, 0.05)',
  progressFill: '#4C3BFF',
  progressGlow: '#4C3BFF',
  
  // Text / Typography
  text: '#1A1C1E',         // Dark charcoal
  textMuted: '#76777A',    // Mid gray
  textDim: '#A5A6A9',
  
  // Statuses
  success: '#00E676',
  warning: '#F59E0B',
  error: '#EF4444',
  
  // Overlays
  overlay: 'rgba(243, 247, 250, 0.95)',

  // Gradients matching the design (very soft whitish-blue, clean and bright)
  bgGradient: ['#EBF2F7', '#FFFFFF'] as const,
};

export default Colors;

export const OnboardingColors = {
  background: '#F3F7FA',
  textDark: '#1A1C1E',
  textGray: '#76777A',
  
  // Badges
  badgeBlueBg: '#E0F1FC',
  badgeBlueText: '#006590',
  
  badgePurpleBg: '#E9E7FC',
  badgePurpleText: '#4C3BFF',
  
  badgePinkBg: '#FCE7F3',
  badgePinkText: '#C026D3',
  
  // Highlight
  aiHighlightBg: '#C3D0FF',
  aiHighlightText: '#2B4396',
  
  // Dot pins
  dotPurple: '#9381FF',
  dotPink: '#FF8FAB',
  dotBlue: '#548CFF',
  
  // Buttons
  skipBg: '#F4F8FA',
  skipBorder: 'rgba(0, 0, 0, 0.05)',
  nextBg: '#111111',
  nextCircleBg: '#2E2E2E',
};
