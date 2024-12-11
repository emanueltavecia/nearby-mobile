import { TouchableOpacityProps } from 'react-native'

export interface Place {
  id: string
  name: string
  description: string
  coupons: number
  cover: string
  address: string
}

export interface PlaceProps extends TouchableOpacityProps {
  data: Place
}
