'use client';
import React, {FC, useState} from 'react';
import Image from 'next/image';
import classes from './customImage.module.css'
type CustomImageProps = {
    src: string;
    width: number;
    height: number;
    alt: string;
    className?: string

}

const CustomImage:FC<CustomImageProps> = (props:CustomImageProps) => {

    const {
        src,
        width,
        alt,
        height,
        className,
    } = props

    const [isLoaded, setIsLoaded]= useState(false)

    return (
        <div
            className={classes.container}
        >
            {!isLoaded?
                <div
                    className={classes.placeholder}
                >

                </div>:null
            }
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`${classes.image} ${className?className:""}`}
                onLoad={()=>setIsLoaded(true)}
            />
        </div>
    );
};

export default CustomImage;