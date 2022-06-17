import express             from 'express';
import AlunoController     from '../controllers/AlunoController';
import ProfessorController from '../controllers/ProfessorController';
import LoginController     from '../controllers/LoginController';
import RegisterController  from '../controllers/RegisterController';
import ExercicioController from '../controllers/ExercicioController';
import TreinoController    from '../controllers/TreinoController';

const route = express.Router() 

route.get('/aluno/:id',                 AlunoController.aluno)
route.get('/alunos',                    AlunoController.alunos)
route.post('/aluno',                    AlunoController.create)
route.put('/aluno',                     AlunoController.update)
route.delete('/aluno',                  AlunoController.delete)
route.post('/aluno/attach-professor',   AlunoController.attachProfessor)
route.patch('/aluno/detach-professor',  AlunoController.unlinkProfessor)
route.post('/aluno/attach-profile',     AlunoController.attachProfile)
route.patch('/aluno/detach-profile',    AlunoController.unlinkProfile)
 
route.get('/professor/:id',             ProfessorController.index)
route.post('professor',                 ProfessorController.index)
route.put('professor',                  ProfessorController.index)
route.get('/professor/alunos',          ProfessorController.index)
route.post('/professor/aluno',          ProfessorController.index)
route.delete('/professor/aluno',        ProfessorController.index)
        
route.get('/exercicio',                 ExercicioController.index)
route.post('/exercicio',                ExercicioController.index)
route.put('/exercicio',                 ExercicioController.index)
route.delete('/exercicio',              ExercicioController.index)
       
route.get('/treino',                    TreinoController.index)
route.post('/treino',                   TreinoController.index)
route.put('/treino',                    TreinoController.index)
route.delete('/treino',                 TreinoController.index)

route.get('/login', LoginController.index)
route.get('/resgiter', RegisterController.index)


export default route;