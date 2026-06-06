const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css'];
const inventory = {};
const duplicates = [];

function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                walk(filePath);
            }
        } else {
            const ext = path.extname(file);
            if (extensions.includes(ext)) {
                inventory[ext] = (inventory[ext] || 0) + 1;
            }

            // Detect App Router duplicates
            if (file.startsWith('page.') || file.startsWith('layout.') || file.startsWith('loading.') || file.startsWith('error.')) {
                const name = file.split('.')[0];
                const otherExts = extensions.filter(e => e !== ext && (e.startsWith('.t') || e.startsWith('.j')));
                otherExts.forEach(otherExt => {
                    const otherFile = `${name}${otherExt}`;
                    if (fs.existsSync(path.join(dir, otherFile))) {
                        const conflict = [ext, otherExt].sort().join(',');
                        duplicates.push(`${path.relative(rootDir, dir)}/${name}{${conflict}}`);
                    }
                });
            }
        }
    });
}

console.log('--- SPRINT 0: INVENTÁRIO DE ARQUIVOS ---');
walk(path.join(rootDir, 'src'));

console.table(inventory);

if (duplicates.length > 0) {
    console.warn('\n--- ALERTA: DUPLICIDADES CRÍTICAS DETECTADAS ---');
    const uniqueDuplicates = [...new Set(duplicates)];
    uniqueDuplicates.forEach(d => console.log(`[!] Conflito: ${d}`));
} else {
    console.log('\n[OK] Nenhuma duplicidade crítica detectada nas rotas.');
}
