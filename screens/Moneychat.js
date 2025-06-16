import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

export default function Moneychat({ navigation }) {
  const [mensagem, setMensagem] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Moneychat" showBack={true} onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.bolhaUsuario}>
            <Text style={styles.textoBolha}>Quero investir tudo em criptomoeda. É uma boa?</Text>
          </View>

          <View style={styles.bolhaIA}>
            <Text style={styles.textoBolhaIA}>
              Investir tudo em um único ativo, como criptomoeda, pode ser muito arriscado.{"\n"}
              Posso te mostrar como diversificar isso de forma mais segura?
            </Text>
          </View>

          <View style={styles.sugestoes}>
            <TouchableOpacity style={styles.botaoSugestao}>
              <Text style={styles.textoSugestao}>Me explique sobre renda fixa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSugestao}>
              <Text style={styles.textoSugestao}>Quais são investimentos perigosos?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        
        <View style={styles.entradaContainer}>
          <TextInput
            style={styles.input}
            placeholder="Moneychat em breve!"
            value={mensagem}
            onChangeText={setMensagem}
          />
          <TouchableOpacity
            style={styles.botaoEnviar}
            onPress={() => navigation.navigate('Trilhas')}
          >
            <Text style={styles.botaoTexto}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input:{
    fontWeight: 'bold'
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12
  },
  bolhaUsuario: {
    backgroundColor: '#E58B8B',
    alignSelf: 'flex-end',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%'
    
  },
  bolhaIA: {
    backgroundColor: '#FAD3D3',
    alignSelf: 'flex-start',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    maxWidth: '80%'
  },
  textoBolha: {
    color: '#333',
    fontSize: 14
  },
  textoBolhaIA: {
    color: '#333',
    fontSize: 14
  },
  sugestoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 8
  },
  botaoSugestao: {
    backgroundColor: '#E6C7C7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8
  },
  textoSugestao: {
    color: '#5A3838',
    fontSize: 13
  },
  entradaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  input: {
    flex: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8
  },
  botaoEnviar: {
    backgroundColor: '#A66A6A',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '500'
  }
});
