// jwt 선언
const jwt = require('jsonwebtoken');

// 비밀번호 암호화 모듈 선언 
const bcrypt = require('bcrypt');

const statusCode = require('../services/error');

// 유저 데이터 베이스 선언
const { User } = require('../models');


// 회원가입 api
exports.signUp = async (req, res, next) => {
  try{
    const { id, password, name, nick, birthdate, gender, photoUrl, profileMessage } = req.body;
    // console.log("signUp - req.body: ", req.body);
	// 필수 데이터가 전부 왔는지 확인
    if( id && password && name && nick && birthdate && gender){
		// 데이터의 타입이 일치 하는 지 확인
		if(typeof id === "string" && typeof password === "string" && typeof name === "string" && typeof nick === "string" && typeof gender === "string"){
    		const hash = await bcrypt.hash(password, 12); // 비밀번호 암호화
    			await User.create({
    				id,
    				password,
    				name,
    				nick,
    				birthdate,
    				gender,
    				photoUrl,
    				profileMessage,
    		})
			return res.sendStatus(201);
		}else{
			const error = statusCode.BAD_REQUEST_TYPE_MISMATCH;
			return res.status(error.code).json({
				message: error.message
			})
		}
    }else{
		const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA;
		return res.status(error.code).json({
			message: error.message,
		})
	}
  } catch(error){
	return res.sendStatus(500);
  }
} 

// 이메일 중복확인 api
exports.emailDupChk = async(req, res, next)=>{
	try{
		const { email } = req.body;
		if(email){ // body 에 email이 담겨 있는지 확인
			if(typeof email === "string"){ // email의 타입이 제대로 됐는 지 체크
				const isDupEmail = await User.findOne({ where: { email }})
				if(isDupEmail){	// db에 이미 존재하는 email인지 확인
					const error = statusCode.BAD_REQUEST_EXIST_DATA;
					return res.status(error.code).json({
						message: error.message
					})
				}else{
					return res.sendStatus(200);
				}
				
			}else{
				const error = statusCode.BAD_REQUEST_TYPE_MISMATCH;
				return res.status(error.code).json({
					message: error.message
				})
			}
		}else{
			const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA;
			return res.status(error.code).json({
				message: error.message,
			})
		}
	}catch(error){
		return res.sendStatus(500);
	}	
}
// 아이디 중복확인 api
exports.idDupChk = async(req, res, next)=>{
	try{
		const { id } = req.body;
		if(id){
			if(typeof id === "string"){
				const isDupId = await User.findOne({ where: { id }})
				if(isDupId){
					const error = statusCode.BAD_REQUEST_EXIST_DATA;
					return res.status(error.code).json({
						message: error.message
					})
				}else{
					return res.sendStatus(200);
				}
				
			}else{
				const error = statusCode.BAD_REQUEST_TYPE_MISMATCH;
				return res.status(error.code).json({
					message: error.message
				})
			}
		}else{
			const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA;
			return res.status(error.code).json({
				message: error.message,
			})
		}
	}catch(error){
		return res.sendStatus(500);
	}	
}

// 닉네임 중복확인 api
exports.nickDupChk = async(req, res, next)=>{
	try{
		const { nick } = req.body;
		if(nick){
			if(typeof nick === "string"){
				const isDupNick = await User.findOne({ where: { nick }})
				if(isDupNick){
					const error = statusCode.BAD_REQUEST_EXIST_DATA;
					return res.status(error.code).json({
						message: error.message
					})
				}else{
					return res.sendStatus(200);
				}
				
			}else{
				const error = statusCode.BAD_REQUEST_TYPE_MISMATCH;
				return res.status(error.code).json({
					message: error.message
				})
			}
		}else{
			const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA;
			return res.status(error.code).json({
				message: error.message,
			})
		}
	}catch(error){
		return res.sendStatus(500);
	}	
}
// 로컬 로그인 api
exports.signIn = async (req, res, next) =>{
	try {
		const { id, password } = req.body;
		if( id && password ){	// id랑 password 값이 채워졌는지 확인
			if( typeof id === "string" && typeof password === "string"){	// id랑 passsword의 타입 확인
				const validId = await User.findOne({ where: { id }})
				if(validId){	// 존재하는 id인지 체크
					if(validId.deletedAt){
						const error = statusCode.BAD_REQUEST_DELETED_DATA
						return res.status(error.code).json({
							message: error.message,
						})
					}else{						b
						if(await bcrypt.compare(password, validId.password)){ // 해당 id의 password가 맞는 지 체크
							const token = jwt.sign({
								id: validId.id,
								nick: validId.nick
							  }, process.env.JWT_SECRET, {
								expiresIn: '30000m', // 테스트용이여서 일단 길게 했습니다. 
								issuer: 'todaymate',
							  });
							  res.cookie('token', token, {
								httpOnly: true
							  })
							return res.Status(200).json({
								message: '토큰 발급되었습니다.',
								token,
								id,
								nick,
								data: validId.photoUrl,
							});
						}else{
							const error = statusCode.BAD_REQUEST_NO_DATA;
							return res.status(error.code).json({
								message: error.message,
							})
						}
					}
				}else{
					const error = statusCode.BAD_REQUEST_NO_DATA
					return res.status(error.code).json({
						message: error.message,
					})
				}
			}else{
				const error = statusCode.BAD_REQUEST_TYPE_MISMATCH;
				return res.status(error.code).json({
					message: error.message,
				})
			}
		}else{
			const error = statusCode.BAD_REQUEST_INSUFFICIENT_DATA;
			return res.status(error.code).json({
				message: error.message,
			})
		}
	} catch (error) {
		return res.sendStatus(500);
	}
}

// 로컬 로그아웃 api // 여기부터 손봐야함!
exports.signOut = async(req, res, next) => {
	try {
		res.cookie('token', null,{
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true
		})
		res.sendStatus(200);
	} catch (error) {
		return res.sendStatus(404);
	}
}

// 인증번호 확인 api


