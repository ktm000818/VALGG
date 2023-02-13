import React, { Suspense, useEffect, useState } from 'react';
import CustomAgentSearchAutoComplete from "../../components/CustomAgentSearchAutoComplete";
import WinRatioPieChart from "../../components/WinRatioPieChart";
import "./main_stats.css";
import _ from "lodash";

export default function MainStats({ userData }) {

    const [agentInfos, setAgentInfos] = useState([]);
    const [wholeStat, setWholeStat] = useState({});

    useEffect(() => {
        if (userData?.MatchHistory) {
            setAgentInfos(getAgentInfos);
        }
    }, [userData])

    useEffect(() => {
        if (agentInfos.length > 0) {
            setWholeStat(getWinRatioAndKDARating(agentInfos));
        }
    }, [agentInfos])

    function getAgentInfos() {

        const MATCH_HISTORY = userData.MatchHistory;

        let UNFILTERED_INFOS = MATCH_HISTORY.reduce((prev, curr) => {
            const PLAYER = curr.players.all_players.filter(player => player.puuid === userData.puuid)[0];
            const TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = curr.teams?.[TEAM].has_won ? 'WIN' : 'DEFEAT';
            const STATS = PLAYER.stats;
            const AGENT_ICON_URL = PLAYER.assets.agent.small;

            return [
                ...prev,
                {
                    agent: PLAYER.character,
                    score: STATS.score,
                    kills: STATS.kills,
                    deaths: STATS.deaths,
                    assists: STATS.assists,
                    match_result: MATCH_RESULT,
                    AGENT_ICON_URL
                }
            ]

        }, [])

        const FILTERED_INFOS = UNFILTERED_INFOS.reduce((prev, curr) => {
            const { agent, assists, deaths, kills, match_result, score, AGENT_ICON_URL } = curr;

            if (prev[agent]) {
                return {
                    ...prev,
                    [agent]: {
                        agent: agent,
                        assists: prev[agent].assists + assists,
                        deaths: prev[agent].deaths + deaths,
                        kills: prev[agent].kills + kills,
                        score: prev[agent].score + score,
                        avgRecord: (((prev[agent].kills + kills) + (prev[agent].assists + assists)) / (prev[agent].deaths + deaths)).toFixed(2),
                        avgScore: ((prev[agent].score + score) / (prev[agent].matchCount + 1)).toFixed(0),
                        winRatio: ((prev[agent].matchWins + (match_result === "WIN" ? 1 : 0)) / (prev[agent].matchCount + 1) * 100).toFixed(0),
                        matchWins: prev[agent].matchWins + (match_result === "WIN" ? 1 : 0),
                        matchCount: prev[agent].matchCount + 1,
                        AGENT_ICON_URL
                    }
                }
            } else {
                return {
                    ...prev,
                    [agent]: {
                        agent,
                        assists,
                        deaths,
                        kills,
                        score,
                        avgScore: score,
                        avgRecord: ((kills + assists) / deaths).toFixed(2),
                        winRatio: match_result === "WIN" ? 100 : 0,
                        matchWins: match_result === "WIN" ? 1 : 0,
                        matchCount: 1,
                        AGENT_ICON_URL
                    }
                }
            }
        }, {})

        return Object.values(FILTERED_INFOS);
    }

    function getWinRatioAndKDARating() {
        const STATS = agentInfos.reduce((prev, curr) => {
            const { kills, deaths, assists, matchCount, matchWins, score } = curr;
            const kdaRatio = (kills + deaths + assists) / deaths;
            const matchDefeats = matchCount - matchWins;
            if (prev?.matchCount) {
                return {
                    kills: prev.kills + kills,
                    deaths: prev.deaths + deaths,
                    assists: prev.assists + assists,
                    matchCount: prev.matchCount + matchCount,
                    matchWins: prev.matchWins + matchWins,
                    matchDefeats: prev.matchDefeats + matchDefeats,
                    kdaRatio: prev.kdaRatio + kdaRatio,
                    score: prev.score + score,

                }
            } else {
                return {
                    kills,
                    deaths,
                    assists,
                    matchCount,
                    matchWins,
                    matchDefeats,
                    kdaRatio,
                    score
                }
            }
        }, {})

        return STATS;
    }

    return (
        <>
            <div className="main_stats_container">
                <div className="main_stats_search_container">
                    <div className="stats_search_container">
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                        {/* options = [{name: '' }],
                                    id = '',
                                    onChange = () => { },
                                    onInputChange = () => { },
                                    style = {width: 200} */}
                        <CustomAgentSearchAutoComplete />
                    </div>
                    <div className="stats_chart_container">
                        <div className="chart_s1_container">
                            {_.isEmpty(wholeStat) && (<h2>Loading...</h2>)}
                            {!_.isEmpty(wholeStat) && (
                                <>
                                    <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}>{`${wholeStat.matchCount}게임 ${wholeStat.matchWins}승 ${wholeStat.matchCount - wholeStat.matchWins}패`}</span>
                                    <div style={{ display: "flex", marginTop: "10px", alignContent: "center" }}>

                                        <WinRatioPieChart matchWins={wholeStat.matchWins} matchDefeats={wholeStat.matchDefeats} matchCount={wholeStat.matchCount} />

                                        <div style={{ display: "flex", flexDirection: "column", margin: "0 0 0 20px" }}>
                                            <div>
                                                <span style={{ fontSize: "11px" }}>
                                                    {`${(wholeStat.kills / wholeStat.matchCount).toFixed(1)} / `}
                                                </span>
                                                <span style={{ fontSize: "11px", color: "#E84057" }}>
                                                {`${(wholeStat.deaths / wholeStat.matchCount).toFixed(1)}`}
                                                    
                                                </span>
                                                <span style={{ fontSize: "11px" }}>
                                                {` / ${(wholeStat.assists / wholeStat.matchCount).toFixed(1)}`}

                                                </span>
                                            </div>
                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                                                {`${(wholeStat.kdaRatio / wholeStat.matchCount).toFixed(2)}`} : 1
                                            </span>
                                            <span style={{ fontSize: "11px", marginTop: "2px", color: "#E84057" }}>킬 관여율 22.32%</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="chart_s2_container">
                            <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}>최근 20 게임 플레이한 요원</span>
                            <div style={{ display: "flex", marginTop: "10px", alignContent: "center" }}>
                                {/* <WinRatioPieChart /> */}
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img width={24} height={24} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                                            <span style={{ fontSize: "11px" }}>피닉스</span>
                                            <span style={{ fontSize: "11px", color: "#E84057" }}>40% 2승 3패  1.37:1 평점</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img width={24} height={24} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                                            <span style={{ fontSize: "11px" }}>피닉스</span>
                                            <span style={{ fontSize: "11px", color: "#E84057" }}>40% 2승 3패  1.37:1 평점</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <img width={24} height={24} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                                            <span style={{ fontSize: "11px" }}>피닉스</span>
                                            <span style={{ fontSize: "11px", color: "#E84057" }}>40% 2승 3패  1.37:1 평점</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="chart_s3_container">
                            <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px", justifyContent: "center" }}>선호 클래스 (랭크)</span>
                            <div style={{ display: "flex", marginTop: "10px", alignContent: "center", justifyContent: "space-around" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" }}>
                                        <span style={{ backgroundColor: "#5383E3", height: "20%" }}></span>
                                    </div>
                                    <div style={{ marginTop: "10px", display: "flex" }}>
                                        <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Duelist.svg" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" }}>
                                        <span style={{ backgroundColor: "#5383E3", height: "20%" }}></span>
                                    </div>
                                    <div style={{ marginTop: "10px", display: "flex" }}>
                                        <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Initiator.svg" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" }}>
                                        <span style={{ backgroundColor: "#5383E3", height: "20%" }}></span>
                                    </div>
                                    <div style={{ marginTop: "10px", display: "flex" }}>
                                        <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Sentinel.svg" />
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <div style={{ width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" }}>
                                        <span style={{ backgroundColor: "#5383E3", height: "20%" }}></span>
                                    </div>
                                    <div style={{ marginTop: "10px", display: "flex" }}>
                                        <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Controller.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}