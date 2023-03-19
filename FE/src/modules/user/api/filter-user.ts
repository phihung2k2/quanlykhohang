import { useState } from "react";

import { FilterDateResultProps, useFilterByDate } from "@/hooks";

export type UseFilterUsersI = {
    email: string;
} & FilterDateResultProps;

export const useFilterUsers = () => {
    const [filterP, setFilterP] = useState<UseFilterUsersI>({
        email: "",
        startDate: "",
        endDate: "",
    });

    const [filter, setFilter] = useState<UseFilterUsersI>({
        email: "",
    });

    const { filterDate, setFilterDate } = useFilterByDate();

    function onChangeName(email: string) {
        setFilter((preState) => {
            return { ...preState, email };
        });
    }

    function onSearch() {
        const data: UseFilterUsersI = {
            email: filterP.email,
            startDate: filterDate.startDate,
            endDate: filterDate.endDate,
        };

        setFilter({ ...data });
    }

    // date

    return { filter, setFilter, onChangeName, filterDate, setFilterDate, onSearch };
};
