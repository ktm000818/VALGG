"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToggleButton = exports.ToggleButtonWrapper = void 0;
const styled_1 = __importDefault(require("@emotion/styled"));
exports.ToggleButtonWrapper = styled_1.default.div `
    display: flex;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
`;
exports.ToggleButton = styled_1.default.span `
    text-align: center;
    font-size: 10px;
`;
