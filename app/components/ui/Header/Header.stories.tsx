import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import Header from "./Header";
import HeaderSection, {headerSectionHelper, HeaderSectionProps} from "../HeaderSection/HeaderSection";
import HeaderItem from "../HeaderItem/HeaderItem";
import {Button} from "../../index";
import {ArrowIcon} from "../../materials/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "4c656f_lib/Header",
    component: Header,
} as ComponentMeta<typeof Header>;



const headerElems: headerSectionHelper[] = [
    {
        title: "Element title",
        elements: [
            {
                label: "someElementTitle"
            },
            {
                label: "someElementTitle2"
            },
            {
                label: "someElementTitle3"
            },
            {
                label: "someElementTitle4"
            },
            {
                label: "someElementTitle5"
            },
            {
                label: "someElementTitle6"
            },
        ]
    },
    {
        title: "Element title2",
        elements: [
            {
                label: "someElementTitle"
            },
            {
                label: "someElementTitle2"
            },
            {
                label: "someElementTitle3"
            },
        ]
    },
    {
        title: "Element title3",
        elements: [
            {
                label: "someElementTitle"
            },
            {
                label: "someElementTitle2"
            },
            {
                label: "someElementTitle3"
            },
        ]
    },
]


const mainSection = [
    <HeaderItem key={'1'} title={'SomeTitle'}>
        <HeaderSection
            sectionTitle={<h1>SomeTitle</h1>}
            headerSectionElems={headerElems.map((value, index) => {
                return(
                    {
                        title:<Button
                            key={value.title}
                            children={<h3>{value.title}</h3>}
                            variant={'link'}
                            colorIndex={'1'}
                            as={'a'}
                            style={{width: "100%"}}
                            defaultIconStyles={true}
                            icon={<ArrowIcon/>}
                        />,
                        elements: value?.elements?.map((value1, index1) => {
                            return (<Button
                                key={value1.label}
                                children={value1.label}
                                variant={'link'}
                                colorIndex={'1'}
                                style={{width: "100%"}}
                                as={'a'}
                                defaultIconStyles={true}
                                icon={<ArrowIcon/>}
                                href={'/'}
                            />)
                        })
                    }
                )
            })}
        />

    </HeaderItem>,
    <HeaderItem key={'2'} title={'SomeTitle2'}>
        <HeaderSection
            sectionTitle={<h1>SomeTitle</h1>}
            headerSectionElems={headerElems.map((value, index) => {
                return(
                    {
                        title:<Button
                            key={value.title}
                            children={<h3>{value.title}</h3>}
                            variant={'link'}
                            colorIndex={'1'}
                            as={'a'}
                            style={{width: "100%"}}
                            defaultIconStyles={true}
                            icon={<ArrowIcon/>}
                        />,
                        elements: value?.elements?.map((value1, index1) => {
                            return (<Button
                                key={value1.label}
                                children={value1.label}
                                variant={'link'}
                                colorIndex={'1'}
                                style={{width: "100%"}}
                                as={'a'}
                                defaultIconStyles={true}
                                icon={<ArrowIcon/>}
                                href={'/'}
                            />)
                        })
                    }
                )
            })}
        />

    </HeaderItem>
]


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => {


    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                width: "100%",
                height: "100%"
            }}
        >
            <Header
                logoSection={<div>Logo</div>}
                mainSection={mainSection}
                // rightSection={[<div key={'1'}>cart</div>]}
                {...args}
            />

        </div>
    )
};


export const Default = Template.bind({});
Default.args = {};