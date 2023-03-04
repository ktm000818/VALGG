"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("react");
const WinRatioPieChart_1 = __importDefault(require("../../components/WinRatioPieChart"));
require("./main_stats.css");
const lodash_1 = __importDefault(require("lodash"));
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
const recoil_1 = require("recoil");
const styled_1 = __importDefault(require("@emotion/styled"));
const translate_1 = require("../../store/translate");
function MainStats() {
    const agentInfos = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.agentInfoState);
    const wholeStat = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.winRatioAndKDARatingState);
    (0, react_1.useEffect)(() => {
        console.log(agentInfos);
    }, [agentInfos]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MainStatsWrapper, { children: (0, jsx_runtime_1.jsxs)(MainStatsSearchWrapper, { children: [(0, jsx_runtime_1.jsx)(StatsSearchWrapper, { children: (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) })) }), (0, jsx_runtime_1.jsxs)(StatsChartWrapper, { children: [(0, jsx_runtime_1.jsxs)(ChartSection1Wrapper, { children: [lodash_1.default.isEmpty(wholeStat) && ((0, jsx_runtime_1.jsx)("h2", { children: "Loading..." })), !lodash_1.default.isEmpty(wholeStat) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(WinLoseCount, { children: `${wholeStat.matchCount}게임 ${wholeStat.matchWins}승 ${wholeStat.matchCount - wholeStat.matchWins}패` }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center" } }, { children: [(0, jsx_runtime_1.jsx)(WinRatioPieChart_1.default, { matchWins: wholeStat.matchWins, matchDefeats: wholeStat.matchDefeats, matchCount: wholeStat.matchCount }), (0, jsx_runtime_1.jsxs)(ChartDetailWrapper, { children: [(0, jsx_runtime_1.jsxs)(KDAWrapper, { children: [(0, jsx_runtime_1.jsx)(ChartDetailKill, { children: `${(wholeStat.kills / wholeStat.matchCount).toFixed(1)} / ` }), (0, jsx_runtime_1.jsx)(ChartDetailDeath, { children: `${(wholeStat.deaths / wholeStat.matchCount).toFixed(1)}` }), (0, jsx_runtime_1.jsx)(ChartDetailAssists, { children: ` / ${(wholeStat.assists / wholeStat.matchCount).toFixed(1)}` })] }), (0, jsx_runtime_1.jsxs)(Rating, { children: [`${(((wholeStat.kills / wholeStat.matchCount) + (wholeStat.assists / wholeStat.matchCount)) / (wholeStat.deaths / wholeStat.matchCount)).toFixed(2)}`, " : 1"] }), (0, jsx_runtime_1.jsx)(InvolvementRate, { children: "\uD0AC \uAD00\uC5EC\uC728 22.32%" })] })] }))] }))] }), (0, jsx_runtime_1.jsxs)(ChartSection2Wrapper, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { display: "flex", color: "#7B7AB2", fontSize: "12px" } }, { children: "\uCD5C\uADFC 5 \uAC8C\uC784 \uD50C\uB808\uC774\uD55C \uC694\uC6D0" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center" } }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", flexDirection: "column", } }, { children: agentInfos.map((info) => {
                                                return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)("img", { width: 24, height: 24, src: info.AGENT_ICON_URL }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", margin: "5px" } }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: (0, translate_1.getAgentName)(info.agent) })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", color: "#E84057" } }, { children: `${info.winRatio}% ${info.matchWins}승 ${info.matchCount - info.matchWins}패 ${info.avgRecord}:1 평점` }))] }))] })));
                                            }) })) }))] }), (0, jsx_runtime_1.jsxs)(ChartSection3Wrapper, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { display: "flex", color: "#7B7AB2", fontSize: "12px", justifyContent: "center" } }, { children: "\uC120\uD638 \uD074\uB798\uC2A4 (\uB7AD\uD06C)" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center", justifyContent: "space-around" } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Duelist.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Initiator.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Sentinel.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Controller.svg" }) }))] }))] }))] })] })] }) }) }));
}
exports.default = MainStats;
const MainStatsWrapper = styled_1.default.div `
    width: 740px;
`;
const MainStatsSearchWrapper = styled_1.default.div `
    background-color: #31313c;
    border-radius: 4px;
`;
const StatsSearchWrapper = styled_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`;
// const Rating = styled.span`    
//     font-size: 14px;
//     font-weight: bold;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `
const Act = styled_1.default.span `
    width: 100px;
`;
const StatsChartWrapper = styled_1.default.div `    
    display: flex;
    padding: 16px 16px;
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`;
const ChartSection1Wrapper = styled_1.default.div `    
    flex-basis: 37.5%;
    flex-direction: column;
`;
const ChartSection2Wrapper = styled_1.default.div `
    flex-basis: 37.5%;
`;
const ChartSection3Wrapper = styled_1.default.div `
    flex-basis: 25%;
    flex-direction: column;
`;
const WinLoseCount = styled_1.default.span `
    display: flex;
    color: #7B7AB2;
    font-size: 12px;
`;
const ChartDetailWrapper = styled_1.default.div `
    display: flex;
    flex-direction: column;
    margin: 0 0 0 20px;
`;
const KDAWrapper = styled_1.default.div `
    
`;
const ChartDetailKill = styled_1.default.span `
    font-size: 11px;
`;
const ChartDetailDeath = styled_1.default.span `
    font-size: 11px;
    color: #E84057;
`;
const ChartDetailAssists = styled_1.default.span `
    font-size: 11px;
`;
const Rating = styled_1.default.span `
    font-size: 20px;
    font-weight: bold;
`;
const InvolvementRate = styled_1.default.span `
    font-size: 11px;
    margin-top: 2px;
    color: #E84057;
`;
