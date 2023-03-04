interface En_us {
    name: string
    role: string
}

interface Ko_kr {
    name: string
    role: string
}

interface Localization {
    en_us: En_us
    ko_kr: Ko_kr
}



class Agent {
    localization: Localization

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

export const agent = {
    Zett: new Agent("Zett", "제트", "Duelist", "타격대"),
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

export const getAgentName: (name: string) => string = (name) => {
    const legion = "ko_kr"; // 국가 설정 필요

    return agent[name as keyof typeof agent]['localization'][legion].name;
}

export const getAgentRole: (name: string) => string = (name) => {
    const legion = "ko_kr"; // 국가 설정 필요

    return agent[name as keyof typeof agent]['localization'][legion].role;
}