import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccountDataTest, getAllUserData } from "../store/RiotApi";
import ProfileCard from "./profile-card/ProfileCard"
import Rating from "./rating/Rating";
import "./profile.css"
import AgentPerfomance from "./agent-performance/AgentPerformance";
import TopWeapon from "./top-weapon/TopWeapon";
import MapPerfomance from "./map-performance/MapPerformance";
import MainStats from "./main-stats/MainStats";

export default function Profile() {
    const [defaultUserData, setDefaultUserData] = useState({});
    const [userData, setUserData] = useState({});
    const { name, tag } = useLocation().state;

    useEffect(() => {
        getDefaultUserData()
    }, [name])

    useEffect(() => {
        if (defaultUserData?.name)
            setWholeUserData();
    }, [defaultUserData])

    /**
     * 유저 기본정보 조회
     */
    async function getDefaultUserData() {
        try {
            const DEFAULT_USER_DATA = await getAccountDataTest({ name, tag }).then(res => res.data.data);
            setDefaultUserData(DEFAULT_USER_DATA);

        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 유저의 전체 데이터 조회
     */
    async function getWholeUserData(matchFilter = "competitive") {
        const {
            name,
            tag,
            region,
            puuid
        } = defaultUserData;

        const prop = {
            name,
            tag,
            version: "v2",
            region,
            puuid,
            matchFilter: matchFilter
        };

        const result = await getAllUserData(prop).then(values => values);
        const filteredResult = result.reduce((prev, curr) => {
            const responseData = curr.data.data;
            if (Array.isArray(curr.data.data)) {
                if (responseData.length > 0 && Object.keys(responseData[0]).includes("players")) {
                    return { ...prev, MatchHistory: responseData }
                } else {
                    return { ...prev, MMRHistory: responseData }
                }
            } else {
                return { ...Object.assign({ ...prev }, responseData) }
            }
        }, {})

        return filteredResult;
    }

    const setWholeUserData = () => {
        getWholeUserData().then(res => {
            setUserData(res)
        })
    }

    return (
        <>
            <ProfileCard defaultUserData={defaultUserData} setWholeUserData={setWholeUserData} />
            <div className="main_container">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="side_container">
                        <Rating userData={userData} />
                        <AgentPerfomance userData={userData} />
                        <TopWeapon userData={userData} />
                        <MapPerfomance userData={userData} />
                    </div>
                    <main className="center_container">
                        <MainStats userData={userData}/>
                    </main>
                </div>

            </div>
        </>
    )
}