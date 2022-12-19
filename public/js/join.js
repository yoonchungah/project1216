function Validation(){
   var RegExp = /^[a-zA-Z0-9]{4,12}$/;
   var e_RegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
   var n_RegExp = /^[가-힣]{2,15}$/;
   
   var objId = document.getElementById("id"); //아이디
   var objPwd = document.getElementById("pwd"); //비밀번호
   var objrepw = document.getElementById("repw"); //비밀번호확인
   var objName = document.getElementById("name"); //이름
   var objEmail = document.getElementById("mail");//메일


   // ================ ID 유효성검사 ================ //
   if(objId.value==''){
    alert("ID를 입력해주세요.");
    return false;
    }
    if(!RegExp.test(objId.value)){ //아이디 유효성검사
        alert("ID는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");        
        return false;
    }

     // ================ PASSWORD 유효성검사 ===============//
     if(objPwd.value==''){ // 비밀번호 입력여부 검사
        alert("Password를 입력해주세요.");
        return false;
    }
    if(!RegExp.test(objPwd.value)){ //패스워드 유효성검사
        alert("Password는 4~12자의 영문 대소문자와 숫자로만 입력하여 주세요.");
        return false;
    }
    if(objPwd.value==objId.value){ //패스워드와 ID가 동일한지 검사
        alert("Password는 ID와 동일하면 안됩니다.");
        return false;
    }

    if(objrepw.value!=objPwd.value){ //비밀번호와 비밀번호확인이 동일한지 검사
        alert("비밀번호가 틀립니다. 다시 확인하여 입력해주세요.");
        return false;
    }
   
    // ================ 이름 유효성검사 ================ //        
    if(objName.value ==''){
        alert("이름을 입력해주세요.");
        return false;
    }
    if(!n_RegExp.test(objName.value)){
        alert("특수문자,영어,숫자는 사용할수 없습니다. 한글만 입력하여주세요.");
        return false;
    }

    // ================ email 유효성검사 ================ //
    if(e_RegExp.value == ''){ // 이메일 입력여부 검사
        alert("이메일을 입력해주세요.");
        return false;
    }

    if(!e_RegExp.test(objEmail.value)){ //이메일 유효성 검사
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }
}