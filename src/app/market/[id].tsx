import { api } from '@/api'
import { Button } from '@/components/button'
import { Loading } from '@/components/loading'
import { Coupon } from '@/components/market/coupon'
import { Cover } from '@/components/market/cover'
import { Details } from '@/components/market/details'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { Alert, Modal, ScrollView, StatusBar, View } from 'react-native'

export interface Market {
  address: string
  categoryId: string
  coupons: number
  cover: string
  description: string
  id: string
  latitude: number
  longitude: number
  name: string
  phone: string
  rules: Rule[]
}

interface Rule {
  description: string
  id: string
  marketId: string
}

export default function Market() {
  const [market, setMarket] = useState<Market>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFetchingCoupon, setIsFetchingCoupon] = useState<boolean>(false)
  const [isVisibleCameraModal, setIsVisibleCameraModal] =
    useState<boolean>(false)

  const [_, requestCameraPermission] = useCameraPermissions()

  const params = useLocalSearchParams<{ id: string }>()

  const qrLockRef = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get<Market>(`/markets/${params.id}`)
      setMarket(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      Alert.alert('Local', 'Não foi possível carregar o local.', [
        { text: 'Ok', onPress: () => router.back() },
      ])
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestCameraPermission()
      if (!granted) {
        Alert.alert('Câmera', 'Você precisa permitir o acesso à câmera.')
        return
      }
      qrLockRef.current = false
      setIsVisibleCameraModal(true)
    } catch (error) {
      console.error(error)
      Alert.alert('Câmera', 'Não foi possível abrir a câmera.')
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsFetchingCoupon(true)

      const { data } = await api.patch(`/coupons/${id}`)
      setCoupon(data.coupon)
    } catch (error) {
      console.error(error)
      Alert.alert('Erro', 'Não foi possível utilizar o cupom.')
    } finally {
      setIsFetchingCoupon(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)
    Alert.alert(
      'Cupom',
      'Não é possível utilizar um cupom resgatado. Deseja realmente resgatar o cupom?',
      [
        { style: 'cancel', text: 'Não' },
        { text: 'Sim', onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading || !market) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market?.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLockRef.current) {
              qrLockRef.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />
        <View style={{ position: 'absolute', bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={isFetchingCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
