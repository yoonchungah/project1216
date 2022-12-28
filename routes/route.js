const express = require('express');
const router =  express.Router();
const multer  = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./../db.js');
const { json } = require('express');

//메인페이지
router.get('/', (req, res) => {
  res.render('main');
});

//브랜드 페이지
router.get('/brand',(req, res) => {
  res.render('brand'); 
});

//이벤트페이지
router.get('/event_list', (req, res) => {
  res.render('event_list');
});

//로그인페이지
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/writeLogin',(req, res) => {
  let param1 = JSON.parse(JSON.stringify(req.body));
  let login_id = param1['login_id'];
  let login_password = param1['login_password'];
  db.logincheck(login_id,login_password,(results)=>{
    if(results.length>0){
      res.send(`<script>alert("${login_id}님 환영합니다!"); document.location.href="/"</script>`)
    } else{
      res.send(`<script>alert("로그인 정보를 확인하세요"); document.location.href="/login"</script>`)
    }
  })
});

//조인페이지
router.get('/join', (req, res) => {
  res.render('join');
});
router.post('/writeJoin',(req, res) => {
  let param2 = JSON.parse(JSON.stringify(req.body));
  let join_id = param2['join_id'];
  let join_pw = param2['join_pw'];
  let join_name = param2['join_name'];
  let join_mail = param2['join_mail'];

  db.eriJoins(join_id,join_pw,join_name,join_mail,()=>{
    res.redirect('/');
  })
});










//공지 작성 페이지 불러오기
router.get('/notice_write', (req, res) => {
  res.render('notice_write');
});

//공지 작성 페이지 값 연결
router.post('/writeMemo',(req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let write_list_name = param['write_list_name'];
  let write_list_title = param['write_list_title'];
  let write_memo_cont = param['write_memo_cont'];
  db.insertMemo(write_list_name,write_list_title,write_memo_cont,()=>{
    res.redirect('/notice_list');
  })
});

//에리제론 공지 리스트페이지 불러오기
router.get('/notice_list', (req, res) => {
  db.getMemo((rows)=>{
    res.render('notice_list',{rows:rows}); 
  })
});


//에리제론 공지 뷰어페이지 연결
router.get('/notice_viewer', (req, res) => {
  let num = req.query.num;
  db.getMemoByid(num,(row)=>{
    res.render('notice_viewer',{row:row[0]})
  })
});


//집
//공지 수정 페이지 연결
router.post('/updates',(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let emend_num = param['emend_num']
  let emend_name = param['emend_name']
  let emend_title = param['emend_title'];
  let emend_memo_cont = param['emend_memo_cont'];
  db.updateMemo(emend_num,emend_name,emend_title,emend_memo_cont,()=>{
    res.redirect('/notice_list');
  })
})

//뷰어에 수정버튼 추가 후 연결
router.get('/updateM',(req, res) => {
  let num = req.query.num;
  db.getMemoByid(num,(row)=>{
    res.render('notice_write_emend',{row:row[0]})
  })
});

//뷰어에 삭제버튼 추가 후 연결
router.get('/deleteM',(req, res) => {
  let num = req.query.num;
  db.deleteByid(num,()=>{
    res.redirect('/notice_list')
  })
});









//1213 썸네일 페이지
//저장 공간 확보
const upload = multer({
  storage:multer.diskStorage({
    destination(req,file,done){
      done(null,'../public/uploads/');
    },
    filename(req,file,done){
      const ext = path.extname(file.originalname);
      done(null,path.basename(file.originalname,ext) + Date.now() + ext);
    }
  }),
  limits : {fileSize: 1024 * 1024 * 2}
})



//썸네일 작성 페이지 연결 thumwrite
router.get('/product_write', (req, res) => {
  res.render('product_write');
});

//productw -> thumwrite 파일의 폼 액션명
router.post('/productw',upload.single('thumpro_img'),(req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let thumpro_img = 'uploads/' + req.file.filename;
  //input name에 작성한 이름으로 연결
  let thumpro_name = param['thumpro_name'];
  let thumpro_tag = param['thumpro_tag'];
  let thumpro_price = param['thumpro_price'];
  db.insertproduct(thumpro_img,thumpro_name,thumpro_tag,thumpro_price,()=>{
    res.redirect('/product');
  })
})

//1214
//썸네일 올라간 화면을 출력해주는 페이지
//thumbnail 랑 같음
router.get('/product', (req,res)=>{
  //페이지 명 입력
  db.getproduct((rows)=>{
    res.render('product',{rows:rows});
  })
})

//삭제될 deletePro thumbnail 파일의 버튼에 있음
router.get('/deletePro',(req, res) => {
  let id = req.query.id;
  console.log(id)
  db.deleteByidpro(id,()=>{
    res.redirect('/product')
  })
});


//수정될 updatePro thumbnail 파일의 버튼에 있음
router.get('/updatePro',(req, res) => {
  let id = req.query.id;
  console.log(id)
  db.getproByid(id,(row)=>{
    //memoTable의 row의 0번째 즉 id를 지칭
    //row 한줄만 불러올때
    res.render('product_updata_write',{row:row[0]})
  })
});

//프로덕트 뷰어
router.get('/product_view', (req, res) => {
  let id = req.query.id;
  db.getproByid(id,(row)=>{
    res.render('product_view',{row:row[0]})
  })
});

// upproductw 썸네일 updata_product_write -> 폼 액션명 연결
router.post('/upproductw',upload.single('up_thumpro_img'), (req,res)=>{
  let param = JSON.parse(JSON.stringify(req.body));
  let up_thumpro_img = 'uploads/' + req.file.filename;
  console.log(up_thumpro_img);
  let up_thumpro_id = param['up_thumpro_id'];
  let up_thumpro_name = param['up_thumpro_name'];
  let up_thumpro_tag = param['up_thumpro_tag'];
  let up_thumpro_price = param['up_thumpro_price'];
  db.updateprowrite(up_thumpro_img,up_thumpro_id,up_thumpro_name,up_thumpro_tag,up_thumpro_price,()=>{
    res.redirect('/product');
  })
})

module.exports = router;