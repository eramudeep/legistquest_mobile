import {View, Text,StyleSheet,Image} from 'react-native';
import React from 'react';
import Container from '../../components/Container';
import ReduxWrapper from '../../redux/ReduxWrapper';
import { scale } from 'react-native-size-matters';
 
function index(props) {
    const {auth:{ userData:{data}}} =props
    console.log({data});
  return (
    <Container showSearch   showBack > 
    <View style={styles.row}>
        <Image resizeMode='contain' source={{uri:data?.image}} style={{height:scale(80), width:scale(80)}} />
      </View> 

      <View style={styles.row}>
        <Text style={styles.label} >Name : </Text>
        <Text>{`${data?.firstName} ${data?.lastName}`}</Text>
      </View> 
      <View style={styles.row}>
        <Text style={styles.label}>Mobile : </Text>
        <Text>{ data?.mobile  }</Text>
      </View>
      

      <View style={styles.row}>
        <Text style={styles.label}>Email : </Text>
        <Text>{ data?.email  }</Text>
      </View>

    </Container>
  );
}
export default ReduxWrapper(index);

const styles =StyleSheet.create({
   row: {
       flexDirection:'row', 
       //justifyContent:'space-around',
       paddingVertical:scale(10)
    },
    label:{
    //  paddingHorizontal:scale(20)
    marginRight:scale(20),
    //fontSize:scale(16)
    }
})