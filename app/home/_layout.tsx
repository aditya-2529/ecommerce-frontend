import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Redirect, router, Tabs } from "expo-router";
import { Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();  
  const [isLogged,setIsLogged] = useState<String | null>(null);
  
  
  AsyncStorage.getItem('MY_APP_STATE').then((res) => {setIsLogged(res)}).catch((e) => console.log(e));
  // console.log(Boolean(isLogged) === true)
  // const isLoggedin = localStorage.getItem('MY_APP_STATE');
  // if(Boolean(isLogged)){
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarLabelPosition: 'below-icon',
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
              title: 'Home',
              tabBarIcon: ({ color }) => <IconSymbol size={14} name="house.fill" color={color} />
            }}
          />
          <Tabs.Screen
          name="products"
          options={{
            href: null
          }}
          />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => <EvilIcons size={14} name="search" color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <EvilIcons size={14} name="cart" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <AntDesign size={14} name="profile" color={color} />,
          }}
        />
      </Tabs>
    );
  // } 
  // else if(!Boolean(isLogged)) {
  //   router.navigate('/')
  // }
}