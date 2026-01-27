import React from 'react'
import { Text, View } from 'react-native'

export function Section({
  title,
  value
}: {
  title: string
  value: string | null
}) {
  if (!value) {
    return null
  }

  return (
    <View className="mb-6 gap-1">
      <Text className="text-foreground text-lg font-semibold">{title}</Text>
      <Text className="text-text-secondary text-base font-medium">{value}</Text>
    </View>
  )
}
