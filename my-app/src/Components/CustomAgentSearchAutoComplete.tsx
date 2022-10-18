import styled from "@emotion/styled"
import React, { KeyboardEventHandler, useCallback, useEffect, useState } from "react";
import { debounce } from "../Utils";
import PropTypes from "prop-types";

interface properties {
    options: dropDownList[];
    id: string;
    onChange: (value: string) => void;
    onInputChange: (value: string) => void;
}

interface dropDownList {
    name: string
}

const CustomAgentSearchAutoComplete = ({ 
    options = [{ name: '' }],
    id = '',
    onChange = () => { },
    onInputChange = () => { },
}: properties) => {

    return (
        <>
            <Container>
                <CustomInputContainer id={id}>
                    <CustomInput />
                    <SearchButton >o</SearchButton>
                </CustomInputContainer>
                {/* {hasInputValue && ( */}
                    <DropDownListUl>
                        {options.length === 1 && options[0]?.name === '' && <DropDownListLi key={0}>검색 중 . . .</DropDownListLi>}
                        {options.map((item, index) => (
                            <DropDownListLi
                                key={index}
                                id={index + "id"}
                            >
                                {item.name}
                            </DropDownListLi>
                        ))}
                    </DropDownListUl>
                {/* )} */}
            </Container>
        </>
    )
};

const Container = styled.div`
`

const CustomInputContainer = styled.div`
    position: relative;
    display: flex;
    padding: 7px;
    border: 1px solid transparent;
    border-radius: 4px;
    background-color: #1C1C1F;
    z-index: 99;
    &:focus-within {
        box-shadow: 0 10px 10px rgb(0, 0, 0, 0.3);
    }
`

const CustomInput = styled.input`
    flex-grow: 1;
    width: 200px;
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 12px;
    color: white;
`

const SearchButton = styled.button`
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    color: #7B7A8E;
    border: none;
    cursor: pointer;
`

const DropDownListUl = styled.ul`
    position: absolute;
    width: 200px;
    display: block;
    list-style: none;
    background-color: white;
    margin: 0px;
    padding: 4px;
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

export default React.memo(CustomAgentSearchAutoComplete);