import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

export default function Trilhas({ navigation }) {
  const [showResposta1, setShowResposta1] = useState(false);
  const [showResposta2, setShowResposta2] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Be wise!" showBack={true} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitulo}>Selecione o card para revelar a resposta!</Text>

        <TouchableOpacity
          style={styles.cardPergunta}
          onPress={() => setShowResposta1(!showResposta1)}
        >
          <Text style={styles.cardPerguntaTexto}>Qual a diferença entre Investir e Apostar?</Text>
        </TouchableOpacity>

        {showResposta1 && (
          <View style={styles.cardResposta}>
            <Text style={styles.cardRespostaTexto}>
              Investir é tomar decisões baseadas em dados, objetivos e planejamento. Apostar envolve alto risco,
              pouca informação e expectativa de retorno rápido.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.cardPergunta}
          onPress={() => setShowResposta2(!showResposta2)}
        >
          <Text style={styles.cardPerguntaTexto}>Como montar uma carteira inteligente?</Text>
        </TouchableOpacity>

        {showResposta2 && (
          <View style={styles.cardResposta}>
            <Text style={styles.cardRespostaTexto}>
              Uma boa carteira tem equilíbrio entre ativos seguros e mais voláteis, alinhados ao prazo e objetivo de cada pessoa.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.botaoTexto}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.botaoTexto}>Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 100
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#333'
  },
  cardPergunta: {
    backgroundColor: '#A66A6A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8
  },
  cardPerguntaTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
  cardResposta: {
    backgroundColor: '#FFD6D6',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16
  },
  cardRespostaTexto: {
    fontSize: 14,
    color: '#333'
  },
  footer: {
    padding: 16,
    alignItems: 'center'
  },
  botao: {
    backgroundColor: '#A66A6A',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 12,
    width: 250,
    alignItems: 'center'
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
});
