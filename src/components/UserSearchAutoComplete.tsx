import { Autocomplete, AutocompleteInputChangeReason, TextField } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../store/RiotApi";
import { debounce } from '../Utils';


export default function UserSearchAutoComplete() {


    interface UserList {
        label?: string
    }


    useEffect(() => {
    }, [])

    const [userList, setUserList] = useState<UserList[]>([]);

    const navigate = useNavigate();

    const handleChangeAutoComplete = (e: React.SyntheticEvent, value: UserList | null) => {
        if (value?.label) {
            const [username, tagline] = value.label.split("#");
            navigate(`/profile?username=${username}&tagline=${tagline}`, {
                state: {
                    username,
                    tagline
                }
            })
        }
    }

    const handleChangeTextField = async (e: React.SyntheticEvent, value: string, reason: AutocompleteInputChangeReason) => {
        debounce(async () => {
            if (value.includes("#")) {
                const [label, tagline] = value.split("#");
                const USER_LIST = await getAccountData(label, tagline, true);
                setUserList([USER_LIST]);
            }
        }, 2000)
    }

    useEffect(() => {
    })

    return (
        <>
            <Autocomplete
                disablePortal
                id="user-select-autocomplete"
                options={userList}
                onInputChange={handleChangeTextField}
                onChange={handleChangeAutoComplete}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="유저 검색" />}
            />
        </>
    )
}