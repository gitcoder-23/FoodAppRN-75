import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';

type cacheImageProps = {
  [key: string]: any;
};

const CacheImage: React.FC<cacheImageProps> = props => {
  const [cachedSource, setCachedSource] = useState<any>(null);

  const {uri} = props;

  const getCachedImage = async () => {
    try {
      const cachedImageData = await AsyncStorage.getItem(uri);
      if (cachedImageData) {
        setCachedSource({uri: cachedImageData});
      } else {
        const response = await fetch(uri);
        const imageBlob = await response.blob();
        const base64Data: any = await new Promise((resolve: any) => {
          const reader = new FileReader();
          reader.readAsDataURL(imageBlob);
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });

        await AsyncStorage.setItem(uri, base64Data);
        setCachedSource({uri: base64Data});
      }
    } catch (error: any) {
      console.error('Error cached image: ', error);
      setCachedSource({uri});
    }
  };

  useEffect(() => {
    getCachedImage();
  }, []);

  return <Animated.Image source={cachedSource} {...props} />;
};

export default CacheImage;

const styles = StyleSheet.create({});
