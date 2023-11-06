### **3.3.1 Processo 1 – Agendar Consulta**

---

Este processo descreve o agendamento de consultas de fisioterapia de forma online. O agendamento pode ser realizado apenas pelo paciente.

O processo começa quando o paciente acessa o sistema de agendamento. O usuário deve fornecer informações relevantes, como a data e a hora desejadas para a consulta e o fisioterapeuta desejado para realizar a marcação.

Depois de preencher esses dados, o paciente envia a solicitação de agendamento que ficará pendente até que o outro envolvido faça uma confirmação. Após a confirmação a consulta é de fato agendada ou recusada.

Este processo permite que os pacientes agendem suas consultas sem a necessidade de ligar, visitar a clínica ou contatar por e-mail.

Em seguida, apresentamos o modelo do processo 1, descrito no padrão BPMN.

![Modelo BPMN do Processo 1](../assets/processes/processo-1-agendar-consulta.png "Modelo BPMN do Processo 1.")

### **Detalhamento das atividades**

Nessa seção serão apresentadas descrições detalhadas de cada atividade, orientando sua execução no contexto do processo.

---

**Atividade: Mostrar dados do Paciente**

Nesta etapa, o sistema apresenta os dados do paciente, que já foram preenchidos em algum outro momento. Como Nome, data de nascimento, gênero, CPF, endereço, telefone e email cadastrados.


| **Comandos**  | **Destino**                       | **Tipo** |
| ------------- | --------------------------------- | -------- |
| Próximo Passo | Preencher informações da consulta | default  |

---

<br>

**Atividade: **Atividade: Escolher o Profissional**

Nesta etapa, o paciente escolhe a data e o horário da consulta e o profissional desejado.

| **Campo**           | **Tipo**      | **Restrições**                    | **Valor default** |
| ------------------- | ------------- | --------------------------------- | ----------------- |
| Data da Consulta    | Data          | Pré-definidos pelo Fisioterapeuta | -                 |
| Horário da Consulta | Hora          | Pré-definidos pelo Fisioterapeuta | -                 |
| Profissional        | Seleção única | Opções: [Lista de profissionais]  | -                 |

| **Comandos** | **Destino**           | **Tipo** |
| ------------ | --------------------- | -------- |
| Próximo      | Confirmar agendamento | default  |

---

<br>

**Atividade: Confirmar agendamento (Manual)**

Nesta etapa, o Fisioterapeuta decide se irá confirmar ou não o agendamento na data e horário solicitadas pelo paciente.

| **Campo**   | **Tipo**       | **Restrições**           | **Valor default** |
| ----------- | -------------- | ------------------------ | ----------------- |
| Confirmar   | Seleção única  | Opções: Sim, Não         | -                 |
| Observações | Caixa de texto | Máximo de 500 caracteres | ---               |

| **Comandos** | **Destino**                             | **Tipo** |
| ------------ | --------------------------------------- | -------- |
| Salvar       | Finalizar solicitação (Fim do processo) | default  |

<br>

**Atividade: Confirmar agendamento (Automático)**

Nesta etapa, o sistema compara a data e horário solicitados com as disponíveis cadastradas pelo Fisioterapeuta e com os horários já agendados para efetuar ou não o agendamento.