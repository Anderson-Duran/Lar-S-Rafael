import MedicineDBAO from "../Persist/medicineDBAO.js";


export default class Medicine {

    #id;
    #cpf;
    #medicineName;
    #medicineDosage;
    #medicineHours;
    #medicineHours2;
    #medicineHours3;
    #medicineDateStart;
    #medicineDateEnd;
    #medicineObservation;


    constructor(id, cpf, medicineName, medicineDosage, medicineHours, medicineHours2, medicineHours3, medicineDateStart, medicineDateEnd, medicineObservation) {
        this.#id = id;
        this.#cpf = cpf;
        this.#medicineName = medicineName;
        this.#medicineDosage = medicineDosage;
        this.#medicineHours = medicineHours;
        this.#medicineHours2 = medicineHours2;
        this.#medicineHours3 = medicineHours3;
        this.#medicineDateStart = medicineDateStart;
        this.#medicineDateEnd = medicineDateEnd;
        this.#medicineObservation = medicineObservation;
    }

    get id() {
        return this.#id
    }

    set id(newId) {
        this.#id = newId
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(newCpf) {
        this.#cpf = newCpf
    }

    get medicineName() {
        return this.#medicineName
    }

    set medicineName(newName) {
        this.#medicineName = newName
    }

    get medicineDosage() {
        return this.#medicineDosage;
    }

    set medicineDosage(dosage) {
        this.#medicineDosage = dosage;
    }

    get medicineHours() {
        return this.#medicineHours;
    }

    set medicineHours(hours) {
        this.#medicineHours = hours;
    }

    get medicineHours2() {
        return this.#medicineHours2;
    }

    set medicineHours2(hours2) {
        this.#medicineHours2 = hours2;
    }

    get medicineHours3() {
        return this.#medicineHours3;
    }

    set medicineHours3(hours3) {
        this.#medicineHours3 = hours3;
    }

    get medicineDateStart() {
        return this.#medicineDateStart;
    }

    set medicineDateStart(dateStart) {
        this.#medicineDateStart = dateStart;
    }

    get medicineDateEnd() {
        return this.#medicineDateEnd;
    }

    set medicineDateEnd(dateEnd) {
        this.#medicineDateEnd = dateEnd;
    }

    get medicineObservation() {
        return this.#medicineObservation;
    }

    set medicineObservation(observation) {
        this.#medicineObservation = observation;
    }

    toJSON() {
        return {
            id: this.#id,
            cpf: this.#cpf,
            medicineName: this.#medicineName,
            medicineDosage: this.#medicineDosage,
            medicineHours: this.#medicineHours,
            medicineHours2: this.#medicineHours2,
            medicineHours3: this.#medicineHours3,
            medicineDateStart: this.#medicineDateStart,
            medicineDateEnd: this.#medicineDateEnd,
            medicineObservation: this.#medicineObservation
        };
    }


    async create() {
        const medicineDBAO = new MedicineDBAO();
        const [name, id] = await medicineDBAO.saveMedicine(this);
        console.log(`Medicine ${this.#medicineName} with ID: ${id} successfully saved for ${name}! `)
    }

    async update() {
        const medicineDBAO = new MedicineDBAO();
        const name = await medicineDBAO.updateMedicine(this);
        console.log(`Medicine successfully updated !`);
        return name
    }

    async consult() {
        const medicineDBAO = new MedicineDBAO();
        const list = await medicineDBAO.consultMedicines(this);
        return list
    }

    async delete() {
        const medicineDBAO = new MedicineDBAO();
        const name = await medicineDBAO.deleteMedicine(this)
        console.log(`You have deleted ${name} medicine`)
        return name;
    }
}


