// const React = require('react');
import React, { Component } from 'react'
// const ReactNative = require('react-native');
// const { } = ReactNative;
import { View, StyleSheet, } from 'react-native'

import StaticContainer from "./StaticContainer"

const SceneComponent = (Props) => {
  const {shouldUpdated, ...props } = Props;
  return <View {...props}>
      <StaticContainer shouldUpdate={shouldUpdated}>
        {props.children}
      </StaticContainer>
  </View>;
};

module.exports = SceneComponent;