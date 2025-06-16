const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const { createLogger, transports, format } = require('winston');

const app = express();
app.use(express.json());

// --- Configuração de Criptografia (AES-256-CBC) ---
// Gere antes uma chave de 32 bytes em hex: openssl rand -hex 32
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
const ALGO = 'aes-256-cbc';

// --- Configuração de Logger (Winston) ---
const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.File({ filename: 'app.log' }),
    new transports.Console()
  ]
});

// Endpoint para receber dados, criptografar e salvar (Entregas 3 e 4)
app.post('/submit', (req, res) => {
  const raw = req.body.data || '';
  // sanitização no backend
  const sanitized = raw.replace(/[^a-zA-Z0-9@\.\-_ ]+/g, '').trim();

  if (!sanitized) {
    logger.warn('Payload vazio recebido', { ip: req.ip });
    return res.status(400).json({ error: 'Nenhum dado válido enviado' });
  }

  // gera IV e cifra
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  let encrypted = cipher.update(sanitized, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // grava timestamp, IV e payload criptografado
  const line = `${new Date().toISOString()}::${iv.toString('hex')}:${encrypted}\n`;
  fs.appendFileSync('dados.enc', line, 'utf8');

  logger.info('Dados criptografados salvos', { length: sanitized.length, ip: req.ip });
  res.status(201).json({ status: 'ok' });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server rodando em :${PORT}`));

/*
  > Variáveis de ambiente necessárias:
  - ENCRYPTION_KEY: chave AES-256 (32 bytes em hex)
  - PORT (opcional)
*/
