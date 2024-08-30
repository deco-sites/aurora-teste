interface IFormTitle {
  text1: string;
  text2?: string;
}

export default function FormTitleH1({ text1, text2 }: IFormTitle) {
  return (
    <span className="text-gray2 font-semibold text-xl lg:text-base my-8 font-sora">
      {text1} <br /> {text2}
    </span>
  );
}
