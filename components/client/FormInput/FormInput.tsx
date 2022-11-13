'use client'
import React, {cloneElement, FC, InputHTMLAttributes, memo, ReactElement, useState} from 'react';
import classes from './Input.module.css'
import {IColorIndex} from "../../../types/IColorIndex";
import {IElementsSize} from "~/types/IElementsSize";

type InputOwnProps = {
    colorIndex?: IColorIndex;
    icon?: ReactElement;
    size?: IElementsSize;
    errorMessage?: string;
    defaultIconStyles?:boolean
}


type ButtonProps = InputOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>

const defaultClasses = [classes['input']]

const Input: FC<ButtonProps> = (props) => {

    const {
        icon,
        className,
        colorIndex = '0',
        errorMessage,
        defaultIconStyles,
        size = 'medium',
        ...rest
    } = props

    const [left, setLeft] = useState(false)


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
                type={'text'}
                data-left={left ? 'true' : 'false'}
                onBlur={() => setLeft(true)}
                {...rest}
            />
            {icon&&defaultIconStyles?cloneElement(icon, {
                className: `${icon.props.className} ${classes.icon}`
            }):icon}
            <span
                className={classes.error_message}
            >
                {errorMessage}
            </span>
        </div>

    );
};

export default memo(Input);