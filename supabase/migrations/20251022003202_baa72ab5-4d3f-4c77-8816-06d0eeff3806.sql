-- Adicionar campo para vincular parceiros
ALTER TABLE public.profiles
ADD COLUMN parceiro_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

-- Criar índice para melhor performance
CREATE INDEX idx_profiles_parceiro ON public.profiles(parceiro_id);

-- Atualizar RLS policies do chat para garantir privacidade
DROP POLICY IF EXISTS "Usuários podem ver mensagens enviadas ou recebidas" ON public.chat_messages;

-- Política atualizada: usuários só veem suas próprias mensagens
CREATE POLICY "Usuários podem ver suas próprias mensagens"
ON public.chat_messages
FOR SELECT
USING (
  auth.uid() = remetente_id OR auth.uid() = destinatario_id
);

-- Terapeutas podem ver todas as mensagens de seus clientes
CREATE POLICY "Terapeutas podem ver mensagens de seus clientes"
ON public.chat_messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.tipo_usuario = 'terapeuta'
    AND (
      EXISTS (
        SELECT 1 FROM public.therapist_couples tc
        WHERE tc.terapeuta_id = auth.uid()
        AND (tc.casal_id = chat_messages.remetente_id OR tc.casal_id = chat_messages.destinatario_id)
        AND tc.ativo = true
      )
    )
  )
);

-- Adicionar campo para identificar nome do remetente (desnormalizado para performance)
ALTER TABLE public.chat_messages
ADD COLUMN remetente_nome text;