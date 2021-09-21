import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import HighchartsReactNative from '@highcharts/highcharts-react-native'
import { useState } from 'react';
import { useEffect } from 'react';

export default function index({ onColumnTap, OcrDtoList }) {
    const [items, setItems] = useState([]);
    // useEffect(() => {
    //     let tmpItems = [];
    //     OcrDtoList?.map((item) => {
    //         const { caseStatus, ocrPercentage, total, ocrCount } = item;
    //         const color = "#ff8000" //IDRAF_HIGELIGHT_COLORS?.[caseStatus?.toLowerCase()]


    //         tmpItems.push({
    //             name: caseStatus === "Cited" ? "Cited(Total)" : caseStatus,
    //             y: ocrCount,
    //             drilldown: caseStatus,
    //             color: color /* ? color :"#ff8000" */,
    //             borderColor: color
    //         });
    //     });
    //     setItems(tmpItems);
    // }, [OcrDtoList]);
    // const onColumnClick = async (e) => {
    //     if (e.point.name === "Cited(Total)") {
    //         onColumnTap && onColumnTap("Cited(Total)&citation=all")
    //     } else {
    //         onColumnTap && onColumnTap(e.point.name)
    //         //  await readIdrafData(e.point.name )
    //     }

    // }
  const  chartOptions= {
    series: [{
        data: [1, 2, 3]
    }]
}

    // const config = {
    //     chart: {
    //         type: "column",
    //         // options3d: {
    //         //     enabled: true,
    //         //     alpha: 15,
    //         //     beta: 15,
    //         //     depth: 50,
    //         //     viewDistance: 25
    //         // }
    //     },
    //     title: {
    //         text: ''
    //     },
    //     accessibility: {
    //         announceNewData: {
    //             enabled: true,
    //         },
    //     },
    //     xAxis: {
    //         type: "category",
    //     },
    //     yAxis: {
    //         title: false,
    //     },
    //     legend: {
    //         enabled: false,
    //     },
    //     plotOptions: {
    //         series: {
    //             dataLabels: {
    //                 enabled: true,
    //                 format: "{point.y:.1f}",
    //             },
    //         },
    //     },

    //     tooltip: {
    //         headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
    //         pointFormat:
    //             '<span style="color:{point.color}">{point.name} </span>: <b>{point.y:.2f}',
    //     },
    //     credits: {
    //         enabled: false,
    //     },
    //     series: [
    //         {

    //             keys: ['x', 'y', 'name'],
    //             point: {
    //                 events: {
    //                     click: onColumnClick
    //                 }
    //             },
    //             name: "Treatment",
    //             colorByPoint: true,
    //             data: [
    //                 ...items,
    //                 /* {
    //                   name: "Chrome",
    //                   y: 62.74,
    //                   drilldown: "Chrome",
    //                 },
    //                 {
    //                   name: "Firefox",
    //                   y: 10.57,
    //                   drilldown: "Firefox",
    //                 }, */
    //             ],
    //         },
    //     ],
    // }
    return (
        <View style={styles.container}>
            <HighchartsReactNative
                styles={styles.container}
                options={chartOptions}
            />
        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        flex: 1
    }
})
