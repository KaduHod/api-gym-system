import exercicios from './exercicios'
import db from './client'

async function seed() {
    const query:object | null = await db.exercicio.createMany({
        data : exercicios
    })
    console.log(query)
}

seed().catch( e => console.log( e ) ).finally (()=>{
    db.$disconnect()
})