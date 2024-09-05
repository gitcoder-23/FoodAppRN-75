import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {styled} from 'nativewind';
import React from 'react';

const StyledView = styled(View);
const StyledText = styled(Text);

type LoadingProps = {
  [key: string]: any;
};

const Loading: React.FC<LoadingProps> = props => {
  return (
    <StyledView className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </StyledView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
