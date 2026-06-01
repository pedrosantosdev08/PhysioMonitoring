# PhysioMonitoring

**Plataforma digital de fisioterapia** para gestão de pacientes, acompanhamento de evoluções e entrega de planos terapêuticos personalizados — tudo em um único lugar.

---

## Visão Geral

O PhysioMonitoring conecta fisioterapeutas e pacientes em um ambiente virtual seguro. Profissionais gerenciam prontuários, atribuem exercícios e acompanham check-ins em tempo real. Pacientes acessam seus planos de tratamento e registram sua evolução de qualquer dispositivo.

### Funcionalidades

- **Prontuário Digital** — Registros completos e organizados por paciente
- **Acesso Mobile** — Interface responsiva para uso em qualquer dispositivo
- **Métricas de Evolução** — Acompanhe o progresso com dados detalhados
- **Relatórios Personalizados** — Geração de relatórios com base nos dados dos pacientes
- **Dois tipos de perfil** — Paciente e Profissional, com autenticação e rotas separadas
- **Cadastro por convite** — Pacientes só entram no sistema via código gerado pelo profissional

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Linguagem | TypeScript 5 |
| Estilização | Tailwind CSS v4 |
| Animações | Motion (Framer Motion) |
| Ícones | Font Awesome (React) |
| Backend / Auth | Firebase Authentication |
| Banco de dados | Cloud Firestore |
| Storage | Firebase Storage |
| Deploy | Vercel (recomendado) |

---

## Estrutura do Projeto

```
PhysioMonitoring/
├── src/
│   ├── app/
│   │   ├── (public)/               # Rotas públicas (sem autenticação)
│   │   │   ├── HomeClient/         # Componente da página inicial
│   │   │   ├── login/              # Página de login
│   │   │   └── register/           # Página de cadastro
│   │   ├── (private)/              # Rotas protegidas (requer autenticação)
│   │   │   ├── admin/              # Dashboard do profissional
│   │   │   ├── patient/            # Dashboard do paciente
│   │   │   └── layout.tsx          # Layout guard (verifica role do usuário)
│   │   ├── layout.tsx              # Layout raiz com metadata SEO
│   │   ├── globals.css             # Variáveis de tema e estilos globais
│   │   └── page.tsx                # Ponto de entrada → HomeClient
│   ├── _components/
│   │   ├── FormLogin/              # Formulário de login (paciente / profissional)
│   │   ├── FormRegister/           # Formulário de cadastro com campos dinâmicos
│   │   ├── Header/                 # Cabeçalho responsivo com menu mobile
│   │   ├── InfoCards/              # Cards de métricas (pacientes ativos, sessões, etc.)
│   │   └── MenuMobile/             # Menu de navegação mobile
│   ├── lib/
│   │   └── firebase/
│   │       ├── cliente.ts          # Inicialização do Firebase (Auth, Firestore, Storage)
│   │       └── auth-context.tsx    # Context de autenticação (React Context)
│   └── utils/
│       └── index.ts                # Dados estáticos (cards, info cards)
├── firebase.json                   # Configuração do Firebase CLI
├── firestore.rules                 # Regras de segurança do Firestore
├── firestore.indexes.json          # Índices do Firestore
├── next.config.ts                  # Configuração do Next.js
├── tsconfig.json                   # Configuração do TypeScript
└── package.json
```

