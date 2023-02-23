import { isEmpty } from "lodash";
import { atom, selector } from "recoil";
import { makeUUID } from "../components/uuid";

export const playerDefaultInfoState = atom({
    key: `playerDefaultInfoState${makeUUID()}`,
    default: {}
})

export const playerWholeInfoState = atom({
    key: `playerWholeInfoState${makeUUID()}`,
    default: {}
})

export const puuidState = selector({
    key: `puuidState${makeUUID()}`,
    get: ({ get }) => {
        const { puuid } = get(playerDefaultInfoState);
        return puuid;
    }
})


export const currentTierState = selector({
    key: `currentTierState${makeUUID()}`,
    get: ({ get }) => {
        const { current_data } = get(playerWholeInfoState);

        return current_data?.currenttier;
    }
})

export const currentTierImageSmallState = selector({
    key: `currentTierImageSmallState${makeUUID()}`,
    get: ({ get }) => {
        const { current_data } = get(playerWholeInfoState);

        return current_data?.images?.small;
    }
})

export const currentTierPatchedState = selector({
    key: `currentTierPatchedState${makeUUID()}`,
    get: ({ get }) => {
        const { current_data } = get(playerWholeInfoState);

        return current_data?.currenttierpatched ?? "unranked";
    }
})

export const latestFiveGamesState = selector({
    key: `latestFiveGamesState${makeUUID()}`,
    get: ({ get }) => {
        const { MatchHistory } = get(playerWholeInfoState);

        return MatchHistory;
    }
})

export const latestFiveGamesStatsState = selector({
    key: `latestFiveGamesStatsState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES = get(playerWholeInfoState)?.MatchHistory;
        const PLAYER_PUUID = get(playerDefaultInfoState)?.puuid;

        if (!PLAYER_PUUID) {
            return;
        }

        if (isEmpty(LATEST_FIVE_GAMES)) {
            return;
        }

        const USER_STATS = LATEST_FIVE_GAMES.reduce((PREVIOUS_GAME, CURRENT_GAME) => {
            const PLAYER = CURRENT_GAME.players.all_players.filter(player => player.puuid === PLAYER_PUUID)[0];
            const PLAYER_TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = CURRENT_GAME?.teams[PLAYER_TEAM].has_won === true ? "win" : "lose";
            const MATCH_KILLS = PLAYER.stats.kills;
            const PLAY_TIME = CURRENT_GAME.metadata.game_length;

            if (LATEST_FIVE_GAMES.length === 1) {
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
            } else if (PREVIOUS_GAME.kills === undefined) {
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

        return USER_STATS;
    }
})

export const latestFiveGamesKDARatioState = selector({
    key: `latestFiveGamesKDARatioState${makeUUID()}`,
    get: ({ get }) => {
        const stats = get(latestFiveGamesStatsState);

        if (isEmpty(stats)) {
            return 0;
        }

        const { kills, deaths, assists } = stats;

        if (deaths === 0) {
            return kills + assists;
        } else {
            const ratio = (kills + assists) / deaths;
            return ratio.toFixed(2);
        }
    }
})

export const latestFiveGamesKDRatioState = selector({
    key: `latestFiveGamesDPRState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES_STATS = get(latestFiveGamesStatsState);

        if (isEmpty(LATEST_FIVE_GAMES_STATS)) {
            return 0;
        }

        const { kills, deaths } = LATEST_FIVE_GAMES_STATS;

        if (deaths === 0) {
            return kills;
        } else {
            const ratio = kills / deaths;
            return ratio.toFixed(2);
        }
    }
})

