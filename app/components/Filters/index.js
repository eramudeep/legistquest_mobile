import React from 'react';
import {View, Text,ScrollView,FlatList} from 'react-native';
import FilterComp from './FilterComp';
import {connect} from 'react-redux';
import { toggleFilters } from '../../redux/filterActions';
 
 function index({Court,filters,toggleFilters$}) {
   
  /* return (
    <ScrollView>
      {Object.keys(Court)?.map((item, key) => {
        if(Court[item].length>0)
        return <FilterComp key={key} filters={filters} toggleFilters$={toggleFilters$} label={item} Court={Court[item]} />;
      })}
    </ScrollView>
  ); */

  return(
    <FlatList keyExtractor={(item,index)=> `${new Date().getTime()}_${item}` } data={Object.keys(Court)} renderItem={({item,index})=> <FilterComp key={index} filters={filters} toggleFilters$={toggleFilters$} label={item} Court={Court[item]} />} />
  )
}
const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});
const mapDispatchToProps = {
  toggleFilters$: toggleFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo( index));
