import { CartContext } from '@/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useContext, useState } from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity, Button} from 'react-native';
var c = 0;
  var userInfo = '';
  AsyncStorage.getItem('MY_USER_INFO').then((res) => {
    userInfo = JSON.parse(res);
  }).catch((e) => console.log(e));
export function Product({id, name, price, imageUrl, onPress}) {
  // const {items,addItemToCart,getItemIfAvailable} = useContext(CartContext);

  const [count,setCount] = useState(1);


  // const [product, setProduct] = useState(Object);


  // const query = `
  //     query data($id: ID!){
  //       getProductById(id: $id){
  //         id
  //         name
  //         price
  //         description
  //         category
  //         stock
  //         imageUrl
  //       }
  //     }
  //   `
  //   fetch('https://ecommerce-fypz.onrender.com',{

  //   // fetch('http://localhost:3000/', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       query: query,
  //       variables: {
  //           id
  //       }
  //     }),
  //     headers: {
  //       'Content-Type':'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((d) => {
  //       // console.log(d);
  //       setProduct(d.data.getProductById)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  function onAddToCart() {
        setCount(count+1);
        c++;
        console.log(userInfo)
        const query = `
          mutation data($id: String!,$userId: String!,$productId: String!,$total: String!,$productTotal: String!){
            addToCart(id: $id,userId: $userId,productId: $productId,total: $total,productTotal: $productTotal){
                id
            }
          }  
    
        `
        // fetch('https://ecommerce-fypz.onrender.com',{

            fetch('http://localhost:3000/', {
              method: 'POST',
              body: JSON.stringify({
                query: query,
                variables: {
                    id: userInfo.cartId,
                    userId: userInfo.id,
                    productId: id,
                    productTotal: count.toString(),
                    total: c.toString()
                }
              }),
              headers: {
                'Content-Type':'application/json',
              },
            })
              .then((response) => response.json())
              .then((d) => {
                console.log(d);
                // setProduct(d.data.getProductById)
              })
              .catch((error) => {
                console.error(error);
              });

        // addItemToCart(data);
      }
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        style={styles.thumb}
        // source={imageUrl}
        source={{
          uri: imageUrl
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>$ {price}</Text>
        
        {/* <Button
            title="Add to Cart"
            onPress={() => {addItemToCart(product)}}
          /> */}
          {/* <Button
            title="Description"
            onPress={() => {
              nav.navigate('/home/products')
              nav.setParams({productName:product.name})}}
          /> */}
      </View>

          <Button
                      onPress={onAddToCart}
                      title="Add to cart"
                      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  thumb: {
    height: 260,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
});
