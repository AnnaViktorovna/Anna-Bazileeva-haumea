document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");

    hamburger.addEventListener("click", toggleMenu);

    document.getElementById("checkbox").addEventListener("change", function () {
        if (this.checked) {
            document.body.classList.add("dark-mode");
            document.querySelector("header").classList.add("dark-mode");
            document.querySelector(".theme-switch").classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector("header").classList.remove("dark-mode");
            document
                .querySelector(".theme-switch")
                .classList.remove("dark-mode");
        }
    });

    const footer = document.createElement("footer");
    let today = new Date();
    let thisYear = today.getFullYear();
    let copyright = document.createElement("p");
    copyright.append(`Copyright Anna Bazileeva © ${thisYear}`);
    footer.appendChild(copyright);
    document.body.appendChild(footer);

    let skills = ["JavaScript", "HTML", "CSS", "GitHub"];
    let skillsSection = document.getElementById("skills");
    let skillsList = skillsSection.getElementsByTagName("ul")[0];
    skills.forEach((skill) => {
        let skillItem = document.createElement("li");
        skillItem.innerText = skill;
        skillsList.appendChild(skillItem);
    });

    let messageForm = document.querySelector("[name='leave_message']");
    let messageSection = document.getElementById("messages");
    let messageList = messageSection.querySelector("ul");

    function toggleMessageSectionVisibility() {
        if (messageList.children.length === 0) {
            messageSection.style.display = "none";
        } else {
            messageSection.style.display = "block";
        }
    }
    toggleMessageSectionVisibility();

    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let usersName = event.target.usersName.value;
        let usersMessage = event.target.usersMessage.value;
        let usersEmail = event.target.usersEmail.value;
        event.target.reset();

        let newMessage = document.createElement("li");
        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">${usersName}</a>
            <p>${usersMessage}</p>`;

        let removeButton = document.createElement("button");
        removeButton.innerText = "remove";
        removeButton.type = "button";
        removeButton.addEventListener("click", function () {
            const entry = removeButton.parentNode;
            entry.remove();
            toggleMessageSectionVisibility();
        });

        let editButton = document.createElement("button");
        editButton.innerText = "edit";
        editButton.type = "button";
        editButton.addEventListener("click", function () {
            let messageParagraph = newMessage.querySelector("p");
            if (editButton.innerText === "EDIT") {
                let currentMessage = messageParagraph.innerText;
                let newMessageInput = document.createElement("input");
                newMessageInput.type = "text";
                newMessageInput.value = currentMessage;
                newMessageInput.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        let editedMessage = newMessageInput.value;
                        messageParagraph.innerText = editedMessage;
                        newMessage.removeChild(newMessageInput);
                        editButton.innerText = "edit";
                    }
                });
                newMessage.appendChild(newMessageInput);
                editButton.innerText = "save";
            } else {
                let newMessageInput = newMessage.querySelector("input");
                let editedMessage = newMessageInput.value;
                messageParagraph.innerText = editedMessage;
                newMessage.removeChild(newMessageInput);
                editButton.innerText = "edit";
            }
        });

        newMessage.appendChild(removeButton);
        newMessage.appendChild(editButton);
        messageList.appendChild(newMessage);
        toggleMessageSectionVisibility();
    });

    const githubUsername = "AnnaViktorovna";
    fetch(`https://api.github.com/users/${githubUsername}/repos`)
        .then((response) => response.json())
        .then((repos) => {
            const projectSection = document.getElementById("projects");
            if (!projectSection) {
                console.error(
                    'The "projects" section does not exist in the DOM.'
                );
                return;
            }
            const projectList = projectSection.querySelector(".project-list");
            if (!projectList) {
                console.error(
                    'No <ul> element found within the "projects" section.'
                );
                return;
            }
            repos.forEach((repo) => {
                let project = document.createElement("li");
                let projectLink = document.createElement("a");
                projectLink.href = repo.html_url;
                projectLink.target = "_blank";
                projectLink.textContent = repo.name;

                let projectDescription = document.createElement("p");
                projectDescription.textContent =
                    repo.description || "No description available.";

                project.appendChild(projectLink);
                project.appendChild(projectDescription);
                projectList.appendChild(project);
            });
            console.log("GitHub Repositories:", repos);
        })
        .catch((error) => {
            console.error("Error fetching GitHub repositories:", error);
        });
});

function toggleMenu() {
    const navUl = document.getElementById("nav-list");
    if (navUl.classList.contains("show")) {
        setTimeout(() => navUl.classList.remove("show"));
    } else {
        setTimeout(() => navUl.classList.add("show"));
    }
}
