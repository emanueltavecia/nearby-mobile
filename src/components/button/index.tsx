import { colors } from '@/styles/colors'
import {
  ActivityIndicator,
  Text,
  TextProps,
  TouchableOpacity,
} from 'react-native'
import { styles } from './styles'
import { ButtonProps, IconProps } from './types'

function Button({ style, isLoading = false, children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isLoading && { opacity: 0.8 }, style]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title(props: TextProps) {
  return <Text style={styles.title} {...props} />
}

function Icon({ icon: Icon }: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Title = Title
Button.Icon = Icon

export { Button }
