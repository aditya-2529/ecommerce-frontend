import ParallaxScrollView from "@/components/ParallaxScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

var name = '';
AsyncStorage.getItem('MY_USER_INFO').then((res) => {
  name = JSON.parse(res);
}).catch((e) => console.log(e));

export default function Profile() {
    // const data = localStorage.getItem('MY_USER_INFO')
    // const nav = useRouter();


    return (
        <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
            <Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo}
            />
            }>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }}
          />
          <Text style={styles.username}>{name.email}</Text>
        </View>
        <View style={styles.body}>
        
      </View>
      <View style={styles.infoContainer}>
              <Text style={styles.box}>Orders</Text>
              <Text style={styles.box} onPress={() => {
                // localStorage.removeItem("MY_APP_STATE");
                // localStorage.removeItem("MY_USER_INFO");
                AsyncStorage.clear()
                // location.reload()
                router.navigate('/')
                // nav.navigate('/home')
              }}>Logout</Text>
        </View>

            
        </ParallaxScrollView>
    )
};

const styles = StyleSheet.create({
  infoContainer: {
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  header: {
    backgroundColor: '#EE82EE',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: '#FF6347',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: '#EE82EE',
    marginLeft: 4,
  },
  btn: {
    marginLeft: 'auto',
    width: 40,
    height: 40,
  },
  body: {
    backgroundColor: '#E6E6FA',
  },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems:'center',
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
})