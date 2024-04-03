import { useEffect, useMemo, useState, useTransition } from 'react'
import { v4 as uuidv4 } from 'uuid'

export type ListItem<TData> = {
  id: ListItemKey
  value: TData
}

export type ListItemKey = string

export function useSelectableList<TData = {}>(props: { list: Array<TData> }) {
  const [currentSelectionKey, setCurrentSelectionKey] = useState<ListItemKey>()
  const [filter, setFilter] = useState<{
    current: TData | ((value: TData) => boolean)
  }>({
    current: () => true,
  })
  const [isLoading, startTransition] = useTransition()

  const itemMap = useMemo(() => {
    const map = new Map<string, ListItem<TData>>()
    const filterFunction =
      typeof filter.current === 'function'
        ? filter.current
        : (v: TData) => v === filter.current
    // @ts-ignore
    const filteredList = props.list.filter(filterFunction)
    filteredList.forEach((item) => {
      const uniqueKey = uuidv4()
      map.set(uniqueKey, {
        id: uniqueKey,
        value: item,
      })
    })
    return map
  }, [props.list, filter])

  useEffect(() => {
    setCurrentSelectionKey(undefined)
  }, [props.list])

  function select(id: ListItemKey) {
    if (id) {
      setCurrentSelectionKey(id)
    }
  }

  function unselect() {
    setCurrentSelectionKey(undefined)
  }

  function getCurrentSelectionKey(): ListItemKey | undefined {
    return currentSelectionKey
  }

  function setListFilter(filter: TData | ((value: TData) => boolean)) {
    startTransition(() => {
      setFilter({
        current: filter,
      })
    })
  }

  function resetListFilter() {
    startTransition(() => {
      setFilter({
        current: () => true,
      })
    })
  }
  return {
    list: itemMap,
    select,
    unselect,
    getCurrentSelectionKey,
    setListFilter,
    resetListFilter,
  }
}
