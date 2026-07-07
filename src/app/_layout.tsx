import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { LoadingProvider, useLoading } from "@/providers/LoadingProvider";
import '../global.css';

// Prevent the splash screen from auto-hiding before our custom loader is mounted.
SplashScreen.preventAutoHideAsync().catch(() => {
  /* Ignore errors from double prevention */
});

function AppContent() {
  const { showLoader, hideLoader, setProgress } = useLoading();

  useEffect(() => {
    // Start custom loader
    showLoader("Please wait...");

    // Hide native splash screen once loader is mounted
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // Safe fallback if splash screen isn't active or in web
        console.warn("Could not hide native splash screen:", e);
      }
    }, 150);

    // Simulate progress
    const steps = [
      { progress: 0.15, msg: "Please wait..." },
      { progress: 0.45, msg: "Please wait..." },
      { progress: 0.7, msg: "Please wait..." },
      { progress: 0.9, msg: "Please wait..." },
      { progress: 1.0, msg: "Please wait..." },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setProgress(step.progress);
        showLoader(step.msg);
        currentStep++;
      } else {
        clearInterval(interval);
        hideLoader();
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}
