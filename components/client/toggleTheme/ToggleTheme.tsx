'use client'
import React, {FC, useContext} from 'react';
import Button from "~/components/ui/Button/Button";
import {ThemeContext} from "~/components/client/ThemeProvider/ThemeProvider";

type ToggleThemeProps = {

}

const ToggleTheme:FC<ToggleThemeProps> = (props:ToggleThemeProps) => {

    const {

    } = props

    const {toggleTheme} = useContext(ThemeContext)

    return <Button
        onClick={toggleTheme}
    ><h3>Toggle</h3></Button>
};

export default ToggleTheme;