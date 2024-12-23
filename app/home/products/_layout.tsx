
import { useColorScheme } from "@/hooks/useColorScheme.web";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, Stack } from "expo-router";
import { useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLogged,setIsLogged] = useState<String | null>(null);
  
  
  // AsyncStorage.getItem('MY_APP_STATE').then((res) => {setIsLogged(res)}).catch((e) => console.log(e));
  // const isLoggedin = localStorage.getItem('MY_APP_STATE');
  // if(Boolean(isLogged)){
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}}/>
        <Stack.Screen name="order" options={{ headerShown: false}}/>
      </Stack>
    );
  // } 
  // else {
  //   return (<Redirect href={'/'} />)
  // }
}