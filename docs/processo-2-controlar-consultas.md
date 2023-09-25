### 3.3.2 Processo 2 – Controlar Consultas Do Fisioterapeuta

Esse processo refere-se ao gerenciamento de consultas por parte do fisioterapeuta. O gerenciamento de consultas desempenha um papel crucial no sistema, pois assegura que o profissional possa ter um controle adequado sobre sua agenda e seus pacientes. O fisioterapeuta poderá visualizar as consultas que estão agendadas para ele, podendo alterar o status da consulta, podendo ser: “Aguardando”, “Em andamento” e “Finalizada”. O fisioterapeuta também poderá visualizar o histórico de consultas, podendo filtrar por data, status e paciente. Como oportunidade de melhorias futuras, o fisioterapeuta poderá visualizar o histórico de consultas de um paciente específico, podendo filtrar por data e status.

![Processo 2](../assets/processes/processo-2-controlar-consultas.png)

#### Detalhamento das atividades
---

---

#### **Atividade: Fazer Login no Portal**

**Objetivo:** Permitir que o fisioterapeuta acesse sua conta pessoal no portal.

| **Campo**          | **Tipo**       | **Restrições**               | **Valor default** |
| ------------------ | -------------- | ---------------------------- | ----------------- |
| Nome de Usuário    | Caixa de texto | -                            | -                 |
| Senha              | Senha          | Mínimo de 6 caracteres       | -                 |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Entrar             | Acesso ao Portal                   | default  |
| Esqueci a Senha    | Recuperação de Senha               | link     |

---

#### **Atividade: Acessar Painel de Consultas**

**Objetivo:** Permitir que o fisioterapeuta visualize e gerencie suas consultas agendadas.

| **Campo**          | **Tipo**       | **Restrições** | **Valor default** |
| ------------------ | -------------- | --------------- | ----------------- |
| Lista de Consultas | Tabela         | -               | -                 |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Visualizar Detalhes| Detalhes da Consulta Agendada       | link     |

---

#### **Atividade: Revisar e Gerenciar Consultas Agendadas**

**Objetivo:** Permitir a revisão e gestão eficiente das consultas agendadas.

| **Campo**          | **Tipo**            | **Restrições** | **Valor default** |
| ------------------ | ------------------- | --------------- | ----------------- |
| Consultas Agendadas| Tabela              | -               | -                 |
| Status da Consulta | Seleção única       | Confirmada, Pendente, Cancelada | - |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Alterar            | Tela de Alteração de Consulta       | link     |
| Cancelar           | Tela de Cancelamento de Consulta    | link     |

---

#### **Atividade: Enviar Notificação de Alterações Relacionado à Consulta para o Paciente**

**Objetivo:** Informar o paciente sobre qualquer mudança relacionada à consulta agendada.

| **Campo**          | **Tipo**            | **Restrições** | **Valor default** |
| ------------------ | ------------------- | --------------- | ----------------- |
| Mensagem           | Área de texto       | -               | -                 |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Enviar             | Envio de Notificação                | default  |

---

#### **Atividade: Receber Notificação de Alterações na Consulta**

**Objetivo:** Garantir que o fisioterapeuta seja notificado sobre quaisquer alterações feitas pelo paciente na consulta agendada.

| **Campo**          | **Tipo**      | **Restrições** | **Valor default** |
| ------------------ | ------------- | --------------- | ----------------- |
| Notificações       | Tabela        | -               | -                 |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Visualizar Detalhes| Detalhes da Notificação            | link     |

---

#### **Atividade: Confirmar Recebimento**

**Objetivo:** Confirmar o recebimento da notificação sobre as alterações feitas na consulta agendada.

| **Campo**          | **Tipo**      | **Restrições** | **Valor default** |
| ------------------ | ------------- | --------------- | ----------------- |
| Confirmar          | Botão         | -               | -                 |

| **Comandos**       | **Destino**                         | **Tipo** |
| ------------------ | ---------------------------------- | -------- |
| Confirmar          | Confirmação do Recebimento         | default  |

