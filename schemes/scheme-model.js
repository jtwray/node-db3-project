const db = require('../data/dbConfig')

function find() {
    return db('schemes')
}
function findById(id) {
    return db('schemes').where({ id }).first();
}
function findSteps(id){
    return db('schemes as m')
    .join('steps as p','m.id','p.scheme_id')
    .select('m.scheme_name,p.step_number,p.instructions')
    .where({id});
}

async function add(newSchemeObj){
    return new Promise((resolve, reject)=>{
        const result= await db('schemes').insert(newSchemeObj)
        result?
        resolve({id:result.id,...result})
        :
        reject(null)
    })

}











async function add(hub) {
    const [id] = await db('hubs').insert(hub);
  
    return findById(id);
  }