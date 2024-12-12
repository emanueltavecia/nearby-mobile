import { api } from '@/api'
import { Categories } from '@/components/categories'
import { Category } from '@/components/categories/types'
import { Place } from '@/components/place/types'
import { Places } from '@/components/places'
import { useEffect, useState } from 'react'
import { Alert, View } from 'react-native'
import MapView from 'react-native-maps'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const [markets, setMarkets] = useState<Place[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get<Category[]>('/categories')
      setCategories(data)
      setSelectedCategory(data[0].id)
    } catch (error) {
      console.error(error)
      Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
    }
  }

  async function fetchMarkets() {
    try {
      if (!selectedCategory) return

      const { data } = await api.get<Place[]>(
        `/markets/category/${selectedCategory}`
      )
      setMarkets(data)
    } catch (error) {
      console.error(error)
      Alert.alert('Locais', 'Não foi possível carregar os locais.')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [selectedCategory])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />

      <Places data={markets} />
    </View>
  )
}
