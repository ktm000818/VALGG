"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedBundle = exports.getAllAvailableOffers = exports.getMMRHistoryByPUUID = exports.getMMRHistory = exports.getMMRDataByPUUID = exports.getMMRData = exports.getAccountDataTest = exports.getAccountData = exports.getAllUserData = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = "https://api.henrikdev.xyz";
function getAllUserData(props) {
    let arr = [
        getAccountDataTest(props),
        getMMRData(props),
        // getMMRDataByPUUID(props),
        getMMRHistory(props),
        getAllAvailableOffers(),
        getFeaturedBundle(),
        // getMMRHistoryByPUUID(props)
    ];
    return Promise.all(arr);
}
exports.getAllUserData = getAllUserData;
function getAccountData(name, tag, onlyname) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get(`${baseUrl}/valorant/v1/account/${name}/${tag}`);
            if (onlyname) {
                if (response.status === 200) {
                    const { name, tag } = response.data.data;
                    return { name: `${name}#${tag}` };
                }
                else {
                    return {};
                }
            }
            else {
                if (response.status === 200) {
                    return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
                }
                else {
                    return {};
                }
            }
        }
        catch (error) {
            console.log(error);
            return { name: "검색결과가 없습니다." };
        }
    });
}
exports.getAccountData = getAccountData;
function getAccountDataTest(props) {
    return axios_1.default.get(`${baseUrl}/valorant/v1/account/${props.name}/${props.tag}`);
}
exports.getAccountDataTest = getAccountDataTest;
function getMMRData(props) {
    return axios_1.default.get(`${baseUrl}/valorant/${props.version}/mmr/${props.region}/${props.name}/${props.tag}`);
}
exports.getMMRData = getMMRData;
function getMMRDataByPUUID(props) {
    return axios_1.default.get(`${baseUrl}/valorant/${props.version}/by-puuid/mmr/${props.region}/${props.puuid}`);
}
exports.getMMRDataByPUUID = getMMRDataByPUUID;
function getMMRHistory(props) {
    return axios_1.default.get(`${baseUrl}/valorant/v1/mmr-history/${props.region}/${props.name}/${props.tag}`);
}
exports.getMMRHistory = getMMRHistory;
function getMMRHistoryByPUUID(props) {
    return axios_1.default.get(`${baseUrl}/valorant/v1/by-puuid/mmr-history/${props.region}/${props.puuid}`);
}
exports.getMMRHistoryByPUUID = getMMRHistoryByPUUID;
// non params 
function getAllAvailableOffers() {
    return axios_1.default.get('https://api.henrikdev.xyz/valorant/v1/store-offers');
}
exports.getAllAvailableOffers = getAllAvailableOffers;
function getFeaturedBundle() {
    return axios_1.default.get('https://api.henrikdev.xyz/valorant/v1/store-featured');
}
exports.getFeaturedBundle = getFeaturedBundle;
