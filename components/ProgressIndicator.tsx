
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, commonStyles } from '@/styles/commonStyles';

interface ProgressIndicatorProps {
  current: number;
  total: number;
  percentage?: number;
}

export default function ProgressIndicator({ current, total, percentage }: ProgressIndicatorProps) {
  const progress = percentage !== undefined ? percentage : (current / total) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          {current} of {total}
        </Text>
        <Text style={styles.percentageText}>
          {Math.round(progress)}%
        </Text>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar,
            { width: `${Math.min(progress, 100)}%` }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'Inter_400Regular',
  },
  percentageText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
});
