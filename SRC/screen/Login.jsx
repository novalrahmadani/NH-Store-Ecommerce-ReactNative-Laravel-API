import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  const route = useRoute();

  const [registerUser, setRegisterUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Saat kembali dari REGISTER
  useEffect(() => {
    if (route.params?.user) {
      setRegisterUser(route.params.user);
      setEmail(route.params.user.email);
    }
  }, [route.params]);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Harap isi email dan password!');
      return;
    }

    // Jika ada user dari Register → cocokkan data
    if (registerUser) {
      if (email !== registerUser.email || password !== registerUser.password) {
        alert("Email atau password salah!");
        return;
      }
    }

    // Kirim data lengkap ke MainTabs → Profil
    const user = registerUser || {
      name: "Pengguna",
      email,
      phone: "",
      avatar: "https://i.ibb.co/4YxGkBz/avatar.png",
    };

    navigation.replace('MainTabs', { user });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/LOGO2.png')} 
          style={styles.logoImage} 
          resizeMode="contain"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={handleLogin}
      >
        <Text style={styles.btnText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { width: '100%', alignItems: 'center', marginBottom: 30 },
  logoImage: { width: 200, height: 200, marginTop: -100 },
  title: { marginTop: -20, fontSize: 28, fontWeight: 'bold', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 10, width: '100%', marginBottom: 15 },
  btnPrimary: { backgroundColor: '#1E3A8A', padding: 12, borderRadius: 10, width: '100%' },
  btnText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  register: { marginTop: 10, color: '#1E3A8A', fontWeight: '600' }
});
