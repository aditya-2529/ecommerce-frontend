import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View,
  Button, 
  StyleSheet
  } from 'react-native';

import { CartContext } from '../../../CartContext';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ProductDetails({route}:any) {
  const { productId } = useLocalSearchParams();
  const [data,setData] = useState(Object);
  const [count,setCount] = useState(1);
  const nav = useNavigation();
  
  const res = async() => {
    const query = `
    query data($id: ID!){getProductById(id: $id) {
          id
          name
          price
          description
          category
          stock
          imageUrl
      }}`
    const t = await fetch('https://ecommerce-fypz.onrender.com',{
      // const t = await fetch('http://localhost:3000',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({query:query,variables:{id:productId}})
      })
      var response = await t.json()
      console.log(response)
      // router.back()
      // nav.preload
      setData(response.data.getProductById)
  }
  
  
  const { addItemToCart } = useContext(CartContext);
  
  useEffect(()=>{
    res()
  },[])
  
  
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
                }>
        <Image
          style={styles.image}
          // source={data.imageUrl}
          source={{uri: data.imageUrl}}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.price}>$ {data.price}</Text>
          <Text style={styles.description}>{data.description}</Text>
            
        </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
