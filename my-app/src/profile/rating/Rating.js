"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
// import styled from "@emotion/styled";
const material_1 = require("@mui/material");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const recoil_1 = require("recoil");
const styled_components_1 = __importDefault(require("styled-components"));
const playerWholeInfoStore_1 = require("../../store/playerWholeInfoStore");
require("./rating.css");
function Rating() {
    const currentTier = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.currentTierState);
    const currentTierImageSmall = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.currentTierImageSmallState);
    const currentTierPatched = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.currentTierPatchedState);
    const latestFiveGamesKDARatio = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesKDARatioState);
    const currentSeasonWins = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.currentSeasonWinsState);
    const currentSeasonDefeats = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.currentSeasonDefeatsState);
    const latestFiveGamesDPR = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesDPRState);
    const latestFiveGamesKDRatio = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesKDRatioState);
    const latestFiveGamesWinRatio = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesWinRatioState);
    const latestFiveGamesSPR = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesSPRState);
    const latestFiveGamesHeadshotPercentage = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesHeadshotPercentageState);
    const latestFiveGamesBodyshotPercentage = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesBodyshotPercentageState);
    const latestFiveGamesLegshotPercentage = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesLegshotPercentageState);
    const STATS = (0, recoil_1.useRecoilValue)(playerWholeInfoStore_1.latestFiveGamesStatsState);
    function setDefaultRankImage(e) {
        e.currentTarget.src = '';
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(StatsWrapper, { children: (0, jsx_runtime_1.jsxs)(StatsDetailWrapper, { children: [(0, jsx_runtime_1.jsxs)(StatsRatingWrapper, { children: [(0, jsx_runtime_1.jsx)(RatingLabel, { children: "\uB808\uC774\uD305" }), (0, jsx_runtime_1.jsx)("select", Object.assign({ className: "act" }, { children: (0, jsx_runtime_1.jsx)("option", { children: "\uACBD\uC7C1\uC804" }) }))] }), (0, jsx_runtime_1.jsxs)(RankInfoWrapper, { children: [currentTier ? ((0, jsx_runtime_1.jsx)(RankImageWrapper, { children: (0, jsx_runtime_1.jsx)("img", { className: "rank_image", src: currentTierImageSmall, onError: setDefaultRankImage }) })) : ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { variant: "circular", sx: { width: "75px", height: "72px", marginRight: "20px" } })), (0, jsx_runtime_1.jsxs)(RankStatsWrapper, { children: [currentTierPatched ? ((0, jsx_runtime_1.jsx)(Rank, { children: currentTierPatched })) : ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { sx: { fontSize: "18px" } })), latestFiveGamesKDARatio ? ((0, jsx_runtime_1.jsxs)(Kda, { children: ["\uCD5C\uADFC 5\uAC8C\uC784 KDA \uBE44\uC728 ", latestFiveGamesKDARatio, " : 1"] })) : ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { children: (0, jsx_runtime_1.jsxs)(Kda, { children: ["\uCD5C\uADFC 5\uAC8C\uC784 KDA \uBE44\uC728 ", latestFiveGamesKDARatio, " : 1"] }) })), (currentSeasonWins && currentSeasonDefeats) ? ((0, jsx_runtime_1.jsxs)(WinLose, { children: ["\uC2DC\uC98C \uC804\uC801 : ", `${currentSeasonWins}승 ${currentSeasonDefeats}패`] })) : ((0, jsx_runtime_1.jsx)(material_1.Skeleton, { children: (0, jsx_runtime_1.jsxs)(WinLose, { children: ["\uC2DC\uC98C \uC804\uC801 : ", `${currentSeasonWins}승 ${currentSeasonDefeats}패`] }) }))] })] }), (0, jsx_runtime_1.jsx)(RecordDescription, { children: "\uCD5C\uADFC 5\uACBD\uAE30" }), (0, jsx_runtime_1.jsxs)(RecordWrapper, { children: [(0, jsx_runtime_1.jsxs)(RecordDPRWrapper, { children: [(0, jsx_runtime_1.jsx)(DprLabel, { children: "\uB370\uBBF8\uC9C0/\uB77C\uC6B4\uB4DC" }), (0, jsx_runtime_1.jsx)(Dpr, { children: latestFiveGamesDPR })] }), (0, jsx_runtime_1.jsxs)(RecordKDWrapper, { children: [(0, jsx_runtime_1.jsx)(KDRatioLabel, { children: "K/D \uBE44\uC728" }), (0, jsx_runtime_1.jsx)(KDRatio, { children: latestFiveGamesKDRatio })] }), (0, jsx_runtime_1.jsxs)(RecordWinRatioWrapper, { children: [(0, jsx_runtime_1.jsx)(WinRatioLabel, { children: "\uC2B9\uB960" }), (0, jsx_runtime_1.jsx)(WinRatio, { children: latestFiveGamesWinRatio })] }), (0, jsx_runtime_1.jsxs)(RecordSPRWrapper, { children: [(0, jsx_runtime_1.jsx)(SPRLabel, { children: "\uC810\uC218/\uB77C\uC6B4\uB4DC" }), (0, jsx_runtime_1.jsx)(SPR, { children: latestFiveGamesSPR })] })] }), (0, jsx_runtime_1.jsxs)(DetailRecordWrapper, { children: [(0, jsx_runtime_1.jsxs)(DetailRecordKillWrapper, { children: [(0, jsx_runtime_1.jsx)(Kill, { children: "\uD0AC" }), (0, jsx_runtime_1.jsx)(KillCount, { children: (0, lodash_1.get)(STATS, 'kills', 0) })] }), (0, jsx_runtime_1.jsxs)(DetailRecordDeathWrapper, { children: [(0, jsx_runtime_1.jsx)(Death, { children: "\uB370\uC2A4" }), (0, jsx_runtime_1.jsx)(DeathCount, { children: (0, lodash_1.get)(STATS, 'deaths', 0) })] }), (0, jsx_runtime_1.jsxs)(DetailRecordAssistsWrapper, { children: [(0, jsx_runtime_1.jsx)(Assists, { children: "\uC5B4\uC2DC\uC2A4\uD2B8" }), (0, jsx_runtime_1.jsx)(AssistsCount, { children: (0, lodash_1.get)(STATS, 'assists', 0) })] }), (0, jsx_runtime_1.jsxs)(DetailRecordHeadShotWrapper, { children: [(0, jsx_runtime_1.jsx)(HeadShot, { children: "\uD5E4\uB4DC\uC0F7" }), (0, jsx_runtime_1.jsx)(HeadShotCount, { children: latestFiveGamesHeadshotPercentage })] }), (0, jsx_runtime_1.jsxs)(DetailRecordBodyShotWrapper, { children: [(0, jsx_runtime_1.jsx)(BodyShot, { children: "\uBC14\uB514\uC0F7" }), (0, jsx_runtime_1.jsx)(BodyShotCount, { children: latestFiveGamesBodyshotPercentage })] }), (0, jsx_runtime_1.jsxs)(DetailRecordLegShotWrapper, { children: [(0, jsx_runtime_1.jsx)(LegShot, { children: "\uB808\uADF8\uC0F7" }), (0, jsx_runtime_1.jsx)(LegShotCount, { children: latestFiveGamesLegshotPercentage })] }), (0, jsx_runtime_1.jsxs)(DetailRecordMostKillMatchWrapper, { children: [(0, jsx_runtime_1.jsx)(MostKillMatch, { children: "Most \uD0AC \uB9E4\uCE58" }), (0, jsx_runtime_1.jsx)(MostKillMatchCount, { children: (0, lodash_1.get)(STATS, 'most_kill_match', 0) })] }), (0, jsx_runtime_1.jsxs)(DetailRecordPlayTimeWrapper, { children: [(0, jsx_runtime_1.jsx)(PlayTime, { children: "\uD50C\uB808\uC774 \uC2DC\uAC04" }), (0, jsx_runtime_1.jsx)(PlayTimeCount, { children: (0, lodash_1.get)(STATS, 'play_time', 0) ? (0, dayjs_1.default)((0, lodash_1.get)(STATS, 'play_time', 0)).format("HH시 MM분 ss”") : "플레이 시간 없음" })] })] })] }) }) }));
}
exports.default = Rating;
const StatsWrapper = styled_components_1.default.div `
    width: 330px;
`;
const StatsDetailWrapper = styled_components_1.default.div `
    background-color: #31313c;
    border-radius: 4px;
`;
const StatsRatingWrapper = styled_components_1.default.div `
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`;
const RatingLabel = styled_components_1.default.span `
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Act = styled_components_1.default.select `
    width: 100px;
