import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

import {styled} from 'nativewind';

const StyledView = styled(Animated.View);
const StyledText = styled(Text);

const WelcomeScreen = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5));
    }, 100);
    setTimeout(() => {
      ring2Padding.value = withSpring(ring2Padding.value + hp(5.5));
    }, 300);
  }, [ring1Padding, ring2Padding]);

  return (
    <StyledView className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar backgroundColor="#F59E0B" barStyle="light-content" />
      {/* logo image with ring */}
      <StyledView
        className="bg-white/20 rounded-full"
        style={{padding: ring2Padding}}>
        <StyledView
          className="bg-white/20 rounded-full"
          style={{padding: ring1Padding}}>
          <Image
            source={require('../../assets/images/piza_banner.png')}
            style={styles.imageStyle}
          />
        </StyledView>
      </StyledView>
      {/* title & punchline */}
      <StyledView className="flex items-center space-y-2">
        <StyledText
          className="font-bold text-white tracking-widest"
          style={{fontSize: hp(7)}}>
          Foody
        </StyledText>
        <StyledText
          className="font-medium text-white tracking-widest"
          style={{fontSize: hp(2)}}>
          Food is always right
        </StyledText>
      </StyledView>
    </StyledView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  imageStyle: {width: hp(15.5), height: hp(15.5)},
});
