import express                   from 'express';
import AlunoController           from '../controllers/AlunoController';
import TreinoController          from '../controllers/TreinoController';
import ProfileController         from '../controllers/ProfileController';
import ProfessorController       from '../controllers/ProfessorController';
import ExercicioController       from '../controllers/ExercicioController';
import ExercicioTreinoController from '../controllers/ExercicioTreinoController'
import PeriodizacaoController    from '../controllers/PeriodizacaoController';

const route = express.Router() 

route.get('/aluno/:id',                              AlunoController.aluno)
route.get('/alunos',                                 AlunoController.alunos)
route.post('/aluno',                                 AlunoController.create)
route.put('/aluno',                                  AlunoController.update)
route.patch('/aluno/attach-professor',               AlunoController.attachProfessor)
route.patch('/aluno/detach-professor',               AlunoController.detachProfessor)
route.patch('/aluno/attach-profile',                 AlunoController.attachProfile)
route.patch('/aluno/detach-profile',                 AlunoController.detachProfile)
route.delete('/aluno',                               AlunoController.delete)
route.get('/professor',                              ProfessorController.create)
route.get('/professores',                            ProfessorController.professores)
route.get('/professor/:id/alunos',                   ProfessorController.alunos)
route.patch('/professor/attach-aluno',               ProfessorController.attachAluno)
route.patch('/professor/detach-aluno',               ProfessorController.detachAluno)
route.patch('/professor/attach-profile',             ProfessorController.attachProfile)
route.patch('/professor/detach-profile',             ProfessorController.detachProfile)
route.delete('/professor',                           ProfessorController.delete)
route.delete('/professor/aluno',                     ProfessorController.delete)
route.get('/profiles',                               ProfileController.all)
route.get('/profile/:id',                            ProfileController.search)
route.post('/profile',                               ProfileController.create)
route.put('/profile',                                ProfileController.update)
route.patch('/profile/attach-aluno',                 ProfileController.attachToAluno)
route.patch('/profile/detach-aluno',                 ProfileController.detachFromAluno)
route.patch('/profile/attach-professor',             ProfileController.attachToProfessor)
route.patch('/profile/detach-professor',             ProfileController.detachFromProfessor)
route.post('/profile/validate-email',                ProfileController.validateEmail)
route.delete('/profile',                             ProfileController.delete)
route.get('/exercicios',                             ExercicioController.all)
route.get('/exercicios/:professorId',                ExercicioController.exercicios)
route.post('/exercicio',                             ExercicioController.create)
route.put('/exercicio',                              ExercicioController.update)
route.patch('/exercicio/attach-professor',           ExercicioController.attachToProfessor)
route.patch('/exercico/detach-professor',            ExercicioController.detachFromProfessor)
route.delete('/exercicio',                           ExercicioController.delete)
route.get('/exercicios-treino',                      ExercicioTreinoController.all)
route.post('/exercicio-treino',                      ExercicioTreinoController.create)
route.post('/exercicios-treino',                     ExercicioTreinoController.createMany)
route.put('/exercicio-treino',                       ExercicioTreinoController.update)
route.patch('/exercicio-treino/attach-treino',       ExercicioTreinoController.attachToTreino)
route.patch('/exercicio-treino/attach-exercicio',    ExercicioTreinoController.attachExercicio)
route.delete('/exercicio-treino',                    ExercicioTreinoController.delete)
route.get('/treinos',                                TreinoController.all)
route.post('/treino',                                TreinoController.create)
route.post('/treino-e-exercicios',                   TreinoController.createTreinoEExercicios)
route.put('/treino',                                 TreinoController.update)
route.get('/treinos/:professorid',                   TreinoController.treinos)
route.patch('/treino/attach-exercicio',              TreinoController.attachExercicio)
route.patch('/treino/detach-exercicio',              TreinoController.detachFromExercicio)
route.patch('/treino/attach-professor',              TreinoController.attachToProfessor)
route.patch('/treino/detach-professor',              TreinoController.detachFromProfessor)
route.patch('/treino/attach-periodizacao',           TreinoController.attachToPeriodizacao)
route.patch('/treino/detach-periodizacao',           TreinoController.detachFromPeriodizacao)
route.delete('/treino',                              TreinoController.delete)
route.get('/periodizacao/:id',                       PeriodizacaoController.all)
route.post('/periodizacao',                          PeriodizacaoController.create)
route.put('/periodizacao',                           PeriodizacaoController.update)
route.patch('/periodizacao/attach-aluno',            PeriodizacaoController.attachAluno)
route.patch('/periodizacao/detach-aluno',            PeriodizacaoController.detachAluno)
route.patch('/periodizacao/attach-professor',        PeriodizacaoController.attachProfessor)
route.patch('/periodizacao/detach-professor',        PeriodizacaoController.detachProfessor)
route.patch('/periodizacao/attach-treinos',          PeriodizacaoController.attachTreino)
route.patch('/periodizacao/detach-treinos',          PeriodizacaoController.detachTreino)
route.delete('/periodizacao',                        PeriodizacaoController.delete)

/* route.patch('/exercicio-treino/detach-treino',    ExercicioTreinoController.detachFromTreino)  */
/* route.patch('/exercicio/attach-treino',              ExercicioController.attachToTreino) 
route.patch('/exercicio/detach-treino',              ExercicioController.detachFromTreino)  */

export default route; 