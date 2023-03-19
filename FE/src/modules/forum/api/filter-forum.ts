import { useState } from "react";

import { FilterDateResultProps, useFilterByDate } from "@/hooks";

export type UseFilterForumsI = {
    name: string;
} & FilterDateResultProps;

export const useFilterForums = () => {
    const [filterP, setFilterP] = useState<UseFilterForumsI>({
        name: "",
        startDate: "",
        endDate: "",
    });

    const [filter, setFilter] = useState<UseFilterForumsI>({
        name: "",
    });

    const { filterDate, setFilterDate } = useFilterByDate();

    function onChangeName(name: string) {
        setFilter((preState) => {
            return { ...preState, name };
        });
    }

    function onSearch() {
        const data: UseFilterForumsI = {
            name: filterP.name,
            startDate: filterDate.startDate,
            endDate: filterDate.endDate,
        };

        setFilter({ ...data });
    }

    // date

    return { filter, setFilter, onChangeName, filterDate, setFilterDate, onSearch };
};
