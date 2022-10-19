import CustomAgentSearchAutoComplete from "../../components/CustomAgentSearchAutoComplete";
import WinRatioPieChart from "../../components/WinRatioPieChart";
import "./main_stats.css";

export default function MainStats() {
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
                            <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}>5게임 4승 1패</span>
                            <div style={{ display: "flex", marginTop: "10px", alignContent: "center" }}>
                                <WinRatioPieChart />
                                <div style={{ display: "flex", flexDirection: "column", margin: "0 0 0 20px" }}>
                                    <div>
                                        <span style={{ fontSize: "11px" }}>18.4 / </span>
                                        <span style={{ fontSize: "11px", color: "#E84057" }}>23.3 </span>
                                        <span style={{ fontSize: "11px" }}>/12.1 </span>
                                    </div>
                                    <span style={{ fontSize: "20px", fontWeight: "bold" }}>1.53 : 1</span>
                                    <span style={{ fontSize: "11px", marginTop: "2px", color: "#E84057" }}>킬 관여율 22.32%</span>
                                </div>
                            </div>
                        </div>
                        <div className="chart_s2_container">
                            <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}>최근 20 게임 플레이한 요원</span>
                            <div style={{ display: "flex", marginTop: "10px", alignContent: "center" }}>
                                {/* <WinRatioPieChart /> */}
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <div style={{ display: "flex" }}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img width={24} height={24} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                                            <span style={{ fontSize: "11px" }}>피닉스</span>
                                            <span style={{ fontSize: "11px", color: "#E84057" }}>40% 2승 3패  1.37:1 평점</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img width={24} height={24} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", margin: "5px" }}>
                                            <span style={{ fontSize: "11px" }}>피닉스</span>
                                            <span style={{ fontSize: "11px", color: "#E84057" }}>40% 2승 3패  1.37:1 평점</span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{display: "flex", alignItems: "center"}}>
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
                            <span style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}>선호 클래스 (랭크)</span>
                            <div style={{ display: "flex", marginTop: "10px", alignContent: "center", justifyContent: "space-between" }}>
                                <div style={{width: "20px", height: "100%", border: "1px solid black"}}>
                                    
                                </div>
                                <div style={{width: "20px", height: "100%", border: "1px solid black"}}>
                                </div>
                                <div style={{width: "20px", height: "100%", border: "1px solid black"}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}