interface IFormTitle {
  text: string;
}

export default function FormTitleH2({ text }: IFormTitle) {
  return (
    <span
      className="text-[#a9a9a9] font-semibold text-xl lg:text-base"
      dangerouslySetInnerHTML={{ __html: text }}
    >
    </span>
  );
}
