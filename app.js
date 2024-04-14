const sendButton = document.querySelector(".submit");
const stopButton = document.querySelector(".stop");
const statusHead = document.querySelector(".status");

sendButton.onclick= function sendClick(){ startSending();}
stopButton.onclick=function stopClick(){ stopSending();}

let sending=false;

function access(){
    if(navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position){
        console.log("WORKING");
    })
}
function sendLoop(){ 
    if(sending)
    {setTimeout(function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            statusHead.innerHTML = "Geolocation is not supported by this browser.";
          }
        sendLoop();
    },20000);
    }
}

const stopSending=()=>{
sending=false;
}
const startSending =()=>{
    sending = true;
    sendLoop();
}

async function showPosition(position) {
    await axios.get(`https://api.thingspeak.com/update?api_key=SU76DSSV2YVTLK7Y&field1=${position.coords.latitude}&field2=${position.coords.longitude}`).then((res)=>{
        console.log(res);
    })
    document.querySelector(".latitude").innerHTML = "Latitude: " + position.coords.latitude;

    document.querySelector(".longitude").innerHTML ="Longitude: " + position.coords.longitude;
  }