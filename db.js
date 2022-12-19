var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '1234',
  database : 'eri',
  dateStrings : 'date'
});

connection.connect(function(err){
  if (err) throw err;
  console.log("connected!")
})

//join 연결
function eriJoins(join_id,join_pw,join_name,join_mail,callback){
  connection.query(`INSERT INTO joins (id,pw,name,mail) VALUES ('${join_id}','${join_pw}','${join_name}','${join_mail}')`,(err)=>{
    if (err) throw err;
    callback();
  })
}

//login 연결
function logincheck(login_id,login_password,callback){
  connection.query(`SELECT * FROM joins WHERE id = '${login_id}' AND pw = '${login_password}'`,(err,results)=>{
    if (err) throw err;
    callback(results);
  })
}




//에리제론 db테이블 추출
function getMemo(callback){
  connection.query('SELECT * FROM erinotice ORDER BY num desc',(err,rows)=>{
    if (err) throw err;
    callback(rows);
  })
}

//에리제론 db테이블 입력
function insertMemo(write_list_name,write_list_title,write_memo_cont,callback){
  connection.query(`INSERT INTO erinotice (wirte,Date,title,cont) VALUES
    ('${write_list_name}',NOW(),'${write_list_title}','${write_memo_cont}')`,(err) => {
    if (err) throw err;
    callback();
  })
}
/*
num
title
cont
wirte
Date
*/
//에리제론 프라이머리키 일치하는 테이블만 추출
function getMemoByid(num, callback){
  connection.query(`SELECT * FROM erinotice WHERE num = ${num}`, (err,row)=>{
    if (err) throw err;
    callback(row);
  })
}
//에리제론 프라이머리키 일치하는 부분 수정
function updateMemo(emend_num,emend_name,emend_title,emend_memo_cont,callback){
  connection.query(`UPDATE erinotice SET Date= now(),wirte='${emend_name}',title='${emend_title}',cont='${emend_memo_cont}' WHERE num =${emend_num}`,(err)=>{
    if (err) throw err;
    callback();
  })
}

//프라이머리키 일치하는 부분 삭제
function deleteByid(num,callback){
  connection.query(`DELETE FROM erinotice WHERE num=${num}`,(err)=>{
    if (err) throw err;
    callback();
  })
}

//1213
/*
id
create_time
title
tag
price
img 
*/
//프로덕트 테이블 추출
function getproduct(callback){
  connection.query(`SELECT * FROM product1 ORDER BY id`,(err,row)=>{
    if (err) throw err;
    callback(row);
  })
}

//프로덕트 라이트 페이지에 데이터를 추가하겠디
function insertproduct(thumpro_img,thumpro_name,thumpro_tag,thumpro_price,callback){
  connection.query(`INSERT INTO product1(create_time,img,title,tag,price) value 
  (NOW(),'${thumpro_img}','${thumpro_name}','${thumpro_tag}','${thumpro_price}')`,(err)=>{
    if (err) throw err;
    callback();
  })
}

//1214
//id 일치하는 데이터 추출
function getproByid(id, callback){
  connection.query(`SELECT * FROM product1 WHERE id = ${id}`, (err,rows)=>{
    if (err) throw err;
    callback(rows);
  })
}

//id일치하는 데이터 삭제
function deleteByidpro(id,callback){
  connection.query(`DELETE FROM product1 WHERE id=${id}`,(err)=>{
    if (err) throw err;
    callback();
  })
}

//id일치하는 데이터 수정
function updateprowrite(up_thumpro_img,up_thumpro_id,up_thumpro_name,up_thumpro_tag,up_thumpro_price,callback){
  connection.query(`UPDATE product1 SET create_time= now(),img='${up_thumpro_img}',title='${up_thumpro_name}',tag='${up_thumpro_tag}',price='${up_thumpro_price}' WHERE id =${up_thumpro_id}`,(err)=>{
    if (err) throw err;
    callback();
  })
}

module.exports = {
  eriJoins,logincheck,
  getMemo,insertMemo,getMemoByid,updateMemo,deleteByid,
  getproduct,insertproduct,getproByid,updateprowrite,deleteByidpro
}