import { useState } from "react";

import { FilterDateResultProps, useFilterByDate } from "@/hooks";

export type UseFilterBillsI = {
    orderId?: string;
} & FilterDateResultProps;

export const useFilterBills = () => {
    // const [filterP, setFilterP] = useState<UseFilterForumsI>({
    //     startDate: "",
    //     endDate: "",
    // });

    const [filter, setFilter] = useState<UseFilterBillsI>({});

    const { filterDate, setFilterDate } = useFilterByDate();

    function onChangeName(name: string) {
        setFilter((preState) => {
            return { ...preState, name };
        });
    }

    function onSearch() {
        const data: UseFilterBillsI = {
            startDate: filterDate.startDate,
            endDate: filterDate.endDate,
        };
        setFilter({ ...data });
    }

    // date

    return { filter, setFilter, onChangeName, filterDate, setFilterDate, onSearch };
};
