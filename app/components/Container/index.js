import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors,higheShadow} from '../../utils/appColors';
import CustomHeader from '../CustomHeader';
import CustomLabel from '../CustomLabel/CustomLabel';
import {version as currentVersion} from '../../../package.json';
export default function Container({
  children,
  showFooter,
  isScrollable,
  bodyStyle,
  hideHeader,
  onHome,
  showMenu,
  showBack,
  showHome,
  hideLogo,
  showSignin,
  onSignin,
  signInLabel,
  showSearch,
  showProfile
}) {
  return (
    <View style={styles.container}>
      {!hideHeader && ( 
        <CustomHeader
          onSignin={onSignin}
          showMenu={showMenu}
          showHome={showHome}
          onHome={onHome}
          showBack={showBack}
          hideLogo={hideLogo}
          showSignin={showSignin}
          signInLabel={signInLabel}
          showSearch={showSearch}
          showProfile={showProfile}
        />
      )}
      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={[styles.bodyStyle, bodyStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.bodyStyle, bodyStyle]}>{children}</View>
      )}
      {showFooter && (
        <View style={{backgroundColor: appColors.white, ...higheShadow }}> 
          <CustomLabel
            text={
              `©2021 - LQ Global Services Private Limited. All rights reserved (${currentVersion})`
            }
            labelStyle={{
              fontSize: scale(8),
              textAlign: 'center',
              marginBottom: scale(5),
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  bodyStyle: {
    padding: scale(20),
    flex: 1,
  },
});
