interface Agent_en_us {
    name: string
    role: string
}

interface Agent_Ko_kr {
    name: string
    role: string
}

interface Tier_en_us {
    name: string
}

interface Tier_Ko_kr {
    name: string
}


interface LocalizationAgent {
    en_us: Agent_en_us
    ko_kr: Agent_Ko_kr
}

interface Localization {
    en_us: Tier_en_us
    ko_kr: Tier_Ko_kr
}



class Agent {
    localization: LocalizationAgent

    constructor(name_us: string, name_kr: string, role_us: string, role_kr: string) {
        this.localization = {
            en_us: {
                name: name_us,
                role: role_us,
            },
            ko_kr: {
                name: name_kr,
                role: role_kr,
            }
        }
    }
}

class Tier {
    localization: Localization

    constructor(name_us: string, name_kr: string) {
        this.localization = {
            en_us: {
                name: name_us
            },
            ko_kr: {
                name: name_kr
            }
        }
    }
}


export const agent = {
    Jett: new Agent("Jett", "제트", "Duelist", "타격대"),
    Raze: new Agent("Raze", "레이즈", "Duelist", "타격대"),
    Breach: new Agent("Breach", "브리치", "Initiator", "척후대"),
    Omen: new Agent("Omen", "오멘", "Controller", "전략가"),
    Brimstone: new Agent("Brimstone", "브림스톤", "Controller", "전략가"),
    Phoenix: new Agent("Phoenix", "피닉스", "Duelist", "타격대"),
    Sage: new Agent("Sage", "세이지", "Sentinel", "감시자"),
    Sova: new Agent("Sova", "소바", "Initiator", "척후대"),
    Viper: new Agent("Viper", "바이퍼", "Controller", "전략가"),
    Cypher: new Agent("Cypher", "사이퍼", "Sentinel", "감시자"),
    Reyna: new Agent("Reyna", "레이나", "Duelist", "타격대"),
    Killjoy: new Agent("Killjoy", "킬조이", "Sentinel", "감시자"),
    Sky: new Agent("Sky", "스카이", "Initiator", "척후대"),
    Yoru: new Agent("Yoru", "요루", "Duelist", "타격대"),
    Astra: new Agent("Astra", "아스트라", "Controller", "전략가"),
    'Kay/o': new Agent("Kay/o", "케이오", "Initiator", "척후대"),
    Chamber: new Agent("Chamber", "체임버", "Sentinel", "감시자"),
    Neon: new Agent("Neon", "네온", "Duelist", "타격대"),
    Fade: new Agent("Fade", "페이드", "Initiator", "척후대"),
    Harbor: new Agent("Harbor", "하버", "Controller", "전략가"),
} as const

export const tier = {
    'unranked': new Tier("unranked", "랭크 없음"),
    'Iron 1': new Tier("Iron 1", "아이언 1"),
    'Iron 2': new Tier("Iron 2", "아이언 2"),
    'Iron 3': new Tier("Iron 3", "아이언 3"),
    'Bronze 1': new Tier("Bronze 1", "브론즈 1"),
    'Bronze 2': new Tier("Bronze 2", "브론즈 2"),
    'Bronze 3': new Tier("Bronze 3", "브론즈 3"),
    'Silver 1': new Tier("Silver 1", "실버 1"),
    'Silver 2': new Tier("Silver 2", "실버 2"),
    'Silver 3': new Tier("Silver 3", "실버 3"),
    'Gold 1': new Tier("Gold 1", "골드 1"),
    'Gold 2': new Tier("Gold 2", "골드 2"),
    'Gold 3': new Tier("Gold 3", "골드 3"),
    'Platinum 1': new Tier("Platinum 1", "플래티넘 1"),
    'Platinum 2': new Tier("Platinum 2", "플래티넘 2"),
    'Platinum 3': new Tier("Platinum 3", "플래티넘 3"),
    'Diamond 1': new Tier("Diamond 1", "다이아몬드 1"),
    'Diamond 2': new Tier("Diamond 2", "다이아몬드 2"),
    'Diamond 3': new Tier("Diamond 3", "다이아몬드 3"),
    'Ascentdant 1': new Tier("Ascentdant 1", "초월자 1"),
    'Ascentdant 2': new Tier("Ascentdant 2", "초월자 2"),
    'Ascentdant 3': new Tier("Ascentdant 3", "초월자 3"),
    'Immortal 1': new Tier("Immortal 1", "불멸 1"),
    'Immortal 2': new Tier("Immortal 2", "불멸 2"),
    'Immortal 3': new Tier("Immortal 3", "불멸 3"),
    'Radiant': new Tier("Radiant", "레디언트"),
} as const

export const getAgentName: (name: string) => string = (name) => {
    const legion = "ko_kr"; // 국가 설정 필요

    return agent[name as keyof typeof agent]?.['localization'][legion].name ?? name;
}

export const getAgentRole: (name: string) => string = (name) => {
    const legion = "ko_kr"; // 국가 설정 필요

    return agent[name as keyof typeof agent]?.['localization'][legion]?.role ?? '';
}

export const getTierName: (name: string) => string = (name) => {
    const legion = "ko_kr"; // 국가 설정 필요

    return tier[name as keyof typeof tier]?.['localization'][legion].name ?? name;
}