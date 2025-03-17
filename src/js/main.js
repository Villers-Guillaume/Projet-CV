import {settings as s} from "./settings.js";

//Constantes
const motionButtonElement = document.getElementById(s.idMotion);
const noMotionElement = document.getElementById(s.idNoMotion);
const menuButtonElement = document.getElementById(s.idMenuButton);
const navElement = document.querySelector("nav");
const videoElement = document.getElementById(s.idVideo);
const spanTitles = document.querySelectorAll(s.classTitleSpan);
const circleElement = document.getElementById(s.idCercle);
const stepImgs = document.querySelectorAll(s.classStepImg);
const pElements = document.querySelectorAll(s.classPfade);
const ulSkillsButtonElement = document.getElementById(s.idSkillsButton);
const ulSkillLogos = document.getElementById(s.classSkillLogoUl);
const ulSkillInfos = document.getElementById(s.classSkillInfoUl);
//Variables
let options = {
    root: null,
    threshold: 0.3,
}
let options2 = {
    root: null,
    threshold: 0.7,
}
let observerTitleElement = new IntersectionObserver(titleFadeClassAdd, options);
let observer = new IntersectionObserver(transitionDelayClassAdd, options);
let observerStepImg = new IntersectionObserver(radialFadeIn, options2);
let observerP = new IntersectionObserver(pFadeIn, options2);

//Fonctions
function titleFadeClassAdd(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            const spans = entry.target.children;
            for (const span of spans) {
                span.classList.add(s.classTitleFade);
            }
        }
    }
}

function transitionDelayClassAdd(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            entry.target.classList.add(s.classFadeOpacity);
        }
    }
}

function radialFadeIn(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            entry.target.style.setProperty("--radius", "100%");
            entry.target.style.setProperty("--gradient-length", "0px");
        }
    }
}

function pFadeIn(entries) {
    for (const entry of entries) {
        if (entry.isIntersecting === true) {
            entry.target.classList.add(s.classTitleFade);
        }
    }
}

function observerTitle() {
    spanTitles.forEach(function (spanTitle) {
        observerTitleElement.observe(spanTitle);
    })
}

function observeStepImg() {
    stepImgs.forEach(function (stepImg) {
        observerStepImg.observe(stepImg);
    })
}

function observePElement() {
    pElements.forEach(function (pElement) {
        observerP.observe(pElement);
    });
}

function getSkillsButton() {
    const liSkills = ulSkillsButtonElement.children;
    let allButtons = [];
    for (const liSkill of liSkills) {
        const buttons = liSkill.children;
        allButtons = allButtons.concat([...buttons]);
    }
    return allButtons;
}
function checkVideoState() {
    if (!noMotionElement.classList.contains(s.classHidden)) {
        videoElement.pause();
        videoElement.removeAttribute("autoplay");
        [...stepImgs,...pElements,...spanTitles,circleElement].forEach(element =>{
            element.style.animation = 'none';
            element.style.transition = 'none';
            element.style.opacity = '1';
        });
    } else {
        videoElement.play();
    }
}
function motion() {
    motionButtonElement.addEventListener('click', () => {
        noMotionElement.classList.toggle(s.classHidden);
        checkVideoState();
    });

    noMotionElement.addEventListener('click', () => {
        noMotionElement.classList.toggle(s.classHidden);
        checkVideoState();
    });
}
function activateMenu() {
    menuButtonElement.addEventListener('click',()=>{
        navElement.classList.toggle(s.classActive);
    })
}
function handleClickSkills() {
    const liSkillLogos = Array.from(ulSkillLogos.children);
    const liSkillInfos = Array.from(ulSkillInfos.children);
    const buttons = getSkillsButton();
    for (const button of buttons) {
        button.addEventListener("click", () => {
            const buttonSkillClass = button.classList[0];
            buttons.forEach(button => button.classList.remove(s.classActive));
            button.classList.add(s.classActive);

            liSkillLogos.forEach(liSkillLogo => liSkillLogo.classList.remove(s.classActive));
            liSkillLogos.forEach(liSkillLogo=>{
                if (liSkillLogo.classList.contains(buttonSkillClass)) {
                    liSkillLogo.classList.add(s.classActive)
                }
            })
            liSkillInfos.forEach(liSkillInfo => liSkillInfo.classList.remove(s.classActive));
            liSkillInfos.forEach(liSkillInfo=>{
                if (liSkillInfo.classList.contains(buttonSkillClass)) {
                    liSkillInfo.classList.add(s.classActive);
                }
            })
        })
    }
}
//Instructions

observer.observe(circleElement);
observerTitle();
observeStepImg();
observePElement();
motion();
activateMenu()
handleClickSkills();
