import { TextField } from "@material-ui/core";
import { AutocompleteInputChangeReason } from "@material-ui/lab";
import Autocomplete from '@mui/material/Autocomplete';
import React, { ChangeEvent, EventHandler, SyntheticEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../store/RiotApi";

let timer: NodeJS.Timeout;

export default function UserSearchAutoComplete() {
    interface UserList {
        label?: string
    }


    useEffect(() => {
        // console.log(autoComplete)
    }, [])
    
    const [userList, setUserList] = useState<UserList[]>([]);

    const navigate = useNavigate();

    const handleChangeAutoComplete = (e: React.SyntheticEvent, value: UserList | null) => {
        if(value?.label){
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
        clearTimeout(timer);
        timer = setTimeout(async () => {
            if(value.includes("#")){
                console.log(value);
                const [label, tagline] = value.split("#");
                const USER_LIST = await getAccountData(label, tagline, true);
                setUserList([USER_LIST]);
            }
        }, 1000);

    }

    useEffect(() => {
        console.log("렌더링")
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
                renderInput={(params) => <TextField {...params} label="유저 검색"/>}
            />
        </>
    )
}