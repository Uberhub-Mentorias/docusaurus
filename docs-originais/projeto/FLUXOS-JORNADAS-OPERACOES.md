# Fluxos (Jornadas) de Operações - Aplicativo de Mentorias UberHub

Este documento contém os fluxos de operações (jornadas do usuário) extraídos do documento de projeto.

> **📌 Referências:** Este documento complementa:
>
> - [DEPENDENCIAS-TEMPORAIS-FLUXOS.md](./DEPENDENCIAS-TEMPORAIS-FLUXOS.md) - Análise detalhada das dependências temporais entre fluxos e pontos de junção
> - [Especificação de Requisitos - UberHub Mentorias](./Especificação%20de%20Requisitos%20-%20UberHub%20Mentorias.md) - Casos de uso detalhados e regras de negócio

---

## 3.1. Jornada do Mentorado

### 1\. Download e Cadastro

- O usuário baixa o app e cria uma conta
- A tela principal mostra informações sobre o programa
- As funções de mentoria estão bloqueadas

### 2\. Inserção do Voucher

- O usuário insere um código de voucher válido

### 3\. Desbloqueio e Detalhamento

- O app libera a função para o usuário selecionar tags/trilhas relacionadas à sua necessidade de mentoria
- O usuário pode selecionar múltiplas tags que representam áreas de conhecimento relevantes
- (Futuro: O app pode permitir descrever a necessidade em linguagem natural, e a IA extrai as tags automaticamente)

### 4\. Matchmaking

- O usuário submete a solicitação com as tags/trilhas selecionadas
- O sistema verifica se o mentorado possui crédito de voucher (voucher_credit_balance > 0)
- Se houver crédito, o sistema:
  - Debita um crédito de voucher do mentorado
  - Processa o matchmaking com as tags selecionadas
  - Busca mentores aprovados que possuam as tags correspondentes
  - Calcula scores de compatibilidade
  - Retorna o mentor mais adequado
- O sistema apresenta o perfil do mentor mais compatível
- A mentoria é criada com status `matched` (aguardando agendamento)
- **Nota:** Se não houver crédito de voucher, o sistema bloqueia a operação e solicita resgate de voucher

### 5\. Visualização do Mentor

- O app exibe a minibio, as áreas de especialidade e a foto do mentor
- Duas opções são apresentadas:
  - **"Agendar Mentoria"**: Abre o link externo do mentor
  - **"Solicitar outro mentor"**: Abre um formulário onde o usuário justifica o motivo do pedido. Este pedido vai para a aprovação do Admin

### 6\. Agendamento

- O usuário realiza o agendamento na ferramenta externa

### 7\. Notificações

- O usuário recebe notificações push de lembrete sobre a mentoria
- Notificações são ativadas pelo mentor ao cadastrar o agendamento no app

### 8\. Avaliação

- Após a data/hora da mentoria e o preenchimento do formulário pelo mentor
- O app libera a tela de avaliação para o mentorado (caso tenha comparecido)
- O mentorado pode avaliar o mentor com nota e comentário
- Após a avaliação, o ciclo da mentoria é finalizado (status: `completed`)

**Nota:** Se o mentorado não compareceu (no-show), o mentor marca isso no feedback e o sistema pode notificar o admin para possível suspensão do mentorado.

### 9\. Expiração de Mentoria (Processo Automático)

- Se o mentor não cadastrar o agendamento no app em até 7 dias após o matchmaking
- O sistema automaticamente marca a mentoria como `expired` (job executado diariamente)
- O mentorado recebe notificação sobre a expiração
- O sistema registra evento de analytics
- **Importante:** O voucher já foi debitado, então o mentorado não precisa resgatar novo voucher para solicitar outra mentoria (o crédito já foi consumido)

---

## 3.2. Jornada do Mentor

### 1\. Cadastro

- O profissional interessado se cadastra como mentor
- Preenche todos os campos necessários
- O status do seu perfil fica como "Pendente"

### 2\. Aprovação

- O Admin aprova o cadastro
- O mentor recebe uma notificação
- Seu perfil se torna ativo e elegível para o matchmaking

