import { type Section } from "@deco/deco/blocks";
export interface IColorfullWrapper {
  bgColor: "Laranja" | "Roxo" | "Rosa" | "Cinza";
  sections: Section[];
}
const bgColors = {
  "Laranja": "bg-orange4",
  "Roxo": "bg-darkPurple2",
  "Rosa": "bg-pink6",
  "Cinza": "bg-gray4",
};
const bgColors2 = {
  1: "bg-orange4",
  2: "bg-darkPurple2",
  3: "bg-pink6",
  4: "bg-pink6",
};
function SingleColorfullWrapper(props: ReturnType<typeof loader>) {
  return (
    <>
      <div
        className={`flex items-center flex-col gap-10 py-8 ${
          props.opValue !== null
            ? bgColors2[Number(props.opValue)]
            : bgColors[props.bgColor]
        }`}
      >
        <div className="flex lg:bg-fixed lg:bg-center lg:bg-no-repeat lg:bg-cover flex-col gap-5 lg:gap-10 lg:max-w-[1400px] w-full">
          {props.sections.map((section, index) => (
            <section.Component key={index} {...section.props} />
          ))}
        </div>
      </div>
    </>
  );
}
export default SingleColorfullWrapper;
export const loader = (props: Props, req: Request, _ctx: FnContext) => {
  const op = new URL(req.url).search;
  const params = new URLSearchParams(op);
  const opValue = params.get("op");
  return {
    ...props,
    opValue: opValue,
  };
};
