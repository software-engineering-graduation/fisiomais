# Arquitetura de Pastas FisioMais

Este documento descreve a estrutura de pastas do projeto Angular e explica o propósito de cada diretório.

---

## 📂 `frontend/`

### 📂 `e2e/`

Contém os testes de ponta a ponta usando Protractor. Estes testes são usados para simular ações do usuário e garantir que todo o fluxo da aplicação esteja funcionando corretamente.

### 📂 `src/`

Diretório principal que contém todo o código-fonte da aplicação.

#### 📂 `app/`

O diretório central do código-fonte.

##### 📂 `core/`

- **guards/**: Contém os guards que podem ser usados para proteger rotas ou delay na carga de módulos.
- **interceptors/**: Interceptors do HTTP para capturar ou modificar requisições e respostas.
- **services/**: Serviços singleton que são usados em toda a aplicação.
- **models/**: Modelos e interfaces globais.

##### 📂 `shared/`

- **components/**: Componentes reutilizáveis em várias partes do aplicativo.
- **directives/**: Diretivas customizadas.
- **pipes/**: Pipes para transformação de dados.
- **modules/**: Módulos que encapsulam componentes, diretivas e pipes relacionados.

##### 📂 `features/`

Diretório para módulos de features. Cada subdiretório representa uma feature distinta da aplicação.

- **feature-1/**, **feature-2/**, etc.: Cada feature pode conter:
  - **components/**: Componentes específicos dessa feature.
  - **services/**: Serviços específicos dessa feature.
  - **feature-name.module.ts**: Módulo da feature.

#### 📂 `assets/`

Contém imagens, ícones e outros arquivos estáticos.

#### 📂 `environments/`

- Contém arquivos de configuração de ambiente, como produção e desenvolvimento.

---

## Arquivos de Configuração

- **angular.json**: Configurações do Angular CLI para o projeto.
- **package.json**: Define pacotes npm que são instalados como dependências do projeto.

---
