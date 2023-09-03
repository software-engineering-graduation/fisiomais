### 3.3.2 Processo 2 – Controle de Consultas Do Fisioterapeuta

Esse processo refere-se ao gerenciamento de consultas por parte do fisioterapeuta. O gerenciamento de consultas desempenha um papel crucial no sistema, pois assegura que o profissional possa ter um controle adequado sobre sua agenda e seus pacientes. O fisioterapeuta poderá visualizar as consultas que estão agendadas para ele, podendo alterar o status da consulta, podendo ser: “Aguardando”, “Em andamento” e “Finalizada”. O fisioterapeuta também poderá visualizar o histórico de consultas, podendo filtrar por data, status e paciente. Como oportunidade de melhorias futuras, o fisioterapeuta poderá visualizar o histórico de consultas de um paciente específico, podendo filtrar por data e status.

**A representação BPMN (Business Process Model and Notation) deste processo ainda será desenvolvida, conforme especificado no cronograma da matéria.**

#### Detalhamento das atividades
---

**Atividade: Visualizar Consultas**

O fisioterapeuta pode acessar uma lista com todas as consultas agendadas. Ele também terá opções para confirmar, alterar ou cancelar cada consulta, bem como visualizar detalhes específicos de uma consulta selecionada.

| **Campo**               | **Tipo**           | **Restrições**                             | **Valor default** |
| ---                     | ---                | ---                                        | ---               |
| Lista de Consultas      | Tabela             | -                                          | -                 |
| Detalhes da Consulta    | Área de texto      | -                                          | -                 |
| Status da Consulta      | Seleção única      | Pendente, Confirmada, Cancelada            | Pendente          |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Confirmar               | Confirmação da Consulta                    | default  |
| Alterar                 | Tela de Alteração de Consulta              | -        |
| Cancelar                | Tela de Cancelamento de Consulta           | -        |

---

**Atividade: Alterar Disponibilidade/Horário**

O fisioterapeuta pode definir quais são seus dias e horários disponíveis para consultas. Ele também pode indicar blocos específicos de horários em que não está disponível.

| **Campo**               | **Tipo**               | **Restrições**                             | **Valor default** |
| ---                     | ---                    | ---                                        | ---               |
| Dias de Disponibilidade | Seleção múltipla       | Segunda a Domingo                          | -                 |
| Horário de Início       | Hora                   | -                                          | -                 |
| Horário de Término      | Hora                   | -                                          | -                 |
| Blocos de Indisponibilidade | Tabela             | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Salvar                  | Confirmação de Alteração                   | default  |
| Cancelar                | Retorno à Visualização de Consultas        | cancel   |

---

**Atividade: Visualizar Histórico de Consultas**

O fisioterapeuta pode ver o histórico de consultas de um paciente específico, permitindo uma revisão detalhada de todas as sessões passadas.

| **Campo**               | **Tipo**               | **Restrições**                             | **Valor default** |
| ---                     | ---                    | ---                                        | ---               |
| Paciente Selecionado    | Caixa de texto         | -                                          | -                 |
| Lista de Consultas Passadas | Tabela             | -                                          | -                 |
| Detalhes da Consulta Antiga | Área de texto      | -                                          | -                 |
| Buscar por Data         | Data                   | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Visualizar              | Detalhamento da Consulta Antiga            | default  |
| Voltar                  | Retorno à Visualização de Consultas        | cancel   |

