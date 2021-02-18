const servicesBgImage = document.querySelector(".services-intro-img");
const servicesCardTitle = document.querySelectorAll(".services-item-title");
const introTitleText = document.getElementById('services-intro-title');
const introSubTitleText = document.getElementById('services-intro-subtitle');

document.addEventListener("DOMContentLoaded", function (e) {
    servicesBgImage.style.transform = `scale(1.3)`;
    typeWriter();
    subTitleWriter();
    introTitleText.innerHTML = "";
    introSubTitleText.innerHTML = "";

    window.addEventListener('scroll', function () {
        const innerDownPosition = window.scrollY + window.innerHeight;
        showCardTitle(innerDownPosition);
    });
});

document.addEventListener('mousemove', function(e) {
    const moveX = (e.pageX * -1 /15);
    const moveY = (e.pageY * -1 /15);
    servicesBgImage.style.transform = `scale(1.3) translate3d(${moveX}px, ${moveY}px, 0)`;
});

let defI = 0;
let introTextContent = introTitleText.textContent;
let speed = 50; 
function typeWriter() {
    if (defI < introTextContent.length) {
        introTitleText.innerHTML += introTextContent.charAt(defI);
        defI++;
        setTimeout(typeWriter, speed);
    }
}

let defSubI = 0;
let introSubTextContent = introSubTitleText.textContent;
let speedSub = 20; 
function subTitleWriter() {
    if (defSubI < introSubTextContent.length) {
        introSubTitleText.innerHTML += introSubTextContent.charAt(defSubI);
        defSubI++;
        setTimeout(subTitleWriter, speedSub);
    }
}

function showCardTitle(innerDownPosition) {
    servicesCardTitle.forEach(x => {
        if (innerDownPosition > x.offsetTop) {
            x.classList.add('animated');
            setTimeout(() => {
                servicesCardTitle.forEach(x => x.classList.add('active'));
            }, 1000)
        }
    });   
}