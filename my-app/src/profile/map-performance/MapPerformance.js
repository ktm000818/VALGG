"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = require("react");
const recoil_1 = require("recoil");
const commonStyledComponents_1 = require("../../components/commonStyledComponents");
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
require("./map_performance.css");
function MapPerfomance() {
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const mapInfos = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.matchHistoryGroupByMapState);
    function toggleShowMoreMapInfo() {
        setShowMore(prev => !prev);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(MapPerformanceWrapper, { children: (0, jsx_runtime_1.jsxs)(MapPerformanceDetailWrapper, { children: [(0, jsx_runtime_1.jsxs)(MapPerformanceHeader, { children: [(0, jsx_runtime_1.jsx)(MapPerformanceLabel, { children: "\uB9F5 \uD37C\uD3EC\uBA3C\uC2A4" }), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) }))] }), (0, jsx_runtime_1.jsxs)(MapPerformanceInfoWrapper, { children: [mapInfos.map((info, index) => {
                                if (!showMore && index > 2) {
                                    return null;
                                }
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(MapPerformanceInfo, { children: [(0, jsx_runtime_1.jsx)(MapPerformanceInfoMapImageWrapper, { children: (0, jsx_runtime_1.jsx)("img", { width: 80, height: 40, src: `https://opgg-valorant-cdn.akamaized.net/Maps/${info.map}.png`, alt: "이미지 없음" }) }), (0, jsx_runtime_1.jsx)(MapPerformanceInfoMap, { children: (0, jsx_runtime_1.jsx)(MapPerformanceMapLabel, { children: info.map }) }), (0, jsx_runtime_1.jsxs)(MapPerformanceInfoWinratioWrapper, { children: [(0, jsx_runtime_1.jsxs)(MapPerformanceWinratio, { children: [info.winRatio, "%"] }), (0, jsx_runtime_1.jsx)(MapPerformanceMatchCount, { children: `${info.matchWins}승 - ${info.matchDefeats}패` })] })] }) }));
                            }), (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButtonWrapper, { children: (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButton, Object.assign({ onClick: toggleShowMoreMapInfo }, { children: showMore ? "닫기" : "더보기" })) })] })] }) }) }));
}
exports.default = MapPerfomance;
const MapPerformanceWrapper = styled_1.default.div `
    width: 330px;
`;
const MapPerformanceDetailWrapper = styled_1.default.div `
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`;
const MapPerformanceHeader = styled_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`;
const MapPerformanceLabel = styled_1.default.span `
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const MapPerformanceInfoWrapper = styled_1.default.div `
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`;
const MapPerformanceInfo = styled_1.default.div `
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`;
const MapPerformanceInfoMapImageWrapper = styled_1.default.div ` 
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`;
const MapPerformanceInfoMap = styled_1.default.div `
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`;
const MapPerformanceMapLabel = styled_1.default.span `
    font-size: 11px;
    font-weight: bold;
`;
const MapPerformanceInfoWinratioWrapper = styled_1.default.div `
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
`;
const MapPerformanceWinratio = styled_1.default.span `
    font-size: 11px;
    color: #e05271;
    font-weight: bold;
    text-align: right;
`;
const MapPerformanceMatchCount = styled_1.default.span `
    font-size: 11px;
    text-align: right;
`;
