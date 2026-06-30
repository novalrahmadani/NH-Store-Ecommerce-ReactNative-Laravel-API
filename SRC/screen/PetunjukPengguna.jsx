// SRC/screen/PetunjukPengguna.jsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PetunjukPengguna() {
  const steps = [
    { id: 1, title: 'Pilih Produk', description: 'Cari dan pilih produk yang ingin Anda beli.' },
    { id: 2, title: 'Tambahkan ke Keranjang', description: 'Tekan tombol keranjang untuk menambahkan produk.' },
    { id: 3, title: 'Lanjutkan Checkout', description: 'Periksa keranjang dan lanjutkan pembayaran.' },
    { id: 4, title: 'Konfirmasi Pesanan', description: 'Isi data pengiriman dan konfirmasi pesanan Anda.' },
    { id: 5, title: 'Terima Produk', description: 'Produk akan dikirim ke alamat Anda.' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Petunjuk Pengguna</Text>

      {steps.map((step) => (
        <View key={step.id} style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>{step.id}</Text>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </View>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5'
  },
  header: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#35a912ff'

  },
  stepCard: {
    backgroundColor: '#ffffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#35a912ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  stepNumberText: {
    color: '#ffffffff',
    fontWeight: 'bold'
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  stepDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20
  }
});