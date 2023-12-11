import PacientsDBAO from "../Persist/pacientsDBAO.js";


export default class Pacients {

    #cpf;
    #name;
    #responsable;
    #sex;
    #birthDate;
    #zipCode;
    #address;
    #neighborhood;
    #city;
    #state;
    #phone;

    constructor(cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone) {
        this.#cpf = cpf;
        this.#name = name;
        this.#responsable = responsable;
        this.#sex = sex;
        this.#birthDate = birthDate;
        this.#zipCode = zipCode;
        this.#address = address;
        this.#neighborhood = neighborhood;
        this.#city = city;
        this.#state = state;
        this.#phone = phone;
    }

    get cpf() {
        return this.#cpf
    }

    set cpf(newCpf) {
        this.#cpf = newCpf;
    }

    get name() {
        return this.#name
    }

    set name(newName) {
        this.#name = newName;
    }

    get responsable() {
        return this.#responsable
    }

    set responsable(newRes) {
        this.#responsable = newRes;
    }

    get sex() {
        return this.#sex
    }

    set sex(newGender) {
        this.#sex = newGender;
    }

    get birthDate() {
        return this.#birthDate
    }

    set birthDate(newDate) {
        this.#birthDate = newDate;
    }

    get zipCode() {
        return this.#zipCode
    }

    set zipCode(newZip) {
        this.#zipCode = newZip;
    }

    get address() {
        return this.#address
    }

    set address(newAddress) {
        this.#address = newAddress;
    }

    get neighborhood() {
        return this.#neighborhood
    }

    set neighborhood(newNeighbor) {
        this.#neighborhood = newNeighbor;
    }

    get city() {
        return this.#city
    }

    set city(newCity) {
        this.#city = newCity;
    }

    get state() {
        return this.#state
    }

    set state(newState) {
        this.#state = newState;
    }

    get phone() {
        return this.#phone
    }

    set phone(newPhone) {
        this.#phone = newPhone;
    }

    toJSON() {
        return {
            cpf: this.#cpf,
            name: this.#name,
            responsable: this.#responsable,
            sex: this.#sex,
            birthDate: this.#birthDate,
            zipCode: this.#zipCode,
            address: this.#address,
            neighborhood: this.#neighborhood,
            city: this.#city,
            state: this.#state,
            phone: this.#phone
        }
    }

    async create() {
        const pacientDB = new PacientsDBAO();
        await pacientDB.savePacient(this);
        console.log(`Paciente ${this.#name} `);
    }

    async update() {
        const pacientDB = new PacientsDBAO();
        pacientDB.updatePacient(this);
        console.log(`Paciente ${this.#name} atualizado com sucesso`);
    }

    async exclude() {
        const pacientDB = new PacientsDBAO();
        pacientDB.deletePacient(this.cpf);
        console.log(`Paciente ${this.name} com CPF:${this.cpf} excluido com sucesso!`);
    }

    async consult(term) {
        const pacientDB = new PacientsDBAO();
        const result = await pacientDB.consultPacient(term);
        return result;
    }
}

/* 
const newPac = new Pacients(
    '344.405.878-01',
    'Anderson Serafim Duran',
    'Himself',
    'Masculino',
    '1988-05-15',
    '19065-780',
    'Rua Geremia Anhasco, 182 Apto 112 Torre Paris',
    'Vale Verde', 'Presidente Prudente',
    'SP',
    '(18) 99607-8444');
const newPac1 = new Pacients(
    "123.456.789-01",
    "Maria da Silva",
    "Spouse",
    "Feminino",
    "1990-10-20",
    "19070-000",
    "Rua das Flores, 123",
    "Centro",
    "Presidente Prudente",
    "SP",
    "(18) 98765-4321")
const newPac2 = new Pacients("987.654.321-99",
    "João Santos",
    "Son",
    "Masculino",
    "2010-03-12",
    "19050-200",
    "Avenida das Árvores, 456",
    "Jardim Primavera",
    "Presidente Prudente",
    "SP",
    "(18) 99999-8888")
const newPac3 = new Pacients("111.222.333-44",
    "Ana Oliveira",
    "Friend",
    "Feminino",
    "1985-12-01",
    "19035-100",
    "Rua dos Campos, 789",
    "Vila Industrial",
    "Presidente Prudente",
    "SP",
    "(18) 12345-6789")
const newPac4 = new Pacients("555.666.777-88",
    "Pedro Souza",
    "Brother",
    "Masculino",
    "1995-07-18",
    "19020-050",
    "Travessa dos Sonhos, 987",
    "Vila Marcondes",
    "Presidente Prudente",
    "SP",
    "(18) 98765-4321")

const list =[newPac, newPac1, newPac2, newPac3, newPac4]
 */
