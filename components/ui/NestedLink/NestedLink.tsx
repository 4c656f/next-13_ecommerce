import React, {Children, FC, ReactNode} from 'react';
import classes from './NestedLink.module.css'

type NestedLinkCustomProps = {
    children: ReactNode[]
}
type NestedLinkProps = NestedLinkCustomProps

const NestedLink:FC<NestedLinkProps> = (props:NestedLinkProps) => {

    const {
        children
    } = props


    return (
        <div
            className={classes.container}
        >
            {
                Children.map(children, (value, index)=>{

                    return (
                        <div>
                            {value}
                            {
                                index === children.length-1?
                                    null:
                                    <span
                                        className={classes.separator}
                                    >/</span>
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};

export default NestedLink;