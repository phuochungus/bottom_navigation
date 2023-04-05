import {View, Image, Text, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {IMG_PRODUCT} from '../../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProductContext} from '../../App';
import CheckBox from '@react-native-community/checkbox';

export interface ProductItemI {
  name: string;
  price: number;
  isChecked: boolean;
}

export default function ProductItem(product: ProductItemI) {
  console.log('render: ' + JSON.stringify(product));
  const {setProducts} = useContext(ProductContext);

  const addToFav = () => {
    const jsonValue = JSON.stringify({...product, isChecked: true});
    console.log(jsonValue);
    AsyncStorage.setItem(product.name, jsonValue);

    setProducts(current =>
      current.map((obj: ProductItemI) => {
        if (obj.name == product.name) return {...obj, isChecked: true};
        return obj;
      }),
    );
  };

  const removeFromFav = () => {
    const jsonValue = JSON.stringify({...product, isChecked: false});
    console.log(jsonValue);
    AsyncStorage.setItem(product.name, jsonValue);

    setProducts(current =>
      current.map((obj: ProductItemI) => {
        if (obj.name == product.name) return {...obj, isChecked: false};
        return obj;
      }),
    );
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'black',
        margin: 20,
      }}>
      <Image source={IMG_PRODUCT} style={{height: 100, width: 100}} />
      <View style={styles.verticalLine} />
      <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
        <Text>{product.name}</Text>
        <Text>{product.price}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: 30,
        }}>
        <CheckBox
          value={product.isChecked}
          onValueChange={newValue => {
            if (newValue) {
              addToFav();
            } else {
              removeFromFav();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'black',
    margin: 20,
  },
  verticalLine: {
    height: '80%',
    width: 1,
    backgroundColor: 'green',
    alignSelf: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
});
