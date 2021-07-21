import React from 'react';
import {View, Text} from 'react-native';
import FilterComp from './FilterComp';
import {connect} from 'react-redux';
import { toggleFilters } from '../../redux/filterActions';
 
 function index({Court,filters,toggleFilters$}) {
  return (
    <View>
      {Object.keys(Court)?.map((item, key) => {
        return <FilterComp key={key} filters={filters} toggleFilters$={toggleFilters$} label={item} Court={Court[item]} />;
      })}
    </View>
  );
}
 



const mapStateToProps = (state) => ({
  filters: state.filter.filters,
});
const mapDispatchToProps = {
  toggleFilters$: toggleFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);
