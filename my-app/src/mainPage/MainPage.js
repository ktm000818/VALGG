import React, { useState, useEffect, useCallback } from 'react';
import "./main_page.css"
import Autocomplete from '@mui/material/Autocomplete';
import UserSearchAutoComplete from "../components/UserSearchAutoComplete";
import { useNavigate } from 'react-router-dom';
import { getAccountData } from '../store/RiotApi';
import { debounce } from '../Utils';
import CustomAutoComplete from '../components/CustomAutoComplete';

export default function MainPage() {

    const [userList, setUserList] = useState([{ label: '' }]);
    const navigate = useNavigate();

    const handleChangeAutoComplete = useCallback((value) => {
        if (value) {
            const [username, tagline] = value.split("#");
            navigate(`/profile?username=${username}&tagline=${tagline}`, {
                state: {
                    username,
                    tagline
                }
            })
        }
    }, [navigate])

    const handleChangeTextField = useCallback(async (value) => {
        if (value.includes("#")) {
            debounce(async () => {
                const [label, tagline] = value.split("#");
                const USER_LIST = await getAccountData(label, tagline, true);
                setUserList([USER_LIST]);
            }, 500)
        } else {
            setUserList([{ label: '' }]);
        }
    }, [userList])

    return (
        <>
            <div className='main'>
                <div className='main_content'>
                    <div className='main_content_logo_image'>
                        <img src={"https://valorant.op.gg/images/valorant.png"} width="240px" />
                    </div>
                    <div className='main_content_autoComplete'>
                        <CustomAutoComplete options={userList} onInputChange={handleChangeTextField} onChange={handleChangeAutoComplete} style={{width: "500px"}}/>
                    </div>
                </div>
            </div>
        </>
    )
}