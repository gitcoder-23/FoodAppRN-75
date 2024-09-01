import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {styled} from 'nativewind';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

type categoryType = {
  allCategories: CategoryModel[];
  categoryLoading: boolean;
  setActiveCategory: (categoryType: string) => void;
  activeCategory: string;
};

const Categories = ({
  allCategories,
  categoryLoading,
  setActiveCategory,
  activeCategory,
}: categoryType) => {
  return (
    <StyledView>
      <StyledScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{paddingHorizontal: 15}}>
        {allCategories &&
          allCategories.map((catData: CategoryModel, id) => {
            let isActiveCategory = catData.strCategory == activeCategory;
            console.log('isActiveCategory=>', isActiveCategory);

            let activeBtnClass = isActiveCategory
              ? 'bg-amber-400'
              : 'bg-black/10';

            let activeTextClass = isActiveCategory
              ? 'text-amber-600'
              : 'text-neutral-600';

            return (
              <StyledTouchableOpacity
                key={id}
                className="flex items-center space-y-1"
                onPress={() => setActiveCategory(catData.strCategory)}>
                <StyledView
                  className={`rounded-full p-[6px] ${activeBtnClass}`}>
                  <StyledImage
                    className="rounded-full"
                    source={{uri: catData.strCategoryThumb}}
                    style={{width: hp(6), height: hp(6)}}
                  />
                </StyledView>
                <StyledText
                  className={` ${activeTextClass}  text-center`}
                  style={{fontSize: hp(1.6)}}>
                  {catData.strCategory}
                </StyledText>
              </StyledTouchableOpacity>
            );
          })}
      </StyledScrollView>
    </StyledView>
  );
};

export default Categories;

const styles = StyleSheet.create({});
