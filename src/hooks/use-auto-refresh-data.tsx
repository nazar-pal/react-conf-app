import { useReactConfStore } from '@/store'
import { differenceInMinutes } from 'date-fns'
import { useEffect } from 'react'

export function useAutoRefreshData() {
  const { refreshData, lastRefreshed } = useReactConfStore()

  useEffect(() => {
    const fetchData = async () => {
      if (
        !lastRefreshed ||
        differenceInMinutes(new Date(), new Date(lastRefreshed)) > 5
      ) {
        await refreshData()
      }
    }

    fetchData()
  }, [lastRefreshed, refreshData])
}
