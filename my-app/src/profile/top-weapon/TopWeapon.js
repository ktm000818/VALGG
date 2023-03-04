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
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
require("./top_weapon.css");
function TopWeapon() {
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const usedWeaponInfos = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.weaponStatsInfoState);
    function toggleShowMoreUsedWeaponInfo() {
        setShowMore(prev => !prev);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(TopWeaponStatsWrapper, { children: (0, jsx_runtime_1.jsxs)(TopWeaponStatsDetailWrapper, { children: [(0, jsx_runtime_1.jsxs)(TopWeaponStatsHeader, { children: [(0, jsx_runtime_1.jsx)(TopWeaponLabel, { children: "Top \uBB34\uAE30" }), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) }))] }), (0, jsx_runtime_1.jsxs)(TopWeaponInfoWrapper, { children: [usedWeaponInfos.map((info, index) => {
                                if (!showMore && index > 2) {
                                    return null;
                                }
                                return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(TopweaponInfo, { children: [(0, jsx_runtime_1.jsx)(TopWeaponInfoWeaponImageWrapper, { children: info.WEAPON_IMAGE_ASSETS ? ((0, jsx_runtime_1.jsx)("img", { width: 60, height: 15, src: info.WEAPON_IMAGE_ASSETS })) : ((0, jsx_runtime_1.jsx)("span", Object.assign({ style: { width: 60, fontSize: 11, textAlign: "center" } }, { children: "\uC774\uBBF8\uC9C0\uC5C6\uC74C" }))) }), (0, jsx_runtime_1.jsxs)(TopWeaponInfoWeapon, { children: [(0, jsx_runtime_1.jsx)(TopWeaponAgent, { children: info.weaponName }), (0, jsx_runtime_1.jsx)(TopWeaponAvgscore, { children: "weapon " })] }), (0, jsx_runtime_1.jsx)(TopWeaponInfoRecord, { children: (0, jsx_runtime_1.jsx)(TopWeaponRecord, { children: info.kill }) })] }, index) }));
                            }), (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButtonWrapper, Object.assign({ onClick: toggleShowMoreUsedWeaponInfo }, { children: (0, jsx_runtime_1.jsx)(commonStyledComponents_1.ToggleButton, { children: showMore ? "닫기" : "더보기" }) }))] })] }) }) }));
}
exports.default = TopWeapon;
const TopWeaponStatsWrapper = styled_components_1.default.div `
    width: 330px;
`;
const TopWeaponStatsDetailWrapper = styled_components_1.default.div `
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`;
const TopWeaponStatsHeader = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`;
const TopWeaponLabel = styled_components_1.default.span `
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const TopWeaponInfoWrapper = styled_components_1.default.div `
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`;
const TopweaponInfo = styled_components_1.default.div `
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`;
const TopWeaponInfoWeaponImageWrapper = styled_components_1.default.div `
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: #282830;
`;
const TopWeaponInfoWeapon = styled_components_1.default.div `
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`;
const TopWeaponAgent = styled_components_1.default.span `
    font-size: 11px;
    font-weight: bold;
`;
const TopWeaponAvgscore = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
`;
const TopWeaponInfoRecord = styled_components_1.default.div `
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
`;
const TopWeaponRecord = styled_components_1.default.span `
    font-size: 11px;
    color: #9897a8;
    font-weight: bold;
`;
