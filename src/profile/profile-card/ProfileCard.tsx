import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { get, isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
import LoadingButton from "../../components/LoadingButton";
import { loadingState, playerDefaultInfoState } from "../../store/playerWholeInfoStore"
import { DEFAULT_USER_DATA } from "../../store/RiotApi";

export default function ProfileCard({ updatePlayerInfo = () => { } }) {
    const playerDefaultInfo: DEFAULT_USER_DATA | unknown = useRecoilValue(playerDefaultInfoState);
    const loading = useRecoilValue(loadingState);
    return (
        <>
            <ProfileCardWrapper>
                <ProfileCardContent>
                    <ProfileWrapper>
                        <Profile>
                            <ProfileImageWrapper>
                                <>
                                    {isEmpty(playerDefaultInfo) ? (
                                        <Skeleton variant="rectangular">
                                            <ProfileImage />
                                        </Skeleton>
                                    ) : (
                                        <ProfileImage src={get(playerDefaultInfo, 'card.small', '')} />
                                    )}
                                </>
                            </ProfileImageWrapper>
                            <ProfileInfoWrapper>
                                <ProfileInfo>
                                    {isEmpty(playerDefaultInfo) ? (
                                        <Skeleton variant="text" sx={{ fontSize: "24px" }} />
                                    ) : (
                                        <>
                                            <ProfileName>{get(playerDefaultInfo, 'name', '')}</ProfileName>
                                            <ProfileTag>{`#${get(playerDefaultInfo, 'tag', '')}`}</ProfileTag>
                                        </>
                                    )}
                                </ProfileInfo>
                                <ProfileInfo>
                                    <ProfileRankLabel>래더 랭킹</ProfileRankLabel>
                                    <ProfileLadderRank>1231th</ProfileLadderRank>
                                </ProfileInfo>
                                <ProfileInfo>
                                    <LoadingButton onClick={updatePlayerInfo} loading={loading}>전적 갱신</LoadingButton>
                                    {/* <HistoryUpdateButton onClick={updatePlayerInfo}>전적 갱신</HistoryUpdateButton> */}
                                </ProfileInfo>
                                <ProfileInfo>
                                    {isEmpty(playerDefaultInfo) ? (
                                        <Skeleton variant="text" sx={{ fontSize: "11px" }} />
                                    ) : (
                                        <LatestUpdateDate>최근 업데이트: {get(playerDefaultInfo, 'last_update', '')}</LatestUpdateDate>
                                    )}
                                </ProfileInfo>
                            </ProfileInfoWrapper>
                        </Profile>
                    </ProfileWrapper>
                </ProfileCardContent>
            </ProfileCardWrapper>
        </>
    )
}

const ProfileCardWrapper = styled.div`
    height: 200px;
    width: 100%;
    background: rgb(49, 49, 60);
`

const ProfileCardContent = styled.div`
    width: 1300px;
    padding: 0 110px;
    margin: 0 auto;
    box-sizing: border-box;
`

const ProfileWrapper = styled.div`
    height: 200px;
    display: flex;
    padding: 46px 0 24px;
    box-sizing: border-box;
    background: url("https://opgg-valorant-cdn.akamaized.net/Characters/TopBars/Omen.png") no-repeat center top / contain ;
`

const Profile = styled.div`
    display: flex;
    align-items: center;
`

const ProfileImageWrapper = styled.div`
    display: flex;
    border-radius: 20px;
    overflow: hidden;
`

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
`

const ProfileInfoWrapper = styled.div`
    padding: 0 24px;
`

const ProfileInfo = styled.div`
`

const ProfileName = styled.span`
    font-size: 24px;
    font-weight: bold;
`

const ProfileTag = styled.span`
    color: gray;
`

const ProfileRankLabel = styled.span`
    color: gray;
    font-size: 11px;
`

const ProfileLadderRank = styled.span`
    color: lightblue;
    font-size: 11px;
    margin-left: 4px;
`

const LatestUpdateDate = styled.span`
    color: white;
    font-size: 11px;
`

const HistoryUpdateButton = styled.button`
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
`