import { environment } from "src/environments/environment";


export const endpoints = {
    auth: {
        login: environment.authUrl,
        infoUser: environment.apiUrl + 'user'
    },
    archivo: {
        guardarArchivo: environment.apiUrl + 'archivo',
        crudArchivo: environment.apiUrl + 'archivo/',
        getAllArchivos: environment.apiUrl + 'archivos/',
        aprobarArchivo: environment.apiUrl + 'aprobacion/',
    },
    catalogo: {
        getAllAduanas: environment.apiUrl + 'aduana',
        getDepartamentos: environment.apiUrl + 'departamentos',
        getMunicipios: environment.apiUrl + 'municipios/',
    }
};

