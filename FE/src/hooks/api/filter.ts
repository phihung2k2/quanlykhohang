import dayjs from "dayjs";
import { useCallback, useState } from "react";

export interface FilterDateResultProps {
    startDate?: Date | string;
    endDate?: Date | string;
}

export function filterDateFun(p: FilterDateResultProps): FilterDateResultProps {
    const startDayjs = dayjs(p.startDate || "");

    const endDayjs = dayjs(p.endDate || "");

    const start = startDayjs.isValid() ? { startDate: startDayjs.format() } : {};
    const end = endDayjs.isValid() ? { endDate: endDayjs.format() } : {};

    return {
        ...start,
        ...end,
    };
}

export const useFilterByDate = (int?: FilterDateResultProps) => {
    const intTime = filterDateFun(int || {});

    const [filterDate, setFilterDate] = useState<FilterDateResultProps>(intTime);

    const onChangeStartDate = useCallback(
        (date: Date) => {
            const value = filterDateFun({ startDate: date });
            return setFilterDate({
                ...filterDate,
                startDate: value.startDate,
            });
        },
        [filterDate]
    );

    const onChangeEndDate = useCallback(
        (date: Date) => {
            const value = filterDateFun({ endDate: date });
            return setFilterDate({
                ...filterDate,
                endDate: value.endDate,
            });
        },
        [filterDate]
    );

    return {
        filterDate,
        setFilterDate,
        onChangeStartDate,
        onChangeEndDate,
    };
};
