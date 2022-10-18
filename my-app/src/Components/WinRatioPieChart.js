import * as am5 from "@amcharts/amcharts5"
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5locales_ko_KR from "@amcharts/amcharts5/locales/ko_KR";
import * as am5percent from "@amcharts/amcharts5/percent";

import { useEffect, useLayoutEffect } from "react";
import { fontWeight } from "@mui/system";

const WinRatioPieChart = () => {

    useLayoutEffect(() => {
        // Define data
        let chartData = {
            "1995": [
                { sector: "Agriculture", size: 6.6 },
                { sector: "Mining and Quarrying", size: 0.6 },
                { sector: "Manufacturing", size: 23.2 },
                { sector: "Electricity and Water", size: 2.2 },
                { sector: "Construction", size: 4.5 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 14.6 },
                { sector: "Transport and Communication", size: 9.3 },
                { sector: "Finance, real estate and business services", size: 22.5 }],
            "1996": [
                { sector: "Agriculture", size: 6.4 },
                { sector: "Mining and Quarrying", size: 0.5 },
                { sector: "Manufacturing", size: 22.4 },
                { sector: "Electricity and Water", size: 2 },
                { sector: "Construction", size: 4.2 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 14.8 },
                { sector: "Transport and Communication", size: 9.7 },
                { sector: "Finance, real estate and business services", size: 22 }],
            "1997": [
                { sector: "Agriculture", size: 6.1 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 20.9 },
                { sector: "Electricity and Water", size: 1.8 },
                { sector: "Construction", size: 4.2 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 13.7 },
                { sector: "Transport and Communication", size: 9.4 },
                { sector: "Finance, real estate and business services", size: 22.1 }],
            "1998": [
                { sector: "Agriculture", size: 6.2 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 21.4 },
                { sector: "Electricity and Water", size: 1.9 },
                { sector: "Construction", size: 4.2 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 14.5 },
                { sector: "Transport and Communication", size: 10.6 },
                { sector: "Finance, real estate and business services", size: 23 }],
            "1999": [
                { sector: "Agriculture", size: 5.7 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 20 },
                { sector: "Electricity and Water", size: 1.8 },
                { sector: "Construction", size: 4.4 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.2 },
                { sector: "Transport and Communication", size: 10.5 },
                { sector: "Finance, real estate and business services", size: 24.7 }],
            "2000": [
                { sector: "Agriculture", size: 5.1 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 20.4 },
                { sector: "Electricity and Water", size: 1.7 },
                { sector: "Construction", size: 4 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.3 },
                { sector: "Transport and Communication", size: 10.7 },
                { sector: "Finance, real estate and business services", size: 24.6 }],
            "2001": [
                { sector: "Agriculture", size: 5.5 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 20.3 },
                { sector: "Electricity and Water", size: 1.6 },
                { sector: "Construction", size: 3.1 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.3 },
                { sector: "Transport and Communication", size: 10.7 },
                { sector: "Finance, real estate and business services", size: 25.8 }],
            "2002": [
                { sector: "Agriculture", size: 5.7 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 20.5 },
                { sector: "Electricity and Water", size: 1.6 },
                { sector: "Construction", size: 3.6 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.1 },
                { sector: "Transport and Communication", size: 10.7 },
                { sector: "Finance, real estate and business services", size: 26 }],
            "2003": [
                { sector: "Agriculture", size: 4.9 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 19.4 },
                { sector: "Electricity and Water", size: 1.5 },
                { sector: "Construction", size: 3.3 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.2 },
                { sector: "Transport and Communication", size: 11 },
                { sector: "Finance, real estate and business services", size: 27.5 }],
            "2004": [
                { sector: "Agriculture", size: 4.7 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 18.4 },
                { sector: "Electricity and Water", size: 1.4 },
                { sector: "Construction", size: 3.3 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.9 },
                { sector: "Transport and Communication", size: 10.6 },
                { sector: "Finance, real estate and business services", size: 28.1 }],
            "2005": [
                { sector: "Agriculture", size: 4.3 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 18.1 },
                { sector: "Electricity and Water", size: 1.4 },
                { sector: "Construction", size: 3.9 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.7 },
                { sector: "Transport and Communication", size: 10.6 },
                { sector: "Finance, real estate and business services", size: 29.1 }],
            "2006": [
                { sector: "Agriculture", size: 4 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 16.5 },
                { sector: "Electricity and Water", size: 1.3 },
                { sector: "Construction", size: 3.7 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 14.2 },
                { sector: "Transport and Communication", size: 12.1 },
                { sector: "Finance, real estate and business services", size: 29.1 }],
            "2007": [
                { sector: "Agriculture", size: 4.7 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 16.2 },
                { sector: "Electricity and Water", size: 1.2 },
                { sector: "Construction", size: 4.1 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.6 },
                { sector: "Transport and Communication", size: 11.2 },
                { sector: "Finance, real estate and business services", size: 30.4 }],
            "2008": [
                { sector: "Agriculture", size: 4.9 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 17.2 },
                { sector: "Electricity and Water", size: 1.4 },
                { sector: "Construction", size: 5.1 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.4 },
                { sector: "Transport and Communication", size: 11.1 },
                { sector: "Finance, real estate and business services", size: 28.4 }],
            "2009": [
                { sector: "Agriculture", size: 4.7 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 16.4 },
                { sector: "Electricity and Water", size: 1.9 },
                { sector: "Construction", size: 4.9 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.5 },
                { sector: "Transport and Communication", size: 10.9 },
                { sector: "Finance, real estate and business services", size: 27.9 }],
            "2010": [
                { sector: "Agriculture", size: 4.2 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 16.2 },
                { sector: "Electricity and Water", size: 2.2 },
                { sector: "Construction", size: 4.3 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.7 },
                { sector: "Transport and Communication", size: 10.2 },
                { sector: "Finance, real estate and business services", size: 28.8 }],
            "2011": [
                { sector: "Agriculture", size: 4.1 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 14.9 },
                { sector: "Electricity and Water", size: 2.3 },
                { sector: "Construction", size: 5 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 17.3 },
                { sector: "Transport and Communication", size: 10.2 },
                { sector: "Finance, real estate and business services", size: 27.2 }],
            "2012": [
                { sector: "Agriculture", size: 3.8 },
                { sector: "Mining and Quarrying", size: 0.3 },
                { sector: "Manufacturing", size: 14.9 },
                { sector: "Electricity and Water", size: 2.6 },
                { sector: "Construction", size: 5.1 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 15.8 },
                { sector: "Transport and Communication", size: 10.7 },
                { sector: "Finance, real estate and business services", size: 28 }],
            "2013": [
                { sector: "Agriculture", size: 3.7 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 14.9 },
                { sector: "Electricity and Water", size: 2.7 },
                { sector: "Construction", size: 5.7 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.5 },
                { sector: "Transport and Communication", size: 10.5 },
                { sector: "Finance, real estate and business services", size: 26.6 }],
            "2014": [
                { sector: "Agriculture", size: 3.9 },
                { sector: "Mining and Quarrying", size: 0.2 },
                { sector: "Manufacturing", size: 14.5 },
                { sector: "Electricity and Water", size: 2.7 },
                { sector: "Construction", size: 5.6 },
                { sector: "Trade (Wholesale, Retail, Motor)", size: 16.6 },
                { sector: "Transport and Communication", size: 10.5 },
                { sector: "Finance, real estate and business services", size: 26.5 }]
        };

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
            innerRadius: 40,
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
        ])

        series.data.setAll([
            { result: "WIN", count: 3 },
            { result: "DEFEAT", count: 7 }
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

        let winRatio = "20%";
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
    }, [])

    return (
        <div id="chartdiv" style={{ width: "100px", height: "100px" }}></div>
    );

}

export default WinRatioPieChart;