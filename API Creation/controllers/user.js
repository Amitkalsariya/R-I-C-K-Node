// const USER = require('../Models/user')
// const bcrypt = require('bcrypt')
// var jwt = require('jsonwebtoken')

// exports.SECURE = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization
//     console.log(token)
//     if (!token) {
//       throw new Error("You Are Not Login")
//     }
//     const checktoken = await jwt.verify(token, 'AMIT')
//     console.log(checktoken.user);
//     const newuser = await USER.findById(checktoken.user)
//     if (!newuser) {
//       throw new Error('You are not valid User')
//     }
//     next()


//   }
//   catch (err) {
//     res.status(404).json({
//       status: "Fail to Load",
//       error: err.message
//     })

//   }


//   exports.Allstud = async (req, res, next) => {
//     try {
//       const allStud = await USER.find()
//       // console.log(allStud);

//       res.status(200).json({
//         status: "Success",
//         data: allStud

//       })
//     } catch (err) {
//       res.status(404).json({
//         status: "Fail to Load",
//         error: err.message
//       })

//     }

//   }

//   exports.AddStud = async (req, res, next) => {
//     try {
//       console.log(req.body);

//       if (!req.body.id || !req.body.password) {
//         throw new Error("Please Enter Valid Information")
//       }
//       req.body.password = bcrypt.hashSync(req.body.password, 10)
//       const addstud = await USER.create(req.body)
//       // console.log(allStud);

//       res.status(200).json({
//         status: "Success",
//         data: addstud

//       })
//     } catch (err) {
//       res.status(404).json({
//         status: "Fail to Load",
//         error: err.message
//       })

//     }

//   }

//   exports.Loginstud = async (req, res, next) => {
//     try {
//       console.log(req.body);

//       if (!req.body.id || !req.body.password) {
//         throw new Error("Please Must Enter The Details")
//       }
//       const checkid = await USER.findOne({ id: req.body.id })
//       if (!checkid) {
//         throw new Error("Id is Not Found")
//       }

//       const checkpass = bcrypt.compareSync(req.body.password, checkid.password)
//       if (!checkpass) {
//         throw new Error("Password Not Found")
//       }
//       // console.log(allStud);

//       const token = await jwt.sign({ user1: checkid._id }, 'AMIT', {
//         expiresIn: '90d'
//       })

//       res.status(200).json({
//         status: "Success",
//         message: "Login Succesfully",
//         data: checkid, token

//       })
//     } catch (err) {
//       res.status(404).json({
//         status: "Fail to Load",
//         error: err.message
//       })

//     }
//   }

// }
const USER = require('../Models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.SECURE = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      throw new Error("You Are Not Logged In");
    }
    const checktoken = await jwt.verify(token, 'AMIT');
    console.log(checktoken.user);
    const newuser = await USER.findById(checktoken.user);
    if (!newuser) {
      throw new Error('You are not a valid User');
    }
    next();
  } catch (err) {
    res.status(404).json({
      status: "Fail to Load",
      error: err.message
    });
  }
};

exports.Allstud = async (req, res, next) => {
  try {
    const allStud = await USER.find();
    // console.log(allStud);
    res.status(200).json({
      status: "Success",
      data: allStud
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail to Load",
      error: err.message
    });
  }
};

exports.AddStud = async (req, res, next) => {
  try {
    console.log(req.body);

    if (!req.body.id || !req.body.password) {
      throw new Error("Please Enter Valid Information");
    }
    

    req.body.P_image=req.file.filename

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    console.log(req.body)
        const addstud = await USER.create(req.body);
    // console.log(allStud);

    res.status(200).json({
      status: "Success",
      data: addstud
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail to Load",
      error: err.message
    });
  }
};

exports.Loginstud = async (req, res, next) => {
  try {
    console.log(req.body);

    if (!req.body.id || !req.body.password) {
      throw new Error("Please Must Enter The Details");
    }

    const checkid = await USER.findOne({ id: req.body.id });
    if (!checkid) {

      
      throw new Error("Id is Not Found");
    }

    const checkpass = bcrypt.compareSync(req.body.password, checkid.password);
    if (!checkpass) {
      throw new Error("Password Not Found");
    }

    const token = await jwt.sign({ user: checkid._id }, 'AMIT', {
      expiresIn: '90d'
    });

    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      data: checkid,
     token
    });
    
  } catch (err) {
    res.status(404).json({
      status: "Fail to Load",
      error: err.message
    });
  }
};
