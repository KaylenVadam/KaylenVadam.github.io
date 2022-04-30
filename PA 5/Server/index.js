//Libraries
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');
const express = require('express');
const multer  = require('multer');
const { check, checkSchema, validationResult } = require('express-validator');
const surveyResponce = require('./Model/surveyResponce');

//Setup defaults for script
const app = express();
app.use(cors());
app.use(express.static('public'));
const storage = multer.diskStorage({
    //Logic where to upload file
    destination: function (request, file, callback) {
        callback(null, 'uploads/')
    },
    //Logic to name the file when uploaded
    filename: function (request, file, callback) {
      callback(null, file.originalname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ 
    storage: storage,
    //Validation for file upload
    fileFilter: (request, file, callback) => {
        const allowedFileMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        callback(null, allowedFileMimeTypes.includes(file.mimetype));
    }
    
});
const port = 80 //Default port to http server
const connection =  mysql.createConnection({
    host: "bsu-gimm260-fall-2021.cwtgn0g8zxfm.us-west-2.rds.amazonaws.com",
    user: "SamuelGragg",
    password: "DuHj2IbkoGujstSR5qADsKOdvv3lPHTPHNO",
    database: "SamuelGragg"
});

app.get('/results/', upload.none(), (request, response) => {
    connection.query('SELECT * FROM halo_infinite_survey', (error, result) => {
        if (error)  {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                
                .json({message: 'Something went wrong with the server.'});
        } else {
            //Default response object
            response
                
                .json({data: result});
    }});
});

app.get('/get_results/:id/', upload.none(), (request, response) => {
    connection.query('SELECT * FROM halo_infinite_survey WHERE id = ?', [request.params.id], (error, result) => {
        if (error)  {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .json({message: 'Something went wrong with the server.'});
        } else {
            //Default response object
            response
                .json({data: result});
                console.log(result);
                
        }
    });
});

//The * in app.* needs to match the method type of the request
app.post(
    '/survey-responce/', 
    //Should be the name of the 'file' field in the request
    upload.fields([{name: 'file', maxCount: 1}]),
    //Validation for 'favorite weapon' field in request
    check('FavoriteWeapon', 'Please enter your favorite weapon.').isLength({min: 3}),
     //Validation for 'worst weapon' field in request
     check('WorstWeapon', 'Please enter your least favorite weapon.').isLength({min: 3}),
        //Validation for 'gameinput' field in request
    check('gameInput', "Please select either Mouse or Controller.")
    .isIn(['Mouse', 'Controller']),
    //Validation for 'favvehicle' field in request
    check('favVehicle', "Please select your Favorite Vehicle.")
    .isIn(['Banshee', 'Chopper', 'Ghost', 'Gungoose', 'Mongoose', 'Razerback', 'Rockethog', 'Scorpian', 'Warthog', 'Wasp', 'Wraith']),
           //Validation for 'ranked or casual' field in request
    check('playstyle', "Please select either ranked or casual.")
    .isIn(['casual', 'ranked']),
    //Validation for 'favability' field in request
    check('favAbility', "Please select your Favorite Ability.")
    .isIn(['Grapple', 'Repulser', 'Thruster', 'Dropwall', 'Threat']),
    //Validation for 'favBoss' field in request
    check('favBoss', "Please select your Favorite Boss.")
    .isIn(['Tremonius', 'Chak‘Lok', 'Bassus', 'AdjutantResolution', 'TovarusandHyperius', 'Jega‘Rdomnai', 'Escharum', 'TheHarbinger']),
    //Validation for 'file' field in request
    checkSchema({
        'file': {
            custom: {
                options: (value, {req, path}) => !!req.files[path],
                errorMessage: 'Please upload an image file.',
            },
        },
    }),
    async (request, response) => {
        //Validate request; If there any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
        const submittedInfo = request.body;
        submittedInfo.file = request.files.file[0].filename;
        console.log(request.files);
        //console.log(submittedInfo);
        const submittedFile = request.files.file[0]
        //console.log(request.files)
        //console.log(request.files.file[0].filename)
        

        

        try{
            console.log(request.body)
            await surveyResponce.insert(submittedInfo);
        } catch (error) {
            console.log(error)
            return response
                .status(500) //Error code when something goes wrong with the server
                
                .json({message: 'Something went wrong with the server.'});
        }

        //Default response object
        response
            .status(200)
            
            .json({
                message: 'Request fields and files are valid.', 
                success: submittedInfo,
                file: submittedFile,
            });
});

app.put(
    '/newResponce/', 
    //Should be the name of the 'file' field in the request
    upload.fields([{name: 'file', maxCount: 1}]),
    //Validation for 'favorite weapon' field in request
    check('FavoriteWeapon', 'Please enter your favorite weapon.').isLength({min: 3}),
     //Validation for 'worst weapon' field in request
     check('WorstWeapon', 'Please enter your least favorite weapon.').isLength({min: 3}),
        //Validation for 'gameinput' field in request
    check('gameInput', "Please select either Mouse or Controller.")
    .isIn(['Mouse', 'Controller']),
    //Validation for 'favvehicle' field in request
    check('favVehicle', "Please select your Favorite Vehicle.")
    .isIn(['Banshee', 'Chopper', 'Ghost', 'Gungoose', 'Mongoose', 'Razerback', 'Rockethog', 'Scorpian', 'Warthog', 'Wasp', 'Wraith']),
           //Validation for 'ranked or casual' field in request
    check('playstyle', "Please select either ranked or casual.")
    .isIn(['casual', 'ranked']),
    //Validation for 'favability' field in request
    check('favAbility', "Please select your Favorite Ability.")
    .isIn(['Grapple', 'Repulser', 'Thruster', 'Dropwall', 'Threat']),
    //Validation for 'favBoss' field in request
    check('favBoss', "Please select your Favorite Boss.")
    .isIn(['Tremonius', 'Chak‘Lok', 'Bassus', 'AdjutantResolution', 'TovarusandHyperius', 'Jega‘Rdomnai', 'Escharum', 'TheHarbinger']),
    //Validation for 'file' field in request
    checkSchema({
        'file': {
            custom: {
                options: (value, {req, path}) => !!req.files[path],
                errorMessage: 'Please upload an image file.',
            },
        },
    }),
    async (request, response) => {
        //Validate request; If there any errors, send 400 response back
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            return response
                .status(400)
                
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
        const submittedInfo = request.body;
        submittedInfo.file = request.files.file[0].filename;
        console.log(request.files);
        const submittedFile = request.files.file[0]
        //const submittedFile = request.files.file[0].file
        //console.log(request.files)
        //console.log(request.files.file[0].filename)
        

        try{
            console.log(request.body)
            await surveyResponce.update(submittedInfo);
        } catch (error) {
            console.log(error)
            return response
                .status(500) //Error code when something goes wrong with the server
                
                .json({message: 'Something went wrong with the server.'});
        }

        //Default response object
        response
            .status(200)
            
            .json({
                message: 'Request fields and files are valid.', 
                success: submittedInfo,
                file: submittedFile,
            });
            
        
});

app.post('/unneededResponce/', upload.none(), (request, response) => {
    const deleteSql = 'DELETE FROM halo_infinite_survey WHERE id = ?'  //The ? and query parameters here make sure there is no sql injection. The id is passed in delete.html. 
    queryParameters = [
                    request.body.url_id,
                    ];

    connection.query(deleteSql, queryParameters, (error, result) => {
        if (error)  {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({message: 'Something went wrong with the server.'});
        } else {
            //Default response object
            response
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({message: 'Form submission was succesful!'});
    }});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})