---

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) **v18 ou superior**
- [npm](https://www.npmjs.com/) (vem com o Node) ou `yarn` / `pnpm`
- Uma conta no [Firebase](https://firebase.google.com/) (gratuita no plano Spark)

---

## Configuração do Firebase

Antes de rodar o projeto, você precisa criar e configurar um projeto no Firebase.

### 1. Criar o projeto

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"** e siga as etapas
3. Registre um **app Web** dentro do projeto

### 2. Ativar os serviços necessários

No painel do Firebase, ative:

- **Authentication** → Aba "Sign-in method" → Habilitar **E-mail/senha**
- **Firestore Database** → Criar banco em modo de produção (região `nam5` recomendada)
- **Storage** → Criar bucket padrão

### 3. Copiar as credenciais

Após registrar o app Web, você verá um objeto `firebaseConfig`. Guarde esses valores — eles serão usados nas variáveis de ambiente.

---

## Instalação e Inicialização

### 1. Clonar o repositório

```bash
git clone https://github.com/pedrosantosdev08/PhysioMonitoring.git
cd PhysioMonitoring
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as credenciais do seu projeto Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

> ⚠️ **Nunca** commite o `.env.local` no repositório. Ele já está listado no `.gitignore` do Next.js por padrão.

### 4. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build` | Gera o build de produção |
| `npm start` | Inicia o servidor com o build de produção |
| `npm run lint` | Executa o ESLint no projeto |

---

## Regras do Firestore

O arquivo `firestore.rules` já está configurado no repositório. Por padrão, todas as leituras e escritas estão **bloqueadas** — o que é correto para produção:

```
match /{document=**} {
  allow read, write: if false;
}
```

Você deve expandir essas regras conforme implementar a lógica de roles (`admin` e `patient`). Exemplo de estrutura recomendada:

```
// Profissional acessa apenas suas próprias salas
match /rooms/{roomId} {
  allow read, write: if request.auth.token.role == 'admin'
                     && resource.data.adminId == request.auth.uid;
}

// Paciente acessa apenas a sala à qual está vinculado
match /rooms/{roomId} {
  allow read: if request.auth.token.role == 'patient'
              && resource.data.patientId == request.auth.uid;
}
```

Para publicar as regras no Firebase, use:

```bash
firebase deploy --only firestore:rules
```

---

## Estrutura do Firestore (Schema recomendado)

```
/users/{userId}             → perfil do usuário e role (admin | patient)
/rooms/{roomId}             → sala virtual (adminId, patientId, código de convite)
/invites/{code}             → convites (adminId, expiresAt, used: boolean)
/records/{roomId}/entries   → prontuário (notas, datas)
/exercises/{roomId}/list    → exercícios atribuídos ao paciente
/checkins/{roomId}/logs     → check-ins do paciente (dor, melhoria, observações)
```

---

## Fluxo de Autenticação

O projeto usa **dois tipos de usuário** selecionáveis diretamente nos formulários de login e cadastro:

- **Paciente** — acessa a rota `/patient`
- **Profissional** — acessa a rota `/admin`

O `layout.tsx` da pasta `(private)` atua como guard de rota: verifica o role do usuário autenticado via Firebase Auth e redireciona caso não tenha permissão.

O campo `userType` é enviado como `hidden input` nos formulários e deve ser salvo como **custom claim** no Firebase Auth para que as regras do Firestore funcionem corretamente.

---

## Deploy (Vercel)

1. Faça o push do repositório para o GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o projeto
3. Em **Settings → Environment Variables**, adicione todas as variáveis do `.env.local`
4. Clique em **Deploy**

> O Vercel detecta automaticamente projetos Next.js — nenhuma configuração extra é necessária.

---

## Paleta de Cores

| Variável | Valor | Uso |
|---|---|---|
| `--bg-color` | `#eff5f7` | Fundo da aplicação |
| `--bg-card` | `#0D1F27` | Fundo dos cards |
| `--accent-color` | `#2FB3AD` | Cor de destaque (teal) |
| `--text-description` | `#1D323E` | Texto descritivo |

---

## Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Commit suas mudanças: `git commit -m 'feat: minha feature'`
4. Push para a branch: `git push origin feature/minha-feature`
5. Abra um Pull Request

---

## Licença

Este projeto é privado e de uso restrito. Consulte o autor para mais informações.

---

Desenvolvido por [Pedro Santos](https://github.com/pedrosantosdev08)
