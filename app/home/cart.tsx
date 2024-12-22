import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Product } from '@/components/Product';
var userInfo = {}

AsyncStorage.getItem('MY_USER_INFO').then((res) => {userInfo = JSON.parse(res)}).catch((e) => console.log(e));
export default function Cart ({navigation}:any) {
  const [cart,setCart] = useState(Object);
  const [total,setTotal] = useState(0);
  const [productTotal,setProducttotal] = useState(0);
  const [totalPrice,setTotalPrice] = useState(0);


   
  const getCart = async() => {
      const id = userInfo.id
      const query = `
        query data($userId: String!){
          getCart(userId: $userId){
              id
              products{
                  product{
                      name
                      price
                      description
                      category
                      stock
                      imageUrl
                  }
                  productTotal
              }
              total
          }
        }
      `
    const t = await fetch('https://ecommerce-fypz.onrender.com',{
      // const t = await fetch('http://localhost:3000',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({query:query,variables:{userId:id}})
      })
      var response = await t.json()
      // console.log(response.data.getCart.products)
      setCart(response.data.getCart.products[0].product[0])
      setTotal(response.data.getCart.total)
      setProducttotal(response.data.getCart.products[0].productTotal)
    }


  useEffect(() => {
    getCart();
  },[])

  

  // console.log(items)
  
  function Totals() {
    return (
       <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          {/* <Text style={styles.lineRight}>$ {totalPrice}</Text> */}
       </View>
    );
  }

  function renderItem({item}:any) {
    // console.log(item)
    return (
       <View style={styles.cartLine}>
          <Text style={styles.lineLeft}>{item.name} x {productTotal}</Text>
          <Text style={styles.lineRight}>$ {item.price * productTotal}</Text>
       </View>
    );
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
      data={cart}
      renderItem={renderItem}
      // keyExtractor={(item) => item.product.name.toString()}
      ListFooterComponent={Totals}
    />
    
    <Text style={styles.box} onPress={()=>{
      const time = new Date().toTimeString();
      const q = `
        
 mutation data($userId: String!,$productId: String!,$total: String!,$createdAt: String!){
     placeOrder(userId:$userId,name:$productId,total:$total,createdAt:$createdAt,status:"Initiated"){
             id
             userId

     }
 }  

      `
      fetch('https://ecommerce-fypz.onrender.com',{
        // const t = await fetch('http://localhost:3000',{
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({query:q,variables:{userId:userInfo.id,productId:cart.name,total:totalPrice.toString(),createdAt:time}})
        }).then((res) => res.json()).then((res) => {
          console.log(res)
          const q1 = `
            mutation
             data($id :String!, $userId: String!,$productId: String!, $total: String!,$productTotal: String!){
                addToCart(id: $id,userId: $userId, productId: $productId, total: $total,productTotal: $productTotal){
                    id
                }
             }
          `
      fetch('https://ecommerce-fypz.onrender.com',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({query:q1,variables:{id: userInfo.cartId,userId: userInfo.id,productId:"",total:"",productTotal:""}})
      }).then((res) => res.json()).then((res) => console.log(res)).catch((e) => console.log(e))

          console.log(res)}).catch((e) => console.log(e))
        
    }}>Order Now!</Text>
       </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 5,
    marginBottom: 2,
    textAlign: 'center',
    backgroundColor: '#5dbb2a',
    flexDirection: 'row',
    alignItems:'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  cartLine: { 
    flexDirection: 'row',
  },
  cartLineTotal: { 
    flexDirection: 'row',
    borderTopColor: '#dddddd',
    borderTopWidth: 1
  },
  lineTotal: {
    fontWeight: 'bold',    
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
});
