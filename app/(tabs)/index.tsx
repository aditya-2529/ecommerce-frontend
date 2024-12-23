import ParallaxScrollView from "@/components/ParallaxScrollView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router, useNavigation, useRouter } from "expo-router";
import { createRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// import { ScrollView } from "react-native-gesture-handler";

var name = '';
AsyncStorage.getItem('MY_USER_INFO').then((res) => {
  name = JSON.parse(res);
}).catch((e) => console.log(e));

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');


  const passwordInputRef = createRef();

  
  const nav = useNavigation();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    const query = `
    mutation data($userEmail: String!,$userPassword: String!){ 
        login(email: $userEmail,password: $userPassword){
            id
            username
            email
            password
            orders{
              id
            }
            cartId
        }  
    }
    `
    fetch('http://localhost:3000/', {
    // fetch('https://ecommerce-fypz.onrender.com',{
      method: 'POST',
      body: JSON.stringify({
        query: query,
        variables: {
            userEmail,
            userPassword
        }
      }),
      headers: {
        'Content-Type':'application/json',
      },
    })
      .then((response) => response.json())
      .then((d) => {
        console.log(d);
        if (d.data.login !== null) {
          // localStorage.setItem('MY_APP_STATE', JSON.stringify(true));
          // localStorage.setItem('MY_USER_INFO',JSON.stringify(d.data.login));
          AsyncStorage.setItem('MY_APP_STATE', JSON.stringify(true))
          AsyncStorage.setItem('MY_USER_INFO',JSON.stringify(d.data.login)).then((res) => {
          // location.href = '/home'
          router.navigate('/home')
          }).catch((e) => console.log(e))
          // nav('/')
          // nav.push({
          //   pathname: '/'
          // })
          
          // navigation.navigate('DrawerNavigationRoutes');
        } else {
          alert('Please check your email id or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if( name === null){
  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/partial-react-logo.png')}
              style={styles.reactLogo}
            />
          }>
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                // source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current 
                  // passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => router.navigate('/register')}
              >
               Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
    </ParallaxScrollView>
  );
}
else {
  return (
    <Redirect href='/home'/>
  )
}
}

export const loginInfo = async() => {
  return await AsyncStorage.getItem('MY_USER_INFO')
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

// export const dataa = localStorage.getItem('MY_APP_STATE');
