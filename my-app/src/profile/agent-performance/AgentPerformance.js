import React, { useEffect, useState } from 'react';
import './agent_performance.css';

export default function AgentPerfomance({ userData }) {

    const [showMore, setShowMore] = useState(false);
    const [agentInfos, setAgentInfos] = useState([]);

    useEffect(() => {
        if(userData?.MatchHistory)
        setAgentInfos(getAgentInfos);
    }, [userData])

    function toggleShowMoreAgentInfo() {
        setShowMore(prev => !prev);
    }

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
            const {agent, assists, deaths, kills, match_result, score, AGENT_ICON_URL} = curr;

            if(prev[agent]){
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
            }else{
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

    return (
        <>
            <div className="agent_performance_container">
                <div className="agent_performance_detail_container">
                    <div className="agent_performance_header">
                        <span className="agent_performance">요원 퍼포먼스</span>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </div>
                    <div className="agent_performance_info_container">
                        
                        {agentInfos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <div className="agent_performance_info">
                                        <div className="agent_performance_info_agent_image_container">
                                            <img width={20} height={20} src={info.AGENT_ICON_URL}/>
                                        </div>
                                        <div className="agent_performance_info_agent">
                                            <span className="agent_performance_agent">{info.agent}</span>
                                            <span className="agent_performance_avgscore">{info.avgScore} 평균 점수</span>
                                        </div>
                                        <div className="agent_performance_info_record">
                                            <span className="agent_performance_record">{info.avgRecord}:1 평점</span>
                                            <span className="agent_performance_kda">{`${info.kills}/${info.deaths}/${info.assists}`}</span>
                                        </div>
                                        <div className="agent_performance_info_winratio">
                                            <span className="agent_performance_winratio">{info.winRatio}%</span>
                                            <span className="agent_performance_matchcount">{info.matchCount}게임</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div style={{display: "flex", justifyContent: "center", padding: "10px", cursor: "pointer"}} onClick={toggleShowMoreAgentInfo}>
                            <span style={{textAlign: "center"}}>
                                {showMore ? "닫기" : "더보기"}
                            </span>
                        </div>

                        </div>
                    </div>
                </div>
            </>
            )
}