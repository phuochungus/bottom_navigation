import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigationContainerRef,
  validatePathConfig,
} from '@react-navigation/native';
import {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import ProductItem, {ProductItemI} from '../components/product';
import {ProductContext} from '../../App';
import {useContext} from 'react';

export default function FavouriteScreen(): JSX.Element {
  const {products} = useContext(ProductContext);

  console.log('render from fav:');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        renderItem={({item}) => {
          if (item.isChecked)
            return (
              <ProductItem
                name={item.name}
                price={item.price}
                isChecked={item.isChecked}
              />
            );
          else return <></>;
        }}
        data={products}
      />
    </View>
  );
}
