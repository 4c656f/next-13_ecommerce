import React, {FC} from 'react';

type ProductIdPageProps = {
    params: { id: string }
}

const ProductIdPage:FC<ProductIdPageProps> = (props:ProductIdPageProps) => {

    const {
        params
    } = props

    
    return (
        <div>
            {params.id}
        </div>
    );
};

export default ProductIdPage;