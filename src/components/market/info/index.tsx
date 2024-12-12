import { colors } from '@/styles/theme'
import { Text, View } from 'react-native'
import { styles } from './styles'
import { InfoProps } from './types'

export function Info({ icon: Icon, description }: InfoProps) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  )
}
