const db = require('../data/db-config')

function find() {
    return db('users')
    }

function findById(id) {
    return db('users').where('id', id).first()
    
    }

async function insert(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
  
        }







module.exports = {
    find,
    findById,
    insert

}