import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Verificar autenticação
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);

    if (!user) {
      throw new Error("Não autenticado");
    }

    // Verificar se é terapeuta
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("tipo_usuario")
      .eq("id", user.id)
      .single();

    if (profile?.tipo_usuario !== "terapeuta") {
      throw new Error("Apenas terapeutas podem criar casais");
    }

    const { parceiro1, parceiro2 } = await req.json();

    // Criar primeiro parceiro
    const { data: parceiro1Data, error: error1 } = await supabaseAdmin.auth.admin.createUser({
      email: parceiro1.email,
      password: parceiro1.senha,
      email_confirm: true,
      user_metadata: {
        nome: parceiro1.nome,
        tipo_usuario: "casal",
      },
    });

    if (error1) throw error1;

    // Criar segundo parceiro
    const { data: parceiro2Data, error: error2 } = await supabaseAdmin.auth.admin.createUser({
      email: parceiro2.email,
      password: parceiro2.senha,
      email_confirm: true,
      user_metadata: {
        nome: parceiro2.nome,
        tipo_usuario: "casal",
      },
    });

    if (error2) throw error2;

    // Vincular os parceiros
    await supabaseAdmin
      .from("profiles")
      .update({ parceiro_id: parceiro2Data.user?.id })
      .eq("id", parceiro1Data.user?.id);

    await supabaseAdmin
      .from("profiles")
      .update({ parceiro_id: parceiro1Data.user?.id })
      .eq("id", parceiro2Data.user?.id);

    // Vincular ambos ao terapeuta
    await supabaseAdmin.from("therapist_couples").insert([
      { terapeuta_id: user.id, casal_id: parceiro1Data.user?.id },
      { terapeuta_id: user.id, casal_id: parceiro2Data.user?.id },
    ]);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
