import type { ButtonProps, ImageProps } from '@expo/ui/swift-ui'
import type { StyleProp, ViewStyle } from 'react-native'

export interface HeaderButtonProps {
  imageProps?: ImageProps
  buttonProps?: ButtonProps
  style?: StyleProp<ViewStyle>
}
