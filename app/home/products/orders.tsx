import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View,
  Button, 
  StyleSheet,
  FlatList
  } from 'react-native';

import { CartContext } from '../../../CartContext';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ProductDetails({route}:any) {
  const { orderId } = useLocalSearchParams();
  const [data,setData] = useState(Object);
  const nav = useNavigation();
  
  const res = async() => {
    const query = `
    query data($orderId: String!){getOrder(userId: $orderId) {
          id
          products{
              name
          }
          total
      }}`
    // const t = await fetch('https://ecommerce-fypz.onrender.com',{
      fetch('http://localhost:3000',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({query:query,variables:{orderId}})
      }).then((res) => res.json()).then((res) => {
      // console.log(res)
      // router.back()
      // nav.preload
      setData(res.data.getOrder)
      }).catch((e) => console.log(e));
  }
  
  useEffect(()=>{
    res()
  },[])

  function renderItem({item}:any) {
      const prd = item.products
      console.log(item)
      // for( var i = 0; i < prd.length;i++){
        return (
          <View style={styles.cartLine}>
              <Text style={styles.lineLeft}>{item.name} </Text>
              {/* <Text style={styles.lineRight}>$ {item.price * item.productTotal}</Text> */}
          </View>
        );
      // }
    }
  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
                }>
        <FlatList
              style={styles.itemsList}
              contentContainerStyle={styles.itemsListContainer}
              data={data.products}
              renderItem={renderItem}
              // keyExtractor={(item) => item.product.name.toString()}
              // ListFooterComponent={Totals}
            />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cartLine: { 
    flexDirection: 'row',
  },
  lineLeft: {
    fontSize: 20, 
    lineHeight: 40, 
    color:'#333333' 
  },
  lineRight: { 
    flex: 1,
    fontSize: 20, 
    fontWeight: 'bold',
    lineHeight: 40, 
    color:'#333333', 
    textAlign:'right',
  },
  itemsList: {
    backgroundColor: '#eeeeee',
  },
  itemsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white'
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: 'white'
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
    marginBottom: 16,
  },
});
