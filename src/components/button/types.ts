import { IconProps as TablerIconProps } from '@tabler/icons-react-native'
import { TouchableOpacityProps } from 'react-native'

export interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean
}

export interface IconProps {
  icon: React.ComponentType<TablerIconProps>
}
