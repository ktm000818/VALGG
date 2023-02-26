import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAutoComplete from "../components/CustomAutoComplete";
import { getAccountData } from "../store/RiotApi";
import { debounce } from "../Utils";
import { ReactComponent as TitleImage } from '../assets/images/valorant.svg'

export default function Header() {

    const [userList, setUserList] = useState([{ name: '' }]);
    const navigate = useNavigate();

    const handleChangeAutoComplete = (value: string) => {
        if (value.includes("#")) {
            const [name, tag] = value.split("#");
            navigate(`/profile?name=${name}&tag=${tag}`, {
                state: {
                    name,
                    tag
                }
            })
        }
    };

    const handleChangeInput = async (value: string) => {
        if (value.includes("#")) {
            debounce(async () => {
                const [name, tag] = value.split("#");
                const USER_LIST = await getAccountData(name, tag, true);
                setUserList([USER_LIST]);
            }, 1000)
        } else {
            setUserList([{ name: '' }]);
        }
    };

    const moveToHome = () => {
        navigate('/');
    }

    return (
        <HeaderWrapper>
            <TitleImageWrapper>
                <TitleImage onClick={moveToHome}/>
                <HeaderTitle onClick={moveToHome}>Valorant</HeaderTitle>
            </TitleImageWrapper>
            <CustomAutoComplete id="header_auto_complete" options={userList} onInputChange={handleChangeInput} onChange={handleChangeAutoComplete} />
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #E84057;
    height: 80px;
`

const TitleImageWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px;
`

const HeaderTitle = styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 2rem;
    font-weight: bold;
`

// css