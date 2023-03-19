import { useState } from "react";

import { OptionsI } from "@/common/models/com-model";
import { FilterDateResultProps, useFilterByDate } from "@/hooks";

export type UseFilterListProductI = {
    name: string;
    categoryId?: number | null;
} & FilterDateResultProps;

export type UseFilterListProductPropsI = {
    name: string;
    category: OptionsI | null;
} & FilterDateResultProps;

export const useFilterProducts = () => {
    const [filterP, setFilterP] = useState<UseFilterListProductPropsI>({
        name: "",
        category: null,
        startDate: "",
        endDate: "",
    });

    const [filter, setFilter] = useState<UseFilterListProductI>({
        name: "",
        categoryId: null,
    });

    const { filterDate, setFilterDate } = useFilterByDate();

    function onChangeName(name: string) {
        setFilter((preState) => {
            return { ...preState, name };
        });
    }

    function onChangeCategory(option: OptionsI) {
        setFilterP((preState) => {
            return { ...preState, category: option };
        });
    }

    function onSearch() {
        const data: UseFilterListProductI = {
            name: filterP.name,
            categoryId: filterP.category?.value || undefined,
            startDate: filterDate.startDate,
            endDate: filterDate.endDate,
        };

        setFilter({ ...data });
    }

    // date

    return { filter, setFilter, onChangeName, filterDate, setFilterDate, onChangeCategory, onSearch };
};
