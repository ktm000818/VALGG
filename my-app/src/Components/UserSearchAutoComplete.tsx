import { TextField } from "@material-ui/core";
import Autocomplete from '@mui/material/Autocomplete';
import React, { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSearchAutoComplete() {

    const navigate = useNavigate();

    const handleChange = (e: React.SyntheticEvent, value: {label: string} | null) => {
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

    return (
        <>
            <Autocomplete
                disablePortal
                id="user-select-autocomplete"
                options={[
                    { label: "김윤숭#17세" },
                    { label: "Daystar#Lunar" },
                    { label: "연막쿨이야#ZERG" },
                    { label: "LUCAS Martin#IRMH" },
                    { label: "얼 곰#0818" },
                    { label: "DRX X1S#VSW1N" },
                    { label: "가재맨#기무현서뿌" }
                ]}
                onChange={handleChange}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="유저 검색" />}
            />
        </>
    )
}