import { useFormSteps } from "../../sdk/Simulador/useFormSteps.ts";
import { useUI } from "../../sdk/Simulador/useUI.ts";

export default function ProgressTracker({ currentStep }) {
  const { changeStep } = useFormSteps();
  const { activeOption } = useUI();

  const steps = [
    {
      title: (
        <p>
          Tipo de <br /> Simulação
        </p>
      ),
      status: true,
      step: 1,
    }, //true é ativo e false é inativo
    {
      title: {
        op1: (
          <p>
            Sobre <br /> você
          </p>
        ),
        op2: (
          <p>
            Sobre sua <br /> empresa
          </p>
        ),
      },
      status: true,
      step: 2,
    },
    { title: <p>Beneficiários</p>, status: false, step: 3 },
    {
      title: (
        <p>
          Escolha <br /> seu plano
        </p>
      ),
      status: false,
      step: 4,
    },
    { title: <p>Envio</p>, status: false, step: 5 },
  ];

  const updatedSteps = steps.map((step) => ({
    ...step,
    status: step.step <= currentStep,
  }));

  return (
    <div className="flex items-start py-6 lg:pb-6 lg:pr-6 mt-6">
      {updatedSteps.map((step, index) => (
        //Antes do step.status === true eu estava usando index + 1 <= currentStep
        <div
          key={index}
          className="relative flex flex-col lg:flex-1 max-w-60"
        >
          <button
            disabled={!step.status}
            onClick={() => changeStep(step.step, "specificStep")}
            className={`w-6 h-6 rounded-full flex items-center justify-center z-40 ${
              step.status === true
                ? "bg-orange1 text-white"
                : "bg-orange2 text-orange2"
            }`}
          >
          </button>
          <div
            className={`mt-2 pr-12 ${
              step.status === true ? "text-orange1" : "text-orange2"
            }`}
          >
            <span className="font-semibold text-nowrap">
              {index === 1 && typeof step.title === "object"
                ? activeOption.value === 1 ? step.title.op1 : step.title.op2
                : step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`absolute top-3 w-full h-px 
              ${step.status === true ? "bg-orange1" : "bg-orange2"}
              ${
                step.status === true &&
                  updatedSteps[index + 1].status === false
                  ? "bg-gradient-to-r from-orange1 to-orange2"
                  : ""
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
