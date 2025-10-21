-- ====================================
-- BACKEND COMPLETO - TERAPIA GAMIFICADA
-- Arquitetura: Banco de Dados PostgreSQL
-- ====================================

-- 1. ENUM para tipos de usuário
CREATE TYPE public.user_type AS ENUM ('casal', 'terapeuta');

-- 2. ENUM para status de atividades
CREATE TYPE public.activity_status AS ENUM ('nao_iniciada', 'em_progresso', 'concluida');

-- 3. ENUM para níveis de humor
CREATE TYPE public.mood_level AS ENUM ('muito_triste', 'triste', 'neutro', 'feliz', 'muito_feliz');

-- 4. ENUM para status de tickets
CREATE TYPE public.ticket_status AS ENUM ('aberto', 'em_andamento', 'resolvido', 'fechado');

-- ====================================
-- TABELA: profiles
-- Perfis dos usuários (casais e terapeutas)
-- ====================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  tipo_usuario user_type NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  pontos INTEGER DEFAULT 0,
  nivel INTEGER DEFAULT 1,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ====================================
-- TABELA: mood_entries
-- Registro de humor dos casais
-- ====================================
CREATE TABLE public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  nivel_humor mood_level NOT NULL,
  nota TEXT,
  data_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios registros de humor"
  ON public.mood_entries FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar seus registros de humor"
  ON public.mood_entries FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar seus registros de humor"
  ON public.mood_entries FOR UPDATE
  USING (auth.uid() = usuario_id);

-- ====================================
-- TABELA: activities
-- Atividades gamificadas disponíveis
-- ====================================
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL,
  pontos_recompensa INTEGER NOT NULL DEFAULT 10,
  icone TEXT,
  duracao_estimada INTEGER, -- em minutos
  nivel_dificuldade INTEGER DEFAULT 1,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver atividades"
  ON public.activities FOR SELECT
  USING (true);

CREATE POLICY "Apenas terapeutas podem criar atividades"
  ON public.activities FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tipo_usuario = 'terapeuta'
    )
  );

-- ====================================
-- TABELA: couple_activity_progress
-- Progresso dos casais nas atividades
-- ====================================
CREATE TABLE public.couple_activity_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  casal_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  atividade_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  status activity_status DEFAULT 'nao_iniciada',
  progresso INTEGER DEFAULT 0, -- 0 a 100
  data_inicio TIMESTAMP WITH TIME ZONE,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  feedback TEXT,
  UNIQUE(casal_id, atividade_id)
);

ALTER TABLE public.couple_activity_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Casais podem ver seu próprio progresso"
  ON public.couple_activity_progress FOR SELECT
  USING (auth.uid() = casal_id);

CREATE POLICY "Casais podem criar seu progresso"
  ON public.couple_activity_progress FOR INSERT
  WITH CHECK (auth.uid() = casal_id);

CREATE POLICY "Casais podem atualizar seu progresso"
  ON public.couple_activity_progress FOR UPDATE
  USING (auth.uid() = casal_id);

-- ====================================
-- TABELA: chat_messages
-- Mensagens do chat entre casais e terapeutas
-- ====================================
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  remetente_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  destinatario_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  mensagem TEXT NOT NULL,
  lida BOOLEAN DEFAULT FALSE,
  data_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver mensagens enviadas ou recebidas"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = remetente_id OR auth.uid() = destinatario_id);

CREATE POLICY "Usuários podem enviar mensagens"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = remetente_id);

CREATE POLICY "Usuários podem atualizar status de leitura"
  ON public.chat_messages FOR UPDATE
  USING (auth.uid() = destinatario_id);

-- ====================================
-- TABELA: support_tickets
-- Tickets de suporte
-- ====================================
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  assunto TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  status ticket_status DEFAULT 'aberto',
  prioridade TEXT DEFAULT 'media',
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  data_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver seus próprios tickets"
  ON public.support_tickets FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar tickets"
  ON public.support_tickets FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Terapeutas podem ver todos os tickets"
  ON public.support_tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND tipo_usuario = 'terapeuta'
    )
  );

-- ====================================
-- TABELA: therapist_couples
-- Relacionamento entre terapeutas e casais
-- ====================================
CREATE TABLE public.therapist_couples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terapeuta_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  casal_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  data_inicio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ativo BOOLEAN DEFAULT TRUE,
  UNIQUE(terapeuta_id, casal_id)
);

ALTER TABLE public.therapist_couples ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Terapeutas podem ver seus casais"
  ON public.therapist_couples FOR SELECT
  USING (auth.uid() = terapeuta_id);

CREATE POLICY "Casais podem ver seus terapeutas"
  ON public.therapist_couples FOR SELECT
  USING (auth.uid() = casal_id);

CREATE POLICY "Terapeutas podem adicionar casais"
  ON public.therapist_couples FOR INSERT
  WITH CHECK (auth.uid() = terapeuta_id);

-- ====================================
-- TRIGGERS para updated_at
-- ====================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ultima_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ====================================
-- TRIGGER para criar perfil automaticamente
-- ====================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email, tipo_usuario)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'Usuário'),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'tipo_usuario')::user_type, 'casal')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ====================================
-- FUNÇÃO para calcular nível baseado em pontos
-- ====================================
CREATE OR REPLACE FUNCTION public.calcular_nivel(pontos_atuais INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(pontos_atuais / 100) + 1;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- INSERIR ATIVIDADES INICIAIS
-- ====================================
INSERT INTO public.activities (titulo, descricao, categoria, pontos_recompensa, icone, duracao_estimada, nivel_dificuldade) VALUES
('Conversa Profunda', 'Dediquem 30 minutos para conversar sobre sonhos e objetivos futuros', 'Comunicação', 20, 'MessageSquare', 30, 1),
('Jantar Romântico', 'Preparem uma refeição especial juntos em casa', 'Romance', 30, 'Heart', 90, 2),
('Exercício em Dupla', 'Pratiquem atividade física juntos por 20 minutos', 'Saúde', 25, 'Activity', 20, 1),
('Noite de Cinema', 'Assistam um filme escolhido juntos e conversem sobre ele', 'Lazer', 15, 'Film', 120, 1),
('Gratidão Diária', 'Compartilhem 3 coisas pelas quais são gratos um ao outro', 'Gratidão', 20, 'Sparkles', 15, 1),
('Passeio ao Ar Livre', 'Façam uma caminhada juntos em um parque', 'Aventura', 25, 'MapPin', 60, 2),
('Escrita de Carta', 'Escrevam cartas de amor um para o outro', 'Romance', 30, 'Mail', 45, 2),
('Meditação em Dupla', 'Pratiquem meditação juntos por 15 minutos', 'Mindfulness', 20, 'Brain', 15, 1);

-- ====================================
-- HABILITAR REALTIME para chat
-- ====================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;