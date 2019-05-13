const bcrypt = require('bcrypt');
const { MD5 } = require('crypto-js');
const jwt = require('jsonwebtoken');

// bcrypt.genSalt(10, (err, salt) =>{

// });

// bcrypt.genSalt(10)
//     .then((salt) => {
//         bcrypt.hash('password123', salt)
//             .then(hash => {
//                 console.log(hash);
//             })
//             .catch(err => console.log(err))
//     })
//     .catch(err => (next(err)));

// async function doSalt() {
//     const salt = await bcrypt.genSalt(10);
//     if (salt) {
//         return salt;
//     }
// }

// async function doHash() {
//     const salt = await doSalt();
//     const hash = await bcrypt.hash('password123', salt);
//     console.log(hash);
// }

// doHash();

// const secret = 'mysecretpassword';
// const secretSalt = 'asdasdsaddfgdf;lkjtoigtu'

//  const user = {
//      id:1,
//      token: MD5('Dmbnad_706').toString() + secretSalt
//  };
//  console.log(user.token);

const id = '1000';
const secret = 'supersecret';

const token = jwt.sign(id, secret);

const recivedToken = 'eyJhbGciOiJIUzI1NiJ9.MTAwMA.L9PmEqLlZjettygguzj25agunJu6NkvVtG9RFRBnK2Y';

const decodeToken = jwt.verify(recivedToken, secret);

console.log(decodeToken);