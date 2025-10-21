-- Corrigir avisos de segurança: Function Search Path Mutable
-- Adicionar SET search_path às funções criadas

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.ultima_atualizacao = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION public.calcular_nivel(pontos_atuais INTEGER)
RETURNS INTEGER AS $$
BEGIN
  RETURN FLOOR(pontos_atuais / 100) + 1;
END;
$$ LANGUAGE plpgsql
SET search_path = public;