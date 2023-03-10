//헤더 햄버거 메뉴
let mobile_menu = document.querySelector('.mobile_menu');
let navbar_menu = document.querySelector('.navbar_menu');

mobile_menu.addEventListener('click', ()=>{
   navbar_menu.classList.toggle('active');
   mobile_menu.classList.toggle('line_active');
});



//메인 1스크립트
var swiper = new Swiper(".keySwiper", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

//메인 2 
let newPro = document.querySelectorAll('.new_img');
  for(let i = 0; i<newPro.length; i++){
    newPro[i].addEventListener('mouseenter',()=>{
      newPro[i].classList.add('new_img_fadeout');
    });
  newPro[i].addEventListener('mouseleave',()=>{
    newPro[i].classList.remove('new_img_fadeout');
    });
}


//메인 4 스와이퍼
var swiper = new Swiper(".best_pro", {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  loop: true,
  //breakpoints: object,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".next_button",
    prevEl: ".prev_button",
  },
  breakpoints: {
    1401: {//1401 이상일 경우
      spaceBetween: 30, //slidesPerview 여백
      slidesPerView: 4, //레이아웃 뷰 개수
      slidesPerGroup: 4,
    },
    1001:{ //1000이상일 경우
      spaceBetween: 15,
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
    0:{
      spaceBetween: 20,
      slidesPerView: 2,
      slidesPerGroup: 2,
    }
  }
});



// 메인6 
var swiper = new Swiper(".main6_sns", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  loopFillGroupWithBlank: true,
  breakpoints: {
    1401: {//1401 이상일 경우
      spaceBetween: 30, 
      slidesPerView: 5, 
    },
    1001:{ //1000이상일 경우
      spaceBetween: 15,
      slidesPerView: 4,
      pagination: {
        el: ".pagination_but",
        clickable: true,
      },
    
    },
    0:{
        spaceBetween: 10,
        slidesPerView: 3,
        pagination: {
          el: ".pagination_but",
          clickable: true,
        },
      }
    },
    
});