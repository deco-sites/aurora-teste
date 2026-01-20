export type Lead = {
  cd_lead?: number,
  nome: string;
  razao_social: string | null;
  cpf_cnpj: string | null;
  cidade: number;
  estado: string;
  telefone: string;
  email: string;
  cd_plano: number | null;
  somente_titular: boolean | null;
  possui_plano: boolean | null;
  cd_tab_preco: number | null;
  outra_pessoa: boolean | null;
  cd_faixa?: number | null;
  data_lead?: Date | null;
  cd_modalidade: LeadModality,
  qtd_vidas?: number | null;
};

export enum LeadModality {
  ForFormYouAndYourFamily = 1,
  ForFormMEIOrEnterprisesWith1to29Lifes = 2,
  ForFormEnterprisesWith30to99Lifes = 3,
  ForFormEnterprisesWithMoreThan100Lifes = 4,
  Others = 5,
}
