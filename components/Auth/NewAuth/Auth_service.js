import { generalPool,authPool,ingsoftwarePool } from '../../../db';
var jwt = require('jsonwebtoken');
import bcrypt from 'bcryptjs';
const { encrypt, decrypt } = require('./crypto');
//Pool SQL




const DetectIfUserExist = (Correo) => {
    console.log("Se esta ejecutando esto")

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM `Usuarios` WHERE Usuarios.Correo = ?';
        ingsoftwarePool.query(query, [Correo], (error, result) => {

           var Qty = result
           //console.log(error)
            resolve(Qty);
        });
    });
};

const getHashedPassword = (S_correo) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT Contrasena FROM `Usuarios` WHERE `Correo` = ?;';
        ingsoftwarePool.query(query, [S_correo], (error, result) => {
            if (!result) {
                reject("Enterprise doesn't exist");
            }

            resolve(result);
        });
    });
};


const HashedPass = (S_correo,S_contrasena,S_hashed_pass) => {
    return new Promise((resolve, reject) => {
        console.log("--------____----------")
        console.log(S_hashed_pass)
        var hash = S_hashed_pass
        bcrypt.compare(''+S_contrasena+'', hash, function(err, res) {
            if(res) {
                resolve(hash)
            } else {
                console.log(err)
                console.log(res)
                resolve("no es")
            }
        });



    });
};




const CreateUser = (user,hashedPass) => {
    return new Promise((resolve, reject) => {



        const query = 'INSERT INTO `ingsoftware`.`Usuarios`( `Nombre`, `Correo`, `Contrasena`, `DNI`, `Apellidos`, `Tipo`) VALUES ( "'+user.Nombre+'","'+user.Correo+'","'+hashedPass+'","'+user.DNI+'","'+user.Apellidos+'", 1)';

        ingsoftwarePool.query(query, [user.Nombre,user.Correo,hashedPass,user.DNI,user.Apellidos,1], (error, result) => {
            if (!result) {
                console.log(query)
              reject(error)
                console.log(error)
            }else if(result){
                resolve(result);
            }


        });



    });
};



const SingIn = (S_correo,S_contrasena) => {
    return new Promise((resolve, reject) => {


        console.log(S_correo)
        console.log(S_contrasena)
        const query = 'SELECT count(*) FROM Usuarios WHERE Correo = "'+S_contrasena+'" AND  Contrasena = "'+S_correo+'" ';

        ingsoftwarePool.query(query, [S_correo,S_contrasena], (error, result) => {
            console.log(result)
            console.log(query)
            var ConsultaSQLTEXT = (JSON.stringify(result))
            var TextoRecortadoANumero = ConsultaSQLTEXT.slice(13,14)
            var NumeroAEvaluar = parseInt(TextoRecortadoANumero)

            //Evaluar existencia del usuario
            console.log("=============================")
            console.log(NumeroAEvaluar)
            if (NumeroAEvaluar == 0){


                console.log("USUARIO NO IDENTIFICADO")
                resolve("USUARIO NO IDENTIFICADO");

            }
            if(NumeroAEvaluar > 0){
                const sql = 'SELECT * FROM Usuarios WHERE Correo = "'+S_contrasena+'" ';
                ingsoftwarePool.query(sql,[S_correo],(error,resultdos) =>{

                    console.log(resultdos)
                    resolve(resultdos)
                    //resolve({empleado:id_empleado,correo:S_contrasena,sucursal:id_sucursal,S_nombre_empresa:S_nombre_empresa,empresa:id_empresa,user,I_icon:icon});
                })


            }






        });
    });
};


const GetToken = (User) => {
    return new Promise((resolve, reject) => {


        var id = {
            "id": User.id,
            "Tipo": User.Tipo
        }
        console.log("lalalalalal")
        console.log(id)
        const token = jwt.sign(id, process.env.JWT_SECRET);
        console.log(User)
        //Por ahora no esta configurado el refresh Token
        const arr = {
            "Refresh_token" : "No disponible para la configuración",
            "Token_provisional" : token,
            "Auth_Type" : "JWT_ENCODE AES"
        }
        resolve(arr)
    });
};


export default {

    SingIn,
    HashedPass,
    getHashedPassword,
    DetectIfUserExist,
    CreateUser,
    GetToken

};

