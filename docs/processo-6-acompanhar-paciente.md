### 3.3.6 Processo 6 – Acompanhar Paciente

O acompanhamento virtual é um processo essencial para a comunicação entre o fisioterapeuta e o paciente em um cenário onde as consultas presenciais não são sempre possíveis ou práticas. Este processo envolve a realização de sessões de videoconferência, fornecimento de recursos educacionais e coleta de feedback e avaliação do atendimento virtual. As oportunidades de melhoria aqui focam na otimização da interface, conexão com outras plataformas de "telessaúde" e aprimoramento da experiência do usuário.

![Imagem](../assets/processes/processo-6-acompanhar-paciente.png)

#### Detalhamento das atividades
---

#### **Atividade: Fazer Login**

**Objetivo:** Permitir que o usuário acesse sua conta pessoal no portal.

| **Campo**       | **Tipo**       | **Restrições**               | **Valor default** |
| --------------- | -------------- | ---------------------------- | ----------------- |
| Nome de Usuário | Caixa de texto | -                            | -                 |
| Senha           | Senha          | Mínimo de 6 caracteres       | -                 |

| **Comandos**    | **Destino**         | **Tipo** |
| --------------- | ------------------ | -------- |
| Entrar          | Acesso ao Portal   | default  |
| Esqueci a Senha | Recuperação de Senha| link     |

---

#### **Atividade: Acessar Portal**

**Objetivo:** Permitir que o usuário navegue pelo portal após fazer login.

| **Campo**       | **Tipo** | **Restrições** | **Valor default** |
| --------------- | -------- | ---------------| ----------------- |
| Portal          | Link     | -               | -                 |

---

#### **Atividade: Realizar Acompanhamento**

**Objetivo:** Facilitar o acompanhamento de pacientes, permitindo que o profissional visualize informações detalhadas.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Lista de Pacientes| Tabela       | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Selecionar      | Detalhes do Acompanhamento| link     |

---

#### **Atividade: Registrar Observações**

**Objetivo:** Permitir que o profissional faça anotações importantes sobre o acompanhamento realizado.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Observações     | Área de texto  | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Salvar          | Salvar Observações        | default  |

---

#### **Atividade: Fazer Ajustes**

**Objetivo:** Permitir que o profissional faça ajustes conforme necessário após o acompanhamento.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Ajustes         | Área de texto  | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Confirmar       | Confirmar Ajustes         | default  |

---

#### **Atividade: Enviar Ajustes ao Cliente**

**Objetivo:** Comunicar ao paciente qualquer ajuste feito pelo profissional.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Mensagem        | Área de texto  | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Enviar          | Enviar Ajustes            | default  |

---

#### **Atividade: Receber Notificação de Ajustes Feitos**

**Objetivo:** Garantir que o paciente seja informado sobre quaisquer ajustes realizados pelo profissional.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Notificação     | Área de texto  | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Visualizar      | Visualizar Notificação    | link     |

---

#### **Atividade: Confirmar Recebimento**

**Objetivo:** Assegurar que o paciente confirmou o recebimento das notificações de ajustes.

| **Campo**       | **Tipo**       | **Restrições** | **Valor default** |
| --------------- | -------------- | ---------------| ----------------- |
| Confirmar       | Botão          | -              | -                 |

| **Comandos**    | **Destino**               | **Tipo** |
| --------------- | ------------------------- | -------- |
| Confirmar       | Confirmação do Recebimento| default  |
|

---
