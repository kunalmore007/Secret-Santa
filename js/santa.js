let users = JSON.parse(localStorage.getItem("users")) || [];
let map = JSON.parse(localStorage.getItem("map")) || {};
let locked = localStorage.getItem("locked") === "true";
let currentUser = null;

const list = document.getElementById("userList");

function render(){
  list.innerHTML="";
  users.forEach(u=>{
    let li=document.createElement("li");
    li.innerHTML=`${u.name}<span>PIN: ${u.pin}</span>`;
    list.appendChild(li);
  });
}
render();

function addUser(){
  if(locked) return alert("Already locked!");
  const name = nameInput.value.trim();
  if(!name || users.some(u=>u.name===name)) return;

  users.push({name, pin: Math.floor(1000+Math.random()*9000), used:false});
  localStorage.setItem("users", JSON.stringify(users));
  render();
}

function shuffle(){
  if(users.length < 3) return alert("Minimum 3 participants!");
  let names = users.map(u=>u.name), shuffled;

  do {
    shuffled = [...names].sort(()=>Math.random() - 0.5);
  } while(shuffled.some((n,i)=>n===names[i]));

  names.forEach((n,i)=> map[n]=shuffled[i]);

  localStorage.setItem("map", JSON.stringify(map));
  localStorage.setItem("locked", "true");
  locked = true;

  alert("🎁 Shuffled & Locked!");
}

function prepareReveal(){
  const u = users.find(
    x => x.name === rName.value.trim() && x.pin == rPin.value.trim()
  );
  if(!u || u.used) return alert("Invalid or already revealed");

  currentUser = u;
  gift.classList.remove("hidden");
}

function openGift(){
  currentUser.used = true;
  localStorage.setItem("users", JSON.stringify(users));

  gift.classList.add("hidden");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>🎄 You got</h2>
    <h1>${map[currentUser.name]}</h1>
    <p>Keep it secret 🤫</p>
  `;
}
