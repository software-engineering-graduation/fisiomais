### **3.3.1 Processo 1 – Agendar Consulta**

---

Este processo descreve o agendamento de consultas de fisioterapia de forma online. O agendamento pode ser realizado pelo paciente ou fisioterapeuta.

O processo começa quando o paciente ou fisioterapeuta acessa o sistema de agendamento. O usuário deve fornecer informações relevantes, como o nome do paciente, a data e a hora desejadas para a consulta, informações de contato, e o fisioterapeuta específico (se aplicável).

Depois de preencher esses dados, o usuário envia a solicitação de agendamento que ficará pendente até que o outro envolvido faça uma confirmação. Após a confirmação a consulta é de fato agendada.

Este processo permite que os pacientes agendem suas consultas sem a necessidade de ligar, visitar a clínica ou contatar por e-mail. Além disso, os fisioterapeutas também podem usar o sistema para agendar consultas para os pacientes.

Em seguida, apresentamos o modelo do processo 1, descrito no padrão BPMN.

![Modelo BPMN do Processo 1](../assets/processes/processo-1-agendar-consulta.png "Modelo BPMN do Processo 1.")

### **Detalhamento das atividades**

Nessa seção serão apresentadas descrições detalhadas de cada atividade, orientando sua execução no contexto do processo.

---

**Atividade: Mostrar dados do Paciente**

Nesta etapa, o sistema apresenta os dados do paciente, que já foram preenchidos em algum outro momento.

| **Campo**          | **Tipo**       | **Restrições**                         | **Valor default** |
| ------------------ | -------------- | -------------------------------------- | ----------------- |
| Nome do Paciente   | Caixa de texto | Máximo de 100 caracteres               | Dados cadastrados |
| Data de Nascimento | Data           | -                                      | Dados cadastrados |
| Gênero             | Seleção única  | Opções: Masculino, Feminino, Outro     | Dados cadastrados |
| CPF                | Caixa de texto | Deve seguir o formato: XXX.XXX.XXX-XX  | Dados cadastrados |
| Endereço           | Caixa de texto | Máximo de 200 caracteres               | Dados cadastrados |
| Telefone           | Caixa de texto | Deve seguir o formato: (XX) XXXXX-XXXX | Dados cadastrados |
| Email              | Caixa de texto | Deve ser um email válido               | Dados cadastrados |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| Próximo      | Escolher o Profissional   | default  |
| Cancelar     | Retorno ao menu principal | cancel   |

---

<br>

**Atividade: Escolher o Profissional**

Nesta etapa, o paciente escolhe o profissional para a consulta.

| **Campo**    | **Tipo**      | **Restrições**                   | **Valor default** |
| ------------ | ------------- | -------------------------------- | ----------------- |
| Profissional | Seleção única | Opções: [Lista de profissionais] | -                 |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| Próximo      | Escolher data e horário   | default  |
| Cancelar     | Retorno ao menu principal | cancel   |

---

<br>

**Atividade: Escolher data e horário**

Nesta etapa, o paciente escolhe a data e o horário da consulta.

| **Campo**           | **Tipo** | **Restrições**                    | **Valor default** |
| ------------------- | -------- | --------------------------------- | ----------------- |
| Data da Consulta    | Data     | Pré-definidos pelo Fisioterapeuta | -                 |
| Horário da Consulta | Hora     | Pré-definidos pelo Fisioterapeuta | -                 |

| **Comandos** | **Destino**                       | **Tipo** |
| ------------ | --------------------------------- | -------- |
| Confirmar    | Enviar solicitação de agendamento | default  |
| Cancelar     | Retorno ao menu principal         | cancel   |

---

<br>

**Atividade: Enviar solicitação de agendamento**

Nesta etapa, o sistema envia a solicitação de agendamento para o fisioterapeuta.

---

<br>

**Atividade: Confirmar agendamento (Manual)**

Nesta etapa, o Fisioterapeuta decide se irá confirmar ou não o agendamento solicitado.

| **Campo**   | **Tipo**       | **Restrições**           | **Valor default** |
| ----------- | -------------- | ------------------------ | ----------------- |
| Confirmar   | Seleção única  | Opções: Sim, Não         | -                 |
| Observações | Caixa de texto | Máximo de 500 caracteres | ---               |

| **Comandos** | **Destino**                             | **Tipo** |
| ------------ | --------------------------------------- | -------- |
| Salvar       | Finalizar solicitação (Fim do processo) | default  |
| Cancelar     | Retorno ao menu principal               | cancel   |

<br>

**Atividade: Confirmar agendamento (Automático)**

Nesta etapa, o sistema compara a data e horário solicitados com as disponíveis cadastradas pelo Fisioterapeuta para efetuar ou não o agendamento.