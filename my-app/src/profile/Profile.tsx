import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { getAccountData } from "../store/RiotApi";
import './profile.css';

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
            <div className="profile_header_container">
                <div className="profile_header">
                    <div className="profile_container">
                        <div className="profile">
                            <div className="profile_image_container">
                                <img className="profile_image"/>
                                {/* https://valorant.op.gg/images/profile.png */}
                            </div>
                            <div className="profile_info_container">
                                <div>
                                    <strong className="profile_name">닉네임</strong>
                                    <span className="profile_tag">#TAG</span>
                                </div>
                                <div>
                                    <span className="profile_ladder">래더 랭킹</span>
                                    <span className="profile_ladder_rank">1231th</span>
                                </div>
                                <div>
                                    <button className="history_update_button">전적 갱신</button>
                                </div>
                                <div>
                                    <span className="lastest_update_date">최근 업데이트: 2일 전</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", height: "100vh", margin: "1rem", padding: "1rem", border: "1px solid black" }}>
                <div style={{ flexGrow: "1", border: "1px solid black", marginRight: "1rem" }}>

                </div>
                <div style={{ flexGrow: "2", border: "1px solid black", marginLeft: "1rem" }}>

                </div>
            </div>
            name: {userData.name}
            <br />
            tag: {userData.tag}
            <br />
            level: {userData.account_level}
            <br />
            puuid: {userData.puuid}
            {/* <img src={}/> */}
        </>
    )
}