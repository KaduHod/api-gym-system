import Controller from "./Controller";
import db from '../database/prisma/client';
import { Request, Response } from 'express';

class ExercicioController extends Controller{
    public async all (req:Request, res:Response) {
        const exercicios:object | null = await db.exercicio.findMany()

        res.send(exercicios)
    }

    public async create (req:Request, res:Response) {
        const nome:string = req.body.nome
        const descricao:string = req.body.descricao
        const video:string = req.body.video
        const imagem:string = req.body.imagem
        const professorId:number = req.body.criadorId

        try {
            const query = await db.exercicio.create({
                data : {
                    nome,
                    descricao,
                    video,
                    imagem,
                    professorId
                }
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async update (req:Request, res:Response) {
        const nome:string = req.body.nome
        const descricao:string = req.body.descricao
        const video:string = req.body.video
        const imagem:string = req.body.imagem
        const professorId:number = req.body.professorId
        const exercicioId:number = req.body.exercicioId

        try {
            const query:object | null = await db.exercicio.update({
                where : {id : exercicioId},
                data : {
                    nome,
                    descricao,
                    video,
                    imagem,
                    professorId
                }
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async delete (req:Request, res:Response) {
        const exercicioId:number = req.body.exercicioId

        try {
            const query:object | null = await db.exercicio.delete({
                where : {id : exercicioId}
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }

    }

    public async attachToTreino (req:Request, res:Response) {
        const trienoId:number = req.body.trienoid
        const exercicioId:number = req.body.exercicioId

        try {
            const query:object | null = await db.exercicio.update({
                where : {id : exercicioId},
                data : {
                    treinos : {
                        connect : [{id : trienoId}]
                        
                    }
                }
            })
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async detachFromTreino (req:Request, res:Response) {
        const trienoId:number = req.body.trienoid
        const exercicioId:number = req.body.exercicioId

        try {
            const query: any = await db.exercicio.update({
                where : {id : exercicioId},
                data : {
                    treinos : {
                        disconnect : {id : trienoId} 
                    }
                }
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async attachToProfessor (req:Request, res:Response) {
        const professorId:number = req.body.professorId
        const exercicioId:number = req.body.exercicioId

        try {
            const query:object | null = await db.exercicio.update({
                where : {id : exercicioId},
                data : {
                    professor : {
                        connect : {id : professorId}
                        
                    }
                }
            })
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async detachFromProfessor (req:Request, res:Response) {
        const professorId:number = req.body.professorId
        const exercicioId:number = req.body.exercicioId

        try {
            const query:object | null = await db.professor.update({
                where : {id : professorId},
                data : {
                    exercicios : {
                        disconnect : {id : exercicioId}
                    }
                }
            })
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }
}

export default new ExercicioController();