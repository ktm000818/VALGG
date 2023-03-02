"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const material_1 = require("@mui/material");
const lodash_1 = require("lodash");
const recoil_1 = require("recoil");
const LoadingButton_1 = __importDefault(require("../../components/LoadingButton"));
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
function ProfileCard({ updatePlayerInfo = () => { } }) {
    const playerDefaultInfo = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.playerDefaultInfoState);
    const loading = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.loadingState);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(ProfileCardWrapper, { children: (0, jsx_runtime_1.jsx)(ProfileCardContent, { children: (0, jsx_runtime_1.jsx)(ProfileWrapper, { children: (0, jsx_runtime_1.jsxs)(Profile, { children: [(0, jsx_runtime_1.jsx)(ProfileImageWrapper, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, lodash_1.isEmpty)(playerDefaultInfo) ? ((0, jsx_runtime_1.jsx)(material_1.Skeleton, Object.assign({ variant: "rectangular" }, { children: (0, jsx_runtime_1.jsx)(ProfileImage, {}) }))) : ((0, jsx_runtime_1.jsx)(ProfileImage, { src: (0, lodash_1.get)(playerDefaultInfo, 'card.small', '') })) }) }), (0, jsx_runtime_1.jsxs)(ProfileInfoWrapper, { children: [(0, jsx_runtime_1.jsx)(ProfileInfo, { children: (0, lodash_1.isEmpty)(playerDefaultInfo) ? ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", sx: { fontSize: "24px" } })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ProfileName, { children: (0, lodash_1.get)(playerDefaultInfo, 'name', '') }), (0, jsx_runtime_1.jsx)(ProfileTag, { children: `#${(0, lodash_1.get)(playerDefaultInfo, 'tag', '')}` })] })) }), (0, jsx_runtime_1.jsxs)(ProfileInfo, { children: [(0, jsx_runtime_1.jsx)(ProfileRankLabel, { children: "\uB798\uB354 \uB7AD\uD0B9" }), (0, jsx_runtime_1.jsx)(ProfileLadderRank, { children: "1231th" })] }), (0, jsx_runtime_1.jsx)(ProfileInfo, { children: (0, jsx_runtime_1.jsx)(LoadingButton_1.default, Object.assign({ onClick: updatePlayerInfo, loading: loading }, { children: "\uC804\uC801 \uAC31\uC2E0" })) }), (0, jsx_runtime_1.jsx)(ProfileInfo, { children: (0, lodash_1.isEmpty)(playerDefaultInfo) ? ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "text", sx: { fontSize: "11px" } })) : ((0, jsx_runtime_1.jsxs)(LatestUpdateDate, { children: ["\uCD5C\uADFC \uC5C5\uB370\uC774\uD2B8: ", (0, lodash_1.get)(playerDefaultInfo, 'last_update', '')] })) })] })] }) }) }) }) }));
}
exports.default = ProfileCard;
const ProfileCardWrapper = styled_1.default.div `
    height: 200px;
    width: 100%;
    background: rgb(49, 49, 60);
`;
const ProfileCardContent = styled_1.default.div `
    width: 1300px;
    padding: 0 110px;
    margin: 0 auto;
    box-sizing: border-box;
`;
const ProfileWrapper = styled_1.default.div `
    height: 200px;
    display: flex;
    padding: 46px 0 24px;
    box-sizing: border-box;
    background: url("https://opgg-valorant-cdn.akamaized.net/Characters/TopBars/Omen.png") no-repeat center top / contain ;
`;
const Profile = styled_1.default.div `
    display: flex;
    align-items: center;
`;
const ProfileImageWrapper = styled_1.default.div `
    display: flex;
    border-radius: 20px;
    overflow: hidden;
`;
const ProfileImage = styled_1.default.img `
    width: 100px;
    height: 100px;
`;
const ProfileInfoWrapper = styled_1.default.div `
    padding: 0 24px;
`;
const ProfileInfo = styled_1.default.div `
`;
const ProfileName = styled_1.default.span `
    font-size: 24px;
    font-weight: bold;
`;
const ProfileTag = styled_1.default.span `
    color: gray;
`;
const ProfileRankLabel = styled_1.default.span `
    color: gray;
    font-size: 11px;
`;
const ProfileLadderRank = styled_1.default.span `
    color: lightblue;
    font-size: 11px;
    margin-left: 4px;
`;
const LatestUpdateDate = styled_1.default.span `
    color: white;
    font-size: 11px;
`;
const HistoryUpdateButton = styled_1.default.button `
    height: 40px;
    padding: 0 16px;
    border-radius: 5px;
    color: lightgray;
    background-color: #E84057;
    font-weight: bold;
    margin-top: 9px;
    border: 0px;
    cursor: pointer;
    &:hover {
        background-color: #AC2537;
    }
`;
