const body = document.body;
const innerWidth = window.innerWidth;
const burgerBtn = document.querySelector(".burger");
const menu = document.querySelector(".header-nav-mobile");
const video = document.querySelector(".video");
const videoMask = document.querySelector(".video-mask");
const videoInner = document.querySelector(".container-video-inner");
const playVideoBtn = document.getElementById("playVideo");
const playFullscreenBtn = document.getElementById("fullscreenBtn");
const wedoCardImg = document.querySelectorAll('.wedo-item-img-outer');
const introTitleText = document.getElementById('intro-title');
const containerTitleText = document.getElementById('wedo-title');
const arrOfTitles = [
    {el: containerTitleText,
    content: containerTitleText.textContent}, 
    {el: introTitleText,
    content: introTitleText.textContent}
];
const introBgImage = document.querySelector(".intro-bg-image");
const servicesBgImage = document.querySelector(".services-intro-img");
const sliderItemWidth = document.querySelector(".slider-item").offsetWidth;
const sliderRow = document.querySelector(".slider-row");
const sliderBtnNext = document.querySelector(".slider-row-button-next");
const sliderBtnBefore = document.querySelector(".slider-row-button-before");
const modalTriggers = document.querySelectorAll('.slider-item-content');
const modalCloseTrigger = document.querySelectorAll('.close-btn');
const bodyBlackout = document.querySelectorAll('.modal-mask');
const modalRowBtn = document.querySelectorAll('.modal-images-row-item');
const modalImg = document.querySelectorAll(".modal-left-side-img");
const contactSendBtn = document.querySelector(".contact-send-btn");
const contactThanking = document.querySelector(".contact-thanking");

document.addEventListener("DOMContentLoaded", function(e) {
    checkUserId();
    typeWriter(arrOfTitles);
    burgerBtn.addEventListener("click", toggleMenu);
    playVideoBtn.addEventListener('click', watchVideo)
    playFullscreenBtn.addEventListener("click", watchFullscreen);
    sliderBtnNext.addEventListener("click", smoothScrollNext);
    sliderBtnBefore.addEventListener("click", smoothScrollBefore);
    contactSendBtn.addEventListener("click", showThanking);
    introTitleText.innerHTML = "";
    containerTitleText.innerHTML = "";
    
    window.addEventListener('scroll', function(){
        const innerDownPosition = window.scrollY + window.innerHeight;
        showCardImg(innerDownPosition);
    });
    
    document.addEventListener('mousemove', function(e) {
        const moveX = (e.pageX * -1 /15);
        const moveY = (e.pageY * -1 /15);
        introBgImage.style.backgroundPosition = `${moveX}px ${moveY}px`
    });
});


let defI = 0;
let txt = containerTitleText.textContent
let speed = 50; 
function typeWriter(containerTitleText) {
    if (defI < txt.length) {
        arrOfTitles.map((t, i) => t.el.innerHTML += t.content.charAt(defI));
        defI++;
        setTimeout(typeWriter, speed);
    }
}

function showThanking(e) {
    e.preventDefault();
    contactThanking.classList.remove('none');
}

modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const popupTrigger = trigger.dataset
        const triggerValue = popupTrigger.trigger
        const popupModal = document.querySelector(`[data-modal="${triggerValue}"]`)
        popupModal.classList.add('active');
        body.classList.add('no-scroll');

        modalCloseTrigger.forEach(el => el.addEventListener('click', () => {
            popupModal.classList.remove('active');
            body.classList.remove('no-scroll');
        }))

        bodyBlackout.forEach(el => el.addEventListener('click', () => {
            popupModal.classList.remove('active');
            body.classList.remove('no-scroll');
        }))
    })
})

modalRowBtn.forEach(item => {
    item.addEventListener('click', () => {
        const dataTrigger = item.dataset
        const triggerValue = dataTrigger.imageTrigger
        
        removeClassActive()
        const popupImage = document.querySelectorAll(`[data-image="${triggerValue}"]`).forEach(img => img.classList.add('active'))
    })
})

function showCardImg(innerDownPosition) {
    wedoCardImg.forEach(x => {
        if (innerDownPosition > x.offsetTop) {
            x.classList.add('animated');
            setTimeout(() => {
                wedoCardImg.forEach(x => x.classList.add('active'));
            }, 1000)
        }
    });   
}

function smoothScrollNext(e) {
    e.preventDefault();
    sliderRow.scrollTo({
    left: sliderRow.scrollLeft + sliderItemWidth * (innerWidth > 1650 ? 4 : 2),
    behavior: "smooth"
});
}

function smoothScrollBefore(e) {
    e.preventDefault();
    sliderRow.scrollTo({
    left: sliderRow.scrollLeft - sliderItemWidth * (innerWidth > 1650 ? 4 : 2),
    behavior: "smooth"
});
}

function toggleMenu() {
    menu.classList.toggle("active");
}

function removeClassActive() {
    modalImg.forEach(image => image.classList.remove('active'))
}

function watchVideo(e) {
    e.preventDefault();
    video.classList.add("animated");
    videoMask.classList.add("animated");
    videoInner.classList.add("animated");
    setTimeout(() => {
        video.classList.add("active");
        videoMask.classList.add("active");
        videoInner.classList.add("active");
        playFullscreenBtn.classList.add("active");
    }, 2000)
}

function watchFullscreen() {
  if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullScreen) {
    video.webkitRequestFullScreen();
  }  
}

function checkUserId() {
    if(localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === undefined) {
        const userId = generateUserId();
        localStorage.setItem("user_id", userId);
        return userId
    }
}

function generateUserId() {
   const length = 20;
   let result = '';
   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   let charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}