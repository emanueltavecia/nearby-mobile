import { IconProps } from '@tabler/icons-react-native'
import React from 'react'

export interface StepProps {
  title: string
  description: string
  icon: React.ComponentType<IconProps>
}
