import { FlatList, View } from 'react-native'
import { Category } from '../category'
import { styles } from './styles'
import { CategoriesProps } from './types'

export function Categories({
  data,
  selectedCategory,
  onSelectCategory,
}: CategoriesProps) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Category
            name={item.name}
            iconId={item.id}
            onPress={() => onSelectCategory(item.id)}
            isSelected={selectedCategory === item.id}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.container}
      />
    </View>
  )
}
