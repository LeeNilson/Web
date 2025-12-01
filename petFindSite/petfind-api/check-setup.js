// ============================================
// ARQUIVO: check-setup.js
// Script para verificar se todos os arquivos necessários existem
// Execute: node check-setup.js
// ============================================

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando estrutura do projeto Pet Find API...\n');

// Arquivos e pastas necessários
const estrutura = {
    pastas: [
        'config',
        'middleware',
        'routes',
        'uploads',
        'public'
    ],
    arquivos: [
        '.env',
        'server.js',
        'package.json',
        'config/database.js',
        'middleware/auth.js',
        'routes/auth.js',
        'routes/animais.js',
        'routes/categorias.js',
        'public/index.html'
    ]
};

let tudoOk = true;

// Verificar pastas
console.log('📁 Verificando pastas:\n');
estrutura.pastas.forEach(pasta => {
    const existe = fs.existsSync(pasta);
    console.log(`   ${existe ? '✅' : '❌'} ${pasta}/`);
    if (!existe) {
        tudoOk = false;
        console.log(`      💡 Criar com: mkdir ${pasta}`);
    }
});

// Verificar arquivos
console.log('\n📄 Verificando arquivos:\n');
estrutura.arquivos.forEach(arquivo => {
    const existe = fs.existsSync(arquivo);
    console.log(`   ${existe ? '✅' : '❌'} ${arquivo}`);
    if (!existe) {
        tudoOk = false;
        console.log(`      ⚠️  Arquivo faltando!`);
    }
});

// Verificar .env
console.log('\n🔐 Verificando variáveis de ambiente (.env):\n');
if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf-8');
    const variaveis = [
        'DB_HOST',
        'DB_PORT',
        'DB_NAME',
        'DB_USER',
        'DB_PASSWORD',
        'PORT',
        'JWT_SECRET'
    ];
    
    variaveis.forEach(variavel => {
        const existe = envContent.includes(variavel);
        console.log(`   ${existe ? '✅' : '❌'} ${variavel}`);
        if (!existe) tudoOk = false;
    });
} else {
    console.log('   ❌ Arquivo .env não encontrado!');
    tudoOk = false;
}

// Verificar package.json
console.log('\n📦 Verificando dependências (package.json):\n');
if (fs.existsSync('package.json')) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
    const dependencias = [
        'express',
        'pg',
        'dotenv',
        'cors',
        'body-parser',
        'bcrypt',
        'jsonwebtoken',
        'multer'
    ];
    
    dependencias.forEach(dep => {
        const existe = pkg.dependencies && pkg.dependencies[dep];
        console.log(`   ${existe ? '✅' : '❌'} ${dep}`);
        if (!existe) tudoOk = false;
    });
    
    if (!pkg.dependencies) {
        console.log('\n   ⚠️  Nenhuma dependência instalada!');
        console.log('   💡 Execute: npm install express pg dotenv cors body-parser bcrypt jsonwebtoken multer');
        tudoOk = false;
    }
} else {
    console.log('   ❌ Arquivo package.json não encontrado!');
    console.log('   💡 Execute: npm init -y');
    tudoOk = false;
}

// Verificar node_modules
console.log('\n📚 Verificando node_modules:\n');
const nodeModulesExiste = fs.existsSync('node_modules');
console.log(`   ${nodeModulesExiste ? '✅' : '❌'} node_modules/`);
if (!nodeModulesExiste) {
    console.log('   💡 Execute: npm install');
    tudoOk = false;
}

// Resultado final
console.log('\n' + '═'.repeat(50));
if (tudoOk) {
    console.log('✅ Tudo certo! Você pode executar: npm start ou npm run dev');
} else {
    console.log('❌ Existem problemas na estrutura do projeto.');
    console.log('📋 Siga as sugestões acima para corrigir.');
}
console.log('═'.repeat(50) + '\n');

// Criar arquivos faltantes automaticamente
console.log('🔧 Deseja criar automaticamente os arquivos e pastas faltantes? (s/n)');

// Função para criar estrutura básica
function criarEstrutura() {
    console.log('\n🔨 Criando estrutura básica...\n');
    
    // Criar pastas
    estrutura.pastas.forEach(pasta => {
        if (!fs.existsSync(pasta)) {
            fs.mkdirSync(pasta, { recursive: true });
            console.log(`✅ Pasta criada: ${pasta}/`);
        }
    });
    
    // Criar .env se não existir
    if (!fs.existsSync('.env')) {
        const envTemplate = `# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pet_find_db
DB_USER=petfind_user
DB_PASSWORD=sua_senha_aqui

# Server
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=seu_secret_muito_seguro_aqui_${Math.random().toString(36).substring(7)}
JWT_EXPIRE=7d

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
`;
        fs.writeFileSync('.env', envTemplate);
        console.log('✅ Arquivo .env criado (configure suas credenciais!)');
    }
    
    // Criar .gitignore se não existir
    if (!fs.existsSync('.gitignore')) {
        const gitignoreContent = `node_modules/
.env
uploads/
*.log
.DS_Store
`;
        fs.writeFileSync('.gitignore', gitignoreContent);
        console.log('✅ Arquivo .gitignore criado');
    }
    
    console.log('\n✅ Estrutura básica criada!');
    console.log('📝 Próximos passos:');
    console.log('   1. Configure o arquivo .env com suas credenciais');
    console.log('   2. Crie os arquivos de código nas pastas apropriadas');
    console.log('   3. Execute: npm install');
    console.log('   4. Execute: npm run dev\n');
}

// Se executado diretamente, criar estrutura
if (require.main === module) {
    if (!tudoOk) {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        readline.question('', resposta => {
            if (resposta.toLowerCase() === 's' || resposta.toLowerCase() === 'sim') {
                criarEstrutura();
            }
            readline.close();
        });
    }
}

module.exports = { criarEstrutura };
