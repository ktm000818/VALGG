import styled from "@emotion/styled";
import { useRecoilValue } from "recoil"
import { playerDefaultInfoState } from "../../store/playerWholeInfoStore"

export default function ProfileCard({ setPlayerInfo = () => { } }) {
    const playerDefaultInfo = useRecoilValue(playerDefaultInfoState);
    return (
        <>
            <ProfileCardWrapper>
                <ProfileCardContent>
                    <ProfileWrapper>
                        <Profile>
                            <ProfileImageWrapper>
                                <ProfileImage src={playerDefaultInfo?.card?.small} />
                            </ProfileImageWrapper>
                            <ProfileInfoWrapper>
                                <ProfileInfo>
                                    <ProfileName>{playerDefaultInfo?.name}</ProfileName>
                                    <ProfileTag>#{playerDefaultInfo?.tag}</ProfileTag>
                                </ProfileInfo>
                                <ProfileInfo>
                                    <ProfileRankLabel>래더 랭킹</ProfileRankLabel>
                                    <ProfileLadderRank>1231th</ProfileLadderRank>
                                </ProfileInfo>
                                <ProfileInfo>
                                    <HistoryUpdateButton onClick={setPlayerInfo}>전적 갱신</HistoryUpdateButton>
                                </ProfileInfo>
                                <ProfileInfo>
                                    <LatestUpdateDate>최근 업데이트: {playerDefaultInfo?.last_update}</LatestUpdateDate>
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

const ProfileName = styled.strong`
    font-size: 24px;
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