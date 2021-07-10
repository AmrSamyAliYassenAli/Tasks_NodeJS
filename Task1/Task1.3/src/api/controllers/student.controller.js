const StudentServices = require('../services/student.service');
const ResponseBuilder = require('../Infrastructure/Response/ResponseBuilder');
const StudentValidation = require('../validations/Student.validations');
const ValidationMassages = require('../../config/constants/ValidationMassages');

//#region Student CRUD
Get = async(req,res)=>{
    try{
        const id = req.params.id;

        if(id<=0){  // GetAll
            const data = await StudentServices.GetAll();
            if(!data){
                res.status(404).send(ResponseBuilder.Create(false,ValidationMassages.FaildRetriveData,null));
            }
            else{
                res.status(200).send(ResponseBuilder.Create(true,ValidationMassages.ScessfullyRetrived,data));
            }
        }
        else{ // GetById
            if(StudentValidation.IsValidId(id)){
                res.status(200).send(ResponseBuilder.Create(true,ValidationMassages.ScessfullyRetrived,await StudentServices.GetById(id)));
            }
            else{
                res.status(404).send(ResponseBuilder.Create(false,ValidationMassages.FaildRetriveData+`Student Id:${id} is NotFound`,null));
            }
        }
    }
    catch(error){
        res.status(500).send(ResponseBuilder.Create(false,ValidationMassages.FaildLoadingData,error));
    }
}

Manage = async(req,res)=>{
    try{
        if(StudentValidation.IsValidModel(req.body))
        {
            if(req.body.student_Id <= 0){ // Add
                res.status(200).send(ResponseBuilder.Create(true,ValidationMassages.ScessfulyInserted, await StudentServices.Add(req.body)));
            }
            else{ //Update
                res.status(200).send(ResponseBuilder.Create(true,ValidationMassages.ScessfulyUpdated, await StudentServices.Update(req.body.student_Id,req.body)));
            }
        }
        else{
            res.status(500).send(ResponseBuilder.Create(false,`Student model ${ValidationMassages.IsNotValidDataModel}`,null));
        }        
    }
    catch(error){
        res.status(500).send(ResponseBuilder.Create(false,ValidationMassages.FaildLoadingData,error));
    }
}

Delete = async(req,res)=>{
    try{
        const id = req.params.id;
        if(StudentValidation.IsValidId(id)){
            res.status(200).send(ResponseBuilder.Create(true,ValidationMassages.ScessfullyRetrived,await StudentServices.Delete(id)));
        }
        else{
            res.status(404).send(ResponseBuilder.Create(false,ValidationMassages.FaildRetriveData+`Student Id:${id} is NotFound`,null));
        }
    }
    catch(error){
        res.status(500).send(ResponseBuilder.Create(false,ValidationMassages.FaildLoadingData,error));
    }
}

//#endregion


module.exports={
    Get,
    Manage,
    Delete
}