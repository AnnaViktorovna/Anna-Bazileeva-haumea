document.addEventListener('DOMContentLoaded', function() { 
    const footer = document.createElement('footer')
// footer.textContent = 'HAUMEA 2024'


let today = new Date();
let thisYear =  today.getFullYear();
let copyright = document.createElement('span');
copyright.textContent = "Copyright ";

const fullname = document.createElement('span');
fullname.textContent = "Anna Bazileeva ";

let unicode = document.createElement('span');
unicode.textContent = " © ";

footer.appendChild(copyright);
footer.appendChild(fullname); 
footer.appendChild(unicode)
footer.append(` ${thisYear}`)

document.body.appendChild(footer)
})

let skills = ["JavaScript", "HTML", "CSS", "GitHub"];
let skillsSection = document.getElementById('skills');
let skillsList = skills.getElementById('ul')

for(let i = 0; i < skills.length; i++ ) {
    let skill = document.createElement('li');

    skill.innerText = skills[i];

    skillsList = appendChild[skill];
}
