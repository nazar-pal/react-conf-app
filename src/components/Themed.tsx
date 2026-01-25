import React from 'react'
import {
  Pressable,
  PressableProps,
  Text,
  View,
  useColorScheme
} from 'react-native'
import Animated from 'react-native-reanimated'
import { withUniwind } from 'uniwind'
import { theme } from '../theme'
import { cn } from '../utils/cn'

const AnimatedPressable = withUniwind(
  Animated.createAnimatedComponent(Pressable)
)
const AnimatedText = withUniwind(Animated.Text)
const AnimatedView = withUniwind(Animated.View)

type ThemeProps = {
  color?: { light: string; dark: string }

  // TODO (Kadi): Remove these props
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & {
  animated?: boolean
  className?: string
} & Text['props']
export type ViewProps = ThemeProps & View['props'] & { animated?: boolean }

export function useThemeColor<T, U>(props: { light: T; dark: U }) {
  const theme = useColorScheme() ?? 'light'
  // const theme = "dark";
  return props[theme]
}

export function ThemedText(props: TextProps) {
  const {
    style,
    lightColor,
    darkColor,
    animated,
    color: themeColor,
    className,
    ...otherProps
  } = props

  const color = useThemeColor(themeColor ?? theme.color.text)

  const mergedClassName = cn('text-base font-medium', className)

  const baseStyle = [{ color }, style]

  if (animated) {
    return (
      <AnimatedText
        className={mergedClassName}
        style={baseStyle}
        {...otherProps}
      />
    )
  }

  return <Text className={mergedClassName} style={baseStyle} {...otherProps} />
}

export function ThemedView(props: ViewProps) {
  const { style, animated, ...otherProps } = props
  const backgroundColor = useThemeColor(props.color ?? theme.color.background)

  if (animated) {
    return <AnimatedView style={[{ backgroundColor }, style]} {...otherProps} />
  }

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}

export function ThemedPressable(
  props: PressableProps & {
    backgroundColor?: { light: string; dark: string }
    animated?: boolean
  }
) {
  const { style, animated, ...otherProps } = props
  const backgroundColor = useThemeColor(
    props.backgroundColor ?? theme.color.background
  )

  if (animated) {
    return (
      <AnimatedPressable
        style={[
          { backgroundColor },
          typeof style === 'function' ? style({ pressed: false }) : style
        ]}
        {...otherProps}
      />
    )
  }

  return (
    <Pressable
      style={[
        { backgroundColor },
        typeof style === 'function' ? style({ pressed: false }) : style
      ]}
      {...otherProps}
    />
  )
}
