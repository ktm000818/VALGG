import axios from "axios"

type Version = 'v1' | 'v2';
type Region = 'eu' | 'na' | 'ap' | 'kr';

const baseUrl = "https://api.henrikdev.xyz";

export async function getAccountData(username: string, tagline: string, onlyname?: boolean): Promise<object> {
    const response = await axios.get(`${baseUrl}/valorant/v1/account/${username}/${tagline}`);
    if (onlyname) {
        const { name, tag } = response.data.data;
        return { label: `${name}#${tag}` }
    } else {
        return response.data?.data;
    }
}

export async function getMMRData(version: Version, region: Region, username: string, tagline: string): Promise<object> {
    const response = await axios.get(`${baseUrl}/valorant/${version}/mmr/${region}/${username}/${tagline}`);
    return response.data?.data;
}

export async function getMMRDataByPUUID(version: Version, region: Region, puuid: string): Promise<object> {
    const response = await axios.get(`${baseUrl}/valorant/${version}/by-puuid/mmr/${region}/${puuid}`);
    return response.data?.data;
}

export async function getMMRHistory(region: Region, username: string, tagline: string): Promise<object> {
    const response = await axios.get(`${baseUrl}/valorant/v1/mmr-history/${region}/${username}/${tagline}`);
    return response.data?.data;
}

export async function getMMRHistoryByPUUID(region: Region, puuid: string): Promise<object> {
    const response = await axios.get(`${baseUrl}/valorant/v1/by-puuid/mmr-history/${region}/${puuid}`);
    return response.data?.data;
}

// non params 
export async function getAllAvailableOffers() {
    const response = await axios.get('https://api.henrikdev.xyz/valorant/v1/store-offers');
    return response.data;
}

export async function getFeaturedBundle() {
    const response = await axios.get('https://api.henrikdev.xyz/valorant/v1/store-featured');
    return response.data;
}

