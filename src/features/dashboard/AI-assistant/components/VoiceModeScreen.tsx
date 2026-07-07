import React, { useEffect, useRef } from "react";
import { Modal, View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

interface VoiceModeScreenProps {
  visible: boolean;
  onClose: () => void;
}

function PulseDot({ delay }: { delay: number }) {
  const anim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 750, delay, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0.3, duration: 750, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, delay]);

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#000000",
        opacity: anim,
        transform: [{ scale: anim.interpolate({ inputRange: [0.3, 1], outputRange: [0.8, 1.2] }) }],
      }}
    />
  );
}

export default function VoiceModeScreen({ visible, onClose }: VoiceModeScreenProps) {
  const insets = useSafeAreaInsets();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) return;

    const rotateLoop = Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })
    );
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    );
    rotateLoop.start();
    pulseLoop.start();

    return () => {
      rotateLoop.stop();
      pulseLoop.stop();
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
    };
  }, [visible, rotateAnim, pulseAnim]);

  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 bg-surface-container-lowest">
        <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
          {/* Header */}
          <View className="flex-row items-center justify-between px-gutter py-4">
            <TouchableOpacity onPress={onClose} className="flex-row items-center gap-2">
              <Text className="text-[20px] text-primary">⬅️</Text>
              <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
                AI Tutor
              </Text>
            </TouchableOpacity>
            <View className="w-10 h-10 rounded-full items-center justify-center bg-surface-container border border-outline-variant">
              <Text className="text-[16px]">👩‍🏫</Text>
            </View>
          </View>

          {/* Orb Section */}
          <View className="flex-1 items-center justify-center">
            <View className="items-center justify-center">
              {/* Soft halo layers approximating the glow */}
              <Animated.View
                style={{
                  position: "absolute",
                  width: 288,
                  height: 288,
                  borderRadius: 144,
                  backgroundColor: "#3B82F6",
                  opacity: 0.12,
                  transform: [{ scale: pulseAnim }],
                }}
              />
              <Animated.View
                style={{
                  position: "absolute",
                  width: 220,
                  height: 220,
                  borderRadius: 110,
                  backgroundColor: "#60A5FA",
                  opacity: 0.18,
                  transform: [{ scale: pulseAnim }],
                }}
              />

              {/* Main Frosted Glass Orb */}
              <View
                style={{
                  width: 192,
                  height: 192,
                  borderRadius: 96,
                  overflow: "hidden",
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.5)",
                }}
              >
                <Animated.View
                  style={{
                    width: 280,
                    height: 280,
                    marginLeft: -44,
                    marginTop: -44,
                    transform: [{ rotate: spin }],
                  }}
                >
                  <LinearGradient
                    colors={["#3B82F6", "#60A5FA", "#93C5FD", "#3B82F6"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{ width: "100%", height: "100%" }}
                  />
                </Animated.View>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255,255,255,0.2)",
                  }}
                />
                <LinearGradient
                  colors={["rgba(255,255,255,0.35)", "rgba(255,255,255,0)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
                />
              </View>
            </View>

            {/* Labels & Pulse Dots */}
            <View className="mt-12 items-center" style={{ gap: 16 }}>
              <View className="flex-row" style={{ gap: 8 }}>
                <PulseDot delay={0} />
                <PulseDot delay={200} />
                <PulseDot delay={400} />
              </View>
              <View className="items-center" style={{ gap: 4 }}>
                <Text className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Aria is speaking</Text>
                <Text className="font-body-md text-on-surface-variant">Analyzing your request...</Text>
              </View>
            </View>
          </View>

          {/* Stop Voice Mode */}
          <View className="items-center px-container-padding mb-8">
            <TouchableOpacity
              onPress={onClose}
              className="px-8 py-3 rounded-full border-2 border-primary bg-surface-container-lowest"
              activeOpacity={0.8}
            >
              <Text className="font-label-lg text-label-lg text-primary">Stop voice mode</Text>
            </TouchableOpacity>
          </View>

          {/* Composer Bar */}
          <View className="px-4" style={{ paddingBottom: 24 + insets.bottom }}>
            <View className="flex-row items-center bg-[#171717] rounded-full p-2 pl-6" style={{ gap: 12 }}>
              <TouchableOpacity onPress={onClose} className="flex-1">
                <Text className="font-body-md text-white/50">Tap to type or say "Stop"</Text>
              </TouchableOpacity>
              <View className="flex-row" style={{ gap: 4 }}>
                <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full items-center justify-center">
                  <Text className="text-[18px] text-white">🎙️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} className="w-10 h-10 rounded-full bg-white items-center justify-center">
                  <Text className="text-[16px]">➤</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
