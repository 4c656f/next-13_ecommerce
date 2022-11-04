import React, {forwardRef, PropsWithChildren} from 'react';
import classes from "./MenuItem.module.css"

type MenuItemProps = {
    disabled?: boolean,
    active?: boolean,
    chosen?: boolean,
    value: any,
    className?: string,
    onClick?: () => void
}

const MenuItem = forwardRef<HTMLDivElement, PropsWithChildren<MenuItemProps>>((props, ref) => {

    const {
        disabled,
        active,
        chosen,
        value,
        onClick,
        children,
        className,
        ...rest
    } = props

    const defaultClasses =
        [   classes.container,
            active ? classes.active : "",
            disabled ? classes.disabled : "",
            chosen ? classes.chosen : "",
            className ? className : ""]

    return (
        <div
            onClick={onClick}
            className={defaultClasses.join(' ')}
            ref={ref}
            {...rest}
        >
            {children}
        </div>
    );
});

export default MenuItem;