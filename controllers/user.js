const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { UserModel } = require('../models');
const { UniqueConstraintError } = require('sequelize/lib/errors');

const userController = Router();


userController.get('/all', async(req, res) =>  {
    try {
        let foundUsers = await UserModel.findAll();
        if(foundUsers) {
            res.json({
                users: foundUsers,
                message: "Users found"
            })
        } else {
            res.status(500).json({
                message: "no users found"
            })
        }
    } catch {
        res.status(500).json({
            message: "failed to get users"
        })
    }
})



userController.post('/register', async(req, res) => {
    let { username, firstName, lastName, email, password } = req.body;

    try {
        await UserModel.create({
            username,
            firstName,
            lastName,
            email,
            password
        })
        res.status(201).json({
            message: "user registered"
        })
    } catch(e) {
        if(e instanceof UniqueConstraintError) {
            res.status(409).json({
                message: 'email or username already in use'
            })
        } else {
            res.status(500).json({
                message: 'failed to register user'
            })
        }
    }
}) 


// userController.post('/login', async(req, res) => {
//     let { username, password } = req.body;
     
//     try {
//         let loggingIn = await UserModel.findOne({
//             where:{ 
//                 username
//             }
//         })
//         if(loggingIn && await bcrypt.compare(password, loggingIn.password)) {
//             const token = jwt.sign({ id: loggingIn.id }, process.env.JWT_SECRET)
//             res.status(200).json({
//                 message: 'login success',
//                 token
//             })
//         }  else {
//             res.status(401).json({
//                 message: 'login failed'
//             })
//         }
//     } catch (e) {
//         res.status(500).json({
//             message: 'error logging in'
//         })
//     }
// })




userController.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        let loggingIn = await UserModel.findOne({
            where: {
                username
            }
        })

        if( loggingIn && await bcrypt.compare(password, loggingIn.password)) {
            const token = jwt.sign({ id: loggingIn.id }, process.env.JWT_SECRET);
                    res.status(200).json({
                        message: 'login success',
                        token
                    })
        } else {
            res.status(401).json({
                message: 'login failed'
            })
        }
    } catch (e) {
        res.status(500).json({
            message: 'error logging in'
        })
    }
})



module.exports = userController