const inputEl = document.getElementById("msg_send");
const divEl = document.createElement("div");
const msgWrapper = document.getElementById("msg");
const replyBtn = document.getElementById("reply");

function scroll() {
  const scrollMsg = msgWrapper;
  scrollMsg.scrollTop = scrollMsg.scrollHeight;
}

function init() {
  let res_elm = document.createElement("div");
  res_elm.innerHTML =
    "Hello Myself Clara. A chatbot developed by Stuti  , How can I help you?";
  res_elm.setAttribute("class", "left");
  msgWrapper.appendChild(res_elm);
}

async function onMessage(e) {
  e.preventDefault();
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

replyBtn.addEventListener("click", onMessage);
