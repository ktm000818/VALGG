import * as am5 from "@amcharts/amcharts5";
import am5locales_ko_KR from "@amcharts/amcharts5/locales/ko_KR";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";

const WinRatioPieChart = ({matchWins = 0, matchDefeats = 0, matchCount = 0}) => {

    useLayoutEffect(() => {

        const root = am5.Root.new("chartdiv");

        root.setThemes([
            am5themes_Animated.new(root)
        ])

        root.fps = 30;
        root.timezone = am5.Timezone.new("Asia/Tokyo");
        root.locale = am5locales_ko_KR;

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
        let series: any = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "count",
            name: "result"
        }));

        series.get("colors").set("colors", [
            am5.color("#5383E8"),
            am5.color("#E84057")
        ])

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
    }, [matchCount, matchWins, matchDefeats])

    return (
        <div id="chartdiv" style={{ width: "90px", height: "90px" }}></div>
    );

}

export default WinRatioPieChart;