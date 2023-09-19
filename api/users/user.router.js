const { createUser, getUserByUserId, getUsers, updateUser,
    deleteUsers, login } = require("./user.controller")
const router = require("express").Router()
// let { checkToken } = require("../../auth/token_validation")

const { addUserValidation } = require("../../validation/user/user.validation")

router.post("/", addUserValidation, createUser)
router.get("/", getUsers)
router.get("/:id", getUserByUserId)
router.patch("/", updateUser)
router.delete("/", deleteUsers)
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