let time = 300;
let now = new Date();

function countdown(){
    now.setHours(0,0,0,0);
    now.setSeconds(time);    
    console.log(now.toLocaleTimeString({hc: 'h24'}))
    time ? (time -= 1):timeOut();
}

let timer = setInterval(countdown, 1000);

function timeOut(){
    clearInterval(timer);
    console.log('¡Time Out!');
}

