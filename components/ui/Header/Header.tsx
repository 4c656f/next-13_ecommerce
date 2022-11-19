import React, {FC, PropsWithChildren, ReactElement} from 'react';
import classes from './Header.module.css'

type props = {
    children: ReactElement[]
} & PropsWithChildren

type HeaderProps = {
    logoSection?: ReactElement<any, any>,
    mainSection?: ReactElement<any, any>[],
    rightSection?: ReactElement<any, any>[] | ReactElement<any, any>,
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {

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
                {rightSection}
            </section>

        </header>
    );
};

export default Header;