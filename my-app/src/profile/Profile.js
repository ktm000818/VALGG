import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAccountDataTest, getAllUserData } from "../store/RiotApi";
import './profile.css';

export default function Profile() {
    const [defaultUserData, setDefaultUserData] = useState({});
    const [userData, setUserData] = useState({});
    const { name, tag } = useLocation().state;
    const [latestFiveGameKDRatio, setLatestFiveGameKDRatio] = useState(0);

    useEffect(() => {
        getDefaultUserData()
    }, [name])

    useEffect(() => {
        if (defaultUserData?.name)
            setWholeUserData();
    }, [defaultUserData])

    useEffect(() => {
        if(userData?.MatchHistory)
            setLatestFiveGameKDRatio(getKDRatio(getLatestFiveGamesKD(userData.puuid)));
    }, [userData])

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
        const { name, tag, region, puuid } = defaultUserData;
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
            // MMR History만 Array로 반환됨.
            if(Array.isArray(curr.data.data)) {
                if(Object.keys(curr.data.data[0]).includes("players")){
                    return { ...prev,  MatchHistory: curr.data.data}
                }else{
                    return { ...prev, MMRHistory: curr.data.data }
                }
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

    function setDefaultRankImage(e) {
        e.target.src = '';
    }

    function getLatestFiveGames(){
        return userData.MatchHistory ?? [];
    }

    function getLatestFiveGamesKD(player_puuid = ''){
        const LATEST_FIVE_GAME = getLatestFiveGames();

        const killDeath = LATEST_FIVE_GAME.reduce((PREVIOUS_GAME, CURRENT_GAME) => {
            const PLAYER = CURRENT_GAME.players.all_players.filter(player => player.puuid === player_puuid)[0];
            if(PREVIOUS_GAME.kills === undefined){
                return {kills: 0, deaths: 0}
            }else{
                return {kills: PLAYER.stats.kills + PREVIOUS_GAME.kills, deaths: PLAYER.stats.deaths + PREVIOUS_GAME.deaths}
            }
        }, {})

        return killDeath;
    }

    function getKDRatio(killDeath = {}) {
        const {kills, deaths} = killDeath;
        
        if(deaths === 0){
            return kills;
        }else{
            const ratio = kills / deaths;
            return ratio.toFixed(2);
        }
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const {card, last_update, current_data} = userData;

    return (
        <>
            <div className="profile_header_container">
                <div className="profile_header">
                    <div className="profile_container">
                        <div className="profile">
                            <div className="profile_image_container">
                                <img className="profile_image" src={card?.small} />
                            </div>
                            <div className="profile_info_container">
                                <div>
                                    <strong className="profile_name">{userData?.name}</strong>
                                    <span className="profile_tag">#{userData?.tag}</span>
                                </div>
                                <div>
                                    <span className="profile_ladder">래더 랭킹</span>
                                    <span className="profile_ladder_rank">1231th</span>
                                </div>
                                <div>
                                    <button className="history_update_button" onClick={setWholeUserData}>전적 갱신</button>
                                </div>
                                <div>
                                    <span className="lastest_update_date">최근 업데이트: {last_update}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main_container">
                <div className="main_defail_container">
                    <div className="stats_container">
                        <div className="stats_detail_container">
                            <div className="stats_rating_container">
                                <span className="rating">레이팅</span>
                                <select className="act"></select>
                            </div>
                            <div className="rank_info_container">
                                <div className="rank_image_container">
                                    {current_data?.currenttier && (
                                        <img className="rank_image" src={current_data?.images?.small} onError={setDefaultRankImage} />
                                    )}
                                </div>
                                <div className="rank_stats_container">
                                    <span className="rank">{current_data?.currenttierpatched ?? "unranked"}</span>
                                    <span className="kda">최근 5게임 KD 비율 {latestFiveGameKDRatio} : 1</span>
                                    <span className="winlose">시즌 전적 : todo</span>
                                </div>
                            </div>

                            <div className="record_container">
                                <div className="record_dpr_container">
                                    <span className="dpr_label">데미지/라운드</span>
                                    <span className="dpr">1</span>
                                </div>
                                <div className="record_kd_container">
                                    <span className="kd_ratio_label">K/D 비율</span>
                                    <span className="kd">1</span>
                                </div>
                                <div className="record_win_ratio_container">
                                    <span className="win_ratio_label">승률</span>
                                    <span className="win_ratio">1</span>
                                </div>
                                <div className="record_spr_container">
                                    <span className="spr_label">점수/라운드</span>
                                    <span className="spr">1</span>
                                </div>
                                <div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style={{ width: "740px", maxWidth: "740px", border: "1px solid black" }}>
                    </div>
                </div>
            </div>
        </>
    )
}