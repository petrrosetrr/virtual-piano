'use strict';

// Piano
const piano = document.querySelector('.piano');
const keys = document.querySelectorAll('.piano-key');

let sounds = new Map([
    ['a', new Audio( 'assets/audio/a.mp3')],
    ['a♯', new Audio('assets/audio/a♯.mp3')],
    ['b', new Audio('assets/audio/b.mp3')],
    ['c', new Audio('assets/audio/c.mp3')],
    ['c♯', new Audio('assets/audio/c♯.mp3')],
    ['d', new Audio('assets/audio/d.mp3')],
    ['d♯', new Audio('assets/audio/d♯.mp3')],
    ['e', new Audio('assets/audio/e.mp3')],
    ['f', new Audio('assets/audio/f.mp3')],
    ['f♯', new Audio('assets/audio/f♯.mp3')],
    ['g', new Audio('assets/audio/g.mp3')],
    ['g♯', new Audio('assets/audio/g♯.mp3')]]
);

const keyListener = (event) => {
    event.target.classList.add('piano-key-active');
    sounds.get(event.target.dataset.note).currentTime = 0;
    sounds.get(event.target.dataset.note).play();
}

const addListeners = (e) => {
    if (e.target.matches('.piano-key'))
    {
        keyListener(e);
        keys.forEach(elem => {
            elem.addEventListener('mouseenter',keyListener);
        });
    }
};

const removeListeners = (e) => {
    keys.forEach(elem => {
        elem.classList.remove('piano-key-active');
        elem.removeEventListener('mouseenter', keyListener);
    });
};

piano.addEventListener('mousedown',addListeners, false);
document.addEventListener('mouseup', removeListeners);

const togglers = document.querySelector('.btn-container')
togglers.addEventListener('click', (e) => {
    if ((e.target.matches('.btn-notes') || e.target.matches('.btn-letters')) && !e.target.matches('.btn-active'))
    {
        togglers.querySelectorAll('.btn').forEach((elem) => {
            elem.classList.toggle('btn-active');
        });
        keys.forEach((elem) => {
            elem.classList.toggle('letter')
        })
    }
});

//Piano keyboard
const keyboardKeyListener = (event) => {
    if (!event.repeat) {
    keys.forEach((elem) => {
        if (event.code === `Key${elem.dataset.letter}`) {
            elem.classList.toggle('piano-key-active');
            if (event.type === 'keydown')
            {
                sounds.get(elem.dataset.note).currentTime = 0;
                sounds.get(elem.dataset.note).play();
            }
            return;
        }
    })
    }
}

document.addEventListener('keydown', keyboardKeyListener);
document.addEventListener('keyup', keyboardKeyListener);

//Fullscreen
const fullscreenBtn = document.querySelector('.fullscreen');

fullscreenBtn.addEventListener('click', () => {
    (document.fullscreenElement) ? document.exitFullscreen() : document.body.requestFullscreen();
});
