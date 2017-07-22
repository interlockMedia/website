import '../stylesheets/index.css';
import './common.js';


    class SliderManager {
        constructor() {
            this.slides = Array.from(document.querySelectorAll('.mission__scene'));
            this.firstSlide = document.querySelector('.mission__scene--showing');
            this.switches = document.querySelectorAll('.mission__switch span');
            this.intervals = [7000, 5000, 7000, 14000];
            this.checkedSwitchIndex = null;
            this.timeout = null;



            this.slides.forEach((slide, slideIndex) => {
                slide.addEventListener('transitionend', () => {

                    console.log(slide, slideIndex, this.slides,this.switches );
                    this.changeSlide(slideIndex, this.intervals[slideIndex])
                })
            });

            this.switches.forEach((s, switchIndex) => {
                s.addEventListener('click', () => {
                    clearTimeout(this.timeout);
                    this.checkedSwitchIndex = switchIndex;
                    this.hideSlide();
                    s.classList.add('checked');
                    }
                 )
            });

            this.timeout = setTimeout(() => {
                this.hideSlide();
            }, this.intervals[this.slides.indexOf(this.firstSlide)]);
        }

        showSlide(slideIndex) {
            console.log(this.slides,this.switches,slideIndex );
            this.slides[slideIndex].classList.add('mission__scene--showing');
            this.switches[slideIndex].classList.add('checked');
        }

        hideSlide() {
            this.slides.forEach((slide) => {
               slide.classList.remove('mission__scene--showing');
            });
            this.switches.forEach((s) => {
                s.classList.remove('checked');
            });
        }

        nextSlide(slideIndex) {
            if (this.checkedSwitchIndex === null) {
                return (slideIndex + 1)% this.slides.length
            } else {
                return this.checkedSwitchIndex
            }
        }

        changeSlide(slideIndex, int) {
                if (this.slides[slideIndex].classList.contains('mission__scene--showing')) {
                    this.timeout = setTimeout(() => {
                        this.hideSlide();
                    }, int)
                } else {
                    let nextSlide = this.nextSlide(slideIndex);
                    this.checkedSwitchIndex = null;
                    this.showSlide(nextSlide);
                }
        }
    }


window.addEventListener('load', () => setTimeout(()=>new SliderManager(), 1000));