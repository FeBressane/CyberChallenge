import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';

// Caminho do arquivo de log
const caminhoLog = RNFS.DocumentDirectoryPath + '/logs.txt';

// 1) Sanitização básica
function sanitize(text = '') {
  return text.replace(/[^a-zA-Z0-9@\.\-_ ]+/g, '').trim();
}

// 2) Validação de e-mail
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 3) Validação de senha (mínimo 6 caracteres)
function validatePassword(pwd) {
  return pwd.length >= 6;
}

// 4) Função de log
async function registrarLog(mensagem) {
  const horario = new Date().toISOString();
  const log = `[${horario}] ${mensagem}\n`;
  try {
    await RNFS.appendFile(caminhoLog, log, 'utf8');
    console.log('Log registrado.');
  } catch (err) {
    console.error('Erro ao salvar log:', err);
  }
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    const emailClean = sanitize(email);
    const senhaClean = sanitize(senha);

    if (!validateEmail(emailClean)) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      await registrarLog(`Tentativa de login com e-mail inválido: ${emailClean}`);
      return;
    }

    if (!validatePassword(senhaClean)) {
      Alert.alert('Erro', 'Senha precisa ter ao menos 6 caracteres.');
      await registrarLog(`Tentativa de login com senha fraca para ${emailClean}`);
      return;
    }

    // prossegue com login
    fakeApiLogin(emailClean, senhaClean)
      .then(async () => {
        await registrarLog(`Login bem-sucedido para ${emailClean}`);
        navigation.replace('Home');
      })
      .catch(async () => {
        await registrarLog(`Falha no login para ${emailClean}`);
        Alert.alert('Falha', 'Usuário ou senha incorretos.');
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <TextInput
        placeholder="E-mail"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        secureTextEntry
        onChangeText={setSenha}
        style={{ marginBottom: 20, borderBottomWidth: 1, padding: 8 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: '#007AFF',
          padding: 12,
          borderRadius: 6,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Mock da função de API
function fakeApiLogin(user, pass) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user === 'user@test.com' && pass === 'senha123') {
        resolve();
      } else {
        reject();
      }
    }, 500);
  });
}
