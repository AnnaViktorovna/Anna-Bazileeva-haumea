document.addEventListener("DOMContentLoaded", function () {
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

    for (let i = 0; i < skills.length; i++) {
        let skill = document.createElement("li");

        skill.innerText = skills[i];

        skillsList.appendChild(skill);
    }

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

        console.log(usersName, usersEmail, usersMessage);

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

            if (editButton.innerText === "edit") {
                let currentMessage = messageParagraph.innerText;
                let newMessageInput = document.createElement("input");
                newMessageInput.type = "text";
                newMessageInput.value = currentMessage;

                newMessageInput.addEventListener("keydown", function (event) {
                    if (event.key === "Enter") {
                        let editedMessage = messageParagraph.value;
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
});
