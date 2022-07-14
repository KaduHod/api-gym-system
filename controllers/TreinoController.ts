import Controller from "./Controller";
import db from '../database/prisma/client';
import { Request, Response } from 'express';

class TreinoController extends Controller{
    public async all (req:Request, res:Response) {
        const query:object | null = await db.treino.findMany({
            include : {
                exercicios : true
            }
        })

        res.send({message : 'Ok', treinos : query})
    }

    public async treinos (req:Request, res:Response){
        const professorId:number = parseInt(req.params.professorid)
        
        try {   
            const data:object | null = await db.treino.findMany({
                where : { professorId },
                include : {
                    exercicios : {
                        include: {
                            exercicio : true
                        }
                    }
                }
            })

            console.log(data)

            return res.status(200)
                        .send({ message: 'Ok', data })
        } catch (error) {

            return res.status(500)
                        .send({message: 'Errooooo', error})
        } 
    }

    public async create (req:Request, res:Response) {
        const descricao:string = req.body.descricao
        const nome:string = req.body.nome
        const aquecimento:string = req.body.aquecimento
        const exercicios:Array<any> =req.body.exercicios
        

        try {
            
            const treino:object | null = await db.treino.create({
                data : {
                    nome,
                    descricao,
                    aquecimento,
                    exercicios : {
                        createMany : {
                            data : exercicios
                        }
                    }
                }
            }) 
            
            return res.status(200)
                        .send({message: 'Ok', treino }) 

            
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível criar o treino!', error})
        }
    }
   public async  createTreinoEExercicios(req:Request, res:Response) {
    const descricao:string = req.body.descricao
    const nome:string = req.body.nome
    const aquecimento:string = req.body.aquecimento
    const exercicios:Array<object> = req.body.exercicios
    

    /* try {
        
        const treino:object | null = await db.treino.create({
            data : {
                nome,
                descricao,
                aquecimento,
            }
        })

        return res.status(200)
                    .send({message: 'Ok', treino }) 
    } catch (error) {
    
        return res.status(500)
                    .send({message:'Não foi possível criar o treino!', error})
    } */
   }

    public async update (req:Request, res:Response) {
        const descricao:string = req.body.descricao
        const nome:string = req.body.nome
        const aquecimento:string = req.body.aquecimento
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    descricao,
                    nome,
                    aquecimento
                }
            })
            return res.status(200)
                        .send({message: 'Ok', data : query }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível editar o treino!', error})
        }
    }
    

    public async delete (req:Request, res:Response) {
        const treinoId:number = req.body.treinoId

        try {
            const query:object = await db.treino.delete({
                where : {
                    id : treinoId
                }
            })    

            return res.status(200)
                        .send({message: 'Ok', data : query }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível deletar o treino!', error})
        }
    }

    public async attachToPeriodizacao (req:Request, res:Response) {
        const treinoId:number = req.body.treinoId
        const periodizacaoId:number = req.body.periodizacaoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    periodizacao : {
                        connect : {id : periodizacaoId}
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data : query }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível adicionar o treino a uma periodizacao!', error})
        }
    }

    public async detachFromPeriodizacao (req:Request, res:Response) {
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    periodizacao : {
                        disconnect : true
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data : query }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível desconectar o treino da periodizacao!', error})
        }
    }

    public async attachToProfessor (req:Request, res:Response) {
        const professorId:number = req.body.professorId
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    professor : {
                       connect : {id : professorId}
                    }
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data : query })
        } catch (error) {
            return res.status(500)
                        .send({message:'Não foi possível conectar professor com treino!', error})
        }
    }

    public async detachFromProfessor (req:Request, res:Response) {
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    professor : {
                       disconnect : true
                    }
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data : query })
        } catch (error) {
            return res.status(500)
                        .send({message:'Não foi possível desconectar professor com treino!', error})
        }
    }

    public async attachExercicio (req:Request, res:Response) {
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    exercicios : {
                       connect : [{id : exercicioDoTreinoId}]
                    }
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data : query })
        } catch (error) {
            return res.status(500)
                        .send({message:'Não foi possível conectar exercicio com treino!', error})
        }
    }

    public async detachFromExercicio (req:Request, res:Response) {
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId
        const treinoId:number = req.body.treinoId

        try {
            const query:object | null = await db.treino.update({
                where : {id : treinoId},
                data : {
                    exercicios : {
                       disconnect : [{id : exercicioDoTreinoId}]
                    }
                }
            })

            return res.status(200)
                        .send({message : 'Ok', data : query })
        } catch (error) {
            return res.status(500)
                        .send({message:'Não foi possível conectar exercicio com treino!', error})
        }
    }
}

export default new TreinoController();