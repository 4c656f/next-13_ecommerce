'use client';

import styles from './page.module.css'
import {useContext} from "react";
import {ThemeContext} from "./components/ThemeProvider/ThemeProvider";
import Button from "./components/Button/Button";


type HomeProps = {}


export default function Home(props: HomeProps) {
    const {

    } = props

    const {toggleTheme}= useContext(ThemeContext)


    return (
        <div className={styles.container}>

            <Button
                onClick={toggleTheme}
            >someBtn</Button>

        </div>
    )
}
