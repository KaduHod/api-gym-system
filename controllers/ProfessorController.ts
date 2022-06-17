import Controller from "./Controller";
import { Request, Response } from 'express';
import db from '../database/prisma/client';

class ProfessorController extends Controller{


    public async create(res:Response){
        try {
            const data = await db.professor.create({data : {}})

            return res.status(200)
                        .send({message:'OK', data})
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        }
    }

    public async attachAluno(req: Request, res: Response){
        const professorId:number = parseInt(req.body.professorId)
        const alunoId:number = parseInt(req.body.alunoId)

        try {
            const data = await db.professor.update({
                where : {id : professorId},
                data : {
                    alunos : {
                        connect : [{id : alunoId}]
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Aluno adicionado a professor', data})
        } catch (error) {
            
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async unlinkAluno (req: Request, res:Response){
        const professorId:number = parseInt(req.body.professorId)
        const alunoId:number = parseInt(req.body.alunoId)

        try {
            const data = await db.professor.update({
                where : {id : professorId},
                data : {
                    alunos : {
                        disconnect : [{id : alunoId}]
                    }
                }
            })

            return res.status(200)
                        .send({message: 'ok', data})
        } catch (error) {
                        
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async alunos(req: Request, res:Response){
        const professorId:number = parseInt(req.body.professorId)

        try {
            const data = await db.professor.findMany({
                where : { id : professorId },
                include : {
                    alunos : true
                }
                
            })

            return res.status(200)
                        .send({ message: 'Ok', data : data.alunos })
        } catch (error) {

            return res.status(500)
                        .send({message: 'Internal Server Error', error})
        }
    }

    
}

export default new ProfessorController();