### 3\. Recebimento de Agendamento

- O mentor é notificado pela sua ferramenta externa (ex: Calendly) sobre um novo agendamento

### 4\. Cadastro da Mentoria no App

- O mentor acessa o app
- Vai para a área "Minhas Mentorias"
- Visualiza mentorias com status `matched` (pendentes de agendamento)
- Seleciona uma mentoria e clica em "Registrar Agendamento"
- Informa a data/hora agendada (combinada na ferramenta externa)
- **Este passo é crucial** para o sistema poder enviar lembretes e controlar o fluxo
- O sistema atualiza o status para `scheduled` e ativa notificações push para o mentorado

### 5\. Realização da Mentoria

- A mentoria ocorre na data marcada

### 6\. Feedback Pós-Mentoria

- Após a data/hora da sessão, o app libera para o mentor um formulário simples para ele responder:
  - O mentorado compareceu? (Sim/Não)
  - (Opcional) Outros campos para coleta de dados

### 7\. Conclusão

- Após o mentor submeter o feedback e o mentorado avaliar
- O sistema atualiza o status da mentoria para `completed`
- O sistema processa analytics e lógica de voucher para o mentor (se implementado)
- O ciclo da mentoria é finalizado no sistema

---

## 3.3. Jornada do Administrador (Painel Web)

### 1\. Login

- Acesso seguro ao painel de administração

### 2\. Dashboard

- Visualização de métricas principais:
  - Novos cadastros
  - Mentorias pendentes
  - Mentorias realizadas no mês
  - Etc.

### 3\. Aprovação de Mentores

- Uma lista de mentores com status "Pendente" é exibida
- O Admin pode visualizar o perfil completo
- Pode clicar em "Aprovar" ou "Reprovar"

### 4\. Geração de Vouchers

- Uma seção para criar vouchers em lote ou individualmente
- **Tipo de Voucher:**
  - Aberto (qualquer área)
  - Restrito (ex: "Marketing Digital", "Gestão de Produtos")
- **Quantidade:** Número de vouchers a serem gerados
- O sistema gera uma lista de códigos únicos

### 5\. Monitoramento

- Visualiza listas de usuários e mentores
- Filtros por status, nº de mentorias, etc.
- Pode suspender um usuário clicando em um botão ("Suspender por No-show")
- Pode visualizar mentorias expiradas (status `expired`) que não foram agendadas em 7 dias
- Pode aprovar/reprovar solicitações de troca de mentor (status `change_requested`)

---

## 4\. O Matchmaking com Inteligência Artificial

### 1\. Input do Usuário

- O mentorado seleciona tags/trilhas relacionadas à sua necessidade
- Alternativamente, pode descrever sua necessidade em linguagem natural (funcionalidade futura com IA)
- Exemplo de tags: \["Vendas B2B", "SaaS", "Funil de Vendas", "Métricas e KPIs"\]
- O sistema valida se o mentorado possui crédito de voucher antes de processar

### 2\. Processamento (Versão Atual - Baseada em Tags)

- O sistema recebe a lista de tags selecionadas pelo mentorado
- Busca no banco de dados os mentores que têm o maior número de "matches" entre as tags selecionadas e as áreas/trilhas que eles cadastraram em seus perfis
- Considera apenas mentores com status `APROVADO`
- Um sistema de pontuação é aplicado, onde um match exato tem peso maior

### 2a. Processamento (Versão Futura - Com IA)

- **Extração de Entidades/Tópicos:** O texto do mentorado é enviado para uma API de um modelo de linguagem (como a API do Gemini)
- **System Prompt (Instrução para a IA):** "Você é um especialista em análise de negócios. Analise o texto a seguir e extraia os principais tópicos e áreas de conhecimento em formato de tags. As áreas possíveis são: \[lista de todas as áreas/trilhas cadastradas pelos mentores no sistema\]. Retorne apenas as tags."
- **Exemplo de Retorno da IA:** \["Vendas B2B", "SaaS", "Funil de Vendas", "Métricas e KPIs"\]
- O sistema então processa as tags extraídas pela IA

### 3\. Lógica de Match

