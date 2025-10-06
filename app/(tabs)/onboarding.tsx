
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { categoryInfo } from '@/data/riasecData';

const onboardingSteps = [
  {
    title: 'Welcome to ForteFinder',
    subtitle: 'Discover Your Strengths',
    description: 'Take the RIASEC assessment to identify your top 3 skill categories and explore career paths that match your natural abilities.',
    icon: 'lightbulb',
    color: colors.accent,
  },
  {
    title: 'About RIASEC',
    subtitle: 'Six Career Categories',
    description: 'RIASEC identifies six personality types that relate to career interests: Realistic, Investigative, Artistic, Social, Enterprising, and Conventional.',
    icon: 'person.3',
    color: colors.primary,
  },
  {
    title: 'How It Works',
    subtitle: 'Simple 4-Point Scale',
    description: 'Rate 72 statements on how well they describe you using a scale from 1 (Not at all) to 4 (Very much). The assessment takes about 10-15 minutes.',
    icon: 'star.fill',
    color: '#F39C12',
  },
  {
    title: 'Your Results',
    subtitle: 'Personalized Insights',
    description: 'Get your top 3 skill categories with detailed descriptions, reflection questions, and the ability to export your results as a PDF.',
    icon: 'chart.bar.fill',
    color: '#E74C3C',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      router.push('/(tabs)/instructions');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    router.push('/(tabs)/instructions');
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Welcome',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
          headerRight: () => (
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Progress Dots */}
          <View style={styles.progressContainer}>
            {onboardingSteps.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index === currentStep && styles.progressDotActive,
                  index < currentStep && styles.progressDotCompleted,
                ]}
              />
            ))}
          </View>

          {/* Main Content */}
          <View style={styles.stepContainer}>
            <View style={[styles.iconContainer, { backgroundColor: currentStepData.color }]}>
              <IconSymbol name={currentStepData.icon as any} size={48} color="white" />
            </View>

            <Text style={commonStyles.title}>{currentStepData.title}</Text>
            <Text style={[commonStyles.subtitle, { color: currentStepData.color }]}>
              {currentStepData.subtitle}
            </Text>
            <Text style={commonStyles.textCenter}>{currentStepData.description}</Text>

            {/* RIASEC Categories Preview (Step 2) */}
            {currentStep === 1 && (
              <View style={styles.categoriesPreview}>
                {Object.values(categoryInfo).map((category) => (
                  <View key={category.name} style={styles.categoryPreviewItem}>
                    <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                      <IconSymbol name={category.icon as any} size={20} color="white" />
                    </View>
                    <View style={styles.categoryPreviewText}>
                      <Text style={styles.categoryPreviewName}>{category.name}</Text>
                      <Text style={styles.categoryPreviewSubtitle}>{category.shortName}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Rating Scale Preview (Step 3) */}
            {currentStep === 2 && (
              <View style={styles.ratingPreview}>
                <Text style={styles.ratingPreviewTitle}>Rating Scale:</Text>
                <View style={styles.ratingScale}>
                  {[
                    { value: 1, label: 'Not at all' },
                    { value: 2, label: 'A little' },
                    { value: 3, label: 'Somewhat' },
                    { value: 4, label: 'Very much' },
                  ].map((item) => (
                    <View key={item.value} style={styles.ratingItem}>
                      <View style={styles.ratingNumber}>
                        <Text style={styles.ratingNumberText}>{item.value}</Text>
                      </View>
                      <Text style={styles.ratingLabel}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.previousButton,
                currentStep === 0 && styles.navButtonDisabled,
              ]}
              onPress={handlePrevious}
              disabled={currentStep === 0}
            >
              <IconSymbol name="chevron.left" size={20} color={colors.text} />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={[styles.navButtonText, styles.nextButtonText]}>
                {isLastStep ? 'Get Started' : 'Next'}
              </Text>
              <IconSymbol
                name={isLastStep ? 'arrow.right' : 'chevron.right'}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipButtonText: {
    color: colors.accent,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    marginHorizontal: 6,
  },
  progressDotActive: {
    backgroundColor: colors.accent,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  progressDotCompleted: {
    backgroundColor: colors.accent,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoriesPreview: {
    marginTop: 24,
    width: '100%',
  },
  categoryPreviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryPreviewText: {
    flex: 1,
  },
  categoryPreviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
  },
  categoryPreviewSubtitle: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  ratingPreview: {
    marginTop: 24,
    width: '100%',
  },
  ratingPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  ratingScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  ratingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  ratingLabel: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  previousButton: {
    borderColor: colors.border,
  },
  nextButton: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  navButtonDisabled: {
    borderColor: colors.disabled,
    backgroundColor: colors.disabled,
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginHorizontal: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  nextButtonText: {
    color: colors.primary,
  },
});
