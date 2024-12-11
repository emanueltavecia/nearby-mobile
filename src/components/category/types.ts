import { PressableProps } from 'react-native'

export interface CategoryProps extends PressableProps {
  iconId: string
  isSelected?: boolean
  name: string
}
