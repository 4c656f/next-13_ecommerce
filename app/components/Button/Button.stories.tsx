import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Button from "./Button";
import {ArrowIcon} from "../../materials/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "4c656f_lib/Button",
    component: Button,
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Text = Template.bind({});
Text.args = {
    children: "Button",
    variant: "text",
    size: "medium",
    colorIndex: "0"
};

export const Contained = Template.bind({});
Contained.args = {
    children: "Button",
    variant: "contained",
    size: "medium",
    colorIndex: "0"
};

export const Outlined = Template.bind({});
Outlined.args = {
    children: "Button",
    variant: "outlined",
    size: "medium",
    colorIndex: "0"

};

export const WithIcon = Template.bind({});
WithIcon.args = {
    style: {width: '100px'},
    children: "Button",
    variant: "contained",
    colorIndex: "0",
    icon: <ArrowIcon/>,
    size: "medium",
    defaultIconStyles: true

};

export const WithIconLink = Template.bind({});
WithIconLink.args = {
    style: {width: '100px'},
    children: "Button",
    variant: "link",
    as: "a",
    size: "medium",
    href: "#",
    colorIndex: "0",
    icon: <ArrowIcon/>,
    defaultIconStyles: true
};

