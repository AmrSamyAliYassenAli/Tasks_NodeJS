const StudentModel = require('../models/student.model');

GetAll = async ()=>{
    return await StudentModel.find();
}

GetById = async (id)=>{
    return await StudentModel.find({student_Id : id}).exec();
}

Add = async(model)=>{
    const Data = new StudentModel(model)
    await Data.save()
    return Data;
}

Update = async(id,model)=>{
    return await StudentModel.findByIdAndUpdate(id, model, {runValidators:true, new:true})
}

Delete = async(id)=>{
    return await StudentModel.findByIdAndDelete(id);
}

module.exports={
    GetAll,
    GetById,
    Add,
    Update,
    Delete
}