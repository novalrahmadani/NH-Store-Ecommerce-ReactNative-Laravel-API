// SRC/screen/components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>

      {/* Logo */}
      <Image
        source={require('../../../assets/LOGO2.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      {/* Search Bar */}
      <View style={styles.searchBox}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/622/622669.png" }}
          style={styles.searchIcon}
        />

        <TextInput
          placeholder="Cari produk..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Icon Notifikasi */}
      <TouchableOpacity style={styles.iconWrapper}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/1827/1827349.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Icon Keranjang */}
      <TouchableOpacity
        style={styles.iconWrapper}
        onPress={() => navigation.navigate("Keranjang")}
      >
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/833/833314.png" }}
          style={styles.icon}
        />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: "#FF6B00",
    elevation: 5,
  },

  logoImage: {
    width: 35,
    height: 35,
    marginRight: 8,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    flex: 1,
    height: 38,
    paddingHorizontal: 8,
  },

  searchIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    color: "#333",
  },

  iconWrapper: {
    marginLeft: 10,
  },

  icon: {
    width: 26,
    height: 26,
    tintColor: "#fff",
  },
});
