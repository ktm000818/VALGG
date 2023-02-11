import styled from "@emotion/styled"
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { debounce } from "../Utils";
import PropTypes from "prop-types";

interface properties {
    options: dropDownList[];
    style: React.CSSProperties;
    id: string;
    onChange: (value: string) => void;
    onInputChange: (value: string) => void;
}

interface dropDownList {
    name: string
}

const CustomAutoComplete = ({ 
    options = [{ name: '' }],
    id = '',
    onChange = () => { },
    onInputChange = () => { },
    style = {width: 200}
}: properties) => {


    const [inputValue, setInputValue] = useState<string>('');
    const [hasInputValue, setHasInputValue] = useState<boolean>(false);
    const [dropDownLiKey, setDropDownLiKey] = useState<number>(0);

    useEffect(() => {
        onInputChange(inputValue);

        // autocomplete input value가 공란일 때
        if (inputValue === '') {
            setHasInputValue(false);
            setDropDownLiKey(0);
        }

        // autocomplete input value가 존재하고, #을 포함할 때만 검색함.
        if(inputValue && inputValue.includes("#")) {
            setHasInputValue(true);
        }
    }, [inputValue])

    useEffect(() => {
        if (dropDownLiKey === -1) {
            setDropDownLiKey(0);
        }

        if (dropDownLiKey > options.length - 1) {
            setDropDownLiKey(options.length - 1);
        }
    }, [dropDownLiKey])

    // const filterDropDownList = () => {
    //     if (inputValue === '') {

    //     } else {
    //         setHasInputValue(true);
    //         // const filteredDropDownList = options.filter(item => item.name.includes(inputValue));
    //         // setDropDownList(filteredDropDownList);
    //     }
    // };

    const handleChange = (e: React.SyntheticEvent) => {
        setInputValue((e.target as HTMLInputElement)?.value)
    };

    const selectDropDown = (e: React.SyntheticEvent | null, selected = '') => {
        onChange((e?.target as HTMLLIElement)?.innerText || selected);
        deleteInputValue();
    };

    const deleteInputValue = () => {
        setInputValue('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (inputValue) {
            const focusedItemLabel = Object.values(options)[dropDownLiKey]?.name;

            switch (e.key) {
                case 'ArrowUp':
                    setDropDownLiKey((prev) => --prev);
                    break;
                case 'ArrowDown':
                    setDropDownLiKey((prev) => ++prev);
                    break;
                case 'Enter':
                    selectDropDown(null, focusedItemLabel)
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <Container>
                <CustomInputContainer id={id} hasInputValue={hasInputValue}>
                    <CustomInput value={inputValue} onChange={handleChange} onKeyDown={handleKeyPress} style={style}/>
                    <DeleteButton onClick={deleteInputValue}>x</DeleteButton>
                </CustomInputContainer>
                {hasInputValue && (
                    <DropDownListUl style={style}>
                        {options.length === 1 && options[0]?.name === '' && <DropDownListLi key={0}>검색 중 . . .</DropDownListLi>}
                        {options.map((item, index) => (
                            <DropDownListLi
                                className={dropDownLiKey === index ? 'selected' : ''}
                                key={index}
                                id={index + "id"}
                                onClick={selectDropDown}
                            >
                                {item.name}
                            </DropDownListLi>
                        ))}
                    </DropDownListUl>
                )}
            </Container>
        </>
    )
};

const Container = styled.div`
    padding: 10px;
`

const actvBorderRadius = '10px 10px 0 0';
const inactvBorderRadius = '10px 10px 10px 10px';

const CustomInputContainer = styled.div<{ hasInputValue: boolean }>`
    position: relative;
    display: flex;
    // flex-direction: row;
    padding: 16px;
    border: 1px solid lightgray;
    border-radius: ${props => props.hasInputValue ? actvBorderRadius : inactvBorderRadius};
    background-color: white;
    z-index: 99;
    &:focus-within {
        box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
    }
`

const CustomInput = styled.input<{style: React.CSSProperties}>`
    flex-grow: 1;
    width: ${props => props.style.width};
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
`

const DeleteButton = styled.button`
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

const DropDownListUl = styled.ul<{style: React.CSSProperties}>`
    position: absolute;
    width: ${props => props.style.width};
    display: block;
    list-style: none;
    background-color: white;
    margin: 0px;
    padding: 16px;
    z-index: 99
`

const DropDownListLi = styled.li`
    cursor: pointer;
    padding: 0 16px;
    color: black;
    &.selected {
      background-color: lightgray;
    }
`

export default React.memo(CustomAutoComplete);