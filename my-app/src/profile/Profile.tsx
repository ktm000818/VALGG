import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AllProps, getAccountDataTest, getAllUserData, MatchFilter, Region } from "../store/RiotApi";
import ProfileCard from "./profile-card/ProfileCard"
import Rating from "./rating/Rating";
import AgentPerfomance from "./agent-performance/AgentPerformance";
import TopWeapon from "./top-weapon/TopWeapon";
import MapPerfomance from "./map-performance/MapPerformance";
import MainStats from "./main-stats/MainStats";
import { useRecoilState } from "recoil";
import { playerDefaultInfoState, playerInfoState } from "../store/playerWholeInfoStore";
import styled from "@emotion/styled";

interface DEFAULT_USER_DATA_CARD {
    id: string,
    large: string,
    small: string,
    wide: string
}

interface DEFAULT_USER_DATA {
    account_level?: number
    card?: DEFAULT_USER_DATA_CARD,
    last_update?: string,
    last_update_raw?: number,
    name: string,
    puuid: string,
    region: Region,
    tag: string,
    matchFilter?: MatchFilter
}

export default function Profile() {
    const [defaultInfoRecoil, setDefaultInfoRecoil] = useRecoilState(playerDefaultInfoState);
    const [infoRecoil, setInfoRecoil] = useRecoilState(playerInfoState);
    const { name, tag } = useLocation().state;

    useEffect(() => {
        if (name && tag) {
            setPlayerInfo();
        }
    }, [name])

    /**
     * 유저 기본정보 조회
     */
    const getDefaultUserData = async () => {
        try {
            const { data } = await getAccountDataTest({ name, tag });
            return data.data;
        } catch (error) {
            console.error(error);
            alert("조회 중 에러 발생!");
        }
    }

    /**
     * 유저의 전체 데이터 조회
     */
    const getWholeUserData = async (matchFilter: MatchFilter, playerInfo: DEFAULT_USER_DATA) => {
        const { name, tag, region, puuid } = playerInfo;

        const prop: AllProps = {
            name,
            tag,
            version: "v2",
            region,
            puuid,
            matchFilter
        };

        try {
            const result = await getAllUserData(prop).then(values => values);
            const filteredResult = result.reduce((prev, curr) => {
                const responseData = curr.data.data;
                if (Array.isArray(curr.data.data)) {
                    if (responseData.length > 0 && Object.keys(responseData[0]).includes("players")) {
                        return { ...prev, MatchHistory: responseData }
                    } else {
                        return { ...prev, MMRHistory: responseData }
                    }
                } else {
                    return { ...Object.assign({ ...prev }, responseData) }
                }
            }, {})

            return filteredResult;
        } catch (error) {
            alert("전체 데이터 조회 중 에러 발생!")
            return {};
        }
    }

    /**
     * 플레이어의 모든 정보를 Recoil Store에 저장함
     */
    const setPlayerInfo = async () => {
        const DEFAULT_USER_DATA: DEFAULT_USER_DATA = await getDefaultUserData();
        const WHOLE_USER_DATA = await getWholeUserData("competitive", DEFAULT_USER_DATA);
        setDefaultInfoRecoil(DEFAULT_USER_DATA);
        setInfoRecoil(WHOLE_USER_DATA);
    }

    return (
        <>
            <ProfileCard setPlayerInfo={setPlayerInfo} />
            <MainWrapper>
                <Main>
                    <SideContentWrapper>
                        <Rating />
                        {/* TODO 컴포넌트 Emotion, TypeScript 적용! */}
                        {/* <AgentPerfomance/>
                        <TopWeapon/>
                        <MapPerfomance/> */}
                    </SideContentWrapper>
                    <CenterContentWrapper>
                        {/* <MainStats/> */}
                    </CenterContentWrapper>
                </Main>

            </MainWrapper>
        </>
    )
}

const MainWrapper = styled.div`
    width: 1300px;
    padding: 20px 110px;
    margin: auto;
    box-sizing: border-box;
`

const Main = styled.div`
    display: flex;
    justify-content: space-between;
`

const SideContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const CenterContentWrapper = styled.div`
    width: 740px;
    max-width: 740px;
    border: 1px solid black;
    display: flex;
`
