import { Redirect, router, Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function TabLayout() {
  const [isLogged,setIsLogged] = useState<String | null>(null);

  const colorScheme = useColorScheme();
  // const isLoggedin = localStorage.getItem('MY_APP_STATE');
  AsyncStorage.getItem('MY_APP_STATE').then((res) => {setIsLogged(res)}).catch((e) => console.log(e));
  // const isLoggedin = getLoginInfo();
  if(isLogged === null ){
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
        }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Login',
              tabBarIcon: ({ color }) => <AntDesign size={20} name="login" color={color} />
            }}
          />
        <Tabs.Screen
          name="register"
          options={{
            title: 'Register',
            tabBarIcon: ({ color }) => <AntDesign size={20} name="adduser" color={color} />,
          }}
        />
      </Tabs>
    );
  }
  else{
    return (<Redirect href={'/home'} />)
    // router.navigate('/home')
  }
}
