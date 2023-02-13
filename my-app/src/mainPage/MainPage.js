import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomAutoComplete from '../components/CustomAutoComplete';
import { getAccountData } from '../store/RiotApi';
import { debounce } from '../Utils';

export default function MainPage() {

    const [userList, setUserList] = useState([{ name: '' }]);
    const navigate = useNavigate();

    const handleChangeAutoComplete = useCallback((value) => {
        if (value) {
            const [name, tag] = value.split("#");
            navigate(`/profile?name=${name}&tag=${tag}`, {
                state: {
                    name,
                    tag
                }
            })
        }
    }, [navigate])

    const handleChangeTextField = useCallback(async (value) => {
        if (value.includes("#")) {
            debounce(async () => {
                const [name, tag] = value.split("#");
                const USER_LIST = await getAccountData(name, tag, true);
                setUserList([USER_LIST]);
            }, 500)
        } else {
            setUserList([{ name: '' }]);
        }
    }, [userList])

    return (
        <>
            <MainWrapper>
                <MainContentWrapper>
                    <MainContentLogoImageWrapper>
                        <img src={"https://valorant.op.gg/images/valorant.png"} width="240px" />
                    </MainContentLogoImageWrapper>
                    <AutoCompleteWrapper>
                        <CustomAutoComplete options={userList} onInputChange={handleChangeTextField} onChange={handleChangeAutoComplete} style={{ width: "500px" }} />
                    </AutoCompleteWrapper>
                </MainContentWrapper>
            </MainWrapper>
        </>
    )
}

const MainWrapper = styled.div`
    background: url(https://valorant.op.gg/images/main_bg_desktop.jpeg) no-repeat center top;
    position: relative;
    min-height: 1080px;
    background-size: cover;
`

const MainContentWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 900px;
    margin: auto;
    padding-top: 50px;
`

const MainContentLogoImageWrapper = styled.div`
    width: 100%;
    position: absolute;
    left: 0;
`

const AutoCompleteWrapper = styled.div`
    position: absolute;
    margin: auto;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`