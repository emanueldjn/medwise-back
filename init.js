const { createQuestionTable } = require('./src/models/questionModel');

// Inicialização do banco de dados
createQuestionTable()
  .then(() => console.log('Tabela de perguntas pronta!'))
  .catch(err => console.error('Erro ao criar tabela de perguntas:', err));

// ...existing code...
