import React, { useEffect, useState } from 'react';
import './top_weapon.css';

export default function TopWeapon({ userData }) {

    const [showMore, setShowMore] = useState(false);
    const [usedWeaponInfos, setUsedWeaponInfos] = useState([]);

    useEffect(() => {
        if (userData?.MatchHistory) {
            setUsedWeaponInfos(getUsedWeaponInfos);
        }
    }, [userData])

    function toggleShowMoreUsedWeaponInfo() {
        setShowMore(prev => !prev);
    }

    function getUsedWeaponInfos() {

        const MATCH_HISTORY = userData.MatchHistory;

        const WHOLE_KILLS = MATCH_HISTORY.reduce((PREV_MATCH, CURRENT_MATCH) => {
            const KILLS_INFO_ARR = CURRENT_MATCH.kills.filter(killer => killer.killer_puuid === userData.puuid);

            if (!PREV_MATCH) {
                return [...PREV_MATCH]
            } else {
                return [...PREV_MATCH, ...KILLS_INFO_ARR]
            }
        }, [])

        const KILL_INFO_GROUP_BY_WEAPON = WHOLE_KILLS.reduce((prev, curr) => {
            const weaponName = curr.damage_weapon_name || 'Ultimate';
            const WEAPON_IMAGE_ASSETS = curr.damage_weapon_assets?.display_icon;
            if (!prev) {
                return {
                    ...prev,
                    [weaponName]: {
                        weaponName,
                        WEAPON_IMAGE_ASSETS,
                        kill: 1
                    }
                }
            } else {
                return {
                    ...prev,
                    [weaponName]: {
                        weaponName,
                        WEAPON_IMAGE_ASSETS,
                        kill: (prev[weaponName]?.kill ?? 0) + 1
                    }
                }
            }
        }, {})

        return Object.values(KILL_INFO_GROUP_BY_WEAPON);
    }

    return (
        <>
            <div className="top_weapon_container">
                <div className="top_weapon_detail_container">
                    <div className="top_weapon_header">
                        <span className="top_weapon">Top 무기</span>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </div>
                    <div className="top_weapon_info_container">

                        {usedWeaponInfos.map((info, index) => {

                            if (!showMore && index > 2) {
                                return null;
                            }

                            return (
                                <>
                                    <div className="top_weapon_info" key={index}>
                                        <div className="top_weapon_info_weapon_image_container">
                                            {info.WEAPON_IMAGE_ASSETS ? (
                                                <img width={60} height={15} src={info.WEAPON_IMAGE_ASSETS} />
                                            ): (
                                                <span style={{width: 60, fontSize: 11, textAlign: "center"}}>이미지없음</span>
                                            )}
                                        </div>
                                        <div className="top_weapon_info_weapon">
                                            <span className="top_weapon_agent">{info.weaponName}</span>
                                            <span className="top_weapon_avgscore">weapon </span>
                                        </div>
                                        <div className="top_weapon_info_record">
                                            <span className="top_weapon_record">{info.kill}</span>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                        <div style={{ display: "flex", justifyContent: "center", padding: "10px", cursor: "pointer" }} onClick={toggleShowMoreUsedWeaponInfo}>
                            <span style={{ textAlign: "center" }}>
                                {showMore ? "닫기" : "더보기"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}