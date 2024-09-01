import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styled} from 'nativewind';
import Animated, {FadeInDown} from 'react-native-reanimated';

type recipeCardType = {
  recipeItem: RecipeModel | any;
  recipeIndex: any;
};

const StyledView = styled(Animated.View);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const RecipeCard = ({recipeItem, recipeIndex}: recipeCardType) => {
  let isBoxEven = recipeIndex % 2 === 0;
  return (
    <StyledView
      entering={FadeInDown.delay(recipeIndex * 100)
        .duration(600)
        .springify()
        .damping(12)}>
      <StyledPressable
        className="flex justify-center mb-4 space-y-1"
        style={{
          width: '100%',
          paddingLeft: isBoxEven ? 0 : 8,
          paddingRight: isBoxEven ? 8 : 0,
        }}>
        <StyledImage
          source={{uri: recipeItem.strMealThumb}}
          style={{
            width: '100%',
            height: recipeIndex % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />
        <StyledText
          style={{fontSize: hp(1.5)}}
          className="font-semibold ml-2 text-neutral-600">
          {recipeItem.strMeal.length > 20
            ? recipeItem.strMeal.slice(0, 20) + '...'
            : recipeItem.strMeal}
        </StyledText>
      </StyledPressable>
    </StyledView>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({});
