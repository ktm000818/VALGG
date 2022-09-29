import React, { useState, useEffect } from 'react';
import "./main_page.css"
import Autocomplete from '@mui/material/Autocomplete';
import UserSearchAutoComplete from "../components/UserSearchAutoComplete";

export default function MainPage() {

    return (
        <>
            <div className='main'>
                <div className='main_content'>
                    <img src={"https://valorant.op.gg/images/valorant.png"} width="300px"/>
                    <UserSearchAutoComplete />
                </div>
            </div>
        </>
    )
}