import axios from "axios";

export type Version = 'v1' | 'v2';
export type Region = 'eu' | 'na' | 'ap' | 'kr';

export interface AllProps {
    name?: string;
    tag?: string;
    onlyname?: boolean;
    version?: Version;
    region?: Region;
    puuid?: string;
}

const baseUrl = "https://api.henrikdev.xyz";

export function getAllUserData(props: AllProps) {

    let arr = [
        getAccountDataTest(props),
        getMMRData(props),
        // getMMRDataByPUUID(props),
        getMMRHistory(props),
        getAllAvailableOffers(),
        getFeaturedBundle(),
        // getMMRHistoryByPUUID(props)
    ]

    return Promise.all(arr)

}

export async function getAccountData(name: string, tag: string, onlyname?: boolean): Promise<object> {
    try {
        const response = await axios.get(`${baseUrl}/valorant/v1/account/${name}/${tag}`);

        if (onlyname) {
            if (response.status === 200) {
                const { name, tag } = response.data.data;
                return { name: `${name}#${tag}` }
            } else {
                return {};
            }

        } else {
            if (response.status === 200) {
                return response.data?.data;
            } else {
                return {};
            }
        }
    } catch (error) {
        console.log(error)
        return { name: "검색결과가 없습니다." };
    }

}

export function getAccountDataTest(props: AllProps) {
    return axios.get(`${baseUrl}/valorant/v1/account/${props.name}/${props.tag}`)
}

export function getMMRData(props: AllProps) {
    return axios.get(`${baseUrl}/valorant/${props.version}/mmr/${props.region}/${props.name}/${props.tag}`);
}

export function getMMRDataByPUUID(props: AllProps) {
    return axios.get(`${baseUrl}/valorant/${props.version}/by-puuid/mmr/${props.region}/${props.puuid}`);
}

export function getMMRHistory(props: AllProps) {
    return axios.get(`${baseUrl}/valorant/v1/mmr-history/${props.region}/${props.name}/${props.tag}`);
}

export function getMMRHistoryByPUUID(props: AllProps) {
    return axios.get(`${baseUrl}/valorant/v1/by-puuid/mmr-history/${props.region}/${props.puuid}`);
}

// non params 
export function getAllAvailableOffers() {
    return axios.get('https://api.henrikdev.xyz/valorant/v1/store-offers');
}

export function getFeaturedBundle() {
    return axios.get('https://api.henrikdev.xyz/valorant/v1/store-featured');
}
