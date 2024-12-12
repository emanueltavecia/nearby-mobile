import { TouchableOpacityProps } from 'react-native'

export interface Place {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
  latitude: number
  longitude: number
}

export interface PlaceProps extends TouchableOpacityProps {
  data: Place
}
