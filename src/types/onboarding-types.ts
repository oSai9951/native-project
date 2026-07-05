export interface OnboardingStep {
  id: number;
  bubbleText1: string; // Text for the top-right speech bubble
  bubbleText2: string; // Text for the middle-left speech bubble
}

export interface OnboardingProps {
  onComplete?: () => void;
  onSkip?: () => void;
}
