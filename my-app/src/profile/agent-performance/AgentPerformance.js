import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { agentPlayInfosState } from '../../store/playerWholeInfoStore';
import './agent_performance.css';

export default function AgentPerfomance() {

    const [showMore, setShowMore] = useState(false);
    const agentPlayInfos = useRecoilValue(agentPlayInfosState);

    function toggleShowMoreAgentInfo() {
        setShowMore(prev => !prev);
    }

    return (
        <>
            <AgentPerformanceWrapper>
                <AgentPerformanceDetailWrapper>
                    <AgentPerformancHeader>
                        <AgentPerformance>요원 퍼포먼스</AgentPerformance>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </AgentPerformancHeader>
                    <AgentPerformanceInfoWrapper>
                        {agentPlayInfos.map((info, index) => {
                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <AgentPerformanceInfo>
                                        <AgentPerformanceInfoAgentImageWrapper>
                                            <img width={20} height={20} src={info.AGENT_ICON_URL} />
                                        </AgentPerformanceInfoAgentImageWrapper>
                                        <AgentPerformanceInfoAgent>
                                            <AgentPerformanceAgent>{info.agent}</AgentPerformanceAgent>
                                            <AgentPerformanceAvgscore>{info.avgScore} 평균 점수</AgentPerformanceAvgscore>
                                        </AgentPerformanceInfoAgent>
                                        <AgentPerformanceInfoRecord>
                                            <AgentPerformanceRecord>{info.avgRecord}:1 평점</AgentPerformanceRecord>
                                            <AgentPerformanceKda>{`${info.kills}/${info.deaths}/${info.assists}`}</AgentPerformanceKda>
                                        </AgentPerformanceInfoRecord>
                                        <AgentPerformanceInfoWinratio>
                                            <AgentPerformanceWinratio>{info.winRatio}%</AgentPerformanceWinratio>
                                            <AgentPerformanceMatchcount>{info.matchCount}게임</AgentPerformanceMatchcount>
                                        </AgentPerformanceInfoWinratio>
                                    </AgentPerformanceInfo>
                                </>
                            )
                        })}

                        <ToggleButtonWrapper onClick={toggleShowMoreAgentInfo}>
                            <span style={{ textAlign: "center" }}>
                                {showMore ? "닫기" : "더보기"}
                            </span>
                        </ToggleButtonWrapper>
                    </AgentPerformanceInfoWrapper>
                </AgentPerformanceDetailWrapper>
            </AgentPerformanceWrapper>
        </>
    )
}

const AgentPerformanceWrapper = styled.div`
    width: 330px;
`

const AgentPerformanceDetailWrapper = styled.div`
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`

const AgentPerformancHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`

const AgentPerformance = styled.span`
    font-size: 13px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

const AgentPerformanceInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`

const AgentPerformanceInfo = styled.div`
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`


const AgentPerformanceInfoAgentImageWrapper = styled.div`
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
`

const AgentPerformanceInfoAgent = styled.div`
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`

const AgentPerformanceAgent = styled.span`
    font-size: 11px;
    font-weight: bold;
`

const AgentPerformanceAvgscore = styled.span`
    font-size: 11px;
    color: #7b7a8e;
`

const AgentPerformanceInfoRecord = styled.div`
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
`

const AgentPerformanceRecord = styled.span`
    font-size: 11px;
    color: #9897a8;
    font-weight: bold;
`

const AgentPerformanceKda = styled.span`
    font-size: 11px;
    color: #7b7a8e;
`

const AgentPerformanceInfoWinratio = styled.div`
    flex-basis: 20%;
    display: flex;
    flex-direction: column;
`

const AgentPerformanceWinratio = styled.span`
    font-size: 11px;
    color: #e05271;
    font-weight: bold;
    text-align: right;
`

const AgentPerformanceMatchcount = styled.span`
    font-size: 11px;
    text-align: right;
`

const ToggleButtonWrapper = styled.div`
    display: "flex";
    justify-content: "center";
    padding: "10px";
    cursor: "pointer";
`