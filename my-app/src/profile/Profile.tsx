import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getAccountData } from "../store/RiotApi";

interface UserData {
    account_level?: number
    card?: object
    last_update?: string
    last_update_raw?: number
    name?: string
    puuid?: string
    region?: string,
    tag?: string
}

export default function Profile() {
    const [userData, setUserData] = useState<UserData>({});
    const location = useLocation();

    async function fetchUserData() {
        try {
            const USER_DATA: UserData = await getAccountData(location.state.username, location.state.tagline);
            setUserData(USER_DATA);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [location.state.username])

    return (
        <>
            name: {userData.name}
            <br/>
            tag: {userData.tag}
            <br/>
            level: {userData.account_level}
            <br/>
            puuid: {userData.puuid}
            {/* <img src={}/> */}
        </>
    )
}