import styled from "@emotion/styled";
import _, { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import WinRatioPieChart from "../../components/WinRatioPieChart";
import {
  agentInfoState,
  winRatioAndKDARatingState
} from "../../store/playerWholeInfoStore";
import { AgentRoleEn, getAgentName } from "../../store/translate";
import "./main_stats.css";

export default function MainStats() {
  const agentInfos = useRecoilValue(agentInfoState);

  interface AgentPlayRatioInfo {
    Duelist: number;
    Initiator: number;
    Controller: number;
    Sentinel: number;
    None?: number;
  }

  interface AgentInfo {
    role: AgentRoleEn;
    matchCount: number;
  }
  const [agentPlayRatioInfo, setAgentPlayRatioInfo] = useState<AgentPlayRatioInfo>({
     Duelist: 0, Initiator: 0, Controller: 0, Sentinel: 0 
  });

  const wholeStat = useRecoilValue(winRatioAndKDARatingState);

  useEffect(() => {
    if (!isEmpty(agentInfos)) {
      let newAgentPlayRatioInfo: AgentPlayRatioInfo = agentInfos.reduce((prev: AgentPlayRatioInfo, curr: AgentInfo) => {
        const { role, matchCount } = curr;
        if (role) {
          return {
            ...prev,
            [role]: (prev[role] ?? 0) + matchCount
          }
        } else {
          return {
            ...prev
          }
        }
      }, { Duelist: 0, Initiator: 0, Controller: 0, Sentinel: 0 })

      setAgentPlayRatioInfo(newAgentPlayRatioInfo);
    }
  }, [agentInfos])

  const getRatioOfRole = (role: AgentRoleEn) => {
    const overallPlayCount = agentPlayRatioInfo['Duelist'] + agentPlayRatioInfo['Sentinel'] + agentPlayRatioInfo['Controller'] + agentPlayRatioInfo['Initiator'];
    switch (role) {
      case 'Duelist':
        return (Math.floor((agentPlayRatioInfo['Duelist'] / overallPlayCount * 100))) + "%"
      case 'Sentinel':
        return (Math.floor((agentPlayRatioInfo['Sentinel'] / overallPlayCount * 100))) + "%"
      case 'Controller':
        return (Math.floor((agentPlayRatioInfo['Controller'] / overallPlayCount * 100))) + "%"
      case 'Initiator':
        return (Math.floor((agentPlayRatioInfo['Initiator'] / overallPlayCount * 100))) + "%"
      default:
        return "0%"
    }
  }

  return (
    <>
      <MainStatsWrapper>
        <MainStatsSearchWrapper>
          <StatsSearchWrapper>
            <select className="act">
              <option>경쟁전</option>
            </select>
          </StatsSearchWrapper>
          <StatsChartWrapper>
            <ChartSection1Wrapper>
              {_.isEmpty(wholeStat) && <h2>Loading...</h2>}
              {!_.isEmpty(wholeStat) && (
                <>
                  <WinLoseCount>{`${wholeStat.matchCount}게임 ${wholeStat.matchWins
                    }승 ${wholeStat.matchCount - wholeStat.matchWins
                    }패`}</WinLoseCount>
                  <div
                    style={{
                      display: "flex",
                      marginTop: "10px",
                      alignContent: "center",
                    }}
                  >
                    <WinRatioPieChart
                      matchWins={wholeStat.matchWins}
                      matchDefeats={wholeStat.matchDefeats}
                      matchCount={wholeStat.matchCount}
                    />
                    <ChartDetailWrapper>
                      <KDAWrapper>
                        {wholeStat.kills === 0 && wholeStat.deaths === 0 && wholeStat.assists === 0 ? (
                          <>
                            <ChartDetailKill> {`0 / `}</ChartDetailKill>
                            <ChartDetailDeath>{`0 / `}</ChartDetailDeath>
                            <ChartDetailAssists>{`0`}</ChartDetailAssists>
                          </>
                        ) : (
                          <>
                            <ChartDetailKill> {`${(
                              wholeStat.kills / wholeStat.matchCount
                            ).toFixed(1)} / `}</ChartDetailKill>
                            <ChartDetailDeath>{`${(
                              wholeStat.deaths / wholeStat.matchCount
                            ).toFixed(1)}`}</ChartDetailDeath>
                            <ChartDetailAssists>{` / ${(
                              wholeStat.assists / wholeStat.matchCount
                            ).toFixed(1)}`}</ChartDetailAssists>
                          </>

                        )}

                      </KDAWrapper>
                      <Rating>
                        {wholeStat.kills === 0 && wholeStat.deaths === 0 && wholeStat.assists === 0 ? (
                          "0 : 1"
                        ) : (
                          `${(
                            (wholeStat.kills / wholeStat.matchCount +
                              wholeStat.assists / wholeStat.matchCount) /
                            (wholeStat.deaths / wholeStat.matchCount)
                          ).toFixed(2)} : 1`
                        )}
                      </Rating>
                      <InvolvementRate>킬 관여율 22.32%</InvolvementRate>
                    </ChartDetailWrapper>
                  </div>
                </>
              )}
            </ChartSection1Wrapper>
            <ChartSection2Wrapper>
              <span
                style={{ display: "flex", color: "#7B7AB2", fontSize: "12px" }}
              >
                최근 5 게임 플레이한 요원
              </span>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignContent: "center",
                }}
              >
                {/* <WinRatioPieChart /> */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {agentInfos.map((info) => {
                    return (
                      <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            width={24}
                            height={24}
                            src={info.AGENT_ICON_URL}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            margin: "5px",
                          }}
                        >
                          <span style={{ fontSize: "11px" }}>
                            {getAgentName(info.agent)}
                          </span>
                          <span style={{ fontSize: "11px", color: "#E84057" }}>
                            {`${info.winRatio}% ${info.matchWins}승 ${info.matchCount - info.matchWins
                              }패 ${info.avgRecord}:1 평점`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ChartSection2Wrapper>
            <ChartSection3Wrapper>
              <span
                style={{
                  display: "flex",
                  color: "#7B7AB2",
                  fontSize: "12px",
                  justifyContent: "center",
                }}
              >
                선호 클래스 (랭크)
              </span>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignContent: "center",
                  justifyContent: "space-around",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "88px",
                      backgroundColor: "#424254",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <span
                      style={{ backgroundColor: "#5383E3", height: getRatioOfRole('Duelist') }}
                    ></span>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Duelist.svg" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "88px",
                      backgroundColor: "#424254",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <span
                      style={{ backgroundColor: "#5383E3", height: getRatioOfRole('Initiator') }}
                    ></span>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Initiator.svg" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "88px",
                      backgroundColor: "#424254",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <span
                      style={{ backgroundColor: "#5383E3", height: getRatioOfRole('Sentinel') }}
                    ></span>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Sentinel.svg" />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: "16px",
                      height: "88px",
                      backgroundColor: "#424254",
                      display: "flex",
                      flexDirection: "column-reverse",
                    }}
                  >
                    <span
                      style={{ backgroundColor: "#5383E3", height: getRatioOfRole('Controller') }}
                    ></span>
                  </div>
                  <div style={{ marginTop: "10px", display: "flex" }}>
                    <img src="https://opgg-valorant-cdn.akamaized.net/CharacterRoles/Icons/Controller.svg" />
                  </div>
                </div>
              </div>
            </ChartSection3Wrapper>
          </StatsChartWrapper>
        </MainStatsSearchWrapper>
      </MainStatsWrapper>
    </>
  );
}

const MainStatsWrapper = styled.div`
  width: 740px;
`;

const MainStatsSearchWrapper = styled.div`
  background-color: #31313c;
  border-radius: 4px;
`;

const StatsSearchWrapper = styled.div`
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

const Act = styled.span`
  width: 100px;
`;

const StatsChartWrapper = styled.div`
  display: flex;
  padding: 16px 16px;
  margin: 2px 0 2px 0;
  border-top: 1px solid #1c1c1f;
`;

const ChartSection1Wrapper = styled.div`
  flex-basis: 37.5%;
  flex-direction: column;
`;

const ChartSection2Wrapper = styled.div`
  flex-basis: 37.5%;
`;

const ChartSection3Wrapper = styled.div`
  flex-basis: 25%;
  flex-direction: column;
`;

const WinLoseCount = styled.span`
  display: flex;
  color: #7b7ab2;
  font-size: 12px;
`;

const ChartDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 20px;
`;

const KDAWrapper = styled.div``;

const ChartDetailKill = styled.span`
  font-size: 11px;
`;

const ChartDetailDeath = styled.span`
  font-size: 11px;
  color: #e84057;
`;

const ChartDetailAssists = styled.span`
  font-size: 11px;
`;

const Rating = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const InvolvementRate = styled.span`
  font-size: 11px;
  margin-top: 2px;
  color: #e84057;
`;
