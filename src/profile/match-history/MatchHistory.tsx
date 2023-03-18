import styled from "@emotion/styled";
import dayjs from "dayjs";
import { isEmpty, isUndefined } from "lodash";
import { useRecoilValue } from "recoil";
import {
  latestFiveGamesState,
  latestFiveGamesStatsState,
  puuidState,
} from "../../store/playerWholeInfoStore";

export default function MatchHistory() {
  const matchHistory = useRecoilValue(latestFiveGamesState);
  const PUUID = useRecoilValue(puuidState);

  return (
    <MatchHistoryContainer>
      {!isUndefined(matchHistory) &&
        matchHistory.map((match) => {
          const player = match.players.all_players.find(
            (v) => v.puuid === PUUID
          );
          if (!player || isUndefined(player) || isEmpty(player)) {
            return null;
          }
          type Team = keyof typeof match.teams;
          const team = player.team.toLowerCase() as Team;
          const mode = match.metadata.mode;
          const playStartTime = dayjs(match.metadata.game_start).format(
            "A HH:mm"
          );
          const agentImageSrc = player.assets.agent.small;
          const kills = player.stats.kills;
          const deaths = player.stats.deaths;
          const assists = player.stats.assists;
          const ratio =
            (!isUndefined(kills) &&
              !isUndefined(assists) &&
              !isUndefined(deaths) &&
              ((kills + deaths + assists) / deaths).toFixed(2)) ||
            0;
          const map = match.metadata.map;
          const result = match.teams[team]?.has_won ? "WIN" : "DEFEAT";
          const roundsWon = match.teams[team]?.rounds_won;
          const roundsLost = match.teams[team]?.rounds_lost;
          const averageScore = Number(
            player.stats.score / (roundsWon + roundsLost)
          ).toFixed(2);
          const headShots = player.stats.headshots;
          const bodyShots = player.stats.bodyshots;
          const legShots = player.stats.legshots;
          const damage = player.damage_made;
          const headShotPercentage =
            ((headShots / (headShots + bodyShots + legShots)) * 100).toFixed(
              2
            ) + "%";

          return (
            <History result={result}>
              <ResultBar result={result}></ResultBar>
              <MetadataWrapper>
                <Result>{result}</Result>
                <Mode>{mode}</Mode>
                <Time>{playStartTime}</Time>
              </MetadataWrapper>
              <ImageWrapper>
                <img src={agentImageSrc} alt="" width={48} height={48} />
              </ImageWrapper>
              <KDAandRatioWrapper>
                <Kda>{`${kills}/${deaths}/${assists}`}</Kda>
                <Ratio>{ratio} 평점</Ratio>
              </KDAandRatioWrapper>
              <MapAndRoundsWrapper>
                <Map>{map}</Map>
                <Rounds>
                  {result === "WIN"
                    ? `${roundsWon} : ${roundsLost}`
                    : `${roundsLost} : ${roundsWon}`}
                </Rounds>
              </MapAndRoundsWrapper>
              <AverageScoreWrapper>
                <AverageScoreLabel>평균점수</AverageScoreLabel>
                <AverageScore>{averageScore}</AverageScore>
              </AverageScoreWrapper>
              <HeadShotPercentWrapper>
                <HeadShotLabel>헤드샷</HeadShotLabel>
                <HeadShot>{headShotPercentage}</HeadShot>
              </HeadShotPercentWrapper>
              <DamageWrapper>
                <DamageLabel>데미지</DamageLabel>
                <Damage>{damage}</Damage>
              </DamageWrapper>
            </History>
          );
        })}
    </MatchHistoryContainer>
  );
}

const MatchHistoryContainer = styled.div`
  width: 740px;
  display: flex;
  flex-direction: column;
`;

const History = styled.div<{ result: string }>`
  background-color: ${(props) =>
    props.result === "WIN" ? "#28344E" : "#4b2c2c"};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border: 1px transparent;
  border-radius: 10px;
  overflow: hidden;
  margin: 6px 0px 6px 0px;
`;

const ResultBar = styled.div<{ result: string }>`
  width: 10px;
  height: 100%;
  background-color: ${(props) =>
    props.result === "WIN" ? "#4a84ff" : "#f35a5a"};
  margin-right: 10px;
`;

const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: left;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: left;
  margin-left: 20px;
`;

const KDAandRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: left;
`;

const MapAndRoundsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  align-items: center;
`;

const AverageScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const HeadShotPercentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const DamageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const Result = styled.span`
  color: white;
  font-weight: bold;
`;

const Mode = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const Time = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const Kda = styled.span`
  color: white;
  font-weight: bold;
`;
const Ratio = styled.span`
  color: white;
  font-weight: bold;
`;

const Map = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const Rounds = styled.span`
  color: white;
  font-weight: bold;
`;

const AverageScoreLabel = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const AverageScore = styled.span`
  color: white;
  font-weight: bold;
`;

const HeadShotLabel = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const HeadShot = styled.span`
  color: white;
  font-weight: bold;
`;

const DamageLabel = styled.span`
  font-size: 11px;
  color: #7b7a8e;
`;

const Damage = styled.span`
  color: white;
  font-weight: bold;
`;
