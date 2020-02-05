const db = require('../data/dbConfig')

module.exports = {
    find, findById, findSteps, add, update, remove
}

function find() {
    return db('schemes')
}
function findById(id) {
    return db('schemes').where({ id }).first();
}
function findSteps(id) {
    return db('schemes as m')
        .join('steps as p', 'm.id', 'p.scheme_id')
        .select('m.scheme_name,p.step_number,p.instructions')
        .where({ id });
}

async function add(newSchemeObj, ["scheme_name,id"]) {
    return new Promise((resolve, reject) => {
        const result = await db('schemes').insert(newSchemeObj)
        result ?
            resolve({ id: result.id, ...result })
            :
            reject(null)
    });

}
// async function add(newSchemeObj) {
//     const [id] = await db('schemes').insert(newSchemeObj)
//     return findById(id);
// }

function update(id, changes) {
    return db('schemes')
        .where({ id })
        .update({ changes });
}

function remove(id){
    return db('scheme')
    .where({id})
    .first()
    .del();

}









async function add(hub) {
    const [id] = await db('hubs').insert(hub);

    return findById(id);
}