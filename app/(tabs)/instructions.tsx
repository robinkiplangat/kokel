
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';

export default function InstructionsScreen() {
  const handleStartAssessment = () => {
    router.push('/(tabs)/assessment');
  };

  const instructions = [
    {
      icon: 'list.bullet',
      title: 'Read Each Statement',
      description: 'You will see 72 statements about different activities and interests. Read each one carefully.',
    },
    {
      icon: 'star.fill',
      title: 'Rate Yourself',
      description: 'For each statement, rate how well it describes you on a scale from 1 to 4.',
    },
    {
      icon: 'clock',
      title: 'Take Your Time',
      description: 'There are no right or wrong answers. Be honest and take as much time as you need.',
    },
    {
      icon: 'checkmark.circle',
      title: 'Complete All Questions',
      description: 'Try to answer all questions for the most accurate results, but you can skip if needed.',
    },
  ];

  const ratingScale = [
    { value: 1, label: 'Not at all', description: 'This does not describe me' },
    { value: 2, label: 'A little', description: 'This describes me somewhat' },
    { value: 3, label: 'Somewhat', description: 'This describes me well' },
    { value: 4, label: 'Very much', description: 'This describes me very well' },
  ];

  return (
    <SafeAreaView style={commonStyles.container}>
      <Stack.Screen
        options={{
          title: 'Instructions',
          headerShown: true,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontFamily: 'Montserrat_700Bold' },
        }}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerIcon}>
              <IconSymbol name="info.circle" size={48} color={colors.accent} />
            </View>
            <Text style={commonStyles.title}>How to Take the Assessment</Text>
            <Text style={commonStyles.textCenter}>
              Follow these simple steps to get accurate results
            </Text>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <Text style={commonStyles.subtitle}>Instructions</Text>
            {instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionIcon}>
                  <IconSymbol name={instruction.icon as any} size={24} color={colors.accent} />
                </View>
                <View style={styles.instructionContent}>
                  <Text style={styles.instructionTitle}>{instruction.title}</Text>
                  <Text style={styles.instructionDescription}>{instruction.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Rating Scale */}
          <View style={styles.ratingContainer}>
            <Text style={commonStyles.subtitle}>Rating Scale</Text>
            <Text style={styles.ratingDescription}>
              For each statement, choose the number that best describes you:
            </Text>
            
            {ratingScale.map((rating) => (
              <View key={rating.value} style={styles.ratingItem}>
                <View style={styles.ratingNumber}>
                  <Text style={styles.ratingNumberText}>{rating.value}</Text>
                </View>
                <View style={styles.ratingContent}>
                  <Text style={styles.ratingLabel}>{rating.label}</Text>
                  <Text style={styles.ratingItemDescription}>{rating.description}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Example */}
          <View style={styles.exampleContainer}>
            <Text style={commonStyles.subtitle}>Example</Text>
            <View style={styles.exampleCard}>
              <Text style={styles.exampleStatement}>
                "Work effectively with hands"
              </Text>
              <Text style={styles.exampleInstruction}>
                If you enjoy working with your hands and are good at it, you might rate this as a 4 (Very much). 
                If you don't enjoy or aren't good at hands-on work, you might rate it as a 1 (Not at all).
              </Text>
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={commonStyles.subtitle}>Tips for Best Results</Text>
            <View style={styles.tipsList}>
              <View style={styles.tipItem}>
                <IconSymbol name="lightbulb" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Be honest about your interests and abilities</Text>
              </View>
              <View style={styles.tipItem}>
                <IconSymbol name="heart" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Think about what you naturally enjoy doing</Text>
              </View>
              <View style={styles.tipItem}>
                <IconSymbol name="brain" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Consider your strengths, not just your experience</Text>
              </View>
              <View style={styles.tipItem}>
                <IconSymbol name="clock" size={16} color={colors.accent} />
                <Text style={styles.tipText}>Don't overthink - go with your first instinct</Text>
              </View>
            </View>
          </View>

          {/* Start Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartAssessment}
          >
            <Text style={styles.startButtonText}>Start Assessment</Text>
            <IconSymbol name="arrow.right" size={20} color={colors.primary} />
          </TouchableOpacity>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headerIcon: {
    marginBottom: 16,
  },
  instructionsContainer: {
    marginBottom: 32,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  instructionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  instructionContent: {
    flex: 1,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  instructionDescription: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  ratingContainer: {
    marginBottom: 32,
  },
  ratingDescription: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  ratingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ratingNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    fontFamily: 'Inter_700Bold',
  },
  ratingContent: {
    flex: 1,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
    fontFamily: 'Inter_600SemiBold',
  },
  ratingItemDescription: {
    fontSize: 13,
    color: colors.text,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  exampleContainer: {
    marginBottom: 32,
  },
  exampleCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
  },
  exampleStatement: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  exampleInstruction: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.8,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  tipsContainer: {
    marginBottom: 40,
  },
  tipsList: {
    marginTop: 8,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  tipText: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    fontFamily: 'Inter_400Regular',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    marginBottom: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginRight: 12,
    fontFamily: 'Montserrat_700Bold',
  },
});
