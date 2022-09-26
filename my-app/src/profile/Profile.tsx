import { useEffect } from "react";
import { useLocation } from "react-router-dom"
import { getAccountData } from "../store/RiotApi";


export default function Profile(){
    type USERDATA = Awaited<Promise<object>>;
    let USER_DATA: USERDATA = {};
    const location = useLocation();

    async function fetchUserData(){
        try {
            USER_DATA = await getAccountData(location.state.username, location.state.tagline);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <>
            {/* name: {USER_DATA.data} */}
            {/* <img src={}/> */}
        </>
    )
}