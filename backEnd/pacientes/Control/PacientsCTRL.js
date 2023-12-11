import { PrismaClient } from '@prisma/client';
import Pacients from '../Models/pacientes.js';

export default class PacientsCTRL {

    savePacient(req, res) {
        res.type('application/json');

        if (req.method === 'POST' && req.is('application/json')) {
            const data = req.body;
            const { cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone } = data;

            if (cpf && name && responsable && sex && birthDate && zipCode && address && neighborhood && city && state && phone) {
                const pacient = new Pacients(cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone);

                pacient.create().then(() => {
                    res.status(200).json({
                        status: true,
                        message: `Paciente ${name} salvo com sucesso!`
                    })
                }).catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: err.message
                    })
                })
            }
            else {
                res.status(400).json({
                    status: false,
                    message: `Informe todos os dados do paciente conforme dados solicitados!`
                })
            }
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Método não permitido ou paciente não fornecido no formato JSON! Consulte a documentação da API'
            })
        }
    }

    deletePacient(req, res){
        res.type('application/json');

        if(req.method === 'DELETE' && req.is('application/json')){
            const { cpf, name } = req.body; 
            const pacient = new Pacients(cpf, name);
            pacient.exclude().then(()=>{
                res.status(200).json({
                    status:true,
                    message:`Paciente ${name} excuído com sucesso!`
                })
            }).catch((err)=>{
                res.status(500).json({
                    staus:false,
                    message:err.message
                })

            }) 
        }
        else{
            res.status(400).json({
                status:false,
                message:'Método não permitido ou dados fornecidos em formato incompatível!'
            })
        }
    }

    updatePacient(req, res){
        res.type('application/json');

        if(req.method === 'PUT' && req.is('application/json')){
            const { cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone } = req.body;
            const pacient = new Pacients(cpf, name, responsable, sex, birthDate, zipCode, address, neighborhood, city, state, phone);
            pacient.update().then(()=>{
                res.status(200).json({
                    status:true,
                    message:`Paciente ${name} atualizado com sucesso!`
                })
            }).catch((err)=>{
                res.status(500).json({
                    status:false,
                    message:err.message
                })
            })
        }
        else{
            res.status(400).json({
                status:false,
                message:'Método não permitido ou paciente não fornecido no formato JSON! Consulte a documentação da API'
            })
        }
    }

    consultPacient(req, res){
        res.type('application/json');

        if(req.method === 'GET'){
            const pacient = new Pacients();
            pacient.consult('').then((listPacients)=>{
                res.status(200).json(listPacients);
            }).catch((err)=>{
                res.status(500).json({
                    status:false,
                    message:err.message
                })
            })
        }
        else{
            res.status(400).json({
                staus:false,
                message:'Método não permitido ou paciente não fornecido no formato JSON! Consulte a documentação da API'
            })
        }
    }

    async consultPrisma(req,res){

        if(req.method === 'GET'){
            const prisma = new PrismaClient();

            const pacient = await prisma.pacients.findMany();
            return res.status(200).json(pacient);
        }
        
    }

}