import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    maxHeight: 36,
    position: 'absolute',
    zIndex: 1,
    ...Platform.select({
      android: {
        top: 16,
      },
      ios: {
        top: 64,
      },
    }),
  },
  content: {
    gap: 8,
    paddingHorizontal: 24,
  },
})
