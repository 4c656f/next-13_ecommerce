import React, {FC, ReactNode} from 'react';
import classes from '../page.module.css'
import HeaderItem from "../components/ui/HeaderItem/HeaderItem";
import HeaderSection from "../components/ui/HeaderSection/HeaderSection";
import Header from "../components/ui/Header/Header";

type ProductIndexLayoutProps = {
    children: ReactNode
}

const ProductIndexLayout:FC<ProductIndexLayoutProps> = (props:ProductIndexLayoutProps) => {

    const {
        children
    } = props


    return (
        <div
            className={classes.header_container}
        >
            <Header
                logoSection={<h1>Logo</h1>}
                mainSection={
                    [<HeaderItem title={"someTitle"} key={'someKey'}>
                        <HeaderSection
                            sectionTitle={<h1>SomeTitle</h1>}
                        />
                    </HeaderItem>
                    ]}
                rightSection={[<h1
                    key={'someKey'}
                >rightSection</h1>]}
            />
            {children}
        </div>
    );
};

export default ProductIndexLayout;