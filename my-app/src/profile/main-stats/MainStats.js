"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const WinRatioPieChart_1 = __importDefault(require("../../components/WinRatioPieChart"));
require("./main_stats.css");
const lodash_1 = __importDefault(require("lodash"));
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
const recoil_1 = require("recoil");
function MainStats() {
    const agentInfos = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.agentInfoState);
    const wholeStat = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.winRatioAndKDARatingState);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "main_stats_container" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "main_stats_search_container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "stats_search_container" }, { children: (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "stats_chart_container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chart_s1_container" }, { children: [lodash_1.default.isEmpty(wholeStat) && ((0, jsx_runtime_1.jsx)("h2", { children: "Loading..." })), !lodash_1.default.isEmpty(wholeStat) && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { display: "flex", color: "#7B7AB2", fontSize: "12px" } }, { children: `${wholeStat.matchCount}게임 ${wholeStat.matchWins}승 ${wholeStat.matchCount - wholeStat.matchWins}패` })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center" } }, { children: [(0, jsx_runtime_1.jsx)(WinRatioPieChart_1.default, { matchWins: wholeStat.matchWins, matchDefeats: wholeStat.matchDefeats, matchCount: wholeStat.matchCount }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", margin: "0 0 0 20px" } }, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: `${(wholeStat.kills / wholeStat.matchCount).toFixed(1)} / ` })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", color: "#E84057" } }, { children: `${(wholeStat.deaths / wholeStat.matchCount).toFixed(1)}` })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: ` / ${(wholeStat.assists / wholeStat.matchCount).toFixed(1)}` }))] }), (0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { fontSize: "20px", fontWeight: "bold" } }, { children: [`${(wholeStat.kdaRatio / wholeStat.matchCount).toFixed(2)}`, " : 1"] })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", marginTop: "2px", color: "#E84057" } }, { children: "\uD0AC \uAD00\uC5EC\uC728 22.32%" }))] }))] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chart_s2_container" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { display: "flex", color: "#7B7AB2", fontSize: "12px" } }, { children: "\uCD5C\uADFC 20 \uAC8C\uC784 \uD50C\uB808\uC774\uD55C \uC694\uC6D0" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center" } }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)("img", { width: 24, height: 24 }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", margin: "5px" } }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: "\uD53C\uB2C9\uC2A4" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", color: "#E84057" } }, { children: "40% 2\uC2B9 3\uD328  1.37:1 \uD3C9\uC810" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)("img", { width: 24, height: 24 }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", margin: "5px" } }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: "\uD53C\uB2C9\uC2A4" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", color: "#E84057" } }, { children: "40% 2\uC2B9 3\uD328  1.37:1 \uD3C9\uC810" }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { display: "flex", alignItems: "center" } }, { children: (0, jsx_runtime_1.jsx)("img", { width: 24, height: 24 }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column", margin: "5px" } }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px" } }, { children: "\uD53C\uB2C9\uC2A4" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ style: { fontSize: "11px", color: "#E84057" } }, { children: "40% 2\uC2B9 3\uD328  1.37:1 \uD3C9\uC810" }))] }))] }))] })) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "chart_s3_container" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ style: { display: "flex", color: "#7B7AB2", fontSize: "12px", justifyContent: "center" } }, { children: "\uC120\uD638 \uD074\uB798\uC2A4 (\uB7AD\uD06C)" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", marginTop: "10px", alignContent: "center", justifyContent: "space-around" } }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Duelist.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Initiator.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Sentinel.svg" }) }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { display: "flex", flexDirection: "column" } }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { width: "16px", height: "88px", backgroundColor: "#424254", display: "flex", flexDirection: "column-reverse" } }, { children: (0, jsx_runtime_1.jsx)("span", { style: { backgroundColor: "#5383E3", height: "20%" } }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: "10px", display: "flex" } }, { children: (0, jsx_runtime_1.jsx)("img", { src: "https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Controller.svg" }) }))] }))] }))] }))] }))] })) })) }));
}
exports.default = MainStats;
