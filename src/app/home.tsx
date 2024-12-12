import { api } from '@/api'
import { Categories } from '@/components/categories'
import { Category } from '@/components/categories/types'
import { Place } from '@/components/place/types'
import { Places } from '@/components/places'
import { colors, fontFamily } from '@/styles/theme'
import * as Location from 'expo-location'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null)

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

  async function getCurrentLocation() {
    try {
      let { granted } = await Location.requestForegroundPermissionsAsync()
      if (granted) {
        const location = await Location.getCurrentPositionAsync({})
        setLocation(location)
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Localização', 'Não foi possível obter sua localização.')
    }
  }

  useEffect(() => {
    getCurrentLocation()
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
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require('@/assets/location.png')}
        />

        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require('@/assets/pin.png')}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {market.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {market.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  )
}
