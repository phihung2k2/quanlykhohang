import { useState } from "react";

import { OptionsI } from "@/common/models/com-model";
import { FilterDateResultProps, useFilterByDate } from "@/hooks";

export type UseFilterProgramsI = {
    name: string;
    typeId?: number | null;
} & FilterDateResultProps;

export const useFilterPrograms = () => {
    const [filterP, setFilterP] = useState<UseFilterProgramsI>({
        name: "",
        typeId: null,
        startDate: "",
        endDate: "",
    });

    const [filter, setFilter] = useState<UseFilterProgramsI>({
        name: "",
        typeId: null,
    });

    const { filterDate, setFilterDate } = useFilterByDate();

    function onChangeName(name: string) {
        setFilter((preState) => {
            return { ...preState, name };
        });
    }

    function onChangeType(option: OptionsI) {
        setFilterP((preState) => {
            return { ...preState, type: option };
        });
    }

    function onSearch() {
        const data: UseFilterProgramsI = {
            name: filterP.name,
            typeId: filterP.typeId || undefined,
            startDate: filterDate.startDate,
            endDate: filterDate.endDate,
        };

        setFilter({ ...data });
    }

    // date

    return { filter, setFilter, onChangeName, filterDate, setFilterDate, onChangeType, onSearch };
};
