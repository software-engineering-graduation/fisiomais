### **3.3.1 Processo 1 – Agendar Consulta**

---

Este processo descreve o agendamento de consultas de fisioterapia de forma online. O agendamento pode ser realizado pelo paciente ou fisioterapeuta.

O processo começa quando o paciente ou fisioterapeuta acessa o sistema de agendamento. O usuário deve fornecer informações relevantes, como o nome do paciente, a data e a hora desejadas para a consulta, informações de contato, e o fisioterapeuta específico (se aplicável).

Depois de preencher esses dados, o usuário envia a solicitação de agendamento que ficará pendente até que o outro envolvido faça uma confirmação. Após a confirmação a consulta é de fato agendada.

Este processo permite que os pacientes agendem suas consultas sem a necessidade de ligar, visitar a clínica ou contatar por e-mail. Além disso, os fisioterapeutas também podem usar o sistema para agendar consultas para os pacientes.


Em seguida, apresentamos o modelo do processo 1, descrito no padrão BPMN.

![Exemplo de um Modelo BPMN do PROCESSO 1](images/process.png "Modelo BPMN do Processo 1.")
>Observação: **Em desenvolvimento, imagem meramente ilustrativa.**

### **Detalhamento das atividades**

---

**Nome da atividade 1: Preenchimento dos dados para agendamento de consulta**

 **Campo**             | **Tipo**                       | **Restrições**             | **Valor default** |
 ---                   | ---                            | ---                        | ---               |
 Nome do Paciente      | Caixa de Texto ou Seleção única| ---                        | ---               |
 Data da Consulta      | Data                           | Agenda do Fisio.           | Hoje              |
 Hora da Consulta      | Hora                           | Agenda do Fisio.           | ---               |
 Fisioterapeuta        | Seleção única                  | Cadastrados no sistema     | ---               |
 Informações de Contato| Caixa de Texto                 | ---                        | ---               |
 Tipo de Consulta      | Seleção única                  | Online / Presencial        | Online            |
 Observações           | Área de texto                  | ---                        | ---               |

 **Comandos**               |  **Destino**                          | **Tipo**   |
 ---                        | ---                                   | ---        |
 Solicitar Agendamento      | Notificação para o outro envolvido    | default    |
 Cancelar                   | Pagina de Agenda                      | cancel     |

---

**Nome da atividade 2: Confirmação de Agendamento (Notificação de Agendamento)**

 **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
 ---             | ---              | ---            | ---               |
 Confirmação     | Seleção única    | Sim/Não        | Não               |
 Observações     | Área de texto    | ---            | ---               |

 **Comandos**         |  **Destino**                      | **Tipo**     |
 ---                  | ---                               | ---          |
 Confirmar consulta   | Fim do Processo 1                 | default      |
 Alterar Agendamento  | Início do processo de agendamento | default      |

---

**Nome da atividade 3: Cancelamento de Agendamento**

Esta atividade permite que o paciente ou o fisioterapeuta cancelem o agendamento. Deve haver uma opção para fornecer um motivo para o cancelamento.

 **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
 ---             | ---              | ---            | ---               |
 Confirmação     | Seleção única    | Sim/Não        | Não               |
 Motivo          | Área de texto    | ---            | ---               |

 **Comandos**           |  **Destino**                      | **Tipo**     |
 ---                    | ---                               | ---          |
 Confirmar Cancelamento | Fim do Processo 1                 | default      |
 Voltar                 | Pagina de Agenda                  | cancel       |
