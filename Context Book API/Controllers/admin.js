const ADMIN=require('../Model/admin')

exports.Alladmin=async function(req, res, next) {
  try {
    const alladmin =await ADMIN.find()
    res.status(200).json({
      status:"Success For Get All Admin",
      data:alladmin

    })
  } catch (error) {
    res.status(404).json({
      status:"Failed To Load The Data",
      error:error.message
    })
  }
}
exports.New_admin=async function(req, res, next) {
    try {
      
      const newadmin =await ADMIN.create(req.body)
      res.status(200).json({
        status:"Success For Add New Admin",
        data:newadmin
  
      })
    } catch (error) {
      res.status(404).json({
        status:"Failed To Create The Admin",
        error:error.message
      })
    }
  }