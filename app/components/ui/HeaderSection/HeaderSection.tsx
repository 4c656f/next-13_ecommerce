import React, {FC, ReactElement} from 'react';
import classes from './HeaderSection.module.css'



export type headerSectionHelper = {
    title?: string;
    [key: string|number]: any;
    elements?: {
        label?: string;
        [key: string|number]: any;
    }[]
}

type headerSectionElems = {
    title?: ReactElement<any, any>;
    elements?: ReactElement<any, any> | ReactElement<any, any>[]
}

export type HeaderSectionProps = {
    sectionTitle?: ReactElement<any, any>,
    headerSectionElems?: headerSectionElems[]
}


const HeaderSection: FC<HeaderSectionProps> =

    (props: HeaderSectionProps) => {

        const {
            sectionTitle,
            headerSectionElems
        } = props


        return (
            <menu
                className={classes.container}
            >
                <div
                    className={classes.main_title}
                >
                    {sectionTitle}
                </div>

                <div
                    className={classes.elements_container}
                >
                    {headerSectionElems?.map(value => {
                        return (
                            <div
                                className={classes.section_element}
                            >
                                {value.title}
                                <div
                                    className={classes.elements_button}
                                >
                                    {value.elements}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </menu>
        );
    };

export default HeaderSection;