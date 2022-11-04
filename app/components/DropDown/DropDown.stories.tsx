import React, {useState} from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";

import DropDown from "./DropDown";
import Input from "../Input/Input";
import MenuItem from "../MenuItem/MenuItem";


export default {
    title: "4c656f_lib/DropDown",
    component: DropDown,
} as ComponentMeta<typeof DropDown>;

const items = [
    { label: 'Value 1', value: 1 },
    { label: 'Value 2', value: 2 },
    { label: 'Value 3', value: 3 },
    { label: 'Value 4', value: 4 },
    { label: 'Value 5', value: 5 },
    { label: 'Value 6', value: 6 },
    { label: 'Value 7', value: 7 },
    { label: 'Value 8', value: 8 },
    { label: 'Value 9', value: 9 },
    { label: 'Value 10', value: 10 },
];


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropDown> = (args) => {

    const [value, setValue] = useState('')


    return (
        <DropDown {...args}>
            {items.map((value, index)=>{
               return(
                   <MenuItem
                       key={value.value}
                       value={value.value}
                       disabled={index===1}
                   >
                       {value.label}
                   </MenuItem>
               )
            })}

        </DropDown>
    )
};

export const Default = Template.bind({});

Default.args = {
    search: true,
    colorIndex: "0",
    label: "someLabel",
    size: "medium"
}
export const Multiselect = Template.bind({});

Multiselect.args = {
    search: true,
    colorIndex: "0",
    label: "someLabel",
    multiselect: true,
    size: "medium"
}


