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
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RiotApi_1 = require("../store/RiotApi");
const ProfileCard_1 = __importDefault(require("./profile-card/ProfileCard"));
const Rating_1 = __importDefault(require("./rating/Rating"));
const AgentPerformance_1 = __importDefault(require("./agent-performance/AgentPerformance"));
const TopWeapon_1 = __importDefault(require("./top-weapon/TopWeapon"));
const recoil_1 = require("recoil");
const playerWholeInfoStore_1 = require("../store/playerWholeInfoStore");
const styled_1 = __importDefault(require("@emotion/styled"));
function Profile() {
    const [defaultInfoRecoil, setDefaultInfoRecoil] = (0, recoil_1.useRecoilState)(playerWholeInfoStore_1.playerDefaultInfoState);
    const [infoRecoil, setInfoRecoil] = (0, recoil_1.useRecoilState)(playerWholeInfoStore_1.playerWholeInfoState);
    const { name, tag } = (0, react_router_dom_1.useLocation)().state;
    (0, react_1.useEffect)(() => {
        if (name && tag) {
            updatePlayerInfo();
        }
    }, [name]);
    /**
     * 유저 기본정보 조회
     */
    const getDefaultUserData = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, RiotApi_1.getAccountDataTest)({ name, tag });
            return data;
        }
        catch (error) {
            console.error(error);
            alert("조회 중 에러 발생!");
            return false;
        }
    });
    /**
     * 유저의 전체 데이터 조회
     */
    const getWholeUserData = (matchFilter, playerInfo) => __awaiter(this, void 0, void 0, function* () {
        const { name, tag, region, puuid } = playerInfo;
        const prop = {
            name,
            tag,
            version: "v2",
            region,
            puuid,
            matchFilter
        };
        try {
            const result = yield (0, RiotApi_1.getAllUserData)(prop);
            const filteredResult = result.reduce((prev, curr) => {
                const responseData = curr.data.data;
                if (Array.isArray(curr.data.data)) {
                    if (responseData.length > 0 && Object.keys(responseData[0]).includes("players")) {
                        return Object.assign(Object.assign({}, prev), { MatchHistory: responseData });
                    }
                    else {
                        return Object.assign(Object.assign({}, prev), { MMRHistory: responseData });
                    }
                }
                else {
                    return Object.assign({}, Object.assign(Object.assign({}, prev), responseData));
                }
            }, {});
            return filteredResult;
        }
        catch (error) {
            alert("전체 데이터 조회 중 에러 발생!");
            return {};
        }
    });
    /**
     * 플레이어의 모든 정보를 Recoil Store에 저장함
     */
    const updatePlayerInfo = () => __awaiter(this, void 0, void 0, function* () {
        const DEFAULT_USER_DATA = yield getDefaultUserData();
        if (DEFAULT_USER_DATA) {
            const WHOLE_USER_DATA = yield getWholeUserData("competitive", DEFAULT_USER_DATA);
            setDefaultInfoRecoil(DEFAULT_USER_DATA);
            setInfoRecoil(WHOLE_USER_DATA);
        }
    });
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(ProfileCard_1.default, { updatePlayerInfo: updatePlayerInfo }), (0, jsx_runtime_1.jsx)(MainWrapper, { children: (0, jsx_runtime_1.jsxs)(Main, { children: [(0, jsx_runtime_1.jsxs)(SideContentWrapper, { children: [(0, jsx_runtime_1.jsx)(Rating_1.default, {}), (0, jsx_runtime_1.jsx)(AgentPerformance_1.default, {}), (0, jsx_runtime_1.jsx)(TopWeapon_1.default, {})] }), (0, jsx_runtime_1.jsx)(CenterContentWrapper, {})] }) })] }));
}
exports.default = Profile;
const MainWrapper = styled_1.default.div `
    width: 1300px;
    padding: 20px 110px;
    margin: auto;
    box-sizing: border-box;
`;
const Main = styled_1.default.div `
    display: flex;
    justify-content: space-between;
`;
const SideContentWrapper = styled_1.default.div `
    display: flex;
    flex-direction: column;
`;
const CenterContentWrapper = styled_1.default.div `
    width: 740px;
    max-width: 740px;
    border: 1px solid black;
    display: flex;
`;
