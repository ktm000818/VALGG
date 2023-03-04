"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const react_1 = require("react");
const recoil_1 = require("recoil");
const styled_components_1 = __importDefault(require("styled-components"));
const commonStyledComponents_1 = require("../../components/commonStyledComponents");
const translate_1 = require("../../store/translate");
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
require("./agent_performance.css");
function AgentPerfomance() {
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const agentPlayInfos = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.agentPlayInfosState);
    function toggleShowMoreAgentInfo() {
        setShowMore(prev => !prev);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(AgentPerformanceWrapper, { children: (0, jsx_runtime_1.jsxs)(AgentPerformanceDetailWrapper, { children: [(0, jsx_runtime_1.jsxs)(AgentPerformancHeader, { children: [(0, jsx_runtime_1.jsx)(AgentPerformance, { children: "\uC694\uC6D0 \uD37C\uD3EC\uBA3C\uC2A4" }), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) }))] }), (0, jsx_runtime_1.jsxs)(AgentPerformanceInfoWrapper, { children: [agentPlayInfos.map((info, index) => {
                                if (!showMore && index > 2) {
                                    return null;
                                }
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(AgentPerformanceInfo, { children: [(0, jsx_runtime_1.jsx)(AgentPerformanceInfoAgentImageWrapper, { children: (0, jsx_runtime_1.jsx)("img", { width: 20, height: 20, src: info.AGENT_ICON_URL }) }), (0, jsx_runtime_1.jsxs)(AgentPerformanceInfoAgent, { children: [(0, jsx_runtime_1.jsx)(AgentPerformanceAgent, { children: (0, translate_1.getAgentName)(info.agent) }), (0, jsx_runtime_1.jsxs)(AgentPerformanceAvgscore, { children: [info.avgScore, " \uD3C9\uADE0 \uC810\uC218"] })] }), (0, jsx_runtime_1.jsxs)(AgentPerformanceInfoRecord, { children: [(0, jsx_runtime_1.jsxs)(AgentPerformanceRecord, { children: [info.avgRecord, ":1 \uD3C9\uC810"] }), (0, jsx_runtime_1.jsx)(AgentPerformanceKda, { children: `${info.kills}/${info.deaths}/${info.assists}` })] }), (0, jsx_runtime_1.jsxs)(AgentPerformanceInfoWinratio, { children: [(0, jsx_runtime_1.jsxs)(AgentPerformanceWinratio, { children: [info.winRatio, "%"] }), (0, jsx_runtime_1.jsxs)(AgentPerformanceMatchcount, { children: [info.matchCount, "\uAC8C\uC784"] })] })] }) }));
                            }), (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButtonWrapper, Object.assign({ onClick: toggleShowMoreAgentInfo }, { children: (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButton, { children: showMore ? "닫기" : "더보기" }) }))] })] }) }) }));
}
exports.default = AgentPerfomance;
const AgentPerformanceWrapper = styled_components_1.default.div `
    width: 330px;
`;
const AgentPerformanceDetailWrapper = styled_components_1.default.div `
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`;
const AgentPerformancHeader = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`;
const AgentPerformance = styled_components_1.default.span `
    font-size: 13px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const AgentPerformanceInfoWrapper = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`;
const AgentPerformanceInfo = styled_components_1.default.div `
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`;
const AgentPerformanceInfoAgentImageWrapper = styled_components_1.default.div `
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`;
const AgentPerformanceInfoAgent = styled_components_1.default.div `
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`;
const AgentPerformanceAgent = styled_components_1.default.span `
    font-size: 11px;
    font-weight: bold;
`;
const AgentPerformanceAvgscore = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
`;
const AgentPerformanceInfoRecord = styled_components_1.default.div `
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
`;
const AgentPerformanceRecord = styled_components_1.default.span `
    font-size: 11px;
    color: #9897a8;
    font-weight: bold;
`;
const AgentPerformanceKda = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
`;
const AgentPerformanceInfoWinratio = styled_components_1.default.div `
    flex-basis: 20%;
    display: flex;
    flex-direction: column;
`;
const AgentPerformanceWinratio = styled_components_1.default.span `
    font-size: 11px;
    color: #e05271;
    font-weight: bold;
    text-align: right;
`;
const AgentPerformanceMatchcount = styled_components_1.default.span `
    font-size: 11px;
    text-align: right;
`;
