const xlsx = require('xlsx');
const { insertQuestion } = require('../models/questionModel');

async function importQuestionsFromExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  for (const row of data) {
    await insertQuestion({
      materia: row.materia,
      tema: row.tema,
      pergunta: row.pergunta,
      alternativas: [row.alt1, row.alt2, row.alt3, row.alt4, row.alt5].filter(Boolean),
      resposta_correta: row.resposta_correta
    });
  }
}

module.exports = { importQuestionsFromExcel };
