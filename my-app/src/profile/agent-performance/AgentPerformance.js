import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { agentPlayInfosState } from '../../store/playerWholeInfoStore';
import './agent_performance.css';

export default function AgentPerfomance() {

    const [showMore, setShowMore] = useState(false);
    const agentPlayInfos = useRecoilValue(agentPlayInfosState);

    function toggleShowMoreAgentInfo() {
        setShowMore(prev => !prev);
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
                        
                        {agentPlayInfos.map((info, index) => {

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