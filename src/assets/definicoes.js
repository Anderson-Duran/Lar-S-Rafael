/*export const urlBase = "https://129.146.68.51/aluno5-pfsii/cadastroPaciente/pacients";
export const urlUser = "https://129.146.68.51/aluno5-pfsii/users";*/
export const urlBase = "https://back-fsii.vercel.app/cadastroPaciente/pacients"; 
export const urlUser = "https://back-fsii.vercel.app/users"; 
/* export const urlBase = "http://localhost:4005/cadastroPaciente/pacients"
export const urlUser = "https://localhost:4005/users"; */

const myHeaders = new Headers();
myHeaders.append("Content-type", "application/json");


export const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect:"follow",
};