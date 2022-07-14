import Controller from "./Controller";
import { Request, Response } from 'express';
import db from '../database/prisma/client';

class ProfessorController extends Controller{

    public async professores(req:Request, res:Response){
        try {
            const professores:object = await db.professor.findMany({
                include : {
                    profile : true,
                    alunos : {
                        include : {
                            profile : true
                        }
                    }
                }
            })

            return res.status(200)
                    .send({message: 'Ok', professores})
        } catch (error) {
            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        }
        
    }

    public async create(req:Request, res:Response){
        try {
            const data = await db.professor.create({data : {}})

            return res.status(200)
                        .send({message:'OK', data})
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        }
    }

    public async delete(req:Request, res:Response){
        const professorId:number = parseInt(req.body.professorId)

        try {
            const del:object = await db.professor.delete({
                where: {id : professorId}
            })

            return res.status(200)
                        .send({message:'OK', data:del})
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        }
    }

    public async attachAluno(req:Request, res:Response){

        const professorId:number = parseInt(req.body.professorId)
        const alunoId:number = parseInt(req.body.alunoId)

        try {
            const data:object = await db.professor.update({
                where : {id : professorId},
                data : {
                    alunos : {
                        connect : {id : alunoId}
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Aluno adicionado a professor', data})
        } catch (error) {
            
            return res.status(500)
                        .send({message:'Não foi possível adicionar professor ao aluno', error})
        }
    }

    public async detachAluno (req:Request, res:Response){

        const professorId:number = parseInt(req.body.professorId)
        const alunoId:number = parseInt(req.body.alunoId)

        try {
            const data:object | null = await db.professor.update({
                where : {id : professorId},
                data : {
                    alunos : {
                        disconnect : [{id : alunoId}]
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data})
        } catch (error) {
                        
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async alunos (req:Request, res:Response){
        
        const professorId:number = parseInt(req.params.id)

        try {
            const data:object | null = await db.professor.findFirst({
                where : { id : professorId },
                include : {
                    alunos : {
                        include : {
                            profile : true
                        }
                    },
                }
                
            })

            return res.status(200)
                        .send({ message: 'Ok', data })
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        } 
    }

    public async attachProfile (req:Request, res:Response){
        const professorId:number = parseInt(req.body.professorId)
        const profileId:number = parseInt(req.body.profileId)

        try {   
            const data:object | null = await db.professor.update({
                where : { id : profileId },
                data : {
                    profile : {
                        connect : {id : professorId}
                    }
                }

            })

            return res.status(200)
                        .send({ message: 'Ok', data : data })
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        } 
        
    }

    public async detachProfile (req:Request, res:Response){
        const professorId:number = parseInt(req.body.professorId)
        
        try {   
            const data:object | null = await db.professor.update({
                where : { id : professorId },
                data : {
                    profile : {
                        disconnect : true
                    }
                }

            })

            return res.status(200)
                        .send({ message: 'Ok', data : data })
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        } 
    }
}

export default new ProfessorController();