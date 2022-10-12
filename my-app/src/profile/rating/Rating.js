import dayjs from "dayjs";
import { useEffect, useState } from "react";
import './rating.css';

export default function Rating({ userData }) {
    const [latestFiveGamesKDARatio, setLatestFiveGamesKDARatio] = useState(0);
    const [latestFiveGamesKDRatio, setLatestFiveGamesKDRatio] = useState(0);
    const [latestFiveGamesWinRatio, setlatestFiveGamesWinRatio] = useState(0);
    const [seasonWins, setSeasonWins] = useState(0);
    const [seasonDefeats, setSeasonDefeats] = useState(0);
    const [latestFiveGamesDPR, setLatestFiveGamesDPR] = useState(0);
    const [latestFiveGamesSPR, setLatestFiveGamesSPR] = useState(0);
    const [userStats, setUserStats] = useState({});

    useEffect(() => {
        console.log(userData)
    }, [userData])

    useEffect(() => {
        if (userData?.MatchHistory) {
            setUserStats(getLatestFiveGamesStats(userData.puuid));
            setLatestFiveGamesKDRatio(getKDRatio(getLatestFiveGamesStats(userData.puuid)));
            setLatestFiveGamesKDARatio(getKDARatio(getLatestFiveGamesStats(userData.puuid)));
            setlatestFiveGamesWinRatio(getWinRatio(getLatestFiveGamesStats(userData.puuid)));
            setLatestFiveGamesDPR(getLatestFiveGamesDPR());
            setLatestFiveGamesSPR(getLatestFiveGamesSPR());
        }
        if (userData?.by_season) {
            const { wins, number_of_games } = getSeasonGameWinDefeatRecord();
            setSeasonWins(wins);
            setSeasonDefeats(number_of_games - wins);
        }
    }, [userData])

    function setDefaultRankImage(e) {
        e.target.src = '';
    }

    function getLatestFiveGames() {
        return userData.MatchHistory ?? [];
    }

    function getLatestFiveGamesStats(playerPuuid = '') {
        const LATEST_FIVE_GAME = getLatestFiveGames();

        const USER_STATS = LATEST_FIVE_GAME.reduce((PREVIOUS_GAME, CURRENT_GAME) => {
            const PLAYER = CURRENT_GAME.players.all_players.filter(player => player.puuid === playerPuuid)[0];
            const PLAYER_TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = CURRENT_GAME?.teams[PLAYER_TEAM].has_won === true ? "win" : "lose";
            const MATCH_KILLS = PLAYER.stats.kills;
            const PLAY_TIME = CURRENT_GAME.metadata.game_length;

            if(LATEST_FIVE_GAME.length === 1){ 
                // if match history array has only one object, just return it. 
                return {
                    kills: PLAYER.stats.kills,
                    deaths: PLAYER.stats.deaths,
                    assists: PLAYER.stats.assists,
                    bodyshots: PLAYER.stats.bodyshots,
                    headshots: PLAYER.stats.headshots,
                    legshots: PLAYER.stats.legshots,
                    score: PLAYER.stats.score,
                    match_kills: [MATCH_KILLS],
                    match_results: [MATCH_RESULT],
                    play_time: PLAY_TIME
                }
            }else if (PREVIOUS_GAME.kills === undefined) {
                return {
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    bodyshots: 0,
                    headshots: 0,
                    legshots: 0,
                    score: 0,
                    match_kills: [],
                    match_results: [],
                    play_time: 0
                }
            } else {
                return {
                    kills: PLAYER.stats.kills + PREVIOUS_GAME.kills,
                    deaths: PLAYER.stats.deaths + PREVIOUS_GAME.deaths,
                    assists: PLAYER.stats.assists + PREVIOUS_GAME.assists,
                    bodyshots: PLAYER.stats.bodyshots + PREVIOUS_GAME.bodyshots,
                    headshots: PLAYER.stats.headshots + PREVIOUS_GAME.headshots,
                    legshots: PLAYER.stats.legshots + PREVIOUS_GAME.legshots,
                    score: PLAYER.stats.score + PREVIOUS_GAME.score,
                    match_kills: [...PREVIOUS_GAME.match_kills, MATCH_KILLS],
                    match_results: [...PREVIOUS_GAME.match_results, MATCH_RESULT],
                    play_time: PLAY_TIME + PREVIOUS_GAME.play_time
                }
            }
        }, {})

        USER_STATS.most_kill_match = Math.max(...USER_STATS.match_kills); // 최다킬 매치

        console.log(USER_STATS)
        return USER_STATS;
    }

    function getKDRatio(stats = {}) {
        const { kills, deaths } = stats;

        if (deaths === 0) {
            return kills;
        } else {
            const ratio = kills / deaths;
            return ratio.toFixed(2);
        }
    }

    function getKDARatio(stats = {}) {
        const { kills, assists, deaths } = stats;

        if (deaths === 0) {
            return kills + assists;
        } else {
            const ratio = (kills + assists) / deaths;
            return ratio.toFixed(2);
        }
    }

    function getWinRatio(stats = {}) {
        const { match_results } = stats;
        let winCount = 0;

        match_results.forEach(result => {
            if (result === "win") {
                ++winCount;
            }
        })

        return (100 / match_results.length) * winCount + "%";
    }

    function getSeasonGameWinDefeatRecord() {



        const gameRecord = Object.values(userData?.by_season).reduce((PREV_SEASON, CURR_SEASON) => {

            if(CURR_SEASON?.error){
                return {...PREV_SEASON}
            }else if (CURR_SEASON?.old === false && CURR_SEASON?.number_of_games) {
                if (!PREV_SEASON.number_of_games) {
                    return { number_of_games: CURR_SEASON.number_of_games, wins: CURR_SEASON.wins }
                } else {
                    return { number_of_games: CURR_SEASON.number_of_games + PREV_SEASON.number_of_games, wins: CURR_SEASON.wins + PREV_SEASON.wins }
                }
            } else {
                if (!PREV_SEASON.number_of_games) {
                    return { ...PREV_SEASON }
                } else {
                    return { number_of_games: 0 + PREV_SEASON.number_of_games, wins: 0 + PREV_SEASON.wins }
                }
            }
        }, {})

        return gameRecord;
    }

    function getLatestFiveGamesRounds() {
        const rounds = getLatestFiveGames().reduce((prev, curr) => {
            if (prev) {
                return prev + curr.rounds.length;
            } else {
                return curr.rounds.length;
            }
        }, 0)

        return rounds;
    }

    function getLatestFiveGamesDPR() {
        function getLatestFiveGamesWholeDamage(matches) {

            let sum = 0;

            for (let match of Object.values(matches)) {
                for (let round of match.rounds) {
                    for (let player of round.player_stats) {
                        if (player.player_puuid === userData.puuid) {
                            sum += player.damage
                        }
                    }
                }
            }

            return sum;
        }
        const latestFiveGamesRounds = getLatestFiveGamesRounds();
        const latestFiveGamesWholeDamage = getLatestFiveGamesWholeDamage(getLatestFiveGames());
        return (latestFiveGamesWholeDamage / latestFiveGamesRounds).toFixed(2);
    }

    function getLatestFiveGamesSPR() {
        const latestFiveGamesRounds = getLatestFiveGamesRounds();
        const latestFiveGamesScore = getLatestFiveGamesStats(userData.puuid).score;

        return (latestFiveGamesScore / latestFiveGamesRounds).toFixed(2);
    }

    function getHeadShotPercentage() {
        const { headshots, bodyshots, legshots } = userStats;
        return (headshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }

    function getBodyShotPercentage() {
        const { headshots, bodyshots, legshots } = userStats;
        return (bodyshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }

    function getLegShotPercentage() {
        const { headshots, bodyshots, legshots } = userStats;
        return (legshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }


    const { current_data } = userData;
    const {
        kills,
        deaths,
        assists,
        bodyshots,
        headshots,
        legshots,
        score,
        most_kill_match,
        play_time
    } = userStats;

    const HEAD_SHOT_PERCENTAGE = getHeadShotPercentage();
    const BODY_SHOT_PERCENTAGE = getBodyShotPercentage();
    const LEG_SHOT_PERCENTAGE = getLegShotPercentage();

    return (
        <>

            <div className="stats_container">
                <div className="stats_detail_container">
                    <div className="stats_rating_container">
                        <span className="rating">레이팅</span>
                        <select className="act">
                            <option>경쟁전</option>
                        </select>
                    </div>
                    <div className="rank_info_container">
                        <div className="rank_image_container">
                            {current_data?.currenttier && (
                                <img className="rank_image" src={current_data?.images?.small} onError={setDefaultRankImage} />
                            )}
                        </div>
                        <div className="rank_stats_container">
                            <span className="rank">{current_data?.currenttierpatched ?? "unranked"}</span>
                            <span className="kda">최근 5게임 KDA 비율 {latestFiveGamesKDARatio} : 1</span>
                            <span className="winlose">시즌 전적 : {`${seasonWins}승 ${seasonDefeats}패`}</span>
                        </div>
                    </div>
                    <div className="record_description">최근 5경기</div>
                    <div className="record_container">
                        <div className="record_dpr_container">
                            <span className="dpr_label">데미지/라운드</span>
                            <span className="dpr">{latestFiveGamesDPR}</span>
                        </div>
                        <div className="record_kd_container">
                            <span className="kd_ratio_label">K/D 비율</span>
                            <span className="kd">{latestFiveGamesKDRatio}</span>
                        </div>
                        <div className="record_win_ratio_container">
                            <span className="win_ratio_label">승률</span>
                            <span className="win_ratio">{latestFiveGamesWinRatio}</span>
                        </div>
                        <div className="record_spr_container">
                            <span className="spr_label">점수/라운드</span>
                            <span className="spr">{latestFiveGamesSPR}</span>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="detail_record_container">
                        <div className="detail_record_kill_container">
                            <span className="kill">킬</span>
                            <span className="kill_count">{kills}</span>
                        </div>
                        <div className="detail_record_death_container">
                            <span className="death">데스</span>
                            <span className="death_count">{deaths}</span>
                        </div>
                        <div className="detail_record_assists_container">
                            <span className="assists">어시스트</span>
                            <span className="assists_count">{assists}</span>
                        </div>
                        <div className="detail_record_headshot_container">
                            <span className="headshot">헤드샷</span>
                            <span className="headshot_count">{HEAD_SHOT_PERCENTAGE}</span>
                        </div>
                        <div className="detail_record_bodyshot_container">
                            <span className="bodyshot">바디샷</span>
                            <span className="bodyshot_count">{BODY_SHOT_PERCENTAGE}</span>
                        </div>
                        <div className="detail_record_legshot_container">
                            <span className="legshot">레그샷</span>
                            <span className="legshot_count">{LEG_SHOT_PERCENTAGE}</span>
                        </div>
                        <div className="detail_record_mostkillmatch_container">
                            <span className="mostkillmatch">Most 킬 매치</span>
                            <span className="mostkillmatch_count">{most_kill_match}</span>
                        </div>
                        <div className="detail_record_playtime_container">
                            <span className="playtime">플레이 시간</span>
                            <span className="playtime_count">{dayjs(play_time).format("HH시 MM분 ss”")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}