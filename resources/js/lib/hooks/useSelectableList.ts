import {useEffect, useMemo, useState} from "react";
import {v4 as uuidv4} from 'uuid';

type ListItem<TData> = {
    id: ListItemKey;
    value: TData;
}

type ListItemKey = string;

export function useSelectableList<TData = {}>(props: { list: Array<TData> }) {
    const [currentSelectionKey, setCurrentSelectionKey] = useState<ListItemKey>();

    const itemMap = useMemo(() => {
        const map = new Map<string, ListItem<TData>>();
        props.list.forEach((item) => {
            const uniqueKey = uuidv4();
            map.set(uniqueKey, {
                id: uniqueKey,
                value: item,
            })
        });
        return map;
    }, [props.list])

    useEffect(() => {
        setCurrentSelectionKey(undefined);
    }, [props.list]);

    function select(id: ListItemKey) {
        if (id) {
            setCurrentSelectionKey(id);
        }
    }

    function unselect() {
        setCurrentSelectionKey(undefined);
    }

    function getCurrentSelectionKey(): ListItemKey | undefined {
        return currentSelectionKey;
    }

    return {
        list: itemMap,
        select,
        unselect,
        getCurrentSelectionKey
    }
}
