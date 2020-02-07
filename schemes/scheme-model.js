// const db = require('../data/dbConfig')

// module.exports = {
//     find, findById, findSteps, add, addStep, update, remove
// }

// function find() {
//     return db('schemes')
// }
// function findById(id) {
//     return db('schemes').where({ id }).first();
// }
// function findSteps(id) {
//     return db('schemes as m')
//         .join('steps as p', 'p.scheme_id','m.id')
//         .select('p.id','m.scheme_name','p.step_number','p.instructions')
//         .where( 'p.scheme_id',id)
//         .orderBy("p.step_number","asc");

//     }


//     db('schemes').where({id}).first();


// // function findSteps(id) {
// //     return db('steps as s')
// //         .join('schemes as sch', 'sch.id', 's.scheme_id')
// //         .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
// //         .where('s.scheme_id', id)
// //         .orderBy('step_number', 'asc')
// // }
// // async function add(newSchemeObj ) {

// //     const result = await db('schemes').insert(newSchemeObj)
// //     result ? resolve({ id: result.id, ...result })
// //         :
// //         reject(null)
// // }

// async function add(newSchemeObj) {
//     const [id] = await db('schemes').insert(newSchemeObj)
//     return findById(id);
// }

// function addStep(step, scheme_id) {
//     return db('steps')
//         .insert({ ...step, scheme_id })
//         .then(([id]) => {
//             return db('steps')
//             .where({ id })
//         })
// }
// function update(changes, id) {
//     return db('schemes')
//         .where({ id })
//         .update(changes)
//         .then(() => findById(id)) 
// }

// function remove(id) {
//     return db('schemes')
//         .where({ id })
//         .del();


// }


// function findSteps(id) {
//     return db('schemes as m')
//         .join('steps as p', 'p.scheme_id','m.id')
//         .select('p.id','m.scheme_name','p.step_number','p.instructions')
//         .where( 'p.scheme_id',id)
//         .orderBy("p.step_number","asc");

//     }






// async function add(hub) {
//     const [id] = await db('hubs').insert(hub);

//     return findById(id);
// }


const db = require('../data/dbConfig.js')

// 'schemes' & 'steps'

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove,
};

// array of all schemes
function find() {
    return db('schemes');
}

function findById(id) {
    return [db('schemes')
        .where({ id })
        .first(),]
}

function findSteps(id) {
    return db('steps as s')
        .join('schemes as sch', 'sch.id', 's.scheme_id')
        .select('s.id', 'sch.scheme_name', 's.step_number', 's.instructions')
        .where('s.scheme_id', id)
        .orderBy('step_number', 'asc')
}

function add(scheme) {
    return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => {
            return findById(id)
        })
}

function addStep(step, scheme_id) {
    return db('steps')
        .insert({ ...step, scheme_id })
        .then(([id]) => {
            return db('steps')
                .where({ id })
        })
}

function update(changes, id) {
    return changes.scheme_id
        ? db('schemes')
            .where({ id })
            .update(changes)
            .then(() => findById(id))
        : db('steps')
            .where({ id })
            .update(changes)
            .then(() => findById(id))
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
        .then(() => findById(id))
}