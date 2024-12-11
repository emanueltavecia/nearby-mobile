import { colors, fontFamily } from '@/styles/theme'
import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: 56,
    maxHeight: 56,
    backgroundColor: colors.green.base,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 14,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        boxShadow:
          '0px 46px 13px 0px rgba(23, 84, 46, 0.00), 0px 29px 12px 0px rgba(23, 84, 46, 0.02), 0px 17px 10px 0px rgba(23, 84, 46, 0.08), 0px 7px 7px 0px rgba(23, 84, 46, 0.13), 0px 2px 4px 0px rgba(23, 84, 46, 0.15)',
      },
    }),
  },
  title: {
    color: colors.gray[100],
    fontFamily: fontFamily.semiBold,
    fontSize: 16,
  },
})
