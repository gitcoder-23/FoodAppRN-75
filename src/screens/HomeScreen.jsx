import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styled} from 'nativewind';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as IconsOutline from 'react-native-heroicons/outline';
import Categories from '../components/categories';
import axios from 'axios';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

const HomeScreen = () => {
  const [allCategories, setAllCategories] = useState([]);
  const getAllCategories = () => {
    axios
      .get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(resp => {
        if (resp.status == 200) {
          console.log('resp-categories=> ', resp.data.categories);
          setAllCategories(resp.data.categories);
        }
      })
      .catch(err => {
        console.log('err->', err);
      });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <StyledView className="flex-1 bg-white">
      <StatusBar barStyle="dark" />
      <StyledScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14">
        {/* Avatar & bell icon */}
        <StyledView className="mx-4 flex-row justify-between items-center nb-2">
          <Image
            source={require('../../assets/images/user_icon.png')}
            style={{height: hp(5), width: hp(5.5)}}
          />
          <IconsOutline.BellIcon size={hp(4)} color={'gray'} />
        </StyledView>

        <StyledView className="mx-4 space-y-2 mb-2">
          <StyledText className="text-neutral-600" style={{fontSize: hp(1.7)}}>
            Hello, Jack
          </StyledText>
          <StyledView className="">
            <StyledText
              className="font-semibold text-neutral-600"
              style={{fontSize: hp(3.8)}}>
              Make your own food
            </StyledText>
          </StyledView>
          <StyledText
            className="font-semibold text-neutral-600"
            style={{fontSize: hp(3.8)}}>
            Stay at{' '}
            <StyledText className="font-semibold text-amber-400">
              home
            </StyledText>
          </StyledText>
        </StyledView>

        {/* Viw search bar */}
        <StyledView className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7)}}
            className="flex-1 text-start mb-1 pl-3 tracking-wider"
          />
          <StyledView className="bg-white rounded-full p-3">
            <IconsOutline.MagnifyingGlassIcon
              size={hp(2.7)}
              strokeWidth={3}
              color={'gray'}
            />
          </StyledView>
        </StyledView>
        {/* Categories */}
        <StyledView>
          <Categories allCategories={allCategories} />
        </StyledView>
      </StyledScrollView>
    </StyledView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
