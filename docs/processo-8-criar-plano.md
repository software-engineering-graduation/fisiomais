### 3.3.8 Processo 8 - Criar Plano de Tratamento

Este processo aborda a elaboração do plano de tratamento pelo fisioterapeuta. Ele engloba a adição de textos explicativos, seleção de mídias previamente cadastradas (como vídeos e imagens) e a organização do cronograma do plano. O plano de tratamento visa dar clareza e direcionamento ao paciente sobre os exercícios e etapas do tratamento.

![Modelo BPMN do Processo 8](../assets/processes/processo-8-criar-plano.png "Modelo BPMN do Processo 8.")

#### Detalhamento das atividades
---

**Atividade: Adicionar Texto Explicativo**

O fisioterapeuta pode inserir textos que fornecem instruções, informações ou detalhes sobre uma etapa específica do plano de tratamento.

| **Campo**               | **Tipo**           | **Restrições**                             | **Valor default** |
| ---                     | ---                | ---                                        | ---               |
| Título do Texto         | Caixa de texto     | Máximo de 100 caracteres                   | -                 |
| Conteúdo do Texto       | Área de texto      | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Adicionar               | Incorpora ao Plano de Tratamento           | default  |
| Cancelar                | Retorno à Criação do Plano                 | cancel   |

---

**Subprocesso: Formatação de Texto**

Dentro da área de inserção de texto, o fisioterapeuta tem a possibilidade de formatar o conteúdo para melhor apresentação e legibilidade.

| **Campo**               | **Tipo**           | **Restrições**                             | **Valor default** |
| ---                     | ---                | ---                                        | ---               |
| Negrito                 | Botão              | -                                          | -                 |
| Itálico                 | Botão              | -                                          | -                 |
| Sublinhado              | Botão              | -                                          | -                 |
| Lista                   | Botão              | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Aplicar Formatação      | Texto formatado no Plano                   | default  |
| Desfazer                | Retorno ao formato anterior                | cancel   |

---

**Atividade: Seleção de Mídias**

Permite ao fisioterapeuta escolher vídeos e imagens previamente cadastrados para incorporar ao plano de tratamento.

| **Campo**               | **Tipo**           | **Restrições**                             | **Valor default** |
| ---                     | ---                | ---                                        | ---               |
| Lista de Mídias         | Tabela             | -                                          | -                 |
| Seleção de Mídia        | Checkbox           | -                                          | -                 |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Adicionar ao Plano      | Mídia incorporada ao Plano                 | default  |
| Cancelar                | Retorno à Criação do Plano                 | cancel   |

---

**Atividade: Organização do Cronograma**

O fisioterapeuta pode organizar a ordem das atividades, definição de datas e frequência das etapas.

| **Campo**               | **Tipo**           | **Restrições**                             | **Valor default** |
| ---                     | ---                | ---                                        | ---               |
| Ordem das Atividades    | Arrastar e soltar  | -                                          | Ordem de Adição   |
| Data de Início          | Data               | -                                          | Data atual        |
| Frequência              | Dropdown           | Diário, Semanal, Quinzenal, Mensal         | Diário            |

| **Comandos**            |  **Destino**                               | **Tipo** |
| ---                     | ---                                        | ---      |
| Salvar Cronograma       | Cronograma definido no Plano               | default  |
| Cancelar                | Retorno à Criação do Plano                 | cancel   |

---