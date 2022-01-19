import React from 'react';
import {connect} from 'react-redux';
import { toggleScMat } from './scMatAction';

export const mapStateToProps = (state) => ({
  ...state,
});

export const mapDispatchToProps = {
    toggleScMat$:toggleScMat
};

export const hocComponentName = (WrappedComponent) => {
  const hocComponent = ({...props}) => <WrappedComponent {...props} />;

  hocComponent.propTypes = {};

  return hocComponent;
};

export default (ReduxWrapper) =>
  connect(mapStateToProps, mapDispatchToProps)(hocComponentName(ReduxWrapper));
