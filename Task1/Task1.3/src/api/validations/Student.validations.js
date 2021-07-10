const StudentModel = require('../models/student.model');

class StudentValidation{
    static IsValidId = async (id)=>{
        const data = await StudentModel.find({student_Id:id}).exec();
        if(data == null || data== false) return false;
        else return true;
    }
    
    static IsValidModel = (model)=>{
        // Validation logic will be implemented here
        return true;
    }
}


module.exports=StudentValidation;