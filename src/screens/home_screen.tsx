import {FlatList, Text, View} from 'react-native';
import ProductItem from '../components/product';
import {ProductContext} from '../../App';
import {useContext} from 'react';

export default function HomeScreen(): JSX.Element {
  const {products} = useContext(ProductContext);

  console.log('render from home:');

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={(item, index) => item.name}
        renderItem={({item}) => (
          <>
            <Text style={{color: 'red'}}>
              {item.isChecked ? 'true' : 'false'}
            </Text>
            <ProductItem
              name={item.name}
              price={item.price}
              isChecked={item.isChecked}
            />
          </>
        )}
        data={products}
      />
    </View>
  );
}
