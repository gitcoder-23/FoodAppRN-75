import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styled} from 'nativewind';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';

type RecipeDetailScreenType = {
  navigation: any;
  route: {
    key: string;
    name: string;
    params: {
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
    };
  };
};

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);
const StyledITouchableOpacity = styled(TouchableOpacity);

const RecipeDetailScreen: React.FC<RecipeDetailScreenType> = ({
  navigation,
  route,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {}, [route.params]);
  let recipeItem = route.params;

  console.log('recipeItemData =>', recipeItem);

  return (
    <StyledScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}>
      <StatusBar barStyle={'light-content'} />
      <StyledView className="flex-row justify-center">
        <StyledImage
          source={{
            uri: recipeItem.strMealThumb,

            // cache: 'only-if-cached',
          }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          className="bg-black/5"
        />
      </StyledView>
      {/* Back btn */}

      <StyledView className="w-full absolute flex-row justify-between items-center pt-14">
        <StyledITouchableOpacity
          onPress={() => {
            // navigation.goBack();
            navigation.pop();
          }}
          className="p-2 rounded-full ml-5 bg-white">
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'} />
        </StyledITouchableOpacity>
        <StyledITouchableOpacity
          onPress={() => setIsFavourite(!isFavourite)}
          className="p-2 rounded-full mr-5 bg-white">
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? 'red' : 'gray'}
          />
        </StyledITouchableOpacity>
      </StyledView>
    </StyledScrollView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
