import Controller from "./Controller";
import db from '../database/prisma/client';
import { Request, Response } from 'express';

class ExercicioController extends Controller{
    public async all (req:Request, res:Response) {
        try {
            const exercicios:object | null = await db.exercicioDoTreino.findMany({
                include :{
                    exercicio : true
                }
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data:exercicios })

        } catch (error) {
            return res.status(500)
                        .send({message:'Não foi possível resgatar os exercicios', error})
        }
    }

    public async create (req:Request, res:Response) {
        const treinoId:number = parseInt(req.body.treinoId)
        const exercicioId:number = parseInt(req.body.exercicioId)
        const series: number = parseInt(req.body.series)
        const repeticoes: number = parseInt(req.body.repeticoes)
        const tipoSeries:string = req.body.tipoSeries
        const tipoRepeticoes:string = req.body.tipoRepeticoes        

        try {
            const query = await db.exercicioDoTreino.create({
                data : {
                    series,
                    repeticoes,
                    tipoSeries,
                    tipoRepeticoes,
                    exercicio : {
                        connect : {id : exercicioId}
                    },
                    treino : {
                        connect : {id : treinoId}
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
    public async createMany (req:Request, res:Response) {
        console.log(req.body)
        const exerciciosId:Array<number> = req.body.exerciciosId
        const series:Array<number> = req.body.series
        const repeticoes:Array<number> = req.body.repeticoes
        const tipoSeries:Array<string> = req.body.tipoSeries
        const tipoRepeticoes:Array<string> = req.body.tipoRepeticoes

        let arrExerciciosDoTreino:Array<any> = exerciciosId.map( (exercicioId, index) => {
            return {
                exercicioId,
                series : series[index],
                repeticoes: repeticoes[index],
                tipoSeries: tipoSeries[index],
                tipoRepeticoes: tipoRepeticoes[index]
                
            }
        })

        console.log(arrExerciciosDoTreino[0])
        console.log(typeof(arrExerciciosDoTreino))
        

        try {
            const query = await db.exercicioDoTreino.createMany({
                data : arrExerciciosDoTreino
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Erro ao criar Exercicios do treino', error})
        }
    }

    public async update (req:Request, res:Response) {
        const exercicioId:number = parseInt(req.body.exercicioId)
        const series: number = parseInt(req.body.series)
        const repeticoes: number = parseInt(req.body.repeticoes)
        const tipoSeries:string = req.body.tipoSeries
        const tipoRepeticoes:string = req.body.tipoRepeticoes
        const exercicioDoTreinoId:number = parseInt(req.body.exercicioDoTreino)
        

        try {
            const query = await db.exercicioDoTreino.update({
                where : { id : exercicioDoTreinoId},
                data : {
                    
                    series,
                    repeticoes,
                    tipoSeries,
                    tipoRepeticoes,
                    exercicio : {
                        connect : {id : exercicioId}
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

    public async delete (req:Request, res:Response) {
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId

        try {
            const query:object | null = await db.exercicioDoTreino.delete({
                where : {id : exercicioDoTreinoId}
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
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId

        try {
            const query:object | null = await db.exercicioDoTreino.update({
                where : {id : exercicioDoTreinoId},
                data : {
                    treino : {
                        connect : {id : trienoId}
                        
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

    public async attachExercicio (req:Request, res:Response) {
        const exercicioId:number = parseInt(req.body.exercicioId)
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId

        try {
            const query:object | null = await db.exercicioDoTreino.update({
                where : {id : exercicioDoTreinoId},
                data : {
                    exercicio : {
                        connect : {id : exercicioId}
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

    /* public async detachExercicio (req:Request, res:Response) {
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId

        try {
            const query:object | null = await db.exercicioDoTreino.update({
                where : {id : exercicioDoTreinoId},
                data : {
                    exercicio : {
                        disconnect : true
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
 */



    /* public async detachFromTreino (req:Request, res:Response) {
        const exercicioDoTreinoId:number = req.body.exercicioDoTreinoId
        
        try {
            const query:object = await db.exercicioDoTreino.update({
                where : {id : exercicioDoTreinoId},
                data : {
                    treino : {
                        disconnect : true
                    }
                }
            })
 
            return res.status(201)  
                        .send({message: 'Ok', data : query })

        } catch (error) {
            return res.status(500)
                        .send({message:'Internal Server Error', error})
        }
    } */
}

export default new ExercicioController();