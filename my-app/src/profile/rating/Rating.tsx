// import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { currentSeasonDefeatsState, currentSeasonWinsState, currentTierImageSmallState, currentTierPatchedState, currentTierState, latestFiveGamesBodyshotPercentageState, latestFiveGamesDPRState, latestFiveGamesHeadshotPercentageState, latestFiveGamesKDARatioState, latestFiveGamesKDRatioState, latestFiveGamesLegshotPercentageState, latestFiveGamesSPRState, latestFiveGamesStatsState, latestFiveGamesWinRatioState } from "../../store/playerWholeInfoStore";
import './rating.css';

export default function Rating() {
    const currentTier = useRecoilValue(currentTierState);
    const currentTierImageSmall = useRecoilValue(currentTierImageSmallState);
    const currentTierPatched = useRecoilValue(currentTierPatchedState);
    const latestFiveGamesKDARatio = useRecoilValue(latestFiveGamesKDARatioState);
    const currentSeasonWins = useRecoilValue(currentSeasonWinsState);
    const currentSeasonDefeats = useRecoilValue(currentSeasonDefeatsState);
    const latestFiveGamesDPR = useRecoilValue(latestFiveGamesDPRState);
    const latestFiveGamesKDRatio = useRecoilValue(latestFiveGamesKDRatioState);
    const latestFiveGamesWinRatio = useRecoilValue(latestFiveGamesWinRatioState);
    const latestFiveGamesSPR = useRecoilValue(latestFiveGamesSPRState);
    const latestFiveGamesHeadshotPercentage = useRecoilValue(latestFiveGamesHeadshotPercentageState);
    const latestFiveGamesBodyshotPercentage = useRecoilValue(latestFiveGamesBodyshotPercentageState);
    const latestFiveGamesLegshotPercentage = useRecoilValue(latestFiveGamesLegshotPercentageState);
    const STATS = useRecoilValue(latestFiveGamesStatsState);

    function setDefaultRankImage(e: React.SyntheticEvent<HTMLImageElement>) {
        e.currentTarget.src = '';
    }

    return (
        <>

            <StatsWrapper>
                <StatsDetailWrapper>
                    <StatsRatingWrapper>
                        <RatingLabel>레이팅</RatingLabel>
                        {/* TODO select 태그 Emotion으로 교체! */}
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </StatsRatingWrapper>
                    <RankInfoWrapper>
                        {/* //TODO 이미지 태그 Emotion으로 교체! */}
                        {currentTier ? (
                            <RankImageWrapper>
                                <img className="rank_image" src={currentTierImageSmall} onError={setDefaultRankImage} />
                            </RankImageWrapper>
                        ) : (
                            <Skeleton variant="circular" sx={{ width: "75px", height: "72px", marginRight: "20px" }} />
                        )}
                        <RankStatsWrapper>
                            {currentTierPatched ? (
                                <Rank>{currentTierPatched}</Rank>
                            ) : (
                                <Skeleton sx={{ fontSize: "18px" }} />
                            )}
                            {latestFiveGamesKDARatio ? (
                                <Kda>최근 5게임 KDA 비율 {latestFiveGamesKDARatio} : 1</Kda>
                            ) : (
                                <Skeleton>
                                    <Kda>최근 5게임 KDA 비율 {latestFiveGamesKDARatio} : 1</Kda>
                                </Skeleton>
                            )}
                            {(currentSeasonWins && currentSeasonDefeats) ? (
                                <WinLose>시즌 전적 : {`${currentSeasonWins}승 ${currentSeasonDefeats}패`}</WinLose>
                            ) : (
                                <Skeleton>
                                    <WinLose>시즌 전적 : {`${currentSeasonWins}승 ${currentSeasonDefeats}패`}</WinLose>
                                </Skeleton>
                            )}
                        </RankStatsWrapper>
                    </RankInfoWrapper>
                    <RecordDescription>최근 5경기</RecordDescription>
                    <RecordWrapper>
                        <RecordDPRWrapper>
                            <DprLabel>데미지/라운드</DprLabel>
                            <Dpr>{latestFiveGamesDPR}</Dpr>
                        </RecordDPRWrapper>
                        <RecordKDWrapper>
                            <KDRatioLabel>K/D 비율</KDRatioLabel>
                            <KDRatio>{latestFiveGamesKDRatio}</KDRatio>
                        </RecordKDWrapper>
                        <RecordWinRatioWrapper>
                            <WinRatioLabel>승률</WinRatioLabel>
                            <WinRatio>{latestFiveGamesWinRatio}</WinRatio>
                        </RecordWinRatioWrapper>
                        <RecordSPRWrapper>
                            <SPRLabel>점수/라운드</SPRLabel>
                            <SPR>{latestFiveGamesSPR}</SPR>
                        </RecordSPRWrapper>
                    </RecordWrapper>
                    <DetailRecordWrapper>
                        <DetailRecordKillWrapper>
                            <Kill>킬</Kill>
                            <KillCount>{get(STATS, 'kills', 0)}</KillCount>
                        </DetailRecordKillWrapper>
                        <DetailRecordDeathWrapper>
                            <Death>데스</Death>
                            <DeathCount>{get(STATS, 'deaths', 0)}</DeathCount>
                        </DetailRecordDeathWrapper>
                        <DetailRecordAssistsWrapper>
                            <Assists>어시스트</Assists>
                            <AssistsCount>{get(STATS, 'assists', 0)}</AssistsCount>
                        </DetailRecordAssistsWrapper>
                        <DetailRecordHeadShotWrapper>
                            <HeadShot>헤드샷</HeadShot>
                            <HeadShotCount>{latestFiveGamesHeadshotPercentage}</HeadShotCount>
                        </DetailRecordHeadShotWrapper>
                        <DetailRecordBodyShotWrapper>
                            <BodyShot>바디샷</BodyShot>
                            <BodyShotCount>{latestFiveGamesBodyshotPercentage}</BodyShotCount>
                        </DetailRecordBodyShotWrapper>
                        <DetailRecordLegShotWrapper>
                            <LegShot>레그샷</LegShot>
                            <LegShotCount>{latestFiveGamesLegshotPercentage}</LegShotCount>
                        </DetailRecordLegShotWrapper>
                        <DetailRecordMostKillMatchWrapper>
                            <MostKillMatch>Most 킬 매치</MostKillMatch>
                            <MostKillMatchCount>{get(STATS, 'most_kill_match', 0)}</MostKillMatchCount>
                        </DetailRecordMostKillMatchWrapper>
                        <DetailRecordPlayTimeWrapper>
                            <PlayTime>플레이 시간</PlayTime>
                            <PlayTimeCount>{
                                get(STATS, 'play_time', 0) ? dayjs(get(STATS, 'play_time', 0)).format("HH시 MM분 ss”") : "플레이 시간 없음"
                            }</PlayTimeCount>
                        </DetailRecordPlayTimeWrapper>
                    </DetailRecordWrapper>
                </StatsDetailWrapper>
            </StatsWrapper>
        </>
    )
}

