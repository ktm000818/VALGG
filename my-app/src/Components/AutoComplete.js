import styled from "@emotion/styled"
import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "../Utils";

const dataList = [
    { label: "인셉션" },
    { label: "알라딘" },
    { label: "반지의 제왕" },
    { label: "추격자" },
    { label: "인랑" },
    { label: "추노" },
    { label: "노트북" },
    { label: "트와일라잇" },
]

export default function AutoComplete() {

    const [inputValue, setInputValue] = useState('');
    const [hasInputValue, SetHasInputValue] = useState(false);
    const [dropDownList, setDropDownList] = useState(dataList);
    const [dropDownLiKey, setDropDownLiKey] = useState(-1);

    useEffect(() => {
        if(inputValue){
            SetHasInputValue(true);
        }else{
            SetHasInputValue(false);
        }

        filterDropDownList();
    }, [inputValue])

    const filterDropDownList = () => {
        if (inputValue === '') {
            setDropDownList([]);
        } else {
            const dropDownList = dataList.filter(item => item.label.includes(inputValue));
            setDropDownList(dropDownList);
        }
    }

    const handleChange = useCallback(({ target: { value } }) => {
        setInputValue(value);
    }, [inputValue])

    const selectDropDown = useCallback((e) => {
        alert(e.target.innerText);
        setInputValue('');
    }, [inputValue])

    const deleteInputValue = useCallback(() => {
        setInputValue('');
    }, [inputValue])

    const handleKeyPress = (e) => {
        if (inputValue) {
            console.log(e.key)
            switch (e.key) {
                case 'ArrowUp':
                    setDropDownLiKey((prev) => prev++);
                    break;
                case 'ArrowDown':
                    setDropDownLiKey((prev) => prev--);

                    break;
                case 'Enter':

                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            <Container>
                <CustomInputContainer hasInputValue={hasInputValue}>
                    <CustomInput value={inputValue} onChange={handleChange} />
                    <DeleteButton onClick={deleteInputValue}>x</DeleteButton>
                </CustomInputContainer>
                {hasInputValue && (
                    <DropDownListUl>
                        {dropDownList.length === 0 && <DropDownListLi>검색결과가 없습니다.</DropDownListLi>}
                        {dropDownList.map((item, index) => (
                            <>
                                <DropDownListLi key={index} onClick={selectDropDown}>{item.label}</DropDownListLi>
                            </>
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

const CustomInputContainer = styled.div`
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
`

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

const DeleteButton = styled.button`
    position: absolute;
    width: 30px;
    right: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
`

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

`