### 3.3.5 Processo 5 – Gerenciar Tratamento

Este processo refere-se ao desenvolvimento e gerenciamento de um plano de tratamento individualizado para o paciente. O plano de tratamento é essencial para orientar e monitorar o progresso do paciente ao longo do tempo. O fisioterapeuta irá elaborar um plano após a consulta e poderá fazer ajustes conforme necessário, com base no feedback e evolução do paciente. O plano inclui exercícios, vídeos instrutivos e outros recursos educativos para ajudar o paciente. Futuramente, o sistema poderá oferecer monitoramento em tempo real do progresso do paciente, utilizando métricas e feedbacks automatizados.

![Processo 5](../assets/processes/processo-5-gerenciar-plano.png)

#### Detalhamento das atividades
---

**Atividade: Monitoramento do Progresso do Paciente**

O fisioterapeuta pode visualizar os feedbacks do paciente e monitorar sua evolução ao longo do tempo.

| **Campo**               | **Tipo**               | **Restrições**                             | **Valor default** |
| ---                     | ---                    | ---                                        | ---               |
| Título                  | Área de texto          | -                                          | -                 |
| Paciente                | Área de texto          | -                                          | -                 |
| Observações             | Área de texto          | -                                          | -                 |
| Previsão de Término     | Data                   |                                            |                   |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Visualizar Detalhes     | Visualizar Detalhes do tratamento          | default  |
| Criar Tratamento        | Criar novo tratamento para paciente        |          |
| Retornar                | Retorno ao Plano de Tratamento             | cancel   |

---
**Atividade: Visualizar Detalhes do Tratamento**

O fisioterapeuta pode visualizar os feedbacks do paciente e monitorar sua evolução ao longo do tempo.

| **Campo**               | **Tipo**               | **Restrições**                             | **Valor default** |
| ---                     | ---                    | ---                                        | ---               |
| Título                  | Área de texto          | -                                          | -                 |
| Nome do Paciente                | Área de texto          | -                                          | -                 |
| Nome da(o) Fisioterapeuta                | Área de texto          | -                                          | -                 |
| Observações             | Área de texto          | -                                          | -                 |
| Feedback             | Área de texto          | -                                          | -                 |
| Previsão de Término     | Data                   |                                            |                   |
| Exercícios do Tratamento| Área Texto                 |                                            |                   |
| Mídias do Tratamento     | Campo Mídia incorporada                  |                                            |                   |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Editar Tratamento       | Editar tratamento do paciente              |          |
| Voltar                  | Retorno ao Gerenciamento de Tratamentos    |          |

---
**Atividade: Editar Tratamento do Paciente**

O fisioterapeuta pode fazer alterações no tratamento.

| **Campo**               | **Tipo**               | **Restrições**                             | **Valor default** |
| ---                     | ---                    | ---                                        | ---               |
| Exercícios Atuais       | Tabela                 | -                                          | -                 |
| Novos Exercícios        | Seleção múltipla       | Lista de exercícios disponíveis            | -                 |
| Remover Exercícios      | Botões                 | -                                          | -                 |
| Comentários Adicionais  | Área de texto          | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Atualizar               | Confirmação de Atualização do Plano        | default  |
| Cancelar Alterações     | Retorno ao Plano Original                  | cancel   |

---
