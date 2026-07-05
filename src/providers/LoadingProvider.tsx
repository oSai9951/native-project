import React, { createContext, useContext, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import Loader from "@/components/Loader";

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  message: string;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingProviderProps {
  children: React.ReactNode;
  initialLoading?: boolean;
}

export function LoadingProvider({ children, initialLoading = true }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isRendered, setIsRendered] = useState(initialLoading);
  const [progress, setProgressState] = useState(0);
  const [message, setMessage] = useState("Initializing system...");

  const opacity = useSharedValue(initialLoading ? 1 : 0);

  const showLoader = (initialMessage = "Loading...") => {
    setMessage(initialMessage);
    setProgressState(0);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  const setProgress = (value: number) => {
    setProgressState(value);
  };

  // Synchronize Reanimated animation opacity with the active loading state
  useEffect(() => {
    if (isLoading) {
      setIsRendered(true);
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 500 }, (finished) => {
        if (finished) {
          runOnJS(setIsRendered)(false);
        }
      });
    }
  }, [isLoading]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        progress,
        message,
        showLoader,
        hideLoader,
        setProgress,
      }}
    >
      <View style={styles.container}>
        {children}

        {isRendered && (
          <Animated.View style={[styles.loaderOverlay, animatedStyle]}>
            <Loader progress={progress} message={message} />
          </Animated.View>
        )}
      </View>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFill as object,
    zIndex: 9999, // Force rendering on top of Expo Router Stack native views
    elevation: 9999, // For Android overlay priority
  },
});