export const seasonGameWinDefeatRecordState = selector({
    key: `seasonGameWinDefeatRecordState${makeUUID()}`,
    get: ({ get }) => {
        const BY_SEASON_DATA = get(playerWholeInfoState)?.by_season;

        if (isEmpty(BY_SEASON_DATA)) {
            return {};
        }

        const result = Object.values(BY_SEASON_DATA).reduce((PREV_SEASON, CURR_SEASON) => {
            if (CURR_SEASON?.error) {
                return { number_of_games: PREV_SEASON.number_of_games ?? 0, wins: PREV_SEASON.wins ?? 0 }
            } else if (CURR_SEASON?.old === false && CURR_SEASON?.number_of_games) {
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

        return result;
    }
})

export const currentSeasonWinsState = selector({
    key: `currentSeasonWinsState${makeUUID()}`,
    get: ({ get }) => {
        const CURRENT_SEASON_DATA = get(seasonGameWinDefeatRecordState);

        if (isEmpty(CURRENT_SEASON_DATA)) {
            return 0;
        }

        const { wins } = CURRENT_SEASON_DATA;

        return Number(wins) || 0;
    }
})

export const currentSeasonDefeatsState = selector({
    key: `currentSeasonDefeatsState${makeUUID()}`,
    get: ({ get }) => {
        const CURRENT_SEASON_DATA = get(seasonGameWinDefeatRecordState);

        if (isEmpty(CURRENT_SEASON_DATA)) {
            return 0;
        }

        const { wins, number_of_games } = CURRENT_SEASON_DATA;

        //TODO 무승부 제외 처리 해야함
        return Number(number_of_games - wins) || 0;
    }
})

export const latestFiveGamesWholeDamageState = selector({
    key: `latestFiveGamesWholeDamageState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES = get(latestFiveGamesState);
        const PUUID = get(puuidState);

        if (isEmpty(LATEST_FIVE_GAMES) || !PUUID) {
            return 0;
        }

        let sum = 0;

        for (let game of Object.values(LATEST_FIVE_GAMES)) {
            for (let round of game.rounds) {
                for (let player of round.player_stats) {
                    if (player.player_puuid === PUUID) {
                        sum += player.damage
                    }
                }
            }
        }

        return sum;
    }
})

export const latestFiveGamesWholeRoundsState = selector({
    key: `latestFiveGamesWholeRoundsState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES = get(latestFiveGamesState);

        if (isEmpty(LATEST_FIVE_GAMES)) {
            return 0;
        }

        const ROUNDS = LATEST_FIVE_GAMES.reduce((prev, curr) => {
            if (prev) {
                return prev + curr.rounds.length;
            } else {
                return curr.rounds.length;
            }
        }, 0)

        return ROUNDS;
    }

})

export const latestFiveGamesDPRState = selector({
    key: `latestFiveGamesDPRState${makeUUID()}`,
    get: ({ get }) => {
        const latestFiveGamesRounds = get(latestFiveGamesWholeRoundsState);
        const latestFiveGamesWholeDamage = get(latestFiveGamesWholeDamageState);

        if (latestFiveGamesRounds === undefined || latestFiveGamesWholeDamage === undefined) {
            return 0;
        }

        if (latestFiveGamesRounds === 0) {
            return 0;
        }

        return (latestFiveGamesWholeDamage / latestFiveGamesRounds).toFixed(2);
    }

})

export const latestFiveGamesWinRatioState = selector({
    key: `latestFiveGamesWinRatioState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES_STATS = get(latestFiveGamesStatsState);

        if (isEmpty(LATEST_FIVE_GAMES_STATS)) {
            return 0;
        }

        const { match_results } = LATEST_FIVE_GAMES_STATS;
        let winCount = 0;

        match_results.forEach(result => {
            if (result === "win") {
                ++winCount;
            }
        })

        return (100 / match_results.length) * winCount + "%";
    }
})

export const latestFiveGamesSPRState = selector({
    key: `latestFiveGamesSPRState${makeUUID()}`,
    get: ({ get }) => {
        const latestFiveGamesRounds = get(latestFiveGamesWholeRoundsState);
        const latestFiveGamesStats = get(latestFiveGamesStatsState);

        if (!latestFiveGamesRounds || isEmpty(latestFiveGamesStats)) {
            return 0;
        }

        const { score } = latestFiveGamesStats;

        return (score / latestFiveGamesRounds).toFixed(2);
    }

})

export const latestFiveGamesHeadshotPercentageState = selector({
    key: `headshotPercentageState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES_STATS = get(latestFiveGamesStatsState);
        if (isEmpty(LATEST_FIVE_GAMES_STATS)) {
            return 0 + "%";
        }
        const { headshots, bodyshots, legshots } = LATEST_FIVE_GAMES_STATS;
        return (headshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }
})

export const latestFiveGamesBodyshotPercentageState = selector({
    key: `bodyshotPercentageState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES_STATS = get(latestFiveGamesStatsState);
        if (isEmpty(LATEST_FIVE_GAMES_STATS)) {
            return 0 + "%";
        }
        const { headshots, bodyshots, legshots } = LATEST_FIVE_GAMES_STATS;
        return (bodyshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }
})

export const latestFiveGamesLegshotPercentageState = selector({
    key: `legshotPercentageState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES_STATS = get(latestFiveGamesStatsState);
        if (isEmpty(LATEST_FIVE_GAMES_STATS)) {
            return 0 + "%";
        }
        const { headshots, bodyshots, legshots } = LATEST_FIVE_GAMES_STATS;
        return (legshots / (headshots + bodyshots + legshots) * 100).toFixed(2) + "%";
    }
})

export const agentPlayInfosState = selector({
    key: `agentPlayInfosState${makeUUID()}`,
    get: ({ get }) => {
        const LATEST_FIVE_GAMES = get(latestFiveGamesState);

        if (isEmpty(LATEST_FIVE_GAMES)) {
            return [];
        }

        let UNFILTERED_INFOS = LATEST_FIVE_GAMES.reduce((prev, curr) => {
            const PLAYER = curr.players.all_players.filter(player => player.puuid === get(puuidState))[0];
            const TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = curr.teams?.[TEAM].has_won ? 'WIN' : 'DEFEAT';
            const STATS = PLAYER.stats;
            const AGENT_ICON_URL = PLAYER.assets.agent.small;

            return [
                ...prev,
                {
                    agent: PLAYER.character,
                    score: STATS.score,
                    kills: STATS.kills,
                    deaths: STATS.deaths,
                    assists: STATS.assists,
                    match_result: MATCH_RESULT,
                    AGENT_ICON_URL
                }
            ]

        }, [])

        const FILTERED_INFOS = UNFILTERED_INFOS.reduce((prev, curr) => {
            const { agent, assists, deaths, kills, match_result, score, AGENT_ICON_URL } = curr;

            if (prev[agent]) {
                return {
                    ...prev,
                    [agent]: {
                        agent: agent,
                        assists: prev[agent].assists + assists,
                        deaths: prev[agent].deaths + deaths,
                        kills: prev[agent].kills + kills,
                        score: prev[agent].score + score,
                        avgRecord: (((prev[agent].kills + kills) + (prev[agent].assists + assists)) / (prev[agent].deaths + deaths)).toFixed(2),
                        avgScore: ((prev[agent].score + score) / (prev[agent].matchCount + 1)).toFixed(0),
                        winRatio: ((prev[agent].matchWins + (match_result === "WIN" ? 1 : 0)) / (prev[agent].matchCount + 1) * 100).toFixed(0),
                        matchWins: prev[agent].matchWins + (match_result === "WIN" ? 1 : 0),
                        matchCount: prev[agent].matchCount + 1,
                        AGENT_ICON_URL
                    }
                }
            } else {
                return {
                    ...prev,
                    [agent]: {
                        agent,
                        assists,
                        deaths,
                        kills,
                        score,
                        avgScore: score,
                        avgRecord: ((kills + assists) / deaths).toFixed(2),
                        winRatio: match_result === "WIN" ? 100 : 0,
                        matchWins: match_result === "WIN" ? 1 : 0,
                        matchCount: 1,
                        AGENT_ICON_URL
                    }
                }
            }
        }, {})

        if (isEmpty(FILTERED_INFOS)) {
            return [];
        }

        return Object.values(FILTERED_INFOS);
    }
})

export const weaponStatsInfoState = selector({
    key: `weaponStatsInfo${makeUUID()}`,
    get: ({ get }) => {
        const { MatchHistory } = get(playerWholeInfoState);
        if (isEmpty(MatchHistory)) {
            return [];
        }
        const WHOLE_KILLS = MatchHistory.reduce((PREV_MATCH, CURRENT_MATCH) => {
            const KILLS_INFO_ARR = CURRENT_MATCH.kills.filter(killer => killer.killer_puuid === get(puuidState));

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
                        kill: (prev[weaponName]?.kill || 0) + 1
                    }
                }
            }
        }, {})

        return Object.values(KILL_INFO_GROUP_BY_WEAPON);
    }
})

