import React, { userState } from 'react';
import './agent_performance.css';

export default function AgentPerfomance({ userData }) {

    const [showMore, setShowMore] = useState(false);

    function toggleShowMoreAgentInfo() {
        setShowMore(true);
    }

    const infos = [
        { agentName: "zett", avgScore: 340, avgRecord: 1.99, kills: 152, deaths: 91, assists: 29, playedMatch: 3, winRatio: 80 },
        { agentName: "Omen", avgScore: 400, avgRecord: 2.49, kills: 999, deaths: 91, assists: 29, playedMatch: 2, winRatio: 100 },
    ]

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
                        <div className="agent_performance_info">
                            <div className="agent_performance_info_agent_image_container">
                                <img width={20} height={20} />
                            </div>
                            <div className="agent_performance_info_agent">
                                <span className="agent_performance_agent">제트</span>
                                <span className="agent_performance_avgscore">340 평균 점수</span>
                            </div>
                            <div className="agent_performance_info_record">
                                <span className="agent_performance_record">1.99:1 평점</span>
                                <span className="agent_performance_kda">152/91/29</span>
                            </div>
                            <div className="agent_performance_info_winratio">
                                <span className="agent_performance_winratio">80%</span>
                                <span className="agent_performance_matchcount">6게임</span>
                            </div>
                        </div>
                        <div className="agent_performance_info">
                            dfdf
                        </div>
                        <div className="agent_performance_info">
                            dfdf
                        </div>
                        {infos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <div className="agent_performance_info">
                                        <div className="agent_performance_info_agent_image_container">
                                            <img width={20} height={20} />
                                        </div>
                                        <div className="agent_performance_info_agent">
                                            <span className="agent_performance_agent">{info.agentName}</span>
                                            <span className="agent_performance_avgscore">{info.avgScore} 평균 점수</span>
                                        </div>
                                        <div className="agent_performance_info_record">
                                            <span className="agent_performance_record">{info.avgRecord}:1 평점</span>
                                            <span className="agent_performance_kda">`${info.kills}/${info.deaths}/${info.assists}`</span>
                                        </div>
                                        <div className="agent_performance_info_winratio">
                                            <span className="agent_performance_winratio">{info.winRatio}%</span>
                                            <span className="agent_performance_matchcount">{info.playedMatch}게임</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div className="agent_performance_info">
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