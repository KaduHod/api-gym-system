import express from 'express';
import routes from './routes/routes'
import cors from 'cors'

const api = express();

api.use(cors({
    origin: 'http://localhost:3000', optionsSuccessStatus: 200 
}))

api.use(express.json());
api.use(express.urlencoded());
api.use(routes)

const port = 9999;

try {
    api.listen(port, () => console.log('Server running at http://localhost:' + port))
} catch (err) {
    console.log(err)
}