### 3.3.7 Processo 7 - Gerenciar Mídias

Este processo permite ao fisioterapeuta adicionar vídeos explicativos ou demonstrativos, assim como imagens ilustrativas ou instrucionais para auxiliar no tratamento. Assim como deletar o que já tem cadastrado. Estas mídias visam garantir que os pacientes compreendam e realizem os exercícios corretamente.

Em seguida, apresentamos o modelo do processo 7, descrito no padrão BPMN.

![Modelo BPMN do Processo 7](../assets/processes/processo-7-gerenciar-midia.png "Modelo BPMN do Processo 7.")

#### Detalhamento das atividades

---

Nessa seção serão apresentadas descrições detalhadas de cada atividade, orientando sua execução no contexto do processo.

### Cadastro de mídia

---

**Atividade: Selecionar o tipo de mídia**

Nesta etapa, o usuário pode selecionar o tipo de mídia que deseja adicionar.

| **Campo**     | **Tipo**      | **Restrições**             | **Valor default** |
| ------------- | ------------- | -------------------------- | ----------------- |
| Tipo de Mídia | Seleção única | Opções: Vídeo, Imagem, GIF | Imagem            |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| Próximo      | Selecionar o arquivo/link | default  |
| Cancelar     | Retorno ao menu principal | cancel   |

---

<br>

**Atividade: Selecionar o arquivo/link**

Nesta etapa, o usuário pode selecionar um arquivo ou fornecer um link para o conteúdo de mídia.

| **Campo**        | **Tipo** | **Restrições**                           | **Valor default** |
| ---------------- | -------- | ---------------------------------------- | ----------------- |
| Arquivo de Mídia | Arquivo  | Formatos suportados: mp4, jpg, png, jpeg | -                 |
| Link da Mídia    | URL      | Deve ser um link válido                  | -                 |

| **Comandos** | **Destino**                    | **Tipo** |
| ------------ | ------------------------------ | -------- |
| Próximo      | Adicionar o título e descrição | default  |
| Anterior     | Selecionar o tipo de mídia     | default  |
| Cancelar     | Retorno ao menu principal      | cancel   |

---

<br>

**Atividade: Adicionar o título e descrição**

Nesta etapa, o usuário pode adicionar um título e uma descrição para o conteúdo de mídia selecionado.

| **Campo**          | **Tipo**       | **Restrições**            | **Valor default** |
| ------------------ | -------------- | ------------------------- | ----------------- |
| Título do Mídia    | Caixa de texto | Máximo de 100 caracteres  | -                 |
| Descrição do Mídia | Área de texto  | Máximo de 1000 caracteres | -                 |

| **Comandos** | **Destino**               | **Tipo** |
| ------------ | ------------------------- | -------- |
| Salvar       | Confirmar o upload        | default  |
| Anterior     | Selecionar o arquivo/link | default  |
| Cancelar     | Retorno ao menu principal | cancel   |

---

### Excluir mídia

---
**Atividade: Listar mídias cadastradas**

Nesta etapa, o sistema consulta o banco de dados e lista para o usuário todas as mídias previamente cadastradas.

---

<br>

**Atividade: Selecionar a(as) mídias(as)**

Nesta etapa, o usuário pode selecionar uma ou várias mídias da lista.

| **Campo**           | **Tipo**         | **Restrições**                         | **Valor default** |
| ------------------- | ---------------- | -------------------------------------- | ----------------- |
| Mídias Selecionadas | Seleção múltipla | Selecionar uma ou mais mídias da lista | Nenhuma seleção   |

| **Comandos** | **Destino**       | **Tipo** |
| ------------ | ----------------- | -------- |
| Confirmar    | Confirmar seleção | default  |

---

**Confirmar seleção**

Deletar as mídias selecionadas.

| **Comandos** | **Destino**                                   | **Tipo** |
| ------------ | --------------------------------------------- | -------- |
| Deletar      | Deletar mídias selecionadas (Fim do processo) | default  |
| Cancelar     | Retorno à Lista de Mídias                     | cancel   |