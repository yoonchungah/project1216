//클릭했을때 실행되어야하는 함수명
//e, event, evt 모두 이벤트를 가르킨다 tabName는 매개변수 event_tab1,event_tab2 가 들어갈것이다 하나는 이벤트가 되고 하나는 탭1이 될것이다
function tabOpen(event, tabName){
  
  let eventTabCont = document.getElementsByClassName('event_tab_cont');
  for(i = 0; i < eventTabCont.length; i++){
    eventTabCont[i].style.display = 'none'; 
  }
  document.getElementById(tabName).style.display= "block";
  
  let eventTabLink = document.getElementsByClassName("event_tab_link");
  for(i = 0; i < eventTabLink.length; i++ ){
    eventTabLink[i].className = eventTabLink[i].className.replace(' event_active','');
  }
  event.currentTarget.className += ' event_active';
}