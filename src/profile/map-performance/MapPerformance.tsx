import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ToggleButton, ToggleButtonWrapper } from '../../components/emotionStorage';
import { matchHistoryGroupByMapState } from '../../store/playerWholeInfoStore';
import './map_performance.css';

export default function MapPerfomance() {

    const [showMore, setShowMore] = useState(false);
    const mapInfos = useRecoilValue(matchHistoryGroupByMapState);

    function toggleShowMoreMapInfo() {
        setShowMore(prev => !prev);
    }

    return (
        <>
            <MapPerformanceWrapper>
                <MapPerformanceDetailWrapper>
                    <MapPerformanceHeader>
                        <MapPerformanceLabel>맵 퍼포먼스</MapPerformanceLabel>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </MapPerformanceHeader>
                    <MapPerformanceInfoWrapper>

                        {mapInfos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <MapPerformanceInfo>
                                        <MapPerformanceInfoMapImageWrapper>
                                            {/* <img width={80} height={40} src={`https://opgg-valorant-cdn.akamaized.net/Maps/${info.map}.png`} alt={"이미지 없음"} /> */}
                                        </MapPerformanceInfoMapImageWrapper>
                                        <MapPerformanceInfoMap>
                                            <MapPerformanceMapLabel>{info.map}</MapPerformanceMapLabel>
                                        </MapPerformanceInfoMap>
                                        <MapPerformanceInfoWinratioWrapper>
                                            <MapPerformanceWinratio>{info.winRatio}%</MapPerformanceWinratio>
                                            <MapPerformanceMatchCount>{`${info.matchWins}승 - ${info.matchDefeats}패`}</MapPerformanceMatchCount>
                                        </MapPerformanceInfoWinratioWrapper>
                                    </MapPerformanceInfo>
                                </>
                            )
                        })}

                        <ToggleButtonWrapper>
                            <ToggleButton onClick={toggleShowMoreMapInfo}>
                                {showMore ? "닫기" : "더보기"}
                            </ToggleButton>
                        </ToggleButtonWrapper>
                    </MapPerformanceInfoWrapper>
                </MapPerformanceDetailWrapper>
            </MapPerformanceWrapper>
        </>
    )
}

const MapPerformanceWrapper = styled.div`
    width: 330px;
`

const MapPerformanceDetailWrapper = styled.div`
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`

const MapPerformanceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`

const MapPerformanceLabel = styled.span`
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MapPerformanceInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`

const MapPerformanceInfo = styled.div`
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`

const MapPerformanceInfoMapImageWrapper = styled.div` 
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`

const MapPerformanceInfoMap = styled.div`
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`

const MapPerformanceMapLabel = styled.span`
    font-size: 11px;
    font-weight: bold;
`

const MapPerformanceInfoWinratioWrapper = styled.div`
    flex-basis: 50%;
    display: flex;
    flex-direction: column;
`

const MapPerformanceWinratio = styled.span`
    font-size: 11px;
    color: #e05271;
    font-weight: bold;
    text-align: right;
`

const MapPerformanceMatchCount = styled.span`
    font-size: 11px;
    text-align: right;
`