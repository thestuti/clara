const inputEl = document.getElementById("msg_send");
const divEl = document.createElement("div");
const msgWrapper = document.getElementById("msg");

function scroll() {
  const scrollMsg = msgWrapper;
  scrollMsg.scrollTop = scrollMsg.scrollHeight;
}

async function onMessage() {
  const inputMsg = inputEl.value;
  if (!inputMsg) return;

  const response = await axios.get(
    `https://api.monkedev.com/fun/chat?msg=${inputMsg}`
  );

  const responseData = JSON.stringify(response.data.response);
  const senderEl = document.createElement("div");
  const receiverEl = document.createElement("div");
  const senderMsgContainer = document.createElement("div");
  const incomingMsgContainer = document.createElement("div");

  senderEl.setAttribute("class", "right");
  receiverEl.setAttribute("class", "left");

  senderEl.innerText = inputMsg;
  receiverEl.innerText = responseData;

  msgWrapper.appendChild(senderMsgContainer);
  msgWrapper.appendChild(incomingMsgContainer);

  senderMsgContainer.appendChild(senderEl);
  incomingMsgContainer.appendChild(receiverEl);

  senderEl.value = "";

  scroll();
}

// for handling enter keypress or submits
const form = document.getElementById("message_form");

form.addEventListener("submit", (e) => {
  // preventing reloading of the document
  e.preventDefault();
  onMessage();
});
