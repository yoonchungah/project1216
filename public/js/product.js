const sp_ball = document.getElementById("sp_ball");
let pos = sp_ball.offsetTop;

window.onscroll = function(){
   scrollMenu();
 }

let subMenu = document.querySelector('.sub_pro_menu')
function scrollMenu(){
   if(this.scrollY >= pos){ 
      subMenu.classList.add('scroll-menu');
    } else { 
      subMenu.classList.remove('scroll-menu')
    }

 }

