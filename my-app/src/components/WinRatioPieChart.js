"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
const am5 = __importStar(require("@amcharts/amcharts5"));
const ko_KR_1 = __importDefault(require("@amcharts/amcharts5/locales/ko_KR"));
const am5percent = __importStar(require("@amcharts/amcharts5/percent"));
const Animated_1 = __importDefault(require("@amcharts/amcharts5/themes/Animated"));
const react_1 = require("react");
const WinRatioPieChart = ({ matchWins = 0, matchDefeats = 0, matchCount = 0 }) => {
    (0, react_1.useLayoutEffect)(() => {
        const root = am5.Root.new("chartdiv");
        root.setThemes([
            Animated_1.default.new(root)
        ]);
        root.fps = 30;
        root.timezone = am5.Timezone.new("Asia/Tokyo");
        root.locale = ko_KR_1.default;
        //루트 비우기. 이제 이 루트에 다른 차트를 생성할 수 있다.
        // root.container.children.clear();
        //루트 삭제.
        //root.dispose();
        //루트 오토사이징
        // root.autoResize = false;
        //수동 사이징
        //root.resize();
        //파이차트
        let chart = root.container.children.push(am5percent.PieChart.new(root, {
            innerRadius: 30,
            layout: root.verticalLayout,
            radius: am5.percent(100)
        }));
        //시리즈
        let series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "count",
            name: "result"
        }));
        series.get("colors").set("colors", [
            am5.color("#5383E8"),
            am5.color("#E84057")
        ]);
        series.data.setAll([
            { result: "WIN", count: matchWins },
            { result: "DEFEAT", count: matchDefeats }
        ]);
        series.labels.template.set("visible", false);
        series.ticks.template.set("visible", false);
        series.slices.template.set("tooltipText", "");
        series.slices.template.set("toggleKey", "none");
        //시리즈 애니메이션 실행
        series.appear(1000, 100);
        // Add label
        let label = root.tooltipContainer.children.push(am5.Label.new(root, {
            x: am5.p50,
            y: am5.p50,
            centerX: am5.p50,
            centerY: am5.p50,
            fill: am5.color("#5383E8"),
            fontSize: 14,
            fontWeight: "bold",
        }));
        let winRatio = ((matchWins / matchCount) * 100) + "%";
        label.set("text", winRatio);
        // Animate chart data
        // function loop() {
        //     label.set("text", currentYear);
        //     let data = getCurrentData();
        //     for(var i = 0; i < data.length; i++) {
        //       series.data.setIndex(i, data[i]);
        //     }
        //     chart.setTimeout( loop, 4000 );
        // }
        // loop();
        return () => {
            root.dispose();
        };
    }, [matchCount, matchWins, matchDefeats]);
    return ((0, jsx_runtime_1.jsx)("div", { id: "chartdiv", style: { width: "90px", height: "90px" } }));
};
exports.default = WinRatioPieChart;
