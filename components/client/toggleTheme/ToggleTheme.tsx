'use client'
import React, {FC, useContext} from 'react';
import Button from "~/components/ui/Button/Button";
import {ThemeContext} from "~/components/client/ThemeProvider/ThemeProvider";

type ToggleThemeProps = {}

const ToggleTheme: FC<ToggleThemeProps> = (props: ToggleThemeProps) => {

    const {} = props

    const {toggleTheme} = useContext(ThemeContext)

    return <Button
        onClick={toggleTheme}
    ><span>Toggle</span></Button>
};

export default ToggleTheme;