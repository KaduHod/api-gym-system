import Controller from "./Controller";
import {Request, Response} from 'express'
import db from '../database/prisma/client'


class PeriodizacaoController extends Controller {

    public async all (req:Request, res:Response) {
        const all = await db.periodizacao.findMany({
            include : {
                aluno : true,
                professor : true,
                treinos : {
                    include : {
                        exercicios : true
                    }
                }
            }
        })

        res.send(all)
    }

    public async create (req:Request, res:Response) {
        const professorId:number = req.body.professorId
        const dias:number = req.body.dias
        const nome:string = req.body.nome

        try {
            
            const query:object | null = await db.periodizacao.create({
                data : {
                    nome,
                    dias,
                    professor : {
                        connect : {id : professorId}
                    }
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }

    }

    public async update (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId
        const dias:number = req.body.dias
        const nome:string = req.body.nome

        try {
            
            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId},
                data : {
                    nome,
                    dias
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async delete (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId

        try {
            
            const query:object | null = await db.periodizacao.delete({
                where : {id : periodizacaoId}
            })

            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async attachTreino (req:Request, res:Response) {
        const treinosIds:Array<number> = req.body.treinosIds
        const periodizacaoId:number = req.body.periodizacaoId

        try {

            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId},
                data : {
                    treinos : {
                        connect : treinosIds.map( IdTreino => { return {id : IdTreino}} )
                    }
                }
            }) 
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    
    }

    public async detachTreino (req:Request, res:Response) {
        const treinosIds:Array<number> = req.body.treinosIds
        const periodizacaoId:number = req.body.periodizacaoId

        try {

            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId},
                data : {
                    treinos : {
                        disconnect : treinosIds.map( IdTreino => { return {id : IdTreino}} )
                    }
                }
            }) 
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async attachProfessor (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId
        const professorId:number = req.body.professorId

        try {
            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId},
                data : {
                    professor : {
                        connect : {id : professorId}
                    }
                }
            })
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {

            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async detachProfessor (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId

        try {
            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId,},
                data : {
                    professor : {
                        disconnect : true
                    }
                }
            })
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {

            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async attachAluno (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId
        const alunoId:number = req.body.alunoId

        try {
            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId},
                data : {
                    professor : {
                        connect : {id : alunoId}
                    }
                }
            })
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {

            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }

    public async detachAluno (req:Request, res:Response) {
        const periodizacaoId:number = req.body.periodizacaoId

        try {
            const query:object | null = await db.periodizacao.update({
                where : {id : periodizacaoId,},
                data : {
                    aluno : {
                        disconnect : true
                    }
                }
            })
            return res.status(200)
                        .send({message : 'Ok', data :  query})

            
        } catch (error) {

            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    }
    
}
export default new PeriodizacaoController();