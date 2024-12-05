import RazonSocial from "../types/RazonSocial";
import UnidadDeNegocio from "../types/UnidadDeNegocio";

const storagePrefix = "onaxis_web_erp_";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
  setRazonesSociales: (razonesSociales: RazonSocial[]) => {
    window.localStorage.setItem(
      `${storagePrefix}razonesSociales`,
      JSON.stringify(razonesSociales)
    );
  },
  //TODO: Hacer función que regrese las razones sociales a partir de los ids guardados en localstorage
  getRazonesSociales: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}razonesSociales`) as string
    );
  },
  setUnidadesDeNegocio: (unidadesDeNegocio: UnidadDeNegocio[]) => {
    window.localStorage.setItem(
      `${storagePrefix}unidadesDeNegocio`,
      JSON.stringify(unidadesDeNegocio)
    );
  },
  //TODO: Hacer función que regrese las razones sociales a partir de los ids guardados en localstorage
  getUnidadesDeNegocio: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}unidadesDeNegocio`) as string
    );
  },
};

export default storage;
