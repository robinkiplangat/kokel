import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, TouchableOpacity, StyleSheet, View, Text, SafeAreaView, Image } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { colors, commonStyles } from "@/styles/commonStyles";
import { useAssessment } from "@/contexts/AssessmentContext";
import { categoryInfo } from "@/data/riasecData";

export default function HomeScreen() {
  const { state, getProgress } = useAssessment();
  const progress = getProgress();
  const hasStarted = Object.keys(state.responses).length > 0;

  const handleStartAssessment = () => {
    if (hasStarted) {
      router.push('/(tabs)/assessment');
    } else {
      router.push('/(tabs)/onboarding');
    }
  };

  const handleViewResults = () => {
    router.push('/(tabs)/results');
  };

  const features = [
    {
      icon: 'list.bullet.clipboard',
      title: '72-Question Assessment',
      description: 'Comprehensive evaluation across all six RIASEC categories',
      color: '#3498DB',
    },
    {
      icon: 'chart.bar.fill',
      title: 'Instant Results',
      description: 'Get your top 3 skill categories with detailed insights',
      color: '#E74C3C',
    },
    {
      icon: 'doc.text',
      title: 'Export & Share',
      description: 'Save your results as PDF or share with others',
      color: '#F39C12',
    },
    {
      icon: 'lightbulb',
      title: 'Career Guidance',
      description: 'Discover career paths that match your strengths',
      color: '#27AE60',
    },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'ForteFinder',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.logoContainer}>
              <View style={styles.logoIcon}>
                <IconSymbol name="lightbulb" size={48} color={colors.accent} />
              </View>
              <Text style={styles.logoText}>ForteFinder</Text>
            </View>
            
            <Text style={commonStyles.title}>Discover Your Strengths</Text>
            <Text style={commonStyles.textCenter}>
              Take the RIASEC assessment to identify your top 3 skill categories and explore career paths that match your natural abilities.
            </Text>

            {/* Progress Card (if started) */}
            {hasStarted && (
              <View style={styles.progressCard}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Assessment Progress</Text>
                  <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[styles.progressBar, { width: `${Math.min(progress, 100)}%` }]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {Object.keys(state.responses).length} of 72 questions completed
                </Text>
              </View>
            )}

            {/* Main Action Button */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleStartAssessment}
            >
              <Text style={styles.primaryButtonText}>
                {hasStarted ? 'Continue Assessment' : 'Start Assessment'}
              </Text>
              <IconSymbol 
                name={hasStarted ? "arrow.right" : "play.fill"} 
                size={20} 
                color={colors.primary} 
              />
            </TouchableOpacity>

            {/* Results Button (if completed) */}
            {state.isComplete && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleViewResults}
              >
                <IconSymbol name="chart.bar.fill" size={20} color={colors.accent} />
                <Text style={styles.secondaryButtonText}>View Results</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* RIASEC Categories Preview */}
          <View style={styles.categoriesSection}>
            <Text style={commonStyles.subtitle}>Six Career Categories</Text>
            <Text style={styles.sectionDescription}>
              The RIASEC model identifies six personality types that relate to career interests
            </Text>
            
            <View style={styles.categoriesGrid}>
              {Object.values(categoryInfo).map((category) => (
                <View key={category.name} style={styles.categoryPreviewCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <IconSymbol name={category.icon as any} size={24} color="white" />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categorySubtitle}>{category.shortName}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={commonStyles.subtitle}>Why Choose ForteFinder?</Text>
            
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <IconSymbol name={feature.icon as any} size={24} color="white" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Call to Action */}
          <View style={styles.ctaSection}>
            <Text style={styles.ctaTitle}>Ready to Discover Your Strengths?</Text>
            <Text style={styles.ctaDescription}>
              Join thousands of users who have discovered their career path with ForteFinder
            </Text>
            
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={handleStartAssessment}
            >
              <Text style={styles.ctaButtonText}>
                {hasStarted ? 'Continue Your Journey' : 'Start Your Journey'}
              </Text>
              <IconSymbol name="arrow.right" size={20} color={colors.primary} />
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
    padding: 20,
    paddingBottom: 100, // Extra padding for floating tab bar
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'Montserrat_700Bold',
  },
  progressCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.accent,
    fontFamily: 'Montserrat_700Bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 20,
    width: '100%',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'Montserrat_700Bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginTop: 12,
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.accent,
    marginLeft: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  categoriesSection: {
    marginBottom: 40,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
    fontFamily: 'Inter_400Regular',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryPreviewCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  categorySubtitle: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  featuresSection: {
    marginBottom: 40,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  ctaSection: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  ctaDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter_400Regular',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'Montserrat_700Bold',
  },
});
