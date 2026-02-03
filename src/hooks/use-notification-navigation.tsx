import * as Notifications from 'expo-notifications'
import { usePathname, useRouter } from 'expo-router'
import { useEffect } from 'react'

export function useNotificationNavigation() {
  const router = useRouter()
  const pathName = usePathname()

  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      try {
        const url = lastNotificationResponse.notification.request.content.data
          ?.url as string
        if (url && pathName !== url) {
          router.push(url)
        }
      } catch {}
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastNotificationResponse])
}
