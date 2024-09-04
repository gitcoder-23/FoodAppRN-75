import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styled} from 'nativewind';
import MasonryList from '@react-native-seoul/masonry-list';
import RecipeCard from './card_items/recipe_card';
import Loading from './loading';

const StyledMainView = styled(View);
const StyledView = styled(View);
// const StyledScrollView = styled(ScrollView);
const StyledText = styled(Text);

type recipeType = {
  allRecipes: RecipeModel[];
  receipeLoading: boolean;
  allCategories: CategoryModel[];
};

const Recipes = ({allRecipes, receipeLoading, allCategories}: recipeType) => {
  return (
    <StyledMainView className="mx-4 space-y-3">
      <StyledText
        className="font-semibold text-neutral-600"
        style={{fontSize: hp(3)}}>
        Recipes
      </StyledText>
      <StyledView>
        {receipeLoading ? (
          <>
            <Loading size="large" style={{marginTop: 20}} />
          </>
        ) : (
          <>
            {allCategories.length === 0 || allRecipes.length === 0 ? (
              <StyledView>
                <StyledText>No recipe found</StyledText>
              </StyledView>
            ) : (
              <MasonryList
                data={allRecipes}
                keyExtractor={(item): string => item.idMeal}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, i}) => (
                  <RecipeCard recipeItem={item} recipeIndex={i} />
                )}
                refreshing={receipeLoading}
                // onRefresh={() => refetch({first: ITEM_CNT})}
                onEndReachedThreshold={0.1}
                // onEndReached={() => loadNext(ITEM_CNT)}
              />
            )}
          </>
        )}
      </StyledView>
    </StyledMainView>
  );
};

export default Recipes;

const styles = StyleSheet.create({});
