import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {styled} from 'nativewind';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

type categoryType = {
  allCategories: [];
};

const Categories = () => {
  return (
    <StyledView>
      <StyledScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}
      />
    </StyledView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
