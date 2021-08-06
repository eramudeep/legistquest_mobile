import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import { appColors } from '../../utils/appColors';
import DynamicTabs from './DynamicTabs';
import Highcharts from '../../components/Highcharts'
import { connect } from 'react-redux';
 function CitiedIn({ data, onPress,isNightmode }) {
    console.log("data", data);
    const [tabs, setTabs] = useState([])
    const [tabsData, setTabsData] = useState([])
    const dataFormation = () => {
        let tab = []
        let tabData = []
        Object.keys(data.ocrdatalist).map((val) => {
            console.log("val", val);
            tab.push(val)
            tabData.push(data?.ocrdatalist[val])
        })
        setTabs(tab)
        setTabsData(tabData)
    }
    useEffect(() => {
        dataFormation()
    }, [data])
    const _renderData = (data) => {
        const { Petitioner, Responder, CourtName, DateOfJudgment, CaseNo, OcrStatus, Judgment } = data
        return (
            <View style={{ borderBottomWidth: scale(0.5), borderBottomColor: appColors.gray }}>
                <CustomLabel
                onPress={()=>onPress(data)}
                    text={`${Petitioner} V. ${Responder}`}
                    labelStyle={{ color: appColors.secondary }}
                />
                <View style={{}}>
                    <Text style={[styles.text,{color:isNightmode?appColors.white:appColors.black}]}>
                        {`${CourtName} | ${DateOfJudgment} | ${CaseNo}`}
                       {OcrStatus&& <Text style={{ fontWeight: "bold", color: appColors.red }}>{` | ${OcrStatus}`}</Text>}
                    </Text>
                    <Text style={[styles.text,{color:isNightmode?appColors.white:appColors.black}]}> 
                        {`${Judgment}`}
                    </Text>
                </View>
            </View>
        )
    }
    return (
        <View>
             <Highcharts/>
             <Text>---------------------</Text>
            <DynamicTabs tabs={tabs}>
                {tabsData.map((val, key) => {
                    console.log("val", val);
                    return (
                        <View key={key}>
                            {val?.map((data, key) => {
                                return (
                                    <View key={key}>
                                        {_renderData(data)}
                                    </View>
                                )
                            })
                            }
                        </View>
                    )
                })}
            </DynamicTabs>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: appColors.gray,
        fontSize: scale(11),
        letterSpacing: 0.8,
        padding: scale(5)
    },
})
const mapStateToProps = (state) => ({
    isNightmode:state.auth.isNightmode
   
  });
  const mapDispatchToProps = {
    
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CitiedIn);