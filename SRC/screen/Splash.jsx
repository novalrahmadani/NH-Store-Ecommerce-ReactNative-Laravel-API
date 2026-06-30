// SRC/screen/Splash.jsx
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo Gambar */}
      <Image 
        source={require('../../assets/LOGO2.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#1E3A8A" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F0FE' },
  logo: { width: 200, height: 80 } // atur ukuran logo sesuai panjang dan tinggi
});
