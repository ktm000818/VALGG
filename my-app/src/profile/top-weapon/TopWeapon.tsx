import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ToggleButton, ToggleButtonWrapper } from '../../components/emotionStorage';
import { weaponStatsInfoState } from '../../store/playerWholeInfoStore';
import './top_weapon.css';

export default function TopWeapon() {

    const [showMore, setShowMore] = useState(false);
    const usedWeaponInfos = useRecoilValue(weaponStatsInfoState);

    function toggleShowMoreUsedWeaponInfo() {
        setShowMore(prev => !prev);
    }

    return (
        <>
            <TopWeaponStatsWrapper>
                <TopWeaponStatsDetailWrapper>
                    <TopWeaponStatsHeader>
                        <TopWeaponLabel>Top 무기</TopWeaponLabel>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </TopWeaponStatsHeader>
                    <TopWeaponInfoWrapper>

                        {usedWeaponInfos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <TopweaponInfo key={index}>
                                        <TopWeaponInfoWeaponImageWrapper>
                                            {info.WEAPON_IMAGE_ASSETS ? (
                                                <img width={60} height={15} src={info.WEAPON_IMAGE_ASSETS} />
                                            ): (
                                                <span style={{width: 60, fontSize: 11, textAlign: "center"}}>이미지없음</span>
                                            )}
                                        </TopWeaponInfoWeaponImageWrapper>
                                        <TopWeaponInfoWeapon>
                                            <TopWeaponAgent>{info.weaponName}</TopWeaponAgent>
                                            <TopWeaponAvgscore>weapon </TopWeaponAvgscore>
                                        </TopWeaponInfoWeapon>
                                        <TopWeaponInfoRecord>
                                            <TopWeaponRecord>{info.kill}</TopWeaponRecord>
                                        </TopWeaponInfoRecord>
                                    </TopweaponInfo>
                                </>
                            )
                        })}
                        <ToggleButtonWrapper onClick={toggleShowMoreUsedWeaponInfo}>
                            <ToggleButton>
                                {showMore ? "닫기" : "더보기"}
                            </ToggleButton>
                        </ToggleButtonWrapper>

                    </TopWeaponInfoWrapper>
                </TopWeaponStatsDetailWrapper>
            </TopWeaponStatsWrapper>
        </>
    )
}

const TopWeaponStatsWrapper = styled.div`
    width: 330px;
`

const TopWeaponStatsDetailWrapper = styled.div`
    background-color: #31313c;
    border-radius: 4px;
    margin-top: 10px;
`

const TopWeaponStatsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 4px 16px;
    height: 29px;
`

const TopWeaponLabel = styled.span`
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TopWeaponInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* padding: 16px 16px; */
    margin: 2px 0 2px 0;
    border-top: 1px solid #1C1C1F;
`

const TopweaponInfo = styled.div`
    display: flex;
    flex-basis: 100%;
    border-bottom: 1px solid #1C1C1F;
    padding: 10px 10px;
`

const TopWeaponInfoWeaponImageWrapper = styled.div`
    flex-basis: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    background-color: #282830;
`

const TopWeaponInfoWeapon = styled.div`
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
`

const TopWeaponAgent = styled.span`
    font-size: 11px;
    font-weight: bold;
`

const TopWeaponAvgscore = styled.span`
    font-size: 11px;
    color: #7b7a8e;
`

const TopWeaponInfoRecord = styled.div`
    flex-basis: 30%;
    display: flex;
    flex-direction: column;
`

const TopWeaponRecord = styled.span`
    font-size: 11px;
    color: #9897a8;
    font-weight: bold;
`