const StatsWrapper = styled.div`
    width: 330px;
`

const StatsDetailWrapper = styled.div`
    background-color: #31313c;
    border-radius: 4px;
`

const StatsRatingWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`

const RatingLabel = styled.span`
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Act = styled.select`
    width: 100px;
`

const RankInfoWrapper = styled.div`
    display: flex;
    padding: 16px 16px;
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`

const RankImageWrapper = styled.div`
    width: 75px;
    height: 72px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    background-color: #282830;
`

// const RankImage = styled.img.attrs(props => ({
//     src: props.src
// }))`   
//     width: 50px;
//     height: 50px;
// `

const RankStatsWrapper = styled.div`    
    display: flex;
    flex-direction: column;
`
const Rank = styled.span`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 2px;
`

const Kda = styled.span`
    font-size: 11px;
    color: #7b7a8e;
    font-weight: bold;
    margin-bottom: 2px;
`

const WinLose = styled.span`
    font-size: 11px;
    color: #7b7a8e;
`

const RecordWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px 16px;
    margin: 2px 0 2px 0;
`

const RecordDPRWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
`
const DprLabel = styled.span`
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`

const Dpr = styled.span`
    text-align: center;
`

const RecordDescription = styled.div`
    text-align: center;
    border-top: 1px solid #1C1C1F;
    color: #7b7a8e;
    padding-top: 3px;
    font-size: 12px;
`

const RecordKDWrapper = styled.div`
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
`

const KDRatioLabel = styled.span`
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`

const KDRatio = styled.span`
    text-align: center;
`

const RecordWinRatioWrapper = styled.div`    
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
`
const WinRatioLabel = styled.span`
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`

const WinRatio = styled.span`
    text-align: center;
`

const RecordSPRWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 33%;
    position: relative;
`

const SPRLabel = styled.span`
    font-size: 11px;
    color: #7b7a8e;
    text-align: center;
`

const SPR = styled.span`
    text-align: center;
`
const DetailRecordWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 10px 16px;
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
    background-color: #282830;
`
const DetailRecordKillWrapper = styled.div`    
    flex-basis: 50%;
    margin-bottom: 8px;
`

const Kill = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const KillCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`
const Death = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const DeathCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`

const Assists = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`
const AssistsCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`

const HeadShot = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const HeadShotCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`
const BodyShot = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const BodyShotCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`
const LegShot = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`
const LegShotCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`

const MostKillMatch = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const MostKillMatchCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`

const PlayTime = styled.span`
    display: block;
    font-size: 11px;
    color: #7b7a8e;
`

const PlayTimeCount = styled.span`
    display: block;
    font-size: 12px;
    color: white;
    margin-top: 1px;
`

const DetailRecordDeathWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordAssistsWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordHeadShotWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordBodyShotWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordLegShotWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordMostKillMatchWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`

const DetailRecordPlayTimeWrapper = styled.div`
    flex-basis: 50%;
    margin-bottom: 8px;
`