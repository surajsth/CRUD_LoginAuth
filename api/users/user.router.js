const { createUser, getUserByUserId, getUsers, updateUser,
    deleteUsers, login } = require("./user.controller")
const router = require("express").Router()
let { checkToken } = require("../../auth/token_validation")

const { addUserValidation } = require("../../validation/user/user.validation")

router.post("/", checkToken, addUserValidation, createUser)
router.get("/", checkToken, getUsers)
router.get("/:id", checkToken, getUserByUserId)
router.patch("/", checkToken, updateUser)
router.delete("/", checkToken, deleteUsers)
router.post('/login', login)
module.exports = router

// {
//     "firstname": "subina",
//     "lastname": "prajapati",
//     "gender": "female",
//     "email": "psilpa@gmail.com",
//     "password": "1234",
//     "number": "123234"
// }