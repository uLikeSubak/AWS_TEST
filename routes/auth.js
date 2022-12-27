// express 선언
const express = require('express');

// router 선언
const router = express.Router();

// 모델 선언
const { verifyToken } = require('./middlewares');
// const { auth } = require('../controllers/auth')


const { signUp, signIn, emailDupChk, idDupChk, nickDupChk, signOut} = require('../controllers/auth')


// 회원 가입 
router.post('/signUp', signUp);

// 이메일 중복 체크 
router.post('/emailChk', emailDupChk);

// 아이디 중복 체크
router.post('/usrIdCheck', idDupChk);

// 닉네임 중복 체크 
router.post('/nickChk', nickDupChk);

// 로그인
router.post('/signIn', signIn);

// 로그아웃 
router.get('/signOut', verifyToken, signOut);


// 로그아웃 api
// router.get('/signOut', verifyToken, async (req, res) => {
//   try {
//     res.cookie('token', null, {
//       expires: new Date(Date.now() + 10 * 1000),
//       httpOnly: true
//     })
//     res.sendStatus(200);
//   } catch (Error) {
//     return res.sendStatus(404);
//   }
// })


//=============================혼자 할 것================================//

// 회원가입 시 필요한 이메일 인증 절차 

// 인증번호 전송 api 
router.post('/sendCode', async (req, res)=>{
  
})


// 인증번호 일치 확인
router.get('/checkCode/:id', async (req, res)=>{

})



// 아이디 / 비밀번호 찾기 

// 구글 로그인

//  네이버 로그인

//  카카오 로그인



module.exports = router;