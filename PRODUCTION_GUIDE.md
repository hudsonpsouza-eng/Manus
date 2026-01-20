# Hudson Souza Advocacia - Guia de Produção

## Visão Geral
Este é um site permanente totalmente funcional para Hudson Souza Advocacia, especializado em propriedade intelectual, com foco em registro de marcas e busca por anterioridades de patentes.

## Arquitetura do Projeto

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + tRPC
- **Database**: MySQL (Drizzle ORM)
- **Autenticação**: OAuth
- **Deployment**: Node.js

### Estrutura de Diretórios
```
/home/ubuntu/hudson-souza-advocacia/
├── client/              # Frontend React
│   ├── src/
│   │   ├── pages/      # Páginas (Home, PrivacyPolicy, etc)
│   │   ├── components/ # Componentes React
│   │   ├── hooks/      # Custom hooks
│   │   └── lib/        # Utilitários
│   └── public/         # Arquivos estáticos
├── server/             # Backend Express
│   ├── _core/          # Configuração principal
│   ├── routers.ts      # Rotas tRPC
│   └── *.ts            # Middlewares e utilitários
├── shared/             # Código compartilhado
├── drizzle/            # Migrações do banco
└── dist/               # Build de produção
```

## Como Executar

### Modo Desenvolvimento
```bash
cd /home/ubuntu/hudson-souza-advocacia
pnpm dev
# Acessa em http://localhost:3000
```

### Modo Produção
```bash
cd /home/ubuntu/hudson-souza-advocacia
pnpm build
NODE_ENV=production node dist/index.js
# Acessa em http://localhost:3000 (ou porta disponível)
```

## Variáveis de Ambiente

Criar arquivo `.env` na raiz do projeto:

```env
# OAuth Configuration
OAUTH_SERVER_URL=https://seu-oauth-server.com

# SSL Configuration (opcional)
SSL_CERT_PATH=/caminho/para/cert.pem
SSL_KEY_PATH=/caminho/para/key.pem

# Database (se necessário)
DATABASE_URL=mysql://user:password@localhost:3306/database

# Port
PORT=3000
```

## Funcionalidades Principais

### 1. **Página Inicial (Home)**
- Hero section com apresentação dos serviços
- Seção de serviços com preços
- FAQ com accordion
- Formulário de contato
- Informações de contato

### 2. **Serviços Oferecidos**
- **Registro de Marca**: Nominativa, Figurativa e Mista
- **Busca por Anterioridades**: Projetos Básico e Avançado

### 3. **Formulário de Contato**
- Coleta de dados do cliente
- Seleção de serviço e urgência
- Integração com WhatsApp
- Rate limiting para proteção

### 4. **Segurança**
- HTTPS redirect
- Security headers (Helmet)
- Rate limiting
- CORS configurado
- Validação de SSL

## Scripts Disponíveis

```bash
pnpm dev          # Inicia servidor de desenvolvimento
pnpm build        # Gera build de produção
pnpm start        # Inicia servidor de produção
pnpm check        # Verifica tipos TypeScript
pnpm format       # Formata código com Prettier
pnpm test         # Executa testes
pnpm db:push      # Sincroniza banco de dados
```

## Build de Produção

O build de produção gera:
- **Frontend**: `/dist/public/` - Arquivos estáticos otimizados
- **Backend**: `/dist/index.js` - Servidor Node.js bundled

### Tamanho do Build
- HTML: 367.74 kB (gzip: 105.57 kB)
- CSS: 125.17 kB (gzip: 19.70 kB)
- JS: ~1.8 MB total (gzip: ~520 kB)

## Deployment

### Opções de Hosting
1. **Vercel**: Suporta Node.js com Express
2. **Railway**: Deployment simplificado
3. **Render**: Serviços de backend
4. **AWS EC2**: Controle total
5. **DigitalOcean**: VPS acessível

### Passos para Deploy
1. Fazer build: `pnpm build`
2. Configurar variáveis de ambiente
3. Instalar dependências em produção: `pnpm install --prod`
4. Iniciar servidor: `NODE_ENV=production node dist/index.js`

## Monitoramento

### Logs
O servidor registra:
- Status do OAuth
- Configuração de SSL
- Porta em uso
- Erros de inicialização

### Health Check
Acesse `http://localhost:3000/` para verificar se o servidor está funcionando.

## Manutenção

### Atualizações de Dependências
```bash
pnpm update
pnpm outdated
```

### Limpeza
```bash
pnpm clean
rm -rf node_modules dist
pnpm install
```

## Problemas Comuns

### Porta em Uso
O servidor automaticamente encontra uma porta disponível se 3000 estiver ocupada.

### Falta de Dependências
Se houver erro de módulo não encontrado:
```bash
pnpm install
pnpm build
```

### Variáveis de Ambiente Não Carregadas
Certifique-se de que o arquivo `.env` está na raiz do projeto e reinicie o servidor.

## Contato e Suporte

**Hudson Souza Advocacia**
- Telefone: (32) 99811-4374
- E-mail: hudsonvbadv@gmail.com
- Localização: Juiz de Fora, MG

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0
