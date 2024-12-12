import { colors } from '@/styles/theme'
import { IconTicket } from '@tabler/icons-react-native'
import { router } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { PlaceProps } from './types'

export function Place({ data, ...props }: PlaceProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.navigate(`/market/${data.id}`)}
      {...props}
    >
      <Image style={styles.image} source={{ uri: data.cover }} />
      <View style={styles.content}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {data.description}
        </Text>

        <View style={styles.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={styles.tickets}>{data.coupons} cupons disponíveis</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
