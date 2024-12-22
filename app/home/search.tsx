import ParallaxScrollView from "@/components/ParallaxScrollView";
import { FlatList, Image, StyleSheet } from "react-native";
import { Button, SearchBar } from '@rneui/themed';
import { useEffect, useState } from "react";
import { Product } from "@/components/Product";


export default function Search() {
    const [search,setSearch] = useState("");
    const [data,setData] = useState(Object);
    const [searchData,setsearchData] = useState(Object);

    const updateSearch = (q:any) => {
      setSearch(q)
    }

    useEffect(()=>{
        res()
      },[])
      const res = async() => {
        const query = `
        query {getAllProduct {
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
              body: JSON.stringify({query:query})
          })
          var response = await t.json()
          // console.log(response)
          setData(response.data.getAllProduct)
      }
      function searchLogic() {

        if(search.length === 0) {setsearchData('')}
        else{
          const filteredData = data.filter((item: any) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
          });
          setsearchData(filteredData)
        }

      }
      function renderProduct({item: product}:any) {
          return (
            <Product {...product} 
            onPress={() => {
              // navigation.navigate('ProductDetails', {
              //   productId: product.id,
              // });
            }}
            />
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
          <SearchBar
          placeholder="Search Here..."
          onChangeText={updateSearch}
          value={search}
          />
            <Button
              title={'Search'}
              onPress={() => {searchLogic()}}
            />
          <FlatList
                style={styles.productsList}
                contentContainerStyle={styles.productsListContainer}
                // keyExtractor={(item) => item.id.toString()}
                data={searchData}
                renderItem={renderProduct}
          />
        </ParallaxScrollView>
    )
};

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
})