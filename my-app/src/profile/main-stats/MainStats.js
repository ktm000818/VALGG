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
                            <span style={{color: "#7B7AB2", fontSize: "12px"}}>5게임 4승 1패</span>
                            <WinRatioPieChart/>
                        </div>
                        <div className="chart_s2_container">
                        <span style={{color: "#7B7AB2", fontSize: "12px"}}>최근 5 게임 플레이한 요원</span>

                        sdfsdfsfsdffsdddddddddddddddddd
                        </div>
                        <div className="chart_s3_container">
                        <span style={{color: "#7B7AB2", fontSize: "12px"}}>선호 클래스 랭크</span>

                        sdfsdfsfsdffsddddddddddddddddd
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}