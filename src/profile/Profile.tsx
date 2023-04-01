import styled from "@emotion/styled";
import { isEmpty } from "lodash";
import { CSSProperties, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  loadingState,
  playerDefaultInfoState,
  playerWholeInfoState,
} from "../store/playerWholeInfoStore";
import {
  AllProps,
  DEFAULT_USER_DATA,
  getAccountDataTest,
  getAllUserData,
  MatchFilter,
} from "../store/RiotApi";
import AgentPerfomance from "./agent-performance/AgentPerformance";
import MainStats from "./main-stats/MainStats";
import MapPerfomance from "./map-performance/MapPerformance";
import MatchHistory from "./match-history/MatchHistory";
import ProfileCard from "./profile-card/ProfileCard";
import Rating from "./rating/Rating";
import TopWeapon from "./top-weapon/TopWeapon";

export default function Profile() {
  const setDefaultInfoRecoil = useSetRecoilState(playerDefaultInfoState);
  const setInfoRecoil = useSetRecoilState(playerWholeInfoState);
  const setLoadingState = useSetRecoilState(loadingState);
  const wholeStatsInfo = useRecoilValue(playerWholeInfoState);
  const loading = useRecoilValue(loadingState);

  const { name, tag } = useParams<{
    name: string;
    tag: string;
  }>();

  useEffect(() => {
    if (name && tag) {
      setDefaultInfoRecoil({});
      setInfoRecoil({});
      updatePlayerInfo();
    }
  }, [name]);

  /**
   * 유저 기본정보 조회
   */
  const getDefaultUserData = async () => {
    try {
      const data: DEFAULT_USER_DATA = await getAccountDataTest({ name, tag });
      return data;
    } catch (error) {
      console.error(error);
      alert("조회 중 에러 발생!");
      return false;
    }
  };

  /**
   * 유저의 전체 데이터 조회
   */
  const getWholeUserData = async (
    matchFilter: MatchFilter,
    playerInfo: DEFAULT_USER_DATA
  ) => {
    const { name, tag, region, puuid } = playerInfo;

    const prop: AllProps = {
      name,
      tag,
      version: "v2",
      region,
      puuid,
      matchFilter,
    };

    try {
      const result = await getAllUserData(prop);
      const filteredResult = result.reduce((prev, curr) => {
        const responseData: any = curr.data.data;
        if (Array.isArray(curr.data.data)) {
          if (
            responseData.length > 0 &&
            Object.keys(responseData[0]).includes("players")
          ) {
            return { ...prev, MatchHistory: responseData };
          } else {
            return { ...prev, MMRHistory: responseData };
          }
        } else {
          return { ...Object.assign({ ...prev }, responseData) };
        }
      }, {});

      return filteredResult;
    } catch (error) {
      alert("전체 데이터 조회 중 에러 발생!");
      return {};
    }
  };

  /**
   * 플레이어의 모든 정보를 Recoil Store에 저장함
   */
  const updatePlayerInfo = async () => {
    setLoadingState(true);
    const DEFAULT_USER_DATA: DEFAULT_USER_DATA | boolean =
      await getDefaultUserData();
    if (DEFAULT_USER_DATA) {
      const WHOLE_USER_DATA = await getWholeUserData(
        "competitive",
        DEFAULT_USER_DATA
      );
      setDefaultInfoRecoil(DEFAULT_USER_DATA);
      setInfoRecoil(WHOLE_USER_DATA);
      setLoadingState(false);
    }
  };

  const loadingIndicatorCss: CSSProperties = {
    position: "absolute",
    display: "block",
    margin: "0 auto",
    borderWidth: "10px",
    borderColor: "lime lime transparent",
    top: "200px",
    left: "50%",
    width: "100px",
    height: "100px",
  };

  return (
    <>
      <ProfileCard updatePlayerInfo={updatePlayerInfo} />
      <MainWrapper>
        {loading && (
          <>
            <ClipLoader
              color={"blue"}
              loading={loading}
              cssOverride={loadingIndicatorCss}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </>
        )}

        {!loading && wholeStatsInfo.MatchHistory && (
          <Main>
            <SideContentWrapper>
              <Rating />
              {/* TODO 컴포넌트 Emotion, TypeScript 적용! */}
              <AgentPerfomance />
              <TopWeapon />
              <MapPerfomance />
            </SideContentWrapper>
            <CenterContentWrapper>
              <MainStats />
              <MatchHistory />
            </CenterContentWrapper>
          </Main>
        )}

        {!loading && wholeStatsInfo.MatchHistory === undefined && (
          <NoDataMain>
            전적이 없습니다. 경쟁전을 플레이 해주세요.
          </NoDataMain>
        )}
      </MainWrapper>
    </>
  );
}

const MainWrapper = styled.div`
  width: 1300px;
  padding: 20px 110px;
  margin: auto;
  box-sizing: border-box;
  position: relative;
`;

const NoDataMain = styled.div`
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SideContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CenterContentWrapper = styled.div`
  width: 740px;
  max-width: 740px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
