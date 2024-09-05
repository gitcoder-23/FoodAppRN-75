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
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {apiBaseUrl} from '../config';
import Loading from '../components/loading';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, {
  FadeInDown,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

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

const StyledMainView = styled(Animated.View);
const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledImage = styled(Image);
const StyledText = styled(Text);
const StyledITouchableOpacity = styled(TouchableOpacity);

const RecipeDetailScreen: React.FC<RecipeDetailScreenType> = ({
  navigation,
  route,
}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const [recipeDetailsLoading, setRecipeDetailsLoading] =
    useState<boolean>(false);
  const [recipeDetails, setRecipeDetails] = useState<any>(null);

  useEffect(() => {
    getRecipeDetails(recipeItem.idMeal);
  }, [route.params]);

  let recipeItem = route.params;
  console.log('recipeItem=>', recipeItem.idMeal);

  const getRecipeDetails = (id: string) => {
    setRecipeDetailsLoading(true);

    axios
      .get(`${apiBaseUrl}/lookup.php?i=${recipeItem.idMeal}`)

      .then(resp => {
        // console.log('getRecipeDetails-resp=>', resp.data.meals);

        if (resp.status === 200) {
          setRecipeDetailsLoading(false);
          setRecipeDetails(resp.data.meals[0]);
        }
      })
      .catch(err => {
        console.log('getRecipeDetails-err->', err);
        setRecipeDetailsLoading(false);
      });
  };

  const ingrediantsIndexs = (meal: any) => {
    if (!meal) {
      return [];
    }

    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + 1]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  // const getYoutubeVideoId = (url: string) => {
  //   const regex = /[?&]v={[^&]+}/;
  //   const match = url.match(regex);
  //   if (match && match[1]) {
  //     return match[1];
  //   }
  //   return null;
  // };

  const getYoutubeVideoId = (url: string | undefined): string | undefined => {
    if (!url) {
      return undefined;
    } // Handle undefined case

    const regex = /[?&]v=([^&]+)/; // Corrected regex pattern
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return undefined; // Return undefined instead of null
  };

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

      {/* Meal details */}

      {recipeDetailsLoading ? (
        <Loading size="large" style={{marginTop: 16}} />
      ) : (
        <StyledView className="px-4 flex justify-between space-y-4 pt-8">
          <StyledMainView
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="space-y-2">
            <StyledText
              style={{fontSize: hp(3), color: '#000'}}
              className="font-bold flex-1 text-neutral-700">
              {recipeDetails?.strMeal}
            </StyledText>
            <StyledText
              style={{fontSize: hp(2), color: '#000'}}
              className="font-medium flex-1 text-neutral-500">
              {recipeDetails?.strArea}
            </StyledText>
          </StyledMainView>
          <StyledMainView
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="flex-row justify-around">
            <StyledView className="flex rounded-full bg-amber-300 p-2">
              <StyledView
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex justify-center items-center">
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </StyledView>

              <StyledView className="flex items-center py-2 space-y-1">
                <StyledText
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  35
                </StyledText>
                <StyledText
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  Mins
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex rounded-full bg-amber-300 p-2">
              <StyledView
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex justify-center items-center">
                <UserIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </StyledView>

              <StyledView className="flex items-center py-2 space-y-1">
                <StyledText
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  03
                </StyledText>
                <StyledText
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  Servings
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex rounded-full bg-amber-300 p-2">
              <StyledView
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex justify-center items-center">
                <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
              </StyledView>

              <StyledView className="flex items-center py-2 space-y-1">
                <StyledText
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700">
                  103
                </StyledText>
                <StyledText
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  Cal
                </StyledText>
              </StyledView>
            </StyledView>
            <StyledView className="flex rounded-full bg-amber-300 p-2">
              <StyledView
                style={{height: hp(6.5), width: hp(6.5)}}
                className="bg-white rounded-full flex justify-center items-center">
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={'#525252'}
                />
              </StyledView>

              <StyledView className="flex items-center py-2 space-y-1">
                <StyledText
                  style={{fontSize: hp(2)}}
                  className="font-bold text-neutral-700"
                />
                <StyledText
                  style={{fontSize: hp(1.3)}}
                  className="font-bold text-neutral-700">
                  Easy
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledMainView>
          {/* Ingrediants */}
          <StyledView className="space-y-4">
            <StyledText
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Ingrediants
            </StyledText>
            <StyledView className="space-y-2 m-3">
              {ingrediantsIndexs(recipeDetails).map(i => {
                console.log('i=>', i);
                const measure = recipeDetails[`strMeasure${i}`]?.trim();
                const ingredient = recipeDetails[`strIngredient${i}`]?.trim();

                return (
                  <StyledView key={i} className="flex-row space-x-4">
                    {measure !== '' && ingredient !== '' && (
                      <>
                        <StyledView
                          style={{height: hp(1.5), width: hp(1.5)}}
                          className="bg-amber-300 rounded-full"
                        />
                        <StyledView className="flex-row space-x-2">
                          <StyledText
                            style={{fontSize: hp(1.7)}}
                            className="font-extrabold text-neutral-700">
                            {measure}
                          </StyledText>
                          <StyledText
                            style={{fontSize: hp(1.7)}}
                            className="font-medium text-neutral-600">
                            {ingredient}
                          </StyledText>
                        </StyledView>
                      </>
                    )}
                  </StyledView>
                );
              })}
            </StyledView>
          </StyledView>
          {/* Instructions */}
          <StyledView className="space-y-4">
            <StyledText
              style={{fontSize: hp(2.5)}}
              className="font-bold flex-1 text-neutral-700">
              Instructions
            </StyledText>

            <StyledText
              style={{fontSize: hp(1.6)}}
              className=" text-neutral-700">
              {recipeDetails?.strInstructions}
            </StyledText>
          </StyledView>

          {/* Video */}
          {recipeDetails?.strYoutube && (
            <StyledView className="space-y-4">
              <StyledText
                style={{fontSize: hp(2.5)}}
                className="font-bold flex-1 text-neutral-700">
                Recipe Video
              </StyledText>

              <StyledView>
                <YouTubeIframe
                  // videoId="nMyBC9staMU"
                  videoId={getYoutubeVideoId(recipeDetails?.strYoutube)}
                  height={hp(30)}
                />
              </StyledView>
            </StyledView>
          )}
        </StyledView>
      )}
    </StyledScrollView>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
