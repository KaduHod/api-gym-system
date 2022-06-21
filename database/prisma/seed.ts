import profiles from './profiles'
import db from './client'

async function seed() {
    const query:object | null = await db.profile.createMany({
        data : profiles
    })
    console.log(query)
}

seed().catch( e => console.log( e ) ).finally (()=>{
    db.$disconnect()
})