export const matchHistoryGroupByMapState = selector({
    key: `matchHistoryGroupByMapState${makeUUID()}`,
    get: ({ get }) => {
        const MATCH_HISTORY = get(latestFiveGamesState);

        if (isEmpty(MATCH_HISTORY)) {
            return [];
        }

        const MatchHistoryGroupByMap = MATCH_HISTORY.reduce((prev, curr) => {
            const META_DATA = curr.metadata;
            const MAP = META_DATA.map;
            const PLAYER = curr.players.all_players.filter(player => player.puuid === get(puuidState))[0];
            const TEAM = PLAYER.team.toLowerCase();
            const MATCH_RESULT = curr.teams?.[TEAM].has_won ? 1 : 0;
            if (prev[MAP]) {
                return {
                    ...prev,
                    [MAP]: {
                        map: MAP,
                        metadata: [...prev[MAP].metadata, { ...META_DATA }],
                        matchWins: prev[MAP].matchWins + MATCH_RESULT,
                        winRatio: ((prev[MAP].matchWins + MATCH_RESULT) / (prev[MAP].matchCount + 1) * 100).toFixed(0),
                        matchCount: prev[MAP].matchCount + 1,
                        matchDefeats: (prev[MAP].matchCount + 1) - (prev[MAP].matchWins + MATCH_RESULT)

                    }
                }
            } else if (MAP) {
                return {
                    ...prev,
                    [MAP]: {
                        map: MAP,
                        metadata: [{ ...META_DATA }],
                        matchWins: MATCH_RESULT,
                        winRatio: MATCH_RESULT ? 100 : 0,
                        matchCount: 1,
                        matchDefeats: MATCH_RESULT ? 0 : 1
                    }
                }
            }
            else {
                return { ...prev }
            }
        }, {})

        return Object.values(MatchHistoryGroupByMap);
    }
})