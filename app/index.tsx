
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay 
} from 'react-native-reanimated';

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    logoScale.value = withSequence(
      withTiming(1.2, { duration: 600 }),
      withTiming(1, { duration: 200 })
    );
    logoOpacity.value = withTiming(1, { duration: 600 });
    
    // Animate text
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));

    // Navigate to home after animation
    const timer = setTimeout(() => {
      router.replace('/(tabs)/(home)');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logoIcon}>
          <IconSymbol name="lightbulb" size={64} color={colors.accent} />
        </View>
      </Animated.View>
      
      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.logoText}>ForteFinder</Text>
        <Text style={styles.tagline}>Discover Your Strengths</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 24px rgba(57, 255, 20, 0.3)',
    elevation: 8,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.accent,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  tagline: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.8,
    fontFamily: 'Inter_400Regular',
  },
});
