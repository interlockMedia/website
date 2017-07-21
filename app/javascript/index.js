import '../stylesheets/index.css';
import './common.js';

(function () {

    class SliderManager {
        constructor() {
            this.slides = document.querySelectorAll('.mission__scene');
            this.switches = document.querySelectorAll('.mission__switch label');
            this.currentSlide = 0;
            this.interval = null;

            this.slides.forEach((slide) => {
                slide.addEventListener('transitionend', () => this.changeSlide())
            });

            this.switches.forEach((s, sIndex) => {
                s.addEventListener('click', () => this.switchSlide(sIndex))
            });

            this.setSlideInterval()
        }

        showSlide() {
            this.slides[this.currentSlide].classList.add('mission__scene--showing');
        }

        hideSlide() {
            this.slides[this.currentSlide].classList.remove('mission__scene--showing');
        }

        nextSlide() {
            this.currentSlide++;
        }

        setSlideInterval() {
            this.interval = setInterval(() => {
                this.hideSlide();
                this.nextSlide();
            }, 8000);
        }

        changeSlide() {
            if (!this.slides[this.currentSlide].classList.contains('mission__scene--showing')) {

                if (this.currentSlide < this.slides.length - 1) {
                    this.showSlide();

                } else {
                    this.showSlide();
                    clearInterval(this.interval);
                    setTimeout(() => {
                        this.hideSlide();
                        this.currentSlide = 0;
                        this.setSlideInterval();
                    }, 14000)
                }
            }
        }

        switchSlide(labelIndex) {
            this.hideSlide();
            this.currentSlide = labelIndex;
            clearInterval(this.interval);
            this.setSlideInterval();

        }
    }

    let sliderManager = new SliderManager();

}());