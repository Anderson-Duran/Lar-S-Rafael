import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserCTRL {
    
    // User login method
    async login(req, res) {
        const prisma = new PrismaClient();

        // Extracting email and password from the request body
        const { email, password } = req.body;

        // Validating email and password
        if (!email) {
            return res.status(422).json({
                status: false,
                message: "E-mail obrigatório"
            });
        } else if (!password) {
            return res.status(422).json({
                status: false,
                message: "Senha obrigatória!"
            });
        } else {
            // Finding the user by email
            const user = await prisma.users.findUnique({
                where: {
                    email
                }
            });

            // Handling scenarios where the user is not found or the password is incorrect
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "Usuário não encontrado!"
                });
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (!checkPassword) {
                return res.status(404).json({
                    status: false,
                    message: "Senha não encontrada!"
                });
            }

            try {
                // Generating JWT token
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, secret);
                const secureData = {name : user.name, id : user.id, isAdmin : user.isAdmin, email : user.email}

                // Sending a successful login response with the token
                res.status(200).json({
                    status: true,
                    message: `Usuário ${user.name} logado com sucesso!`,
                    token: token,
                    user: secureData
                });
            } catch (error) {
                // Handling errors during token generation
                res.status(500).json({
                    status: false,
                    message: error.message
                });
            }
        }
    }

    // Method for querying users
    async queryUsers(req, res) {
        const prisma = new PrismaClient();

        // Querying all users and selecting specific fields
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true
            }
        });

        // Handling scenarios where no users are found
        if (!users) {
            return res.status(500).json({
                status: false,
                message: "Nenhum usuário localizado"
            });
        }

        // Sending the list of users in the response
        return res.status(200).json(users);
    }

    // User sign-up method
    async signUp(req, res) {
        const prisma = new PrismaClient();

        // Extracting user information from the request body
        const { email, name, isAdmin } = req.body;
        const rawPassword = req.body.password;

        // Validating required fields
        if (!email || !rawPassword || !name) {
            return res.status(412).json({
                status: false,
                message: "Campos obrigatórios não preenchidos!"
            });
        }

        try {
            // Generating password hash using bcrypt
            const salt = await bcrypt.genSalt(12);
            const password = await bcrypt.hash(rawPassword, salt);

            // Creating a new user in the database
            const newUser = await prisma.users.create({
                data: {
                    name,
                    password,
                    isAdmin,
                    email
                }
            });

            // Sending a successful sign-up response
            res.status(200).json({
                status: true,
                message: `Usuário ${newUser.name} criado com sucesso!`,
                newUser: newUser
            });
        } catch (error) {
            // Handling errors during user creation
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }

    // Method for deleting a user
    async deleteUser(req, res) {
        const prisma = new PrismaClient();
        const { email, name } = req.body;

        // Validating required fields
        if (!email) {
            return res.status(404).json({
                status: false,
                message: "E-mail obrigatório!"
            });
        }

        try {
            // Deleting the user from the database
            await prisma.users.delete({
                where: {
                    email
                }
            });

            // Sending a successful deletion response
            return res.status(200).json({
                status: true,
                message: `Usuário ${name} excluído com sucesso!`
            });
        } catch (error) {
            // Handling errors during user deletion
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}
