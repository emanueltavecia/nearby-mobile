import { colors } from '@/styles/theme'
import { ActivityIndicator, View } from 'react-native'
import { styles } from './styles'
import { StatusBar } from 'expo-status-bar'

export function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="#FFFFFF" />
      <ActivityIndicator color={colors.green.base} />
    </View>
  )
}
