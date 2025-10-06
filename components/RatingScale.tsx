
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';
import * as Haptics from 'expo-haptics';

interface RatingScaleProps {
  value?: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
}

const ratingLabels = [
  { value: 1, label: 'Not at all', shortLabel: '1' },
  { value: 2, label: 'A little', shortLabel: '2' },
  { value: 3, label: 'Somewhat', shortLabel: '3' },
  { value: 4, label: 'Very much', shortLabel: '4' },
];

export default function RatingScale({ value, onValueChange, disabled = false }: RatingScaleProps) {
  const handlePress = (rating: number) => {
    if (disabled) return;
    
    Haptics.selectionAsync();
    onValueChange(rating);
  };

  return (
    <View style={styles.container}>
      <Text style={[commonStyles.caption, styles.instruction]}>
        How much does this describe you?
      </Text>
      
      <View style={styles.scaleContainer}>
        {ratingLabels.map((item) => (
          <TouchableOpacity
            key={item.value}
            style={[
              styles.ratingButton,
              value === item.value && styles.ratingButtonSelected,
              disabled && styles.ratingButtonDisabled,
            ]}
            onPress={() => handlePress(item.value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.ratingNumber,
                value === item.value && styles.ratingNumberSelected,
                disabled && styles.ratingNumberDisabled,
              ]}
            >
              {item.shortLabel}
            </Text>
            <Text
              style={[
                styles.ratingLabel,
                value === item.value && styles.ratingLabelSelected,
                disabled && styles.ratingLabelDisabled,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  instruction: {
    textAlign: 'center',
    marginBottom: 16,
    color: colors.text,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  ratingButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  ratingButtonSelected: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  ratingButtonDisabled: {
    borderColor: colors.disabled,
    backgroundColor: colors.disabled,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'Inter_700Bold',
  },
  ratingNumberSelected: {
    color: colors.primary,
  },
  ratingNumberDisabled: {
    color: colors.background,
  },
  ratingLabel: {
    fontSize: 12,
    color: colors.text,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
  },
  ratingLabelSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  ratingLabelDisabled: {
    color: colors.background,
  },
});
