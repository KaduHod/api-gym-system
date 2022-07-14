import Controller from "./Controller";
import { Request, Response } from 'express';
import db from '../database/prisma/client';
import crypt from '../helpers/crypt';

class ProfileController extends Controller{

    public async search(req:Request, res:Response){
        const id:number = parseInt(req.params.id)

        try {
            const profile:object | null = await db.profile.findUnique({
                where : {id},
                include : {
                    professor : {
                        include : {
                            alunos : true,
                            treinos: true,
                            periodizacoes : true,
                            exercicios : true
                        }
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', profile }) 
        } catch (error) {

            return res.status(500)
                        .send({message:'Não foi possível achar o perfil', error})
        }
    }

    public async all(req:Request, res:Response){
        const allProfiles:object | null = await db.profile.findMany()
        res.send(allProfiles)
    }

    public async create (req:Request, res:Response) {

        const email:string        = req.body.email
        const senha:string        = req.body.senha
        const dataNascimento:Date = new Date(req.body.dataNascimento) 
        const type:string         = req.body.type 
        const cpf:string          = req.body.cpf
        const nome:string         = req.body.nome
        const telefone:string     = req.body.telefone
        const image:string        = req.body.image || null

        const senhaHash:string = crypt.makeHash(senha)

        try {
            const data:object | null = await db.profile.create({
                data : {
                    nome, 
                    email, 
                    senha : senhaHash, 
                    dataNascimento, 
                    type, 
                    cpf, 
                    telefone, 
                    image
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {

            return res.status(500)
                        .send({message:'Não foi possível criar o perfil', error})
        }
    }

    public async attachToAluno(req:Request, res:Response){
        const profileId:number = parseInt(req.body.profileId)
        const alunoId:number = parseInt(req.body.alunoId)

        try {

            const data = await db.profile.update({
                where : {id : profileId},
                data : {
                    aluno : {
                        connect : {id : alunoId}
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível conectar profile a conta de aluno!', error})
        }
    }

    public async detachFromAluno(req:Request, res:Response){
        const profileId:number = parseInt(req.body.profileId)

        try {

            const data:object | null = await db.profile.update({
                where : {id : profileId},
                data : {
                    aluno : {
                        disconnect : true
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível desconectar profile da conta de aluno!', error})
        }
    }
    
    public async attachToProfessor(req:Request, res:Response){
        const profileId:number = parseInt(req.body.profileId)
        const professorId:number = parseInt(req.body.professorId)

        try {

            const data:object |  null = await db.profile.update({
                where : {id : profileId},
                data : {
                    professor : {
                        connect : {id : professorId}
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível conectar profile a conta de professor!', error})
        }
    }

    public async detachFromProfessor(req:Request, res:Response){
        const profileId:number = parseInt(req.body.profileId)

        try {

            const data:object = await db.profile.update({
                where : {id : profileId},
                data : {
                    professor : {
                        disconnect : true
                    }
                }
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {
        
            return res.status(500)
                        .send({message:'Não foi possível desconectar profile da conta de professor!', error})
        }
    }

    public async delete(req:Request, res:Response){
        const profileId:number = parseInt(req.body.profileId)

        try {
            const data:object |  null = await db.profile.delete({
                where : {id : profileId}
            })

            return res.status(200)
                        .send({message: 'Ok', data }) 
        } catch (error) {
            
            return res.status(500)
                        .send({message : 'Não foi possível deletar profile', error})
        }
    }

    public async update(req:Request, res:Response) {
        const profileId:number = parseInt(req.body.profileId)

        try {
            const profile:object | any = await db.profile.findFirst({
                where : {id : profileId}
            })

            if(!profile) return res.status(500).send({message : 'Profile inválido'})

            
            const email:string        = req.body.email                    || profile.email
            const senha:string        = req.body.senha                    || profile.senha
            const dataNascimento:Date = new Date(req.body.dataNascimento) || profile.dataNascimento
            const cpf:string          = req.body.cpf                      || profile.cpf
            const nome:string         = req.body.nome                     || profile.nome
            const telefone:string     = req.body.telefone                 || profile.telefone
            const image:string        = req.body.image                    || profile.image
    
            const senhaHash:string = crypt.makeHash(senha)
            
            const data:object | null = await db.profile.update({
                where : {id : profileId},
                data : {
                    nome, 
                    email, 
                    senha : senhaHash, 
                    dataNascimento, 
                    cpf, 
                    telefone, 
                    image
                }
            }) 

            return res.status(200)
                        .send({message: 'Ok' }) 
            

            
            
        } catch (error) {

            return res.status(500)
                        .send({message : 'Não foi possível atualizar profile', error})
        }
    }

    public async validateEmail(req:Request, res:Response){
        const email:string = req.body.email

        try {
            const query = await db.profile.findUnique({where : {email}})
            
            const resposta = query ? true : false

            res.send({alreadyInUse : resposta})
        } catch (error) {
            res.send({message:'Error in the query', error})
        }
    }
}

export default new ProfileController();