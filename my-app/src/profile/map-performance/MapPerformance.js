import React, { useEffect, useState } from 'react';
import './map_performance.css';

export default function MapPerfomance({ userData }) {

    const [showMore, setShowMore] = useState(false);
    const [mapInfos, setMapInfos] = useState([]);

    useEffect(() => {
        if (userData?.MatchHistory)
            getAndSetMatchHistoryGroupByMap();
    }, [userData])

    function toggleShowMoreMapInfo() {
        setShowMore(prev => !prev);
    }

    function getAndSetMatchHistoryGroupByMap() {
        const MATCH_HISTORY = userData.MatchHistory;

        const MatchHistoryGroupByMap = MATCH_HISTORY.reduce((prev, curr) => {
            const META_DATA = curr.metadata;
            const MAP = META_DATA.map;
            const PLAYER = curr.players.all_players.filter(player => player.puuid === userData.puuid)[0];
            const TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = curr.teams?.[TEAM].has_won ? 1 : 0;
            console.log(prev, curr)
            if (prev[MAP]) {
                return {
                    ...prev,
                    [MAP]: {
                        map: MAP,
                        metadata: [...prev[MAP].metadata, { ...META_DATA }],
                        matchWins: prev[MAP].matchWins + MATCH_RESULT,
                        winRatio: ((prev[MAP].matchWins + MATCH_RESULT) / (prev[MAP].matchCount + 1) * 100).toFixed(0),
                        matchCount: prev[MAP].matchCount + 1,
                        matchDefeats: (prev[MAP].matchCount + 1) - (prev[MAP].matchWins + MATCH_RESULT)

                    }
                }
            } else if (MAP) {
                return {
                    ...prev,
                    [MAP]: {
                        map: MAP,
                        metadata: [{ ...META_DATA }],
                        matchWins: MATCH_RESULT,
                        winRatio: MATCH_RESULT ? 100 : 0,
                        matchCount: 1,
                        matchDefeats: MATCH_RESULT ? 0 : 1
                    }
                }
            }
            else {
                return { ...prev }
            }
        }, {})

        console.log(MatchHistoryGroupByMap)

        setMapInfos(Object.values(MatchHistoryGroupByMap))
    }

    return (
        <>
            <div className="map_performance_container">
                <div className="map_performance_detail_container">
                    <div className="map_performance_header">
                        <span className="map_performance">맵 퍼포먼스</span>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </div>
                    <div className="map_performance_info_container">

                        {mapInfos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <div className="map_performance_info">
                                        <div className="map_performance_info_map_image_container">
                                            <img width={80} height={40} src={`https://opgg-valorant-cdn.akamaized.net/Maps/${info.map}.png`} alt={"이미지 없음"} />
                                        </div>
                                        <div className="map_performance_info_map">
                                            <span className="map_performance_map">{info.map}</span>
                                        </div>
                                        <div className="map_performance_info_winratio">
                                            <span className="map_performance_winratio">{info.winRatio}%</span>
                                            <span className="map_performance_matchcount">{`${info.matchWins}승 - ${info.matchDefeats}패`}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div style={{ display: "flex", justifyContent: "center", padding: "10px", cursor: "pointer" }} onClick={toggleShowMoreMapInfo}>
                            <span style={{ textAlign: "center" }}>
                                {showMore ? "닫기" : "더보기"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}