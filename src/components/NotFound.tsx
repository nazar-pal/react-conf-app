import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

import { Button } from './Button'
import { ThemedText, ThemedView, useThemeColor } from './Themed'

import { useReactConfStore } from '@/store/reactConfStore'
import { theme } from '@/theme'

export function NotFound({ message }: { message: string }) {
  const refetch = useReactConfStore(state => state.refreshData)
  const isRefetching = useReactConfStore(state => state.isRefreshing)
  const iconColor = useThemeColor({
    light: theme.colorGrey,
    dark: theme.colorWhite
  })
  return (
    <ThemedView style={styles.container} color={theme.color.background}>
      <ThemedText className="text-2xl font-bold" style={styles.heading}>
        {message}
      </ThemedText>
      <Image
        tintColor={iconColor}
        source={require('@/assets/images/not-found.svg')}
        style={styles.image}
      />

      <Button title="Refetch" onPress={refetch} isLoading={isRefetching} />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24
  },
  heading: {
    marginBottom: 24
  },
  image: {
    height: 100,
    marginBottom: 24 * 2,
    width: 100
  }
})
