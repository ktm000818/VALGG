import React, { Suspense, useEffect, useState } from 'react';
import CustomAgentSearchAutoComplete from "../../components/CustomAgentSearchAutoComplete";
import WinRatioPieChart from "../../components/WinRatioPieChart";
import "./main_stats.css";
import _ from "lodash";
import { agentInfoState, winRatioAndKDARatingState } from '../../store/playerWholeInfoStore';
import { useRecoilValue } from 'recoil';

export default function MainStats() {

    const agentInfos = useRecoilValue(agentInfoState);
    const wholeStat = useRecoilValue(winRatioAndKDARatingState);

    return (
        <>
            <div className="main_stats_container">
                <div className="main_stats_search_container">
                    <div className="stats_search_container">
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                        {/* <CustomAgentSearchAutoComplete /> */}
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