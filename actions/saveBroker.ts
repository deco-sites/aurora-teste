import { AppContext } from "site/apps/site.ts";
import { nChars, onlyNumbers } from "site/helpers/Simulador/numbers.ts";

export type Corretor = {
  nomeDaCorretora: string;
  nomeDoResponsavel: string;
  email: string;
  cnpj: string;
  telefone: string;
  estado: string;
  cidade: number | null;
  endereco: string;
  cep: string;
  quantidadeDeFuncionarios: number;
  possuiCarteira: boolean;
  possuiVenda: boolean;
};

type CorretorTableRow = {
  cd_corretor?: number;
  nome_corretora: string;
  nome_responsavel: string;
  email: string;
  cnpj: string;
  telefone: string;
  estado: string;
  cidade: number | null;
  endereco: string;
  cep: string;
  qtd_funcionarios: number;
  possui_carteira: boolean;
  possui_venda: boolean;
};

function mapCorretorToRow(c: Corretor): CorretorTableRow {
  return {
    cd_corretor: undefined,
    nome_corretora: nChars(c.nomeDaCorretora?.trim() ?? "", 150),
    nome_responsavel: nChars(c.nomeDoResponsavel?.trim() ?? "", 150),
    email: nChars(c.email?.trim() ?? "", 100),
    cnpj: nChars(onlyNumbers(c.cnpj?.trim() ?? ""), 14),
    telefone: nChars(onlyNumbers(c.telefone?.trim() ?? ""), 14),
    estado: nChars(c.estado?.trim() ?? "", 2),
    cidade: c.cidade,
    endereco: nChars(c.endereco?.trim() ?? "", 150),
    cep: nChars(c.cep?.trim() ?? "", 10),
    qtd_funcionarios: c.quantidadeDeFuncionarios,
    possui_carteira: c.possuiCarteira,
    possui_venda: c.possuiVenda,
  };
}

type Params = {
  broker: Corretor;
};

async function saveBroker(
  params: Params,
  _request: Request,
  context: AppContext,
): Promise<{ id: number } | { error: string }> {
  try {
    const { broker } = params;
    const { supabaseClient } = context;

    const { data, error: _error } = await supabaseClient
      .from("corretor")
      .insert(mapCorretorToRow(broker))
      .select("cd_corretor");

    if (Array.isArray(data) && data.length > 0 && data[0].cd_corretor) {
      return { id: data[0].cd_corretor };
    }

    // deno-lint-ignore no-empty
  } catch {}

  return { error: "Falha ao salvar as informações do corretor" };
}

export default saveBroker;
