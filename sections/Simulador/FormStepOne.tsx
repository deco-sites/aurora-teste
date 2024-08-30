import type { ImageWidget } from "apps/admin/widgets.ts";
import OptionButton from "../../islands/Simulador/first-step-opt-btn.tsx";
import FirstStepImage from "../../islands/Simulador/first-step-img.tsx";
import { options } from "../../helpers/Simulador/form-step1-menu-options.ts";
import { handleNextStepFirstStep } from "../../sdk/Simulador/FirstStep/checkFirstStep.ts";
import NextStepBtn from "site/islands/Simulador/next-step-btn.tsx";

export interface CTA {
  text: string;
  icon?: ImageWidget;
  link: string;
}

export interface Props {
  background: {
    src: ImageWidget;
    alt: string;
  };
  buttonNextStep: CTA;
}

export default function FormStepOne() {
  return (
    <>
      <div className="flex justify-center lg:width-calc mt-32">
        <div className="flex lg:w-[1400px] relative">
          <span
            className="absolute bottom-0 left-[-18px] text-[10px] font-sora text-gray3" // Ajuste a posição conforme necessário
            style={{
              "writing-mode": "vertical-lr",
              "transform": "rotate(180deg)",
            }}
          >
            *Contratação de plano coletivo por adesão via administrador de
            benefícios.
          </span>

          <div className="flex flex-col gap-6 lg:flex-row">
            <FirstStepImage />
            <div className="w-full bg-white rounded-2xl p-8 lg:w-1/4 lg:bg-gray1">
              <span className="text-[#8b8b8b] font-sora font-bold">
                Antes de começarmos, precisamos saber um pouco mais sobre você:
              </span>

              <div className="flex flex-col gap-4 mt-8">
                {options?.map((op) => <OptionButton op={op} />)}
              </div>
              <div className="flex justify-center lg:justify-end py-8">
                <NextStepBtn
                  options={options}
                  executionFunc={handleNextStepFirstStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
