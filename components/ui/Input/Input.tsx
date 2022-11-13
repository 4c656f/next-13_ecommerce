import React, {cloneElement, FC, InputHTMLAttributes, memo, ReactElement} from 'react';
import classes from './Input.module.css'
import {IColorIndex} from "../../../types/IColorIndex";
import {IElementsSize} from "~/types/IElementsSize";

type InputOwnProps = {
    colorIndex?: IColorIndex;
    icon?: ReactElement;
    size?: IElementsSize;
    defaultIconStyles?:boolean
}


type ButtonProps = InputOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>

const defaultClasses = [classes['container']]

const Input: FC<ButtonProps> = (props) => {

    const {
        icon,
        className,
        colorIndex,
        size = "medium",
        defaultIconStyles,
        ...rest
    } = props


    const inputClasses = [
        classes.input,
        `${classes[`color_${colorIndex}_index`]}`,
        `${className ? className : ""}`,
        classes[size]
    ]

    return (

        <div className={classes.main_container}>
            <input
                className={inputClasses.join(" ")}
                {...rest}
            />
            {icon&&defaultIconStyles?cloneElement(icon, {
                className: `${icon.props.className} ${classes.icon}`
            }):icon}
        </div>

    );
};

export default memo(Input);