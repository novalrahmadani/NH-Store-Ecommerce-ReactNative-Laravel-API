// SRC/screen/Register.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !phone || !email || !password) {
      alert("Harap isi semua data!");
      return;
    }

    // KIRIM DATA PASTI ke LOGIN (key harus: user)
    navigation.replace('Login', { 
      user: { name, phone, email, password }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daftar Akun Baru</Text>

      <TextInput style={styles.input} placeholder="Nama Lengkap" value={name} onChangeText={setName}/>
      <TextInput style={styles.input} placeholder="Nomor HP" keyboardType="number-pad" value={phone} onChangeText={setPhone}/>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword}/>

      <TouchableOpacity style={styles.btn} onPress={handleRegister}>
        <Text style={styles.btnText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>Sudah punya akun? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:25, justifyContent:"center" },
  title:{ fontSize:26, fontWeight:"bold", marginBottom:30, textAlign:"center" },
  input:{ borderWidth:1, borderColor:"#ccc", padding:12, borderRadius:10, marginBottom:15 },
  btn:{ backgroundColor:"#1E3A8A", padding:15, borderRadius:10 },
  btnText:{ color:"#fff", textAlign:"center", fontWeight:"700" },
  back:{ textAlign:"center", marginTop:15, color:"#1E3A8A", fontWeight:"600" }
});
