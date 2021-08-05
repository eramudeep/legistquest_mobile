import React from 'react';
import {View, Text,ScrollView} from 'react-native';
import FilterComp from './FilterComp';
import {connect} from 'react-redux';
import { toggleFilters } from '../../redux/filterActions';
 
 function index({Court,filters,toggleFilters$}) {
   
  return (
    <ScrollView>
      {Object.keys(Court)?.map((item, key) => {
        if(Court[item].length>0)
        return <FilterComp key={key} filters={filters} toggleFilters$={toggleFilters$} label={item} Court={Court[item]} />;
      })}
    </ScrollView>
  );
}
const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});
const mapDispatchToProps = {
  toggleFilters$: toggleFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
