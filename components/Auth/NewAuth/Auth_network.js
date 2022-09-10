import auth_service from './Auth_service';


const { Router } = require('express');
const express = require('express');
require('dotenv').config();
const passport = require('passport');
const router = express.Router();
require('dotenv').config();
import response from '../../../network/response';
var jwt = require('jsonwebtoken');

const jwt_decode = require('jwt-decode');

import bcrypt from "bcryptjs";


//Crear un productos




router.post('/logearse', async (req, res) => {
    try {
        const getHashedPassword = await auth_service.getHashedPassword(req.query.Correo) //Listo


        const Hash = await auth_service.HashedPass(req.query.Correo,req.query.Contrasena,getHashedPassword[0].Contrasena);
        const login = await auth_service.SingIn(Hash,req.query.Correo,Hash);
        const GetToken = await auth_service.GetToken(login[0]);


        response.success_plain(req, res, 201, GetToken);
    } catch (error) {
        response.error(req, res, 500, error.message || error, error);
    }
});

router.get('/prueba', async (req, res) => {
    try {


        response.success_plain(req, res, 201, "Hola esto es una prueba");
    } catch (error) {
        response.error(req, res, 500, error.message || error, error);
    }
});

router.post('/CrearCuenta', async (req, res) => {
    try {
        console.log("Its working")
        let Nombre = req.query.Nombre
        let Correo = req.query.Correo
        let Contrasena = req.query.Contrasena
        let DNI = req.query.DNI
        let Apellidos = req.query.Apellidos
        let tipo = 1

        var user = {
            "Nombre": Nombre,
            "Correo": Correo,
            "Contrasena": Contrasena,
            "DNI": DNI,
            "Apellidos": Apellidos,
            "tipo": tipo
        }
        //Comprobar que no exista el correo
        const DetectIfUserExist = await auth_service.DetectIfUserExist(Correo)
        console.log(DetectIfUserExist)
        if(DetectIfUserExist.length > 0){
            res.send("Usuario ya existe")
        }else {
            const salt = bcrypt.genSaltSync(10);
            const HashPass = await bcrypt.hash(Contrasena, salt);
            const CreateUser = await auth_service.CreateUser(user,HashPass);
            res.send(CreateUser)

        }


    } catch (error) {
        res.send(error)
        response.error(req, res, 500, error.message || error, error);
    }
});






//FUNCION QUE VALIDA EXSITENCIA DE TOKEN MIDDLEWARE
function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


function ValidityToken(req, res, next) {
    jwt.verify(req.token,  process.env.JWT_SECRET, (err, data) => {
        if(err){
            console.log("UY HUBO UN ERROR")
            res.sendStatus(403);
        }else if(data.data.permiso.B_RRHH == 0){
            console.log("No auth")
            res.sendStatus(403);

        }else if(data.data.permiso.B_RRHH == 1){
            console.log("Auth correctly");
            next();
        }

    });

}



export default router;
