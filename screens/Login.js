import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

// 1) Sanitização básica
function sanitize(text = '') {
  // permite letras, números, @ . - _ e espaços
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

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // aplica sanitização
    const emailClean = sanitize(email);
    const senhaClean = sanitize(senha);

    // valida e-mail
    if (!validateEmail(emailClean)) {
      return Alert.alert('Erro', 'Digite um e-mail válido.');
    }
    // valida senha
    if (!validatePassword(senhaClean)) {
      return Alert.alert('Erro', 'Senha precisa ter ao menos 6 caracteres.');
    }

    // prossegue com login
    fakeApiLogin(emailClean, senhaClean)
      .then(() => navigation.replace('Home'))
      .catch(() => Alert.alert('Falha', 'Usuário ou senha incorretos.'));
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

// Mock da função de API e login somente para exemplo
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