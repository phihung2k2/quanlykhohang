import { Option, Select, SelectProps } from "@material-tailwind/react";
import React from "react";

import { OptionsI } from "@/common/models/com-model";

import { FormInputBasic, FormInputBasicProps } from "../form";

export interface SelectBasicProps extends FormInputBasicProps, Partial<SelectProps> {
    options: OptionsI[];
}

export const SelectBasic: React.FC<SelectBasicProps> = ({ options, label, helperText, error, errorText, ...props }) => {
    return (
        <FormInputBasic label={label} helperText={helperText} error={error} errorText={errorText}>
            <Select {...(props as any)} error={error}>
                {options?.map((item) => (
                    <Option key={item.value} value={item.value}>
                        {item.label}
                    </Option>
                ))}
            </Select>
        </FormInputBasic>
    );
};
