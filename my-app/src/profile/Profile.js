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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const RiotApi_1 = require("../store/RiotApi");
function Profile() {
    const [userData, setUserData] = (0, react_1.useState)({});
    const location = (0, react_router_dom_1.useLocation)();
    function fetchUserData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const USER_DATA = yield (0, RiotApi_1.getAccountData)(location.state.username, location.state.tagline);
                setUserData(USER_DATA);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    (0, react_1.useEffect)(() => {
        fetchUserData();
    }, [location.state.username]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["name: ", userData.name, (0, jsx_runtime_1.jsx)("br", {}), "tag: ", userData.tag, (0, jsx_runtime_1.jsx)("br", {}), "level: ", userData.account_level, (0, jsx_runtime_1.jsx)("br", {}), "puuid: ", userData.puuid] }));
}
exports.default = Profile;
