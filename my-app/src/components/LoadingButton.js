"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const styled_1 = __importDefault(require("@emotion/styled"));
const react_spinners_1 = require("react-spinners");
const override = {
    position: "absolute",
    display: "block",
    margin: "0 auto",
    // borderColor: "green",
    top: "3px",
    left: "27px",
    width: "30px",
    height: "30px",
};
function LoadingButton({ children, color = 'white', loading, onClick }) {
    return ((0, jsx_runtime_1.jsxs)(Button, Object.assign({ onClick: onClick, disabled: loading }, { children: [(0, jsx_runtime_1.jsx)(ButtonLabel, { children: loading === false ? children : "조회 중.." }), (0, jsx_runtime_1.jsx)(react_spinners_1.ClipLoader, { color: color, loading: loading, cssOverride: override, size: 150, "aria-label": "Loading Spinner", "data-testid": "loader" })] })));
}
exports.default = LoadingButton;
const Button = styled_1.default.button `
    width: 90px;
    height: 40px;
    padding: 0 16px;
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#4fc54f' : '#E84057'};
    font-weight: bold;
    margin-top: 9px;
    border: 0px;
    cursor: ${props => props.disabled ? 'default' : 'pointer'};
    &:hover {
        ${props => props.disabled ? 'none' : 'background-color: #AC2537'}
    };
    position: relative;
`;
const ButtonLabel = styled_1.default.span `
    font-weight: bold;
    color: white;
`;
