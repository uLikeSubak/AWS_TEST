const statusCode = require('../services/error');


const { AttendList, Post } = require('../models');


exports.getAcceptList = async (req ,res ,next)=> {
  try {
    if(req.params.postId){  // check postId 
      const acceptList= await AttendList.findAll({
		  where: { PostId: req.params.postId },
	    })
    return res.status(200).json({
      message: "Request Success",
      acceptList,
    })
    }else{
      const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA
      return res.status(error.code).json({
        message: error.message
      })
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};



exports.getMyAcceptList = async(req, res, next)=>{
  try {
    if(req.params.postId && req.params.userId){
      const checkAttend = await AttendList.findOne({
        where: { PostId: req.params.postId, UserId: req.params.userId }
      });
      if(checkAttend === null){
        return res.status(200).json({
          success:0,
        });
      }else{
        return res.status(200).json({
          success: 1
        });
      }
    }else{
      const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA
      return res.status(error.code).json({
        message: error.message,
      })
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.joinPost = async(req, res, next)=>{
  try {
    
  } catch (error) {
    
  }
};

exports.cancelJoin = async(req, res, next)=>{
  try {
    
  } catch (error) {
    
  }
};


