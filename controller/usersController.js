const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenBlacklist , authenticateToken} = require('../middleware/auth');

async function getUser(req, res) {
    authenticateToken(req, res, async () => {
        if (!authenticateToken) {
            return res.status(403).json({ message: 'Forbiden' })
        }
        try {
            const users = await prisma.roles.findMany({
                where : {
                    roles : 'PARTNER'
                },
                select: {
                    roles: true,
                    user_roles :{
                        id: true,
                        user_id : true,
                        users:{
                            username : true,
                            email: true,
                            notelp: true
                        }
                    }

                }
            })
            return res.status(200).json(users)
        } catch (error) {
            return res.status(404).json({ msg: error.message })
        }

    })
}

async function getUserById(req, res) {
    authenticateToken(req, res, async () => {
        if (req.user.role === 'partner') {
            return res.status(403).json({ message: 'Forbiden' })
        }
        try {
            
        } catch (error) {
            
        }
    })
    
}

module.exports = {
    getUser,
    // getUserById,
    // register,
    // login,
    // approvePartner,
    // logout,
    // updateUser,
    // deleteUser
}