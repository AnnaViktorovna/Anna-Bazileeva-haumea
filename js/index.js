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
    let skillsList = skillsSection.getElementsByTagName('ul')[0];

for (let i = 0; i < skills.length; i++) {
    
    let skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}
});