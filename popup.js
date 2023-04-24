const btn = document.querySelector(".changeColorBtn");

let content = document.querySelector(".content");

chrome.runtime.onMessage.addListener((request,sender,sendResponse) => {

  let res = request.docTitleText;

  console.log(res);

  if(res != null){

    content.innerHTML = res;

  }

  else{

    alert("No data found");
  }


});

btn.addEventListener("click", async () => {

  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({

    target: { tabId: tab.id },
    function: scrapeJudgement

  });
});


function scrapeJudgement(){

  let judgement = document.querySelectorAll(".article");

  let docTitleText = judgement[0].innerText;

  // alert(docTitleText);

  chrome.runtime.sendMessage({docTitleText});
}