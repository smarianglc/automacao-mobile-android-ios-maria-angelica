const fs = require('node:fs');
const path = require('node:path');
const { parse } = require('csv-parse/sync');

/**
 * Lê um arquivo CSV (com cabeçalho) e retorna um array de objetos,
 * usado para parametrizar testes (data-driven).
 */
function readCsv(relativePath) {
    const fullPath = path.join(__dirname, '..', relativePath);
    const content = fs.readFileSync(fullPath, 'utf-8');

    return parse(content, { columns: true, skip_empty_lines: true, trim: true });
}

module.exports = readCsv;
