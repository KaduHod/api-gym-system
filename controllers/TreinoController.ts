import Controller from "./Controller";
import db from '../database/prisma/client';
import { Request, Response } from 'express';

class TreinoController extends Controller{
    public async create (req:Request, res:Response) {

    }

    public async update (req:Request, res:Response) {

    }

    public async delete (req:Request, res:Response) {

    }

    public async attachToPeriodizacao (req:Request, res:Response) {

    }

    public async detachFromPeridizacao (req:Request, res:Response) {

    }

    public async attachToProfessor (req:Request, res:Response) {

    }

    public async detachFromProfessor (req:Request, res:Response) {

    }
}

export default new TreinoController();