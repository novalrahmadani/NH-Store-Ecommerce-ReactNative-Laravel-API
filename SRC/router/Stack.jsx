// SRC/router/Stack.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Splash from '../screen/Splash';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Beranda from '../screen/Beranda';
import Home from '../screen/Home';
import Profil from '../screen/Profil';
import Detail from '../screen/Detail';
import PetunjukPengguna from '../screen/PetunjukPengguna';
import Checkout from '../screen/Checkout';
import Keranjang from '../screen/Keranjang';
import Bantuan from '../screen/Bantuan';
import Tracking from '../screen/Tracking';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ===================== MAIN TABS =====================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Beranda':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Produk':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Keranjang':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Profil':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#253493',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Beranda" component={Beranda} />
      <Tab.Screen name="Produk" component={Home} />
      <Tab.Screen name="Keranjang" component={Keranjang} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

// ===================== APP STACK =====================
export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />

        {/* APP UTAMA */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* SCREEN TAMBAHAN */}
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Tracking" component={Tracking} />
        <Stack.Screen name="PetunjukPengguna" component={PetunjukPengguna} />
        <Stack.Screen name="Bantuan" component={Bantuan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