`;
const RankInfoWrapper = styled_components_1.default.div `
    display: flex;
    padding: 16px 16px;
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`;
const RankImageWrapper = styled_components_1.default.div `
    width: 75px;
    height: 72px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background-color: #282830;
`;
// const RankImage = styled.img.attrs(props => ({
//     src: props.src
// }))`   
//     width: 50px;
//     height: 50px;
// `
const RankStatsWrapper = styled_components_1.default.div `    
    display: flex;
    flex-direction: column;
`;
const Rank = styled_components_1.default.span `
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 2px;
`;
const Kda = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
    font-weight: bold;
    margin-bottom: 2px;
`;
const WinLose = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
`;
const RecordWrapper = styled_components_1.default.div `
    display: flex;
    flex-wrap: wrap;
    padding: 10px 16px;
    margin: 2px 0 2px 0;
`;
const RecordDPRWrapper = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
`;
const DprLabel = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`;
const Dpr = styled_components_1.default.span `
    text-align: center;
`;
const RecordDescription = styled_components_1.default.div `
    text-align: center;
    border-top: 1px solid #1C1C1F;
    color: #7b7a8e;
    padding-top: 3px;
    font-size: 12px;
`;
const RecordKDWrapper = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
    &:before {
        content: '';
        width: 1px;
        height: 15px;
        background-color: black;
        position: absolute;
    }
