
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { riasecStatements, categoryInfo } from '@/data/riasecData';
import RatingScale from '@/components/RatingScale';
import ProgressIndicator from '@/components/ProgressIndicator';
import * as Haptics from 'expo-haptics';

export default function AssessmentScreen() {
  const {
    state,
    updateResponse,
    nextStatement,
    previousStatement,
    getProgress,
    completeAssessment,
  } = useAssessment();

  const currentStatement = riasecStatements[state.currentStatementIndex];
  const currentCategory = categoryInfo[currentStatement.category];
  const currentRating = state.responses[currentStatement.id];
  const progress = getProgress();
  const isLastStatement = state.currentStatementIndex === riasecStatements.length - 1;

  const handleRatingChange = (rating: number) => {
    updateResponse(currentStatement.id, rating);
  };

  const handleNext = () => {
    if (!currentRating) {
      Alert.alert('Please Rate', 'Please select a rating before continuing.');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isLastStatement) {
      completeAssessment();
      router.push('/(tabs)/reflection');
    } else {
      nextStatement();
    }
  };

  const handlePrevious = () => {
    if (state.currentStatementIndex > 0) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      previousStatement();
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Assessment',
      'Are you sure you want to skip to the results? You can always come back to complete more questions.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => {
            completeAssessment();
            router.push('/(tabs)/reflection');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'RIASEC Assessment',
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
          {/* Progress Indicator */}
          <ProgressIndicator
            current={state.currentStatementIndex + 1}
            total={riasecStatements.length}
            percentage={progress}
          />

          {/* Category Header */}
          <View style={[styles.categoryHeader, { backgroundColor: currentCategory.color }]}>
            <IconSymbol name={currentCategory.icon as any} size={32} color="white" />
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{currentCategory.name}</Text>
              <Text style={styles.categorySubtitle}>{currentCategory.shortName}</Text>
            </View>
          </View>

          {/* Statement Card */}
          <View style={styles.statementCard}>
            <Text style={styles.statementNumber}>
              Statement {state.currentStatementIndex + 1} of {riasecStatements.length}
            </Text>
            <Text style={styles.statementText}>{currentStatement.text}</Text>

            {/* Rating Scale */}
            <RatingScale
              value={currentRating}
              onValueChange={handleRatingChange}
            />
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              style={[
                styles.navButton,
                styles.previousButton,
                state.currentStatementIndex === 0 && styles.navButtonDisabled,
              ]}
              onPress={handlePrevious}
              disabled={state.currentStatementIndex === 0}
            >
              <IconSymbol name="chevron.left" size={20} color={colors.text} />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                styles.nextButton,
                !currentRating && styles.navButtonDisabled,
              ]}
              onPress={handleNext}
              disabled={!currentRating}
            >
              <Text style={styles.navButtonText}>
                {isLastStatement ? 'Complete' : 'Next'}
              </Text>
              <IconSymbol 
                name={isLastStatement ? "checkmark" : "chevron.right"} 
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginVertical: 16,
  },
  categoryInfo: {
    marginLeft: 12,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Montserrat_700Bold',
  },
  categorySubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Inter_400Regular',
  },
  statementCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statementNumber: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.6,
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  statementText: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
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
});
