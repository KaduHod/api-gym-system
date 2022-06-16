import express from 'express';
import routes from './routes/routes'

const api = express();

api.use(routes)

const port = 9999 || 9090;

try {
    api.listen(port, () => console.log('Server running at http://localhost:' + port))
} catch (err) {
    console.log(err)
}