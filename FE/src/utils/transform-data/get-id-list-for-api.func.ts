import { OptionsI } from "@/common/models/com-model";

export function getIdListForApiFunc(list?: OptionsI[]) {
    const isArray = Array.isArray(list);

    if (isArray) {
        return list?.map(function (item) {
            return { id: item.value };
        });
    } else {
        return [];
    }
}

export function getOptionFromListId(list: { id: number; name: string }) {
    return { value: list.id, label: list.name };
}

export function getOptionsFromListId(keyName: string, list: Array<{ [key: string]: { id: number; name: string } }>) {
    const isArray = Array.isArray(list);
    if (!isArray) return [];

    return list?.map(function (item) {
        return getOptionFromListId(item[keyName]);
    });
}

export function setListIdInput(keyName: string, setCallback: any, value: any, options?: OptionsI[]) {
    const isArray = Array.isArray(options);
    if (isArray) {
        const data = options.map((item) => {
            return { id: item.value };
        });
        setCallback({ ...value, [keyName]: data });
    }
}
