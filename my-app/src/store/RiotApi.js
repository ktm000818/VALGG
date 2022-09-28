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
exports.getFeaturedBundle = exports.getAllAvailableOffers = exports.getMMRHistoryByPUUID = exports.getMMRHistory = exports.getMMRDataByPUUID = exports.getMMRData = exports.getAccountData = void 0;
const axios_1 = __importDefault(require("axios"));
const baseUrl = "https://api.henrikdev.xyz";
function getAccountData(username, tagline, onlyname) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseUrl}/valorant/v1/account/${username}/${tagline}`);
        if (onlyname) {
            const { name, tag } = response.data.data;
            return { label: `${name}#${tag}` };
        }
        else {
            return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
        }
    });
}
exports.getAccountData = getAccountData;
function getMMRData(version, region, username, tagline) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseUrl}/valorant/${version}/mmr/${region}/${username}/${tagline}`);
        return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
    });
}
exports.getMMRData = getMMRData;
function getMMRDataByPUUID(version, region, puuid) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseUrl}/valorant/${version}/by-puuid/mmr/${region}/${puuid}`);
        return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
    });
}
exports.getMMRDataByPUUID = getMMRDataByPUUID;
function getMMRHistory(region, username, tagline) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseUrl}/valorant/v1/mmr-history/${region}/${username}/${tagline}`);
        return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
    });
}
exports.getMMRHistory = getMMRHistory;
function getMMRHistoryByPUUID(region, puuid) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${baseUrl}/valorant/v1/by-puuid/mmr-history/${region}/${puuid}`);
        return (_a = response.data) === null || _a === void 0 ? void 0 : _a.data;
    });
}
exports.getMMRHistoryByPUUID = getMMRHistoryByPUUID;
// non params 
function getAllAvailableOffers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('https://api.henrikdev.xyz/valorant/v1/store-offers');
        return response.data;
    });
}
exports.getAllAvailableOffers = getAllAvailableOffers;
function getFeaturedBundle() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get('https://api.henrikdev.xyz/valorant/v1/store-featured');
        return response.data;
    });
}
exports.getFeaturedBundle = getFeaturedBundle;
