import useSWR, { useSWRInfinite } from 'swr'
import { useState, useEffect } from 'react'

/**
 * useFetch
 *
 * @param key
 * @param fetcher
 */
export const useFetch = (key: string, fetcher: any) => {
  const [triggerFetch, setTriggerFetch] = useState(false)

  const { data, error } = useSWR(!triggerFetch ? null : key, fetcher)

  useEffect(() => {
    setTriggerFetch(true)
  }, [setTriggerFetch])

  return { setTriggerFetch, data, error }
}

/**
 * useFetchInfinite
 *
 * @param url
 * @param fetcher
 */
export const useFetchInfinite = (url: string, fetcher: any) => {
  const [triggerFetch, setTriggerFetch] = useState(false)
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => (!triggerFetch ? null : `${url}&page=${index + 1}`),
    fetcher
  )

  useEffect(() => {
    setTriggerFetch(true)
  }, [setTriggerFetch])

  return { data, error, mutate, size, setSize, isValidating, setTriggerFetch }
}

/**
 * useFetchPerPage
 *
 * @param key
 * @param fetcher
 */
export const useFetchPerPage = (key: string, fetcher: any) => {
  const [triggerFetch, setTriggerFetch] = useState(false)
  const [page, setPage] = useState(1)

  const { data, error } = useSWR(!triggerFetch ? null : `${key}&Page=${page}`, fetcher)

  const fetchData = (page: number) => {
    setPage(page)
    ;(window as any).scrollTo(0, 0)
  }

  useEffect(() => {
    setTriggerFetch(true)
  }, [setTriggerFetch])

  return { setTriggerFetch, fetchData, page, data, error }
}
