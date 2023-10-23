const counterStart = 1696648800; // Saturday, October 7, 2023 6:20:00 AM GMT+03:00
let tickerInterval: number;
const styles = `
#bthn {
  background: black;
  display: inline-block;
  position: absolute;
}

#bthn #bthnLink {
  display: inline-block;
  background: black;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
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
  margin: 10px;
}
#bthn .time-block .time {
  font-size: 28px;
  font-family: Arial Black, sans-serif;
}
#bthn #timeBlocks {
  display: flex; font-size: 12px;
}

#bthn #bthnTitle {
  font-size: 21px;
  margin-top: 3px;
  display: block;
}
#bthn #bthnSubtitle {
  margin-top: 6px;
  display:block;
}
`;

function getTimeBlock(title: string, value: number) {
  return `
    <div class="time-block">
      <div class="time">${value}</div>
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

  document.querySelector<HTMLDivElement>("#bthn")!.innerHTML = `
  <style>${styles}</style>
  <a id="bthnLink" target="_blank" href="https://stories.bringthemhomenow.net/">
    <div id="closeBthn">X</div>
    <div id="timeBlocks">
      ${getTimeBlock("days", days)}
      ${getTimeBlock("hours", hours)}
      ${getTimeBlock("minutes", minutes)}
      ${getTimeBlock("seconds", seconds)}
    </div>
    <div id="bthnSubtitle">Since being taken hostage by Hamas</div>
    <div id="bthnTitle">BRING THEM HOME <span style="color: red;">NOW</span></div>
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
