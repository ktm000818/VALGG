import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccountDataTest, getAllUserData } from "../store/RiotApi";
import './profile.css';

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
    async function getWholeUserData() {
        const { name, tag, region, puuid } = defaultUserData;
        const prop = {
            name,
            tag,
            version: "v2",
            region,
            puuid
        };

        const result = await getAllUserData(prop).then(values => values);

        const filteredResult = result.reduce((prev, curr) => {
            // MMR History만 Array로 반환됨.
            if (Array.isArray(curr.data.data)) {
                return { ...prev, MMRHistory: curr.data.data }
            } else {
                return { ...Object.assign({ ...prev }, curr.data.data) }
            }
        }, {})

        return filteredResult;
    }

    function setWholeUserData() {
        getWholeUserData().then(res => {
            setUserData(res)
        })
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <>
            <div className="profile_header_container">
                <div className="profile_header">
                    <div className="profile_container">
                        <div className="profile">
                            <div className="profile_image_container">
                                <img className="profile_image" src={userData?.card?.small} />
                            </div>
                            <div className="profile_info_container">
                                <div>
                                    <strong className="profile_name">{defaultUserData.name}</strong>
                                    <span className="profile_tag">#{defaultUserData.tag}</span>
                                </div>
                                <div>
                                    <span className="profile_ladder">래더 랭킹</span>
                                    <span className="profile_ladder_rank">1231th</span>
                                </div>
                                <div>
                                    <button className="history_update_button" onClick={setWholeUserData}>전적 갱신</button>
                                </div>
                                <div>
                                    <span className="lastest_update_date">최근 업데이트: {userData.last_update}</span>
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
        </>
    )
}