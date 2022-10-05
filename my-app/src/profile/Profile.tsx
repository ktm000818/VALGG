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
            <div className="profile_container">
                <div style={{ width: "1300px", padding: "0 110px", margin: "0 auto", boxSizing: "border-box" }}>
                    <div style={{ height: "200px", display: "flex", padding: "46px 0 24px", boxSizing: "border-box" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ display: "flex", borderRadius: "10px", overflow: "hidden" }}>
                                <img src="https://valorant.op.gg/images/profile.png" width={"100px"} height={"100px"} />
                            </div>
                            <div style={{ padding: "0 24px"}}>
                                <div>
                                    <strong style={{fontSize: "24px"}}>김된모</strong>
                                    <span style={{ color: "lightgray" }}>#ZERG</span>
                                </div>
                                <div>
                                    <span style={{ color: "lightgray", fontSize: "11px" }}>래더 랭킹</span>
                                    <span style={{ color: "lightblue", fontSize: "11px", marginLeft: "4px" }}>1231th</span>
                                </div>
                                <div style={{marginTop: "16px"}}>
                                    <button>전적 갱신</button>
                                </div>
                                <div>
                                    <span style={{ color: "lightgray", fontSize: "11px" }}>최근 업데이트: 2일 전</span>
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