import React, {FC} from 'react';
import classes from './DropDownMultiTag.module.css'

type DropDownMultiTagProps = {
    index: number;
    value: any;
    onClick: (index:number)=>void;
}

const DropDownMultiTag:FC<DropDownMultiTagProps> = (props) => {

    const {
        index,
        value,
        onClick
    } = props


    return (
        <button
            className={classes.container}
            onClick={(e)=> {
            e.stopPropagation()
            onClick(index)
        }}>
            {value}
        </button>
    );
};

export default DropDownMultiTag;