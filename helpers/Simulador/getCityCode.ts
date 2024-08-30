import { invoke } from "../../runtime.ts";

export async function getCityCode(city) {
    const city_code = await invoke.site.actions.getCityCode({
        selectedCity: city,
    });
    //console.log("Código da cidade selecionada", city_code.data[0].cd_cidade);
    return city_code.data[0].cd_cidade;
}
