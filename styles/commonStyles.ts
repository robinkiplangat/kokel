
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2C3E50',         // Navy Grey (Primary)
  accent: '#39FF14',          // Neon Green (Accent)
  background: '#FFFFFF',      // White (Background)
  text: '#34495E',            // Dark Text
  disabled: '#BDC3C7',        // Disabled
  card: '#F8F9FA',            // Light card background
  border: '#E9ECEF',          // Light border
  success: '#39FF14',         // Success (same as accent)
  error: '#E74C3C',           // Error red
  warning: '#F39C12',         // Warning orange
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accent: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Montserrat_700Bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Montserrat_700Bold',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    fontFamily: 'Montserrat_700Bold',
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  textCenter: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter_400Regular',
  },
  caption: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'Inter_400Regular',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTextAccent: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  buttonTextOutline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: 'Inter_600SemiBold',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  marginBottom: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    marginVertical: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
});
