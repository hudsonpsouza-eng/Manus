# Guia de Deploy no Servidor Manus

## Hudson Souza Advocacia - Versão Otimizada para Mobile

Este documento contém as instruções para publicar o site no servidor Manus.

### Pré-requisitos

- Acesso ao painel de controle Manus
- Credenciais de acesso ao repositório Git
- Configuração de variáveis de ambiente

### Variáveis de Ambiente Necessárias

```env
# OAuth Configuration
OAUTH_SERVER_URL=https://seu-oauth-server.com

# Database Configuration
DATABASE_URL=mysql://user:password@host:3306/database

# SSL Configuration (opcional)
SSL_CERT_PATH=/caminho/para/cert.pem
SSL_KEY_PATH=/caminho/para/key.pem

# Port
PORT=3000
```

### Passos para Deploy

#### 1. Preparar o Repositório

```bash
cd /home/ubuntu/hudson-souza-advocacia
git init
git add .
git commit -m "Initial commit - Hudson Souza Advocacia mobile-optimized"
git remote add manus <seu-repositorio-manus>
git push -u manus main
```

#### 2. Configurar no Painel Manus

1. Acesse o painel de controle do Manus
2. Clique em "Novo Projeto" ou "Deploy"
3. Selecione "Node.js" como runtime
4. Cole a URL do repositório Git
5. Configure as variáveis de ambiente

#### 3. Configurações de Build

- **Build Command**: `pnpm build`
- **Start Command**: `NODE_ENV=production node dist/index.js`
- **Port**: 3000

#### 4. Recursos Recomendados

- **Memória**: 512MB
- **CPU**: 0.5 cores
- **Réplicas**: 1 (pode aumentar conforme necessário)

### Otimizações Mobile Implementadas

✅ **Responsividade Total**
- Design mobile-first com breakpoints em sm (640px), md (768px), lg (1024px)
- Tipografia escalável (text-sm, text-base, text-lg, text-xl)
- Espaçamento adaptativo (gap-3, gap-4, gap-6)

✅ **Performance**
- Imagens otimizadas com lazy loading
- CSS minificado e otimizado
- JavaScript bundled e minificado
- Gzip compression habilitado

✅ **Segurança**
- HTTPS redirect automático
- Security headers (Helmet)
- Rate limiting configurado
- CORS protegido

✅ **Acessibilidade**
- Contraste de cores otimizado
- Navegação por teclado suportada
- ARIA labels implementados

### Monitoramento Pós-Deploy

Após o deploy, verifique:

1. **Performance**
   ```bash
   curl -I https://seu-dominio.com
   # Verifique os headers de segurança
   ```

2. **Responsividade**
   - Acesse em dispositivos móveis
   - Teste em diferentes tamanhos de tela
   - Verifique a velocidade de carregamento

3. **Funcionalidades**
   - Teste o formulário de contato
   - Verifique os links de navegação
   - Teste a integração com WhatsApp

### Troubleshooting

#### Erro: "Port already in use"
O servidor automaticamente encontrará uma porta disponível. Verifique os logs.

#### Erro: "OAUTH_SERVER_URL not configured"
Configure a variável de ambiente `OAUTH_SERVER_URL` no painel Manus.

#### Erro: "Database connection failed"
Verifique a `DATABASE_URL` e certifique-se de que o banco está acessível.

### Rollback

Para reverter para uma versão anterior:

```bash
git revert <commit-hash>
git push manus main
```

### Suporte

Para mais informações sobre deploy no Manus, consulte:
- https://help.manus.im
- Documentação oficial do Manus

---

**Última atualização**: Janeiro 2026
**Versão**: 1.0.0 (Mobile-Optimized)
