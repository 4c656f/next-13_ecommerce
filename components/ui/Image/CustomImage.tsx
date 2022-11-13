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
    quality?: number

}

const CustomImage: FC<CustomImageProps> = (props: CustomImageProps) => {

    const {
        src,
        width,
        alt,
        height,
        className,
        quality
    } = props

    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div
            className={classes.container}
        >
            {!isLoaded ?
                <div
                    className={classes.placeholder}
                >

                </div> : null
            }
            <Image
                src={src}
                alt={alt}
                height={height}
                width={width}
                quality={quality}
                className={`${classes.image} ${className ? className : ""}`}
                onLoad={() => setIsLoaded(true)}
                priority={true}
                style={{objectFit: 'cover'}}
                // fill={true}
            />
        </div>
    );
};

export default CustomImage;