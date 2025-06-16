import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="MoneyWise" />

      <View style={styles.container}>
        <View style={styles.circle}>
          <Text style={styles.logoText}>MW</Text>
        </View>

        <Text style={styles.subtitle}>Invista com Inteligência</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#A66A6A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  logoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 25,
    marginBottom: 40,
    padding: 50
  },
  button: {
    backgroundColor: '#A66A6A',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '500'
  }
});
