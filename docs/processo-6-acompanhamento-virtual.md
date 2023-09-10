### 3.3.6 Processo 6 – Acompanhar Paciente

O acompanhamento virtual é um processo essencial para a comunicação entre o fisioterapeuta e o paciente em um cenário onde as consultas presenciais não são sempre possíveis ou práticas. Este processo envolve a realização de sessões de videoconferência, fornecimento de recursos educacionais e coleta de feedback e avaliação do atendimento virtual. As oportunidades de melhoria aqui focam na otimização da interface, conexão com outras plataformas de "telessaúde" e aprimoramento da experiência do usuário.

**A representação BPMN deste processo ainda está em desenvolvimento, conforme espeficicado no cronograma da matéria.**

#### Detalhamento das atividades

**Atividade 1: Sessões de Videoconferência**

| **Campo**            | **Tipo**           | **Restrições**            | **Valor default** |
| ---                  | ---                | ---                       | ---               |
| Data da Sessão       | Data               | Futura                    | Data atual        |
| Horário da Sessão    | Hora               | Conforme disponibilidade  |                   |
| Link da Videoconferência | Link           | URL válida                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**       |
| ---                  | ---                            | ---            |
| Iniciar Sessão       | Início da Videoconferência     | default        |
| Cancelar Sessão      | Cancelamento da Videoconferência | cancel      |

**Atividade 2: Acesso a Recursos Educacionais**

| **Campo**            | **Tipo**           | **Restrições**            | **Valor default** |
| ---                  | ---                | ---                       | ---               |
| Tipo de Recurso      | Seleção única      | Vídeo, Artigo, Animação   |                   |
| Link do Recurso      | Link               | URL válida                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**       |
| ---                  | ---                            | ---            |
| Acessar Recurso      | Visualização do Recurso        | default        |
| Compartilhar Recurso | Compartilhamento com Paciente  |                |

**Atividade 3: Feedback e Avaliação do Atendimento Virtual**

| **Campo**            | **Tipo**           | **Restrições**            | **Valor default** |
| ---                  | ---                | ---                       | ---               |
| Avaliação            | Número             | De 1 a 5                  |                   |
| Comentários          | Área de texto      | Máximo de 500 caracteres  |                   |

| **Comandos**         |  **Destino**                   | **Tipo**       |
| ---                  | ---                            | ---            |
| Submeter Avaliação   | Registro de Feedback           | default        |
| Cancelar Avaliação   | Cancelamento da Avaliação      | cancel         |

---
