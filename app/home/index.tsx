import React, {useEffect, useState} from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';

import { Product } from '../../components/Product';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

var name = '';
AsyncStorage.getItem('MY_USER_INFO').then((res) => {
  name = JSON.parse(res);
}).catch((e) => console.log(e));

export default function ProductsList () {

  function renderProduct({item: product}:any) {
    return (
      <Product {...product} 
        onPress={() => {
          // nav.navigate('/home/products')
          // nav.setParams({productId:product.id})
          // location.href = '/home/products?productId='+product.id
          router.push({
            params: {productId:product.id},
            pathname: '/home/products',
          })
          
        }}
      />
    );
  }
  
  const [products, setProducts] = useState([]);
  const [data,setData] = useState(Object);
  
  
  useEffect(()=>{
    res()
  },[])
    const res = async() => {
      const query = `
      query {getAllProduct {
            id
            name
            price
            description
            category
            stock
            imageUrl
        }}`
    // const t = await fetch('https://ecommerce-fypz.onrender.com',{
        const t = await fetch('http://localhost:3000',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({query:query})
        })
        var response = await t.json()
        // console.log(response)
        setData(response.data.getAllProduct)
    }
    // console.log(data)
  
  useEffect(() => {
    if(data!==null){setProducts(data);}
  });
  if(name !== null){
  return (
    <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
            <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
            />
            }>
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      // keyExtractor={(item) => item.id.toString()}
      data={products}
      renderItem={renderProduct}
    />
    </ParallaxScrollView>
  );
  }
  else {
    return (
      <Redirect href='/'/>
    )
  }
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
