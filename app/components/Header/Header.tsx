import React, {
    Children,
    cloneElement,
    ComponentProps,
    ElementType,
    FC,
    isValidElement,
    PropsWithChildren,
    ReactElement, useEffect
} from 'react';
import HeaderItem from '../HeaderItem/HeaderItem';
import classes from './Header.module.css'

type props = {
    children: ReactElement[]
} & PropsWithChildren

type HeaderProps = {
    logoSection?: ReactElement<any, any>,
    mainSection?: ReactElement<any, any>[],
    rightSection?: ReactElement<any, any>[],
}

const Header:FC<HeaderProps> = (props:HeaderProps) => {

    const {
        logoSection,
        mainSection,
        rightSection,
    } = props


    return (
        <header
            className={classes.container}
        >
            <section
                className={classes.sections}
            >
                {logoSection}
            </section>
            <section
                className={classes.sections}
            >
                {
                    mainSection
                }
            </section>
            <section
                className={classes.sections}
            >
                {logoSection}
            </section>
            
        </header>
    );
};

export default Header;