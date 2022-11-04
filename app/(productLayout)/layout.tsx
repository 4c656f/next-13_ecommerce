import React, {FC, ReactNode} from 'react';

type ProductIndexLayoutProps = {
    children: ReactNode
}

const ProductIndexLayout:FC<ProductIndexLayoutProps> = (props:ProductIndexLayoutProps) => {

    const {
        children
    } = props


    return (
        <div>
            ProductIndexLayoutProps
            {children}
        </div>
    );
};

export default ProductIndexLayout;