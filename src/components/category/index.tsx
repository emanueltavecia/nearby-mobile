import { colors } from '@/styles/theme'
import { categoriesIcons } from '@/utils/categories-icons'
import { Pressable, Text } from 'react-native'
import { styles } from './styles'
import { CategoryProps } from './types'

export function Category({
  name,
  iconId,
  isSelected = false,
  ...props
}: CategoryProps) {
  const Icon = categoriesIcons[iconId]
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...props}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  )
}
