const statusCode = {
  
  BAD_REQUEST_INSUFFICIENT_DATA:{
    code: 400,
    messasge: "Lack of Required Data"
  },
  
  BAD_REQUEST_TYPE_MISMATCH:{
    code: 400,
    message: "Data Type is Mismatched"
  },
  
  BAD_REQUEST_DELETED_DATA:{
    code: 400,
    message: "Request Data is already Deleted"
  },
  
  BAD_REQUEST_EXIST_DATA:{
    code: 400,
    message: "Already Existed Data!"
  },

  BAD_REQUEST_NO_DATA:{
    code: 400,
    message: "There is No Data to Response"
  },

  UNAUTHORIZED_ERROR:{
    code: 401,
    message: "Not Allowed User"
  },

  FORBIDDEN_ERROR:{
    code: 403,
    message: "Request is Not Allowed"
  },

  TOKEN_EXPIRED_ERROR:{
    code: 419,
    message: "Token is Expired, Please Reissued"
  },

  NOT_FOUND_ERROR:{
    code: 404,
    message: "Bad URL Request"
  },
  
}