`;
const KDRatioLabel = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`;
const KDRatio = styled_components_1.default.span `
    text-align: center;
`;
const RecordWinRatioWrapper = styled_components_1.default.div `    
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
    &:before {
        content: '';
        width: 1px;
        height: 15px;
        background-color: black;
        position: absolute;
    }
`;
const WinRatioLabel = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`;
const WinRatio = styled_components_1.default.span `
    text-align: center;
`;
const RecordSPRWrapper = styled_components_1.default.div `
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
`;
const SPRLabel = styled_components_1.default.span `
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`;
const SPR = styled_components_1.default.span `
    text-align: center;
`;
const DetailRecordWrapper = styled_components_1.default.div `
    display: flex;
    flex-wrap: wrap;
    padding: 10px 16px;
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
    background-color: #282830;
`;
const DetailRecordKillWrapper = styled_components_1.default.div `    
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const Kill = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const KillCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const Death = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const DeathCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const Assists = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const AssistsCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const HeadShot = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const HeadShotCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const BodyShot = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const BodyShotCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const LegShot = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const LegShotCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const MostKillMatch = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const MostKillMatchCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const PlayTime = styled_components_1.default.span `
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`;
const PlayTimeCount = styled_components_1.default.span `
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`;
const DetailRecordDeathWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordAssistsWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordHeadShotWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordBodyShotWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordLegShotWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordMostKillMatchWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
const DetailRecordPlayTimeWrapper = styled_components_1.default.div `
    flex-basis: 50%;
    margin-bottom: 8px;
`;
