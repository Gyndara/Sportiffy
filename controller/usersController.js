const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { tokenBlacklist } = require('../middleware/auth');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const userEmail = 'zahra.injunie23@gmail.com';
const adminEmail = 'zahra.injunie23@gmail.com';
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
  );
  
  oAuth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

async function getUserById(req, res) {
    try {
        const respone = await prisma.users.findFirst({
            where: {
                id_user: Number(req.params.id_user)
            }
        });
        return res.status(200).json(respone);
    } catch (error) {
        return res.status(404).json({ msg: error.message });
    }
}

async function register(req, res) {
    const { username, email, notelp, password, kategori_user } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    let isApprovedDefault = true; 
    if (kategori_user === 'PARTNER') {
        isApprovedDefault = false; 
    }
    try {
        const users = await prisma.users.create({
            data: {
                username: username,
                email: email,
                notelp: notelp,
                password: hashedPassword,
                kategori_user: kategori_user,
                isApproved: isApprovedDefault
            }
        });
        if (users.kategori_user === 'PARTNER' && users.isApproved === false) {
            const approvalLink = 'http://localhost:3001/adminconfirm/approve?=http://localhost:3000/user/admin/approve/' + users.id_user; 
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  type: 'OAuth2',
                  user: userEmail,
                  clientId: process.env.CLIENT_ID,
                  clientSecret: process.env.CLIENT_SECRET,
                  refreshToken: process.env.REFRESH_TOKEN,
                  accessToken: oAuth2Client.getAccessToken(),
                },
              });
              
            const mailOptions = {
              from: userEmail,
              to: adminEmail,
              subject: 'Permintaan Persetujuan Mitra',
              text: 
              `DATA USER : 
               USERNAME     : ${users.username} 
               EMAIL        : ${users.email}
               NO TELEPON   : ${users.notelp}
               ingin meminta persetujuan mitra. Klik tautan untuk menyetujui:
               ${approvalLink}`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Kesalahan mengirim email persetujuan:', error);
                return res.status(500).json({ message: 'Gagal mengirim email persetujuan', error: error.message });
              } else {
                console.log('Email terkirim:', info.response);
                console.log('Sending approval email...');
                return res.status(403).json({ message: 'Akun mitra menunggu persetujuan' });
              }
            });
    } else {
        res.status(201).json(users);
    }
   } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    console.log('Received login request for username:', username);
    try {
        const user = await prisma.users.findUnique({
            where: {
                username: username,
            },
        });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(401).json({ message: 'Invalid password' });
        }
        if (user.kategori_user === 'PARTNER' && !user.isApproved) {
            console.log('Akun anda belum disetujui');
            return res.status(403).json({ message: 'Akun anda belum disetujui' });
        }
         else {
        console.log('Login successful');
        const token = jwt.sign({ id_user: user.id_user, kategori_user: user.kategori_user, email: user.email, username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ message: 'login successful', token });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


async function approvePartner(req, res) {
    const userId = Number(req.params.id_user)
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id_user: userId, 
            },
            data: {
                isApproved: true,
            },
        });

        const userConfirmationLink = 'http://localhost:3000/user/login';

        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'https://developers.google.com/oauthplayground'
        );

        oAuth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
        });

        const accessToken = await oAuth2Client.getAccessToken();

        const userTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: adminEmail,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const userMailOptions = {
            from: adminEmail,
            to: updatedUser.email,
            subject: 'Konfirmasi Persetujuan Mitra',
            text: `Selamat! Akun mitra Anda telah disetujui. Klik tautan ini untuk masuk: ${userConfirmationLink}`,
        };

        userTransporter.sendMail(userMailOptions, (error, info) => {
            if (error) {
                console.error('Kesalahan mengirim email persetujuan:', error);
                res.status(500).json({ message: 'Gagal mengirim email persetujuan', error: error.message });
              } else {
                console.log('Email terkirim:', info.response);
                return res.status(201).json({ message: 'Akun mitra telah disetujui' });
              }
            });
    } catch (error) {
        console.error('Kesalahan server internal:', error);
        return res.status(500).json({ message: 'Kesalahan server internal', error: error.message });
    }
}


  

async function logout(req, res) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(200).json({ message: 'User already logged out' });
        }

        if (tokenBlacklist.has(token)) {
            return res.status(200).json({ message: 'Token is already blacklisted' });
        }

        // Tambahkan token ke daftar blacklist setelah memeriksa apakah token valid
        tokenBlacklist.add(token);

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function updateUser(req, res) {
    // const { id_user } = req.params;
    const { username, email, notelp, password, kategori_user } = req.body;
    try {
        const updateUser = await prisma.users.update({
            where: {
                id_user: Number(req.params.id_user)
            },
            data: {
                username: username,
                email: email,
                notelp: notelp,
                password: password,
                kategori_user: kategori_user
            }
        });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const users = await prisma.users.delete({
            where: {
                id_user: Number(req.params.id_user)
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    getUserById,
    register,
    login,
    approvePartner,
    logout,
    updateUser,
    deleteUser
}