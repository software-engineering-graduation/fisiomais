### 3.3.4 Processo 4 – Cadastrar Fisioterapeuta

Este processo refere-se ao cadastro de  fisioterapeutas no sistema. Este cadastro é fundamental pois, ele se relaciona com o controle de consultas . Inicialmente, no cadastro de fisioterapeutas 
constará o nome do profissional, celular de contato e endereço (caso seja preciso localizar o profisional em uma situação de emergência)

 Processo BPMN do processo ![Alt text](<images/Cadastrar Fisioterapeuta Diagrama.png>)

#### Detalhamento das atividades

**Nome da atividade: Cadastro de Fisioterapeuta**

O cadastro de fisioterapeuta constará o nome do profissional, telefone de contato e endereço de contato(situação de emergência)

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome            | Caixa de Texto   |                | Não possui        |
| Celular         | Número           |                |                   |
| Endereço        | Caixa de Texto   |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Confirmar            |  Confirmação do Cadastro       | default           |
| Alterar              |  Tela Alteração do Cadastro    |                   |
| Cancelar             |  Tela cancelamento do Cadastro |                   |



