let adminPass = localStorage.getItem("adminPass");
let adminUnlocked = localStorage.getItem("adminUnlocked") === "true";

const adminAuth = document.getElementById("adminAuth");
const adminPanel = document.getElementById("adminPanel");

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

function shuffle() {
    if (!adminUnlocked) return alert("Admin access required");

      // existing shuffle logic...

        localStorage.setItem("locked", "true");
          localStorage.removeItem("adminUnlocked");
            locked = true;
              adminUnlocked = false;

                updateAdminUI();
                  alert("🎁 Shuffled & Locked forever!");
                  }
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

function adminLogin() {
  const input = document.getElementById("adminPassInput").value.trim();

    // First time: set passcode
      if (!adminPass) {
          if (input.length < 4) {
              alert("Passcode must be at least 4 digits");
              return;
          }
          localStorage.setItem("adminPass", input);
          localStorage.setItem("adminUnlocked", "true");
          alert("✅ Admin passcode set!");
      } 
      // Existing admin login
      else if (input === adminPass) {
          localStorage.setItem("adminUnlocked", "true");
      } 
      else {
          alert("❌ Wrong admin passcode");
          return;
      }

      adminUnlocked = true;
      updateAdminUI();
}

function updateAdminUI() {
  if (locked) {
      adminAuth.classList.add("hidden");
          adminPanel.classList.add("hidden");
              return;
                }

                  if (adminUnlocked) {
                      adminAuth.classList.add("hidden");
                          adminPanel.classList.remove("hidden");
                            } else {
                                adminAuth.classList.remove("hidden");
                                    adminPanel.classList.add("hidden");
                                      }
                                      }
updateAdminUI();                                                               


