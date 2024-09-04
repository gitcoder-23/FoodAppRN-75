import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styled} from 'nativewind';
import Animated, {FadeInDown} from 'react-native-reanimated';
import CacheImage from '../cacheImage';

type recipeCardType = {
  recipeItem: RecipeModel | any;
  recipeIndex: any;
  navigation: any;
};

const StyledView = styled(Animated.View);
const StyledPressable = styled(Pressable);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const RecipeCard = ({recipeItem, recipeIndex, navigation}: recipeCardType) => {
  let isBoxEven = recipeIndex % 2 === 0;

  const onGoToDetail = () => {
    // console.log('navigation=>', navigation);

    // navigation.navigate('RecipeDetail', {...recipeItem});
    navigation.push('RecipeDetail', {...recipeItem});
  };
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
        }}
        onPress={() => onGoToDetail()}>
        <StyledImage
          source={{
            uri: recipeItem.strMealThumb,

            // cache: 'only-if-cached',
          }}
          style={{
            width: '100%',
            height: recipeIndex % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        {/* <CacheImage
          uri={{
            uri: recipeItem.strMealThumb,
          }}
          style={{
            width: '100%',
            height: recipeIndex % 3 === 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        /> */}
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
