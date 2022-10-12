import './agent_performance.css';

export default function AgentPerfomance() {


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
                                <img width={20} height={20}/>
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
                    </div>
                </div>
            </div>
        </>
    )
}