import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      keyframes: {
        spriteAnimation: {
          "0%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite1.png")',
          },
          "5%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite2.png")',
          },
          "10%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite3.png")',
          },
          "20%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite4.png")',
          },
          "30%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite5.png")',
          },
          "45%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite6.png")',
          },
          "50%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite7.png")',
          },
          "60%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite8.png")',
          },
          "70%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite9.png")',
          },
          "85%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite10.png")',
          },
          "90%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite11.png")',
          }, // Mantém a última imagem
          "100%": {
            backgroundImage:
              'url("/Simulador/ReceiveContactBtnSprites/receive-contact-btn-sprite12.png")',
          },
        },
      },
      animation: {
        sprite: "spriteAnimation 1s steps(12, end) infinite",
      },
      colors: {
        orange1: "#FF8461",
        orange2: "#FFDCD2",
        orange3: "#F99477",
        orange4: "#FA7651",
        orange5: "#E66F4D",
        orange6: "#FB7557",
        orange7: "#FFB9A6",
        pink1: "#FF50A4",
        pink2: "#ED137B",
        pink3: "#F85883",
        pink4: "#FF5CA3",
        pink5: "#FF5B6B",
        pink6: "#FB2089",
        pink7: "#E63B90",
        pink8: "#D2146F",
        pink9: "#F471AF",
        gray1: "#FAFAFA",
        gray2: "#767676",
        gray3: "#A8A8A8",
        gray4: "#F5F5F5",
        gray5: "#F2F2F2",
        gray6: "#DCDCDC",
        gray7: "#727272",
        gray8: "#B8B8B8",
        gray9: "#D9D9D9",
        gray10: "#ACACAC",
        gray11: "#8A8A8A",
        gray12: "#CACACA",
        gray13: "#7B7B7B",
        gray14: "#C1C1C1",
        gray15: "#999999",
        aquagreen: "#72CCCC",
        aquagreen2: "#5DD6D6",
        aquagreen3: "#59B7B8",
        green: "#70FF00",
        yellow: "#FCFF73",
        yellow2: "#E3EA5F",
        yellow3: "#F4F76F",
        yellow4: "#FDFFAB",
        darkPurple: "#B245F4",
        darkPurple2: "#9D29E4",
        purple: "#B299E8",
        purple2: "#9984D4",
        purple3: "#A53EEB",
        purple4: "#D08FF8",
        red: "#ED1313",
      },
      height: {
        "banner-height": "calc(100vh - 250px)",
      },
      rotate: {
        "270": "270deg",
      },
      boxShadow: {
        "outline-orange1": "0 0 0 2px rgba(255, 165, 0, 1)",
        "outline-orange5": "0 0 0 4px rgba(230, 111, 77, 1)",
        "outline-pink7": "0 0 0 4px rgba(230, 59, 144, 1)",
        "outline-purple2": "0 0 0 4px rgba(153, 132, 212, 1)",
        "outline-aquagreen3": "0 0 0 4px rgba(89, 183, 184, 1)",
        "outline-yellow2": "0 0 0 4px rgba(277, 234, 95, 1)",
      },
    },
    fontFamily: {
      sora: ["Sora", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
};
