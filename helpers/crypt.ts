import bcrypt from 'bcrypt'

/**
 * @param {*} pwd Senha do formulario
 * @returns senha com hash
 */
 const makeHash = (pwd:string) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pwd, salt)
} 

/**
 * @param {*} pwd senha do form
 * @param {*} pwdDB senha do DB
 * @returns Ve se senha do formulario é igual a do DB
 */
const compareHash = (pwd:string, pwdDB:string) =>  bcrypt.compareSync(pwd, pwdDB) 

export default { makeHash, compareHash }