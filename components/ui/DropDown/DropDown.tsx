import React, {
    Children,
    cloneElement,
    FC,
    isValidElement,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {ReactComponent as ArrowIcon} from "../../materials/icons/ArrowSmall.svg"

import classes from "./DropDown.module.css"
import {IColorIndex} from "../../../types/IColorIndex";
import MenuItem from "../MenuItem/MenuItem";
import SearchIcon from "../../../materials/icons/Search.svg";
import DropDownMultiTag from "../DropdownMultiTag/DropDownMultiTag";
import {IElementsSize} from "../../../types/IElementsSize";

type DropDownProps = {
    search?: boolean;
    colorIndex?: IColorIndex;
    label?: ReactNode;
    size?: IElementsSize;
    onChange?: (index: number) => void;
    children?: ReactElement<any, "div">[];
    multiselect?: boolean;
}

const DropDown: FC<DropDownProps> = (props: DropDownProps) => {


    const {
        search,
        colorIndex = "0",
        size = "medium",
        label,
        onChange,
        multiselect,
        children
    } = props


    const [isOpen, setIsOpen] = useState(false)

    const [activeIndex, setActiveIndex] = useState(-1)

    const [chosenIndex, setChosenIndex] = useState(-1)

    const [menuAnimClass, setMenuAnimClass] = useState("")

    const [searchValue, setSearchValue] = useState('')

    const [multiselectIndexes, setMultiselectIndexes] = useState<{ [key: number]: number }>({})

    const elements = useRef<Record<number, HTMLDivElement>>({});

    const handleOpen = () => {


        if (isOpen) {
            setChosenIndex(-1)
            setMenuAnimClass('hide')

            setTimeout(() => {
                setIsOpen(prevState => !prevState)
            }, 200)

        } else {
            setMenuAnimClass('')
            setIsOpen(prevState => !prevState)
        }


    }

    const items = useMemo(() => Children.toArray(children), [children]);


    const indexes = useMemo(() => {
        return items.reduce<number[]>((acum, value, index) => {
            if (isValidElement(value)) {

                if (value.type === MenuItem && !value.props.disabled) {
                    if (search ? value.props.children.toLowerCase().includes(searchValue.toLowerCase()) : true) {

                        acum.push(index)
                        return acum
                    }

                }
            }

            return acum
        }, [])
    }, [items, search ? searchValue : null])


    const handleActive = (item: any) => {
        if (onChange) onChange(item)


        handleOpen()


        if (multiselect) {
            console.log(multiselectIndexes, item, item in multiselectIndexes)
            setMultiselectIndexes(prevState => {
                console.log(prevState)
                if (item in prevState) {
                    delete prevState[item]
                    return prevState
                }
                prevState[item] = item
                return prevState
            })
        } else {
            if (item === activeIndex) {
                setActiveIndex(-1)
                return
            }
            setActiveIndex(item)

        }


    }

    const handleKeyDown = useCallback((event: KeyboardEvent) => {


        switch (event.code) {
            case 'ArrowDown':
                event.preventDefault();
                event.stopPropagation();
                setChosenIndex(highlightedIndex => {
                    const index = highlightedIndex === indexes.length - 1 ? 0 : highlightedIndex + 1;
                    elements.current[indexes[index]]?.scrollIntoView({
                        block: 'nearest',
                    });
                    return index;
                });
                break;
            case 'ArrowUp': {
                event.preventDefault();
                event.stopPropagation();
                setChosenIndex(highlightedIndex => {
                    const index = highlightedIndex <= 0 ? indexes.length - 1 : highlightedIndex - 1;
                    elements.current[indexes[index]]?.scrollIntoView({
                        block: 'nearest',
                    });
                    return index;
                });
                break;
            }
            case 'Enter': {
                event.preventDefault();
                event.stopPropagation();
                const item = items[indexes[chosenIndex]];

                if (chosenIndex !== -1 && isValidElement(item)) {
                    handleActive(indexes[chosenIndex]);
                }


                break;
            }
        }
    }, [chosenIndex, indexes])


    useEffect(() => {
        if (isOpen) document.addEventListener('keydown', handleKeyDown, true)

        return () => document.removeEventListener('keydown', handleKeyDown, true)
    }, [isOpen, handleKeyDown])

    const onTagClick = (index: number) => {
        setMultiselectIndexes(prevState => {

            delete prevState[index]
            return {...prevState}
        })
    }


    return (
        <div
            className={`${classes.container}`}
        >

            <button
                className={`${classes.toggle} ${classes[size]} ${classes[`color_${colorIndex}_index`]}`}
                onClick={handleOpen}
            >
                {
                    multiselect ?

                        Object.keys(multiselectIndexes).length > 0 ?
                            Object.keys(multiselectIndexes).map((value, index) => {


                                return (
                                    <DropDownMultiTag
                                        index={Number(value)}
                                        value={children && children[Number(value)].props.children}
                                        onClick={onTagClick}
                                    />
                                )
                            }) : label
                        : activeIndex >= 0 ? children ? children[activeIndex].props.children : label : label

                }
                <ArrowIcon
                    style={{
                        transform: `translate(0, -50%) rotate(${isOpen ? 180 : 0}deg)`
                    }}
                    className={classes.icon}

                />
            </button>

            {isOpen ?
                <menu
                    className={`${classes.menu} ${menuAnimClass ? classes[menuAnimClass] : ""}`}
                >
                    {search ?
                        <div
                            className={classes.search_container}
                        >
                            <input
                                className={classes.search_input}
                                placeholder={"Search"}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <SearchIcon
                                className={classes.search_icon}
                            />
                        </div> :
                        null
                    }
                    {
                        Children.map(children, (child, index) => {
                            if (isValidElement(child)) {
                                if (search ? child.props.children.toLowerCase().includes(searchValue.toLowerCase()) : true) {
                                    return cloneElement(child, {
                                        active: multiselect ? index in multiselectIndexes : activeIndex === index,
                                        chosen: indexes[chosenIndex] === index,
                                        onClick: (e: MouseEvent) => {
                                            handleActive(index)
                                        },
                                        ref: (node: HTMLDivElement) => {
                                            elements.current[index] = node;
                                        }
                                    })
                                }

                            }
                        })
                    }
                </menu> :
                null

            }

        </div>
    );
};

export default DropDown;