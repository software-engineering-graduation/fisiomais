## 7. Testes da solução

Nesta sessão são apresentados os dois tipos de testes realizados:

 - O **Teste de Unidade**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

# Teste de Unidade
### Teste de Unidade

Nesta seção, documentamos os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais. A tabela a seguir associa cada Caso de Teste (CT) aos testes unitários correspondentes, destacando também o componente testado.

| Caso de Teste           | Teste Unitário Associado                                   | Componente Testado          |
|-------------------------|-----------------------------------------------------------|-----------------------------|
| CT01 - Acompanhamento   | AcompanhamentoTest.criarAcompanhamentoTest()            | Acompanhamento Virtual      |
| CT02 - Agenda de Fisio  | AgendaTest.getAgendasByFisioterapeutaTest()             | Agenda de Fisioterapia      |
| CT03 - Consultas Médicas| ConsultaControllerTest.testGetAllConsultas()            | Consultas Médicas           |
| CT04 - Gerenciamento de Exercícios | ExercicioTest.getExercicioById_DeveRetornarExercicio() | Gerenciamento de Exercícios |
| CT05 - Cadastro de Fisioterapeutas | FisioterapeutaTest.getAllFisioterapeutas_ShouldReturnFisioterapeutasList() | Cadastro de Fisioterapeutas |
| CT06 - Gestão de Mídias | MidiaTest.getAllMidias_ShouldReturnAllMidias()        | Gestão de Mídias            |
| CT07 - Cadastro de Pacientes | PacienteTest.getAllPacientes_ShouldReturnAllPacientes() | Cadastro de Pacientes   |
| CT08 - Tratamentos de Saúde | TratamentoTest.createTratamento_ShouldReturnNewTratamento() | Tratamentos de Saúde |

## Avaliação dos Testes de Unidade

Os resultados dos testes de unidade mostraram robustez na implementação dos requisitos funcionais e não funcionais do software. Identificamos pontos fortes como a alta cobertura de testes e a eficácia na identificação de falhas. Pontos fracos, como a necessidade de maior cobertura em algumas áreas, serão abordados nas próximas iterações. Os testes revelaram falhas específicas que já foram corrigidas, resultando em melhorias significativas na estabilidade do software.

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Tabela de Cenários:

| Nº do Cenário | Descrição do Cenário                                                                                                     |
|----------------|--------------------------------------------------------------------------------------------------------------------------|
| 1              | Um novo fisioterapeuta deseja se cadastrar no sistema.                                                                   |
| 2              | Um fisioterapeuta registrado deseja fazer login no sistema.                                                               |
| 3              | Um novo paciente deseja se cadastrar no sistema.                                                                        |
| 4              | Um fisioterapeuta deseja cadastrar uma nova consulta no sistema.                                                         |
| 5              | Um fisioterapeuta deseja cadastrar um novo plano de tratamento no sistema.                                               |
| 6              | Um usuário deseja editar dados da consulta no sistema.                                                                 |


## Registro de Testes de Usabilidade - Cenário 1: Cadastro de Fisioterapeuta

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 33 segundos           |
| 2       | SIM             | 4                    | 42 segundos           |
| 3       | SIM             | 5                    | 38 segundos           |
| **Média** | 100%          | 4.67               | 38.33 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 8.66 segundos |

## Registro de Testes de Usabilidade - Cenário 2: Login de Fisioterapeuta

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 09 segundos           |
| 2       | SIM             | 4                    | 12 segundos           |
| 3       | SIM             | 5                    | 10 segundos           |
| **Média** | 100%          | 4.67               | 23.33 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 13.57 segundos |

## Registro de Testes de Usabilidade - Cenário 3: Cadastro de Pacientes

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 35 segundos           |
| 2       | SIM             | 4                    | 33 segundos           |
| 3       | SIM             | 5                    | 42 segundos           |
| **Média** | 100%          | 4.67               | 47.67 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 13.57 segundos |

## Registro de Testes de Usabilidade - Cenário 4: Cadastro de Consulta

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 10 segundos           |
| 2       | SIM             | 4                    | 10 segundos           |
| 3       | SIM             | 5                    | 12 segundos           |
| **Média** | 100%          | 4.67               | 32.33 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 13.57 segundos |

## Registro de Testes de Usabilidade - Cenário 5: Cadastro de Plano de Tratamento

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 15 segundos           |
| 2       | SIM             | 4                    | 12 segundos           |
| 3       | SIM             | 5                    | 13 segundos           |
| **Média** | 100%          | 4.67               | 42.33 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 13.57 segundos |

## Registro de Testes de Usabilidade - Cenário 6: Edição de Dados

| Usuário | Taxa de Sucesso | Satisfação Subjetiva | Tempo para Conclusão |
|---------|-----------------|----------------------|-----------------------|
| 1       | SIM             | 5                    | 28 segundos           |
| 2       | SIM             | 4                    | 32 segundos           |
| 3       | SIM             | 5                    | 29 segundos           |
| **Média** | 100%          | 4.67               | 29.67 segundos       |
| **Tempo para Conclusão pelo Especialista** | SIM | 5 | 13.57 segundos |

## Avaliação dos Testes de Usabilidade

Com base nos resultados obtidos nos testes de usabilidade, podemos concluir que a aplicação web demonstrou um desempenho sólido em relação à interação dos usuários. Todos os cenários propostos foram concluídos com sucesso, refletindo uma alta taxa de sucesso na execução das tarefas.

Além disso, os usuários demonstraram uma elevada satisfação subjetiva ao realizar os cenários. As avaliações médias atribuídas pelos usuários variaram entre 4 (bom) e 5 (ótimo) em cada um dos cenários, indicando uma experiência positiva geral com a aplicação.

No entanto, observamos uma discrepância no tempo de conclusão das tarefas entre os usuários e um especialista ou desenvolvedor familiarizado com a interface. Essa diferença é esperada, uma vez que o especialista possui conhecimento prévio da aplicação. No entanto, em alguns cenários, a diferença de tempo foi significativa, sugerindo possíveis oportunidades de melhoria na usabilidade da aplicação. Os comentários dos usuários também apontaram áreas que podem ser aprimoradas, como a disponibilidade de filtros de busca.
