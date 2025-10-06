
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { CategoryInfo } from '@/data/riasecData';

interface CategoryCardProps {
  category: CategoryInfo;
  score?: number;
  maxScore?: number;
  rank?: number;
  onPress?: () => void;
  expanded?: boolean;
}

export default function CategoryCard({ 
  category, 
  score, 
  maxScore, 
  rank, 
  onPress, 
  expanded = false 
}: CategoryCardProps) {
  const scorePercentage = maxScore ? (score || 0) / maxScore * 100 : 0;
  
  return (
    <TouchableOpacity
      style={[styles.container, rank && rank <= 3 && styles.topThreeCard]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
          <IconSymbol name={category.icon as any} size={24} color="white" />
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.categoryName}>{category.name}</Text>
          <Text style={styles.categorySubtitle}>{category.shortName}</Text>
        </View>
        
        {rank && (
          <View style={[styles.rankBadge, rank <= 3 && styles.topRankBadge]}>
            <Text style={[styles.rankText, rank <= 3 && styles.topRankText]}>
              #{rank}
            </Text>
          </View>
        )}
        
        {score !== undefined && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{score}</Text>
            {maxScore && (
              <Text style={styles.maxScoreText}>/{maxScore}</Text>
            )}
          </View>
        )}
      </View>
      
      {score !== undefined && maxScore && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill,
                { 
                  width: `${Math.min(scorePercentage, 100)}%`,
                  backgroundColor: category.color 
                }
              ]} 
            />
          </View>
        </View>
      )}
      
      {expanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.description}>{category.description}</Text>
          
          <View style={styles.traitsContainer}>
            <Text style={styles.traitsTitle}>Key Traits:</Text>
            {category.traits.map((trait, index) => (
              <Text key={index} style={styles.traitItem}>
                • {trait}
              </Text>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  topThreeCard: {
    borderColor: colors.accent,
    borderWidth: 2,
    boxShadow: '0px 4px 12px rgba(57, 255, 20, 0.2)',
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Montserrat_700Bold',
  },
  categorySubtitle: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.7,
    fontFamily: 'Inter_400Regular',
  },
  rankBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  topRankBadge: {
    backgroundColor: colors.accent,
  },
  rankText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'Inter_600SemiBold',
  },
  topRankText: {
    color: colors.primary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily: 'Montserrat_700Bold',
  },
  maxScoreText: {
    fontSize: 14,
    color: colors.text,
    opacity: 0.6,
    fontFamily: 'Inter_400Regular',
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  description: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  traitsContainer: {
    marginTop: 8,
  },
  traitsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    fontFamily: 'Inter_600SemiBold',
  },
  traitItem: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
    marginBottom: 4,
    paddingLeft: 8,
    fontFamily: 'Inter_400Regular',
  },
});
