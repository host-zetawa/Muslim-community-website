// ===============================
// Mobile Navigation
// ===============================

const navToggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".main-nav-list");

if (navToggle && navMenu) {

    navToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

// ===============================
// Smooth Scrolling
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});
let members = {};
let admins = {};

const API_BASE = "https://muslim-community.onrender.com/api";

async function fetchMembers() {

    try {

        const response = await fetch(`${API_BASE}/members`);

        if (!response.ok) throw new Error("Failed to fetch members");

        const data = await response.json();

        members = {};

        const grid = document.getElementById("members-grid");

        grid.innerHTML = "";

        data.forEach(member => {

            members[member._id] = member;

            grid.innerHTML += `
<div class="community-card">

    <div class="card-strip"></div>

    <div class="avatar">
        <img
            src="${member.photo || "assets/default-avatar.png"}"
            alt="${member.fullName || member.name || "Member"}"
            class="member-photo"
        >
        <span class="status"></span>
    </div>

    <h3 class="member-title">${member.fullName || member.name || "Member"}</h3>

    <div class="designation">${member.role}</div>

    <div class="info">
        <p><span>☎</span> ${member.phone || "Not Available"}</p>
        <p><span>✉</span> ${member.email || "Not Available"}</p>
        <p><span>📅</span> ${member.joining || member.dateOfJoining || "Not Available"}</p>
    </div>

    <button
        class="profile-btn"
        data-id="${member._id}"
        data-type="member">
        View Profile >
    </button>

</div>
`;

        });

        attachProfileEvents();

    } catch (err) {

        console.error(err);

    }

}

async function fetchAdmins() {

    try {

        const response = await fetch(`${API_BASE}/admin`);

        if (!response.ok) throw new Error("Failed to fetch admins");

        const data = await response.json();

        admins = {};

        const grid = document.getElementById("admin-grid");

        grid.innerHTML = "";

        data.forEach(admin => {

            admins[admin._id] = admin;

            grid.innerHTML += `
<div class="community-card">

    <div class="card-strip"></div>

    <div class="avatar green">
        ${admin.photo ? `<img src="${admin.photo}" alt="${admin.name}" class="member-photo">` : admin.name.charAt(0).toUpperCase()}
        <span class="status"></span>
    </div>

    <h3 class="member-title">${admin.name}</h3>

    <div class="designation">${admin.role}</div>

    <div class="info">
        <p><span>☎</span> ${admin.phone || "Not Available"}</p>
        <p><span>✉</span> ${admin.email || "Not Available"}</p>
        <p><span>📅</span> ${admin.joining || admin.dateOfJoining || "Not Available"}</p>
    </div>

    <button
        class="profile-btn"
        data-id="${admin._id}"
        data-type="admin">
        View Profile >
    </button>

</div>
`;

        });

        attachProfileEvents();

    } catch (err) {

        console.error(err);

    }

}

const overlay = document.getElementById("popupOverlay");

const avatar = document.getElementById("popupAvatar");

const initials = document.getElementById("popupInitials");

const nameText = document.getElementById("popupName");

const message = document.getElementById("popupMessage");

const about = document.getElementById("popupAbout");

const responsibilities = document.getElementById("popupResponsibilities");

const phone = document.getElementById("popupPhone");

const email = document.getElementById("popupEmail");

const date = document.getElementById("popupdate");
function attachProfileEvents() {

    document.querySelectorAll(".profile-btn").forEach(button => {

        button.onclick = () => {

            const type = button.dataset.type;
            const id = button.dataset.id;

            const person = type === "admin"
                ? admins[id]
                : members[id];

            if (!person) return;

            const displayName = person.fullName || person.name || "Member";
            initials.textContent = displayName.split(" ").map(x => x[0]).join("").substring(0,2);

            if (person.photo) {
                avatar.innerHTML = `<img src="${person.photo}" alt="${displayName}" class="popup-avatar-image">`;
            } else {
                avatar.innerHTML = `<span id="popupInitials">${initials.textContent}</span>`;
            }

            nameText.textContent = displayName;

            message.textContent = "";

            about.textContent = "";

            phone.textContent = person.phone || "—";

            email.textContent = person.email || "—";

            date.textContent =
                person.joining ||
                person.dateOfJoining ||
                person.createdAt ||
                "";

            responsibilities.innerHTML = "";

            overlay.classList.add("active");

        };

    });

}

document.getElementById("popupButton").onclick=()=>{

    overlay.classList.remove("active");

};

document.getElementById("closePopup").onclick=()=>{

    overlay.classList.remove("active");

};

overlay.addEventListener("click",(e)=>{

    if(e.target===overlay){

        overlay.classList.remove("active");

    }

});

document.addEventListener("DOMContentLoaded", async () => {

    await fetchAdmins();

    await fetchMembers();

});