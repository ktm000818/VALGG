import styled from "@emotion/styled"
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { debounce } from "../Utils";
import PropTypes from "prop-types";

interface properties {
    options: dropDownList[]
    id: string,
    onChange: (value: string) => void;
    onInputChange: (value: string) => void;
}

interface dropDownList {
    label: string
}

const CustomAutoComplete = ({ options = [{ label: '' }], id = '', onChange = () => { }, onInputChange = () => { } }: properties) => {


    const [inputValue, setInputValue] = useState<string>('');
    const [hasInputValue, SetHasInputValue] = useState<boolean>(false);
    const [dropDownLiKey, setDropDownLiKey] = useState<number>(0);

    useEffect(() => {
        onInputChange(inputValue);

        if (inputValue === '') {
            SetHasInputValue(false);
            setDropDownLiKey(0);
        } else {
            SetHasInputValue(true);
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

    const filterDropDownList = () => {
        if (inputValue === '') {

        } else {
            SetHasInputValue(true);
            // const filteredDropDownList = options.filter(item => item.label.includes(inputValue));
            // setDropDownList(filteredDropDownList);
        }
    }

    const handleChange = useCallback((e: React.SyntheticEvent) => {
        setInputValue((e.target as HTMLInputElement)?.value)
    }, [inputValue])

    const selectDropDown = useCallback((e: React.SyntheticEvent | null, selected = '') => {
        onChange((e?.target as HTMLLIElement)?.innerText || selected)
    }, [inputValue])

    const deleteInputValue = useCallback(() => {
        setInputValue('');
    }, [inputValue])

    const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
        if (inputValue) {
            const focusedItemLabel = Object.values(options)[dropDownLiKey]?.label;

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
    }, [dropDownLiKey])

    return (
        <>
            <Container>
                <CustomInputContainer id={id} hasInputValue={hasInputValue}>
                    <CustomInput value={inputValue} onChange={handleChange} onKeyDown={handleKeyPress} />
                    <DeleteButton onClick={deleteInputValue}>x</DeleteButton>
                </CustomInputContainer>
                {hasInputValue && (
                    <DropDownListUl>
                        {options.length === 1 && options[0]?.label === '' && <DropDownListLi key={0}>검색 중 . . .</DropDownListLi>}
                        {options.map((item, index) => (
                            <DropDownListLi
                                className={dropDownLiKey === index ? 'selected' : ''}
                                key={index}
                                id={index + "id"}
                                onClick={selectDropDown}
                            >
                                {item.label}
                            </DropDownListLi>
                        ))}
                    </DropDownListUl>
                )}
            </Container>
        </>
    )
}

const Container = styled.div`
    padding: 10px;
`

const actvBorderRadius = '10px 10px 0 0';
const inactvBorderRadius = '10px 10px 10px 10px';

const CustomInputContainer = React.memo(styled.div<{ hasInputValue: boolean }>`
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 16px;
    border: 1px solid lightgray;
    border-radius: ${props => props.hasInputValue ? actvBorderRadius : inactvBorderRadius};
    background-color: white;
    z-index: 99;
    &:focus-within {
        box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
    }
`)

const CustomInput = styled.input`
    flex-grow: 1;
    width: 200px;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 16px;
`

const DeleteButton = React.memo(styled.button`
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
`)

const DropDownListUl = styled.ul`
    position: absolute;
    width: 202px;
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

    &.selected {
      background-color: lightgray;
    }
`

export default React.memo(CustomAutoComplete);