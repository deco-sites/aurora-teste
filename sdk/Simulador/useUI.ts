import { signal } from "@preact/signals";

const activeOption = signal(1);
const selectedYellowText = signal("Inicie a simulação de sua proposta");
const selectedNormalText = signal("e mude para o plano que anda junto.");
const selectedImage = signal("/Simulador/banner1.png");

const state = {
  activeOption,
  selectedYellowText,
  selectedNormalText,
  selectedImage,
};

export const useUI = () => state;
