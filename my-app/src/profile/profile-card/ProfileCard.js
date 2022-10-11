import "./profile_card.css"

export default function ProfileCard({ defaultUserData, setWholeUserData = () => {} }) {
    return (
        <>
            <div className="profile_header_container">
                <div className="profile_header">
                    <div className="profile_container">
                        <div className="profile">
                            <div className="profile_image_container">
                                <img className="profile_image" src={defaultUserData?.card?.small} />
                            </div>
                            <div className="profile_info_container">
                                <div>
                                    <strong className="profile_name">{defaultUserData?.name}</strong>
                                    <span className="profile_tag">#{defaultUserData?.tag}</span>
                                </div>
                                <div>
                                    <span className="profile_ladder">래더 랭킹</span>
                                    <span className="profile_ladder_rank">1231th</span>
                                </div>
                                <div>
                                    <button className="history_update_button" onClick={setWholeUserData}>전적 갱신</button>
                                </div>
                                <div>
                                    <span className="lastest_update_date">최근 업데이트: {defaultUserData?.last_update}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

