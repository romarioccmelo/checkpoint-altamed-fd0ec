# 🏥 Sistema de Gestão AltaMed

Sistema completo de gestão para empresas farmacêuticas com painel administrativo, análises de vendas e gerenciamento de produtos, clientes e usuários.

## 🚀 Acesso Rápido - Admin

### 📋 **Credenciais de Demonstração:**

```
👤 Admin Principal:
   Email: admin@altamed.com
   Senha: admin123
   Cargo: Administrador

👤 Gerente de Vendas:
   Email: gerente@altamed.com
   Senha: gerente123
   Cargo: Gerente

👤 Vendedor:
   Email: vendedor@altamed.com
   Senha: vendedor123
   Cargo: Vendedor
```

### 🔐 **Acesso Rápido ao Sistema:**

1. **Painel Admin:** `/admin` - Gestão completa do sistema
2. **Dashboard:** `/dashboard` - Análises e relatórios
3. **Produtos:** `/products` - Performance de produtos
4. **Vendedores:** `/sellers` - Comparação de vendedores
5. **Preços:** `/pricing` - Orientação de preços

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + Shadcn/ui
- **Build:** Vite
- **Icons:** Lucide React
- **Charts:** Recharts (para gráficos)

## 📦 Instalação e Execução

### Pré-requisitos:
- Node.js 18+ 
- npm ou yarn

### Comandos:

```bash
# Clonar o repositório
git clone https://github.com/romarioccmelo/checkpoint-altamed-fd0ec.git

# Entrar no diretório
cd checkpoint-altamed-fd0ec

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎯 Funcionalidades

### 🔧 **Painel Administrativo**
- ✅ Gestão de usuários (CRUD completo)
- ✅ Gestão de produtos com controle de estoque
- ✅ Gestão de clientes por segmento
- ✅ Definição de metas por vendedor
- ✅ Interface responsiva mobile/desktop

### 📊 **Dashboard Analytics**
- ✅ Análise de vendas por período
- ✅ Performance por produto
- ✅ Comparação entre vendedores
- ✅ Métricas de conversão
- ✅ Gráficos interativos

### 💰 **Sistema de Preços**
- ✅ Orientação de preços por segmento
- ✅ Cálculo de margens
- ✅ Análise de competitividade
- ✅ Sugestões de ajustes

### 📱 **Responsividade**
- ✅ Design mobile-first
- ✅ Interface adaptativa
- ✅ Navegação otimizada
- ✅ Componentes touch-friendly

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Shadcn/ui)
│   └── Layout.tsx      # Layout principal
├── pages/              # Páginas da aplicação
│   ├── admin/          # Páginas administrativas
│   ├── dashboard/      # Dashboard e análises
│   ├── products/       # Gestão de produtos
│   ├── sellers/        # Análise de vendedores
│   └── pricing/        # Sistema de preços
├── constants/          # Constantes da aplicação
├── lib/               # Utilitários
└── main.css           # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system baseado em:
- **Cores:** Esquema moderno com tons de azul e cinza
- **Tipografia:** Inter font family
- **Componentes:** Shadcn/ui para consistência
- **Espaçamento:** Sistema baseado em 4px
- **Responsividade:** Breakpoints Tailwind CSS

## 🚀 Deploy

### Vercel (Recomendado):
```bash
npm i -g vercel
vercel --prod
```

### Netlify:
```bash
npm run build
# Fazer upload da pasta dist/
```

### GitHub Pages:
```bash
npm run build
# Configurar GitHub Pages para servir da pasta dist/
```

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Suporte

Para suporte, envie um email para: suporte@altamed.com

---

**Desenvolvido com ❤️ por Romario Melo**