- O sistema calcula scores de compatibilidade baseado nas tags
- Busca mentores aprovados que possuam as tags correspondentes
- Retorna o mentorId mais adequado para o mentorship-service

### 4\. Apresentação

- O mentor com a maior pontuação é apresentado ao usuário
- Se houver empate, critérios secundários (disponibilidade, avaliações, etc.) podem ser usados
- O sistema debita o crédito de voucher do mentorado
- A mentoria é criada com status `matched`

---

## 5\. Validação da Ideia: Voucher para Mentor

**Proposta:** Se um mentor completa uma mentoria, ele pode ganhar um voucher para fazer uma mentoria.

### Análise

#### Prós:

- **Incentivo:** Gamifica a experiência e incentiva os mentores a participarem ativamente
- **Desenvolvimento Contínuo:** Permite que o próprio mentor também se desenvolva, buscando ajuda em áreas que não domina
- **Retenção:** Aumenta o engajamento e a retenção de mentores na plataforma

#### Contras:

- **Complexidade:** Adiciona uma camada extra na lógica de negócio e no controle de vouchers
- **Demanda:** Pode gerar uma demanda "artificial" por mentorias, que precisa ser bem gerenciada

### Recomendação

Implementar. É uma funcionalidade de alto valor agregado para os mentores. Pode ser implementada em uma segunda fase do projeto para não complexificar o lançamento inicial (MVP).

---

## Resumo das Funcionalidades por Perfil

### Mentorado (Usuário)

- Cadastro básico
- Ativação via voucher
- Solicitação detalhada de mentoria
- Matchmaking inteligente
- Agendamento via link externo
- Feedback pós-mentoria
- Gestão (solicitar troca de mentor, visualizar histórico)

### Mentor

- Cadastro detalhado (minibio, áreas, link de agendamento)
- Aprovação pelo Admin
- Gestão de mentorias (cadastro de agendamentos)
- Feedback pós-mentoria
- Visualização de histórico

### Administrador

- Acesso via painel web ou área restrita no app
- Gestão de mentores (aprovação/reprovação)
- Gestão de usuários (monitoramento, suspensão por no-show)
- Gestão de vouchers (geração em lote ou individual)
- Moderação (aprovação de pedidos de troca de mentor)
- Analytics (estatísticas e métricas chave)

---

## 🔗 Resumo das Dependências Temporais

### Fluxos que Precisam Acontecer ANTES de Outros:

1.  **Admin: Geração de Vouchers** → **Mentorado: Inserção de Voucher**
2.  **Mentor: Cadastro** → **Admin: Aprovação** → **Mentor: Aprovado** → **Mentorado: Matchmaking**
3.  **Mentorado: Agendamento** → **Mentor: Recebimento de Agendamento** → **Mentor: Cadastro no App**
4.  **Mentor: Cadastro no App** → **Mentorado: Notificações**
5.  **Mentor: Realização da Mentoria** → **Mentor: Feedback** → **Mentorado: Avaliação**

### Pontos de Junção (Onde Fluxos se Encontram):

- **Junção 1:** Matchmaking (Mentorado + Mentor Aprovado)
- **Junção 2:** Agendamento Externo (Mentorado agenda, Mentor recebe)
- **Junção 3:** Cadastro e Notificações (Mentor cadastra, Mentorado recebe notificações)
- **Junção 4:** Feedback e Avaliação (Mentor avalia, Mentorado avalia)

### Status da Mentoria e Transições:

- `pending_match` → `matched` (após matchmaking bem-sucedido)
- `matched` → `scheduled` (quando mentor registra agendamento)
- `pending_match` ou `matched` → `expired` (se não agendada em 7 dias - job automático diário)
- `scheduled` → `in_progress` (quando data/hora da sessão chega)
- `in_progress` → `completed` (após feedback do mentor e avaliação do mentorado)
- `matched` → `change_requested` (quando mentorado solicita troca de mentor)
- Qualquer status → `cancelled` (quando mentoria é cancelada)

> Para análise completa, consulte [DEPENDENCIAS-TEMPORAIS-FLUXOS.md](./DEPENDENCIAS-TEMPORAIS-FLUXOS.md)
