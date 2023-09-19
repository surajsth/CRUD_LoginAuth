const { create, getUsers, getUserByUserId, updateUser,
    deleteUsers, getUserByUserEmail } = require("./user.services")
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken")

module.exports = {
    createUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt);
        create(body, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Error in creating user"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not Found"
                });
            }
            results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req, res) => {
        getUsers((error, result) => {
            if (error) {
                console.log('error', error)
                return
            }
            return res.json({
                success: 1,
                data: result
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update"
                })
            }
            return res.json({
                success: 1,
                message: 'updated Successfully'
            })
        })
    },
    deleteUsers: (req, res) => {
        const data = req.body
        deleteUsers(data, (err, results) => {
            if (err) {
                console.log(err)
                return
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            })
        })
    },
    login: (req, res) => {
        const body = req.body
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err)
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)
            if (result) {
                results.password = undefined
                const jsontoken = sign({
                    result: results
                }, "qwe123", {
                    expiresIn: "1h"
                })
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                })
            }
            else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                })
            }

        })

    }
}