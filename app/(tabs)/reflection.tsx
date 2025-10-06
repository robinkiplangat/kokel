
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { useAssessment } from '@/contexts/AssessmentContext';
import { reflectionQuestions } from '@/data/riasecData';

export default function ReflectionScreen() {
  const {
    reflectionResponses,
    updateReflectionResponse,
    getTopThreeCategories,
  } = useAssessment();

  const [currentAnswers, setCurrentAnswers] = useState<Record<number, string>>(() => {
    const answers: Record<number, string> = {};
    reflectionResponses.forEach(response => {
      answers[response.questionIndex] = response.answer;
    });
    return answers;
  });

  const topThree = getTopThreeCategories();

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionIndex]: answer,
    }));
  };

  const handleSaveAndContinue = () => {
    // Save all current answers
    Object.entries(currentAnswers).forEach(([indexStr, answer]) => {
      const questionIndex = parseInt(indexStr);
      if (answer.trim()) {
        updateReflectionResponse(questionIndex, answer.trim());
      }
    });

    router.push('/(tabs)/results');
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Reflection',
      'Are you sure you want to skip the reflection questions? They help you better understand your results.',
      [
        { text: 'Go Back', style: 'cancel' },
        {
          text: 'Skip',
          style: 'destructive',
          onPress: () => router.push('/(tabs)/results'),
        },
      ]
    );
  };

  const answeredQuestions = Object.values(currentAnswers).filter(answer => answer?.trim()).length;
  const allAnswered = answeredQuestions === reflectionQuestions.length;

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Reflection',
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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <IconSymbol name="brain.head.profile" size={48} color={colors.accent} />
            </View>
            <Text style={commonStyles.title}>Reflect on Your Results</Text>
            <Text style={commonStyles.textCenter}>
              Take a moment to think about your top 3 categories: {topThree.join(', ')}
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {answeredQuestions} of {reflectionQuestions.length} questions answered
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(answeredQuestions / reflectionQuestions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>

          {/* Questions */}
          <View style={styles.questionsContainer}>
            {reflectionQuestions.map((question, index) => (
              <View key={index} style={styles.questionCard}>
                <Text style={styles.questionNumber}>Question {index + 1}</Text>
                <Text style={styles.questionText}>{question}</Text>
                
                <TextInput
                  style={styles.answerInput}
                  placeholder="Share your thoughts..."
                  placeholderTextColor={colors.text + '80'}
                  value={currentAnswers[index] || ''}
                  onChangeText={(text) => handleAnswerChange(index, text)}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            ))}
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Reflection Tips</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <IconSymbol name="lightbulb" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Be honest about your feelings and reactions</Text>
              </View>
              <View style={styles.tipItem}>
                <IconSymbol name="heart" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Think about specific examples from your life</Text>
              </View>
              <View style={styles.tipItem}>
                <IconSymbol name="brain" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Consider how this relates to your future goals</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.continueButton,
                !allAnswered && styles.continueButtonPartial,
              ]}
              onPress={handleSaveAndContinue}
            >
              <Text style={styles.continueButtonText}>
                {allAnswered ? 'Continue to Results' : `Continue (${answeredQuestions}/${reflectionQuestions.length})`}
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter_400Regular',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  questionsContainer: {
    marginBottom: 32,
  },
  questionCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionNumber: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  questionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 16,
    lineHeight: 24,
    fontFamily: 'Inter_600SemiBold',
  },
  answerInput: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 100,
    fontFamily: 'Inter_400Regular',
  },
  tipsContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  actionButtons: {
    marginBottom: 40,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  continueButtonPartial: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'Montserrat_700Bold',
  },
});
