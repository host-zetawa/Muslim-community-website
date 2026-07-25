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
    const response = await fetch(`${API_BASE}/members`);
    const data = await response.json();

    console.log("Members:", data);

    const grid = document.getElementById("members-grid");
    console.log("Grid:", grid);

    grid.innerHTML = "<h2 style='color:red'>TEST</h2>";

    data.forEach(member => {
 grid.innerHTML += `
<div class="abc123">
    <h2>${member.fullName}</h2>
    <p>${member.role}</p>
</div>
`;
    });
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
                <div class="member-card">

                    <div class="member-photo admin-avatar">
                        ${admin.name.charAt(0).toUpperCase()}
                    </div>

                    <h3>${admin.name}</h3>

                    <p>${admin.role}</p>

                    <button
                        class="profile-btn"
                        data-id="${admin._id}"
                        data-type="admin"
                    >
                        View Profile
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

            initials.textContent = person.name
                ? person.name.split(" ").map(x => x[0]).join("").substring(0,2)
                : person.fullName.split(" ").map(x => x[0]).join("").substring(0,2);

            nameText.textContent = person.name || person.fullName;

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