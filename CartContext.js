import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState} from 'react';


export const CartContext = createContext();

export default function CartProvider(props) {
  const [items, setItems] = useState([]);
  const [user,setUser] = useState('');
  const [data,setData] = useState('');

  
  AsyncStorage.getItem('MY_USER_INFO').then((res) => setUser(JSON.parse(res))).catch((e) => console.log(e))

  const addItemToCart = async(product) => {
    
  if(user){
      const query = `
        mutation data($userId: String!,$productId: String!, $total: Int!){
          addToCart(userId: $userId, productId: $productId, total: $total){
            id
            products{
              name
              price
              description
              category
              stock
              imageUrl
            }
            total
          }
        }
      `
      const t = await fetch('https://ecommerce-fypz.onrender.com',{

      // const t = await fetch('http://localhost:3000',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({query:query,variables:{userId:user.id,productId:product.id,total:getItemsCount()}})
      })
      console.log(product.id)
      var response = await t.json()
      console.log(response)
      setData(response.data.addToCart)
    }
    
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.product.name == product.name));
      if(!item) {
          return [...prevItems, {
              qty: 1,
              product,
              totalPrice: product.price 
          }];
      }
      else { 
          return prevItems.map((item) => {
            console.log(item.totalPrice)
            if(item.product.name == product.name) {
              item.qty++;
              item.totalPrice += product.price;
            }
            return item;
          });
      }
    });

  }


  function getItemsCount() {
      return items.reduce((sum, item) => (sum + item.qty), 0);
  }
  
  function getTotalPrice() {
      return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }  
  
  return (
    
    <CartContext.Provider 
      value={{items, setItems, getItemsCount, addItemToCart, getTotalPrice}}>
      {props.children}
    </CartContext.Provider>
  );
}

