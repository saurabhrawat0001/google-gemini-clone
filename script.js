const APIKey = "AIzaSyC8sw2HzkE-4SQpBSfhsf-ejLSpBDPCfHc";

const APIURL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${APIKey}`;

function fetchResults(){
    let chat=document.getElementById("text-input").value;
    AppendMessage("user", chat);

    document.getElementById("text-input").value = "";
    document.getElementsByClassName("header")[0].style.display = "none";
    let chatArea = document.getElementById("chatArea");
    chatArea.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // document.getElementById("input").innerText=chat;
    // console.log(chat);   
    fetchApiResponse(chat);
}

// let inputarr = [];

// let outputarr = [];

async function fetchApiResponse(chat){
    //  document.getElementById("response").innerText = "Loading";
    const resp = await fetch(APIURL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: chat,
          },
        ],
      },
    ],
  }),
});

const response = await resp.json();
// console.log(response.candidates[0].content.parts[0].text);


AppendMessage("Gemini", response.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1"));

document.getElementById("loading").remove();

// inputarr.push(chat);

// outputarr.push(response.candidates[0].content.parts[0].text);

// console.log(inputarr);
// console.log(outputarr);

// for (let i = 0; i < inputarr.length; i++) {
//     document.getElementById("input").innerText=inputarr[i];
// }
// for (let i = 0; i < outputarr.length; i++) {
//     document.getElementById("response").innerText=outputarr[i];
// }

// document.getElementById("input").innerText=chat;
// document.getElementById("response").innerText=response.candidates[0].content.parts[0].text;
}



function AppendMessage(sender, chat){
  let chatArea = document.getElementById("chatArea");
  const msgElement = document.createElement("div");
  msgElement.className = `message ${sender}`;
  msgElement.innerHTML = `<p>${chat}</p>`;

  chatArea.appendChild(msgElement);
  if(sender==="user"){
    const loading = document.createElement("div");
    loading.className = "loading Gemini";
    loading.id = "loading";
    loading.innerText = "Loading";
    chatArea.appendChild(loading);
  }
}


function toggle(){
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  if(isDark){
  document.getElementById("theme-toggle").innerText = "☀️";
  }
  else{
    document.getElementById("theme-toggle").innerText = "🌙";
  }
}
