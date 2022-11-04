import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Input from "./Input";
import {SearchIcon} from "../../materials/icons";

export default {
    title: "4c656f_lib/Input",
    component: Input,
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Placeholder',
    style: {width: "300px"},
    Icon: SearchIcon
};


