// SRC/screen/Beranda.jsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from "../screen/components/Header";

export default function Beranda() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const categories = [
    { id: 1, name: 'Sepatu', image: require('../../assets/sepatu.png') },
    { id: 2, name: 'Kaos', image: require('../../assets/baju.png') },
    { id: 3, name: 'Hoodie', image: require('../../assets/hoodie.png') },
    { id: 4, name: 'Iphone', image: require('../../assets/iphone.png') },
  ];

  const products = [
    { id: 1, name: 'Sneakers Premium', price: 'Rp 299.000', image: require('../../assets/sepatu.png') },
    { id: 2, name: 'Kaos Polos', price: 'Rp 79.000', image: require('../../assets/baju.png') },
    { id: 3, name: 'Kotak NhMart', price: 'Rp 189.000', image: require('../../assets/kotak.jpg') },
    { id: 4, name: 'Topi NhMart', price: 'Rp 159.000', image: require('../../assets/topi.png') },
  ];

  const cartIcon = "https://cdn-icons-png.flaticon.com/512/833/833314.png";

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>

      {/* HEADER */}
      <Header />

      <ScrollView style={styles.container}>

        {/* Banner Promo */}
        <TouchableOpacity onPress={() => alert('Klik banner promo!')}>
          <LinearGradient
            colors={['#FFD700', '#FF8C00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.banner}
          >
            <View style={styles.bannerImageWrapper}>
              <Image 
                source={require('../../assets/iphone1.png')} 
                style={styles.bannerImage} 
                resizeMode="contain"
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>20% OFF</Text>
              </View>
            </View>

            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerText3D}>Promo iPhone Murah</Text>
              <Text style={styles.bannerText3D}>Diskon 20%</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Cari produk..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Kategori */}
        <Text style={styles.sectionTitle}>Kategori</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map(cat => (
            <TouchableOpacity key={cat.id} style={styles.categoryCard}>
              <View style={styles.categoryPlaceholder}>
                <Image source={cat.image} style={styles.categoryImage} resizeMode="cover" />
              </View>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Produk */}
        <Text style={styles.title}>Produk Terbaru</Text>
        <View style={styles.grid}>
          {products.map((item) => (
            <View key={item.id} style={styles.card}>
              <TouchableOpacity onPress={() => navigation.navigate('Checkout', { product: item })}>
                <Image source={item.image} style={styles.productImage} resizeMode="cover" />
              </TouchableOpacity>

              <Text style={styles.productName}>{item.name}</Text>

              <View style={styles.row}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Keranjang')}>
                  <Image source={{ uri: cartIcon }} style={styles.cartIcon} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 12, 
    backgroundColor: '#F5F5F5' 
  },

  banner: { 
    width: '100%', 
    height: 150, 
    borderRadius: 12, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16
  },
  bannerImageWrapper: {
    width: 100,
    position: 'relative'
  },
  bannerImage: {
    width: 300,
    height: 300,
    marginRight: 100,
    marginLeft: -100,
  },
  badge: {
    position: 'absolute',
    top: 100,
    right: -20,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 3
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700'
  },
  bannerTextContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  bannerText3D: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
    marginBottom: 4
  },

  searchContainer: { marginBottom: 16 },
  searchInput: { 
    height: 40, 
    borderRadius: 8, 
    backgroundColor: '#ffffff', 
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333'
  },

  categoryScroll: { marginBottom: 16 },
  categoryCard: { width: 80, marginRight: 12, alignItems: 'center' },
  categoryPlaceholder: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: '#E0E0E0',
    justifyContent: 'center', alignItems: 'center', marginBottom: 6
  },
  categoryImage: { width: 50, height: 50, borderRadius: 25 },
  categoryName: { fontSize: 12, textAlign: 'center' },

  title: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#333' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
  },

  productImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 8 },
  productName: { fontSize: 14, fontWeight: '600', marginBottom: 4, color: '#333' },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: '700', color: '#007AFF' },

  cartIcon: { width: 28, height: 28 }
});
