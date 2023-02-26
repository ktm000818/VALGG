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
const styled_1 = __importDefault(require("@emotion/styled"));
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const CustomAutoComplete_1 = __importDefault(require("../components/CustomAutoComplete"));
const RiotApi_1 = require("../store/RiotApi");
const Utils_1 = require("../Utils");
const valorant_svg_1 = require("../assets/images/valorant.svg");
function Header() {
    const [userList, setUserList] = (0, react_1.useState)([{ name: '' }]);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleChangeAutoComplete = (value) => {
        if (value.includes("#")) {
            const [name, tag] = value.split("#");
            navigate(`/profile?name=${name}&tag=${tag}`, {
                state: {
                    name,
                    tag
                }
            });
        }
    };
    const handleChangeInput = (value) => __awaiter(this, void 0, void 0, function* () {
        if (value.includes("#")) {
            (0, Utils_1.debounce)(() => __awaiter(this, void 0, void 0, function* () {
                const [name, tag] = value.split("#");
                const USER_LIST = yield (0, RiotApi_1.getAccountData)(name, tag, true);
                setUserList([USER_LIST]);
            }), 1000);
        }
        else {
            setUserList([{ name: '' }]);
        }
    });
    const moveToHome = () => {
        navigate('/');
    };
    return ((0, jsx_runtime_1.jsxs)(HeaderWrapper, { children: [(0, jsx_runtime_1.jsxs)(TitleImageWrapper, { children: [(0, jsx_runtime_1.jsx)(valorant_svg_1.ReactComponent, { onClick: moveToHome }), (0, jsx_runtime_1.jsx)(HeaderTitle, Object.assign({ onClick: moveToHome }, { children: "Valorant" }))] }), (0, jsx_runtime_1.jsx)(CustomAutoComplete_1.default, { id: "header_auto_complete", options: userList, onInputChange: handleChangeInput, onChange: handleChangeAutoComplete })] }));
}
exports.default = Header;
const HeaderWrapper = styled_1.default.div `
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #E84057;
    height: 80px;
`;
const TitleImageWrapper = styled_1.default.div `
    display: flex;
    align-items: center;
    margin-left: 10px;
`;
const HeaderTitle = styled_1.default.div `
    height: 70px;
    display: flex;
    align-items: center;
    margin-left: 20px;
    font-size: 2rem;
    font-weight: bold;
`;
