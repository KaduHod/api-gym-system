import Controller from "./Controller";
import { Request, Response } from 'express';
import db from '../database/prisma/client';

class AlunoController extends Controller{

    public async alunos(req:Request, res:Response){
        try {
            const data:object = await db.aluno.findMany({
                include : {
                    profile : true,
                    professores : {
                        include : {
                            profile : true
                        }
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data})
        } catch (error) {
            return res.status(500)
                        .send({message:'Inernal Server Error', error})
        }
    }

    public async aluno(req:Request, res:Response){

        const id:number = parseInt(req.params.id);
        
        try {
            const data:object | null    = await db.aluno.findFirst({ 
                where : {id},
                include : { 
                    profile : true,
                    professores : { 
                        include : {
                            profile : true
                        }
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

    public async create(req:Request, res:Response){
        try {
            const aluno:object = await db.aluno.create({data : {}})

            return res.status(201)  
                        .send({message: 'Ok', data : aluno})
        } catch (error) {

            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async update(req:Request, res:Response){

        const alunoId:number = parseInt(req.body.alunoId)
        const periodizacao:string = req.body.periodizacao

        const data:object = {
             periodizacao: periodizacao
        }

        try {
            /* const query = await db.aluno.update({
                where : { id : alunoId }
                //data
            })
 */
            return res.status(201)  
                        .send({message: 'Ok', data })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async delete(req:Request, res:Response){
        const alunoId:number = parseInt(req.body.alunoId)

        try {
            const data:object = await db.aluno.delete({ where : {id : alunoId} })

            return res.status(201)  
                        .send({message: 'Ok', data })

        } catch (error) {
            return res.status(500)
                        .send({message:'Inertnal Server Error', error })
        }
    }

    public async attachProfessor(req:Request, res:Response){

        const professorId:number = parseInt(req.body.professorId)
        const alunoId:number     = parseInt(req.body.alunoId)

        try {
            const query:object = await db.aluno.update({
                where : {id : alunoId},
                data  : {
                    professores : {
                        connect : [{ id : professorId}]
                    }   
                }
            })
            return res.status(200)
                        .send({message: 'Ok', data : query})
        } catch (error) {
            return res.status(500)
                        .send({message:'Inertnal Server Error', error})
        }
    }
    
    public async  detachProfessor(req:Request, res:Response){

        const alunoId:number     = parseInt(req.body.alunoId)
        const professorId:number = parseInt(req.body.professorId)

        try {
            const query:object = await db.aluno.update({
                where : { id : alunoId},
                data  : {
                    professores : {
                        disconnect : [{id : professorId}]
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data : query})
        } catch (error) {

            return res.status(500)
                        .send({message:'Inertnal Server Error', error})
        }
    }

    public async attachProfile(req:Request, res:Response){

        const profileId:number = parseInt(req.body.profileId)
        const alunoId:number   = parseInt(req.body.alunoId)

        try {
            const query:object = await db.aluno.update({
                where : {id : alunoId},
                data  : {
                    profile : {
                        connect : { id : profileId }
                    }
                }
            })
            return res.status(200)
                        .send({message: 'Ok', data : query})
        } catch (error) {
            return res.status(500)
                        .send({message:'Inertnal Server Error', error})
        }
    }

    public async detachProfile(req:Request, res:Response){

        const alunoId:number   = parseInt(req.body.alunoId)

        try {
            const query:object = await db.aluno.update({
                where : {id : alunoId},
                data  : {
                    profile : {
                        disconnect : true
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data : query})
        } catch (error) {
            return res.status(500)
                        .send({message:'Inertnal Server Error', error})
        }
    }

}

export default new AlunoController();