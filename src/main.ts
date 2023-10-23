import { texts } from "./texts";

const counterStart = 1696648800; // Saturday, October 7, 2023 6:20:00 AM GMT+03:00
let tickerInterval: number;
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap');

#bthn {
  background: black;
  background: linear-gradient(180deg, #2F2929 0%, #111 100%);
  display: inline-block;
  position: fixed;
  bottom: 30px;
  left:50px;
  box-shadow: 0px 4.76599px 5.56032px 0px rgba(0, 0, 0, 0.20);
  padding: 3px;
  border-radius: 11px;
  z-index: 9999;
  direction:ltr;
  box-sizing: content-box;
  
}
#bthn[lang=he] {
  right:50px;
  left:auto;
}

#bthn #bthnLink {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  text-decoration: none;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  border-radius: 11px;
  border: 0.794px solid #867F8A;
  font-weight: 700;
}

#bthn #closeBthn {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  z-index: 10;
  padding: 10px;
}

#bthn .time-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 5px;
}
#bthn .time-block .time {
  font-size: 35px;
  font-family:  "Open Sans", Arial, Helvetica, sans-serif;
  display: flex;
  gap: 3px;
}
#bthn .time-block .time .digit {
  background-color:#626060;
  border-radius: 3px;
  line-height: 1;
  padding: 6px 9px;
  margin-bottom:5px;
  color:white;
  width: 0.6em;
}
#bthn #timeBlocks {
  display: flex; 
  font-size: 12px;
  align-items: center;
  text-transform: uppercase;
  align-items: center;
  color:#AFAFAF;
}
#bthn #timeBlocks .dots {
  font-size: 22px;
  line-height:1;
  // font-weight:bold;
  margin-bottom: 0.6em;
}
#bthn .title-wrap{
  display:flex;
  flex-direction:column;
  align-items:stretch;
}

#bthn #bthnTitle {
  font-size: 22px;
  margin-top: 3px;
}
#bthn #bthnSubtitle {
  margin-bottom: 6px;
  display:block;
  font-size:19px;

}
#bthn[lang=he] #bthnSubtitle {
  font-size:22px;
}


#bthn #bthnSubtitle .red-bg {
  background-color:#E82900

}

@media (max-width: 768px) {
  #bthn {
    max-width:calc(100% - 30px);
    left:15px;
    
  }
  #bthn[lang=he] {
    right:15px;
    
  }
  #bthn .time-block .time {
    font-size: 26px;

  }
}
`;

function getTimeBlock(title: string, value: number) {
  const firstDigitasString = value.toString().padStart(2, "0")[0];
  const secondDigitasString = value.toString().padStart(2, "0")[1];

  return `
    <div class="time-block">
      <div class="time">
        <span class="digit">${firstDigitasString}</span>
        <span class="digit">${secondDigitasString}</span>
      </div>
      <div>${title}</div>
    </div>
  `;
}

function updateTicker() {
  const then = new Date(counterStart * 1000);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - then.getTime();

  // Calculate time differences
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const injectionHtml = document.querySelector<HTMLDivElement>("#bthn");
  // get lang attribute from injectionHtml
  const lang = injectionHtml?.getAttribute("lang");
  const locale = lang === "he" ? "he" : "en";

  injectionHtml!.innerHTML = `
  <style>${styles}</style>
  <a id="bthnLink" target="_blank" href="https://stories.bringthemhomenow.net/">
    <div id="closeBthn" role="button" tabindex="0">X</div>
    <div id="bthnSubtitle">${texts[locale]["subtitle1"]} <span class="red-bg">${
    texts[locale]["subtitle2"]
  }</span> ${texts[locale]["subtitle3"]}</div>
    <div id="timeBlocks">
      ${getTimeBlock(texts[locale]["days"], days)}
      <span class="dots">:</span>
      ${getTimeBlock(texts[locale]["hours"], hours)}
      <span class="dots">:</span>
      ${getTimeBlock(texts[locale]["minutes"], minutes)}
      <span class="dots">:</span>
      ${getTimeBlock(texts[locale]["seconds"], seconds)}
    </div>
    <div class="title-wrap">
    <div id="bthnTitle">${
      texts[locale]["title1"]
    } <span style="color: #E82900;">${texts[locale]["title2"]}</span>
   
  </div>
    <img src="https://bringthemhomenow.net/underline.svg" alt="underline" style="width: 100%; height: auto;"/>

  </div>
  </a>
`;

  // Add event listener to the close button
  const closeElem = document.querySelector("#closeBthn");
  if (closeElem) {
    closeElem.addEventListener("click", closeTicker);
  }
}

function closeTicker(event: any) {
  event.preventDefault();
  event.stopPropagation();

  const tickerElem = document.querySelector<HTMLDivElement>("#bthn");
  if (tickerElem) {
    tickerElem.remove();
  }
  clearInterval(tickerInterval);
}

function setupCounter() {
  updateTicker();
  tickerInterval = setInterval(updateTicker, 1000);
}

setupCounter();
