import '../stylesheets/index.css';
import './common.js';

//modal function
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//paypal input placeholder
$( "#myMessage" ).attr('placeholder',$('.donate-now input[type="radio"]:checked').val());
$( ".donate-now input[type=\"radio\"]" ).click(function() {
    $( "#myMessage" ).attr('placeholder',$(this).val());
    $( "#myMessage" ).attr('value',$(this).val());
});



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
            return (slideIndex + 1) % this.slides.length
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


window.addEventListener('load', () => setTimeout(() => new SliderManager(), 1000));

class VideoManager {
    constructor() {
        this.featuredFilmsSection = document.querySelector('.featured-films');
        this.videoContainerArray = Array.from(document.querySelectorAll('.featured-films__video-container'));
        this.featuredVideoImgArray = Array.from(document.querySelectorAll('.featured-films__img'));
        this.featuredVideoDescriptionArray = Array.from(document.querySelectorAll('.featured-films__description'));
        this.playBtnArray = Array.from(document.querySelectorAll('.featured-films__play_btn'));
        this.navBtnArray =Array.from(document.querySelectorAll('.featured-films__description__nav a'));
        this.featuredFilmArticleArray = Array.from(document.querySelectorAll('.featured-films article'));
        this.showMoreBtn = document.querySelector('.show-more-btn');
        this.showLessBtn = document.querySelector('.show-less-btn');
        this.descriptionDetailsShowed = true;


        this.featuredVideoArray = ['<iframe src="https://player.vimeo.com/video/212800490?autoplay=1&title=0&byline=0&portrait=0" width="1365" height="721" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                                   '<iframe src="https://player.vimeo.com/video/157872559?autoplay=1&title=0&byline=0&portrait=0" width="1365" height="768" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
                                   '<iframe src="https://player.vimeo.com/video/161210772?autoplay=1&title=0&byline=0&portrait=0" width="1365" height="768" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'];

        this.playBtnArray.forEach((playBtn, index) => {
            playBtn.addEventListener('click', () => this.playVideo(index));
        });

        this.navBtnArray.forEach((navBtn) => {
            navBtn.addEventListener('click', ()=> {
                this.showMoreBtn.classList.remove('featured-films__details-btn--show');
                this.showLessBtn.classList.remove('featured-films__details-btn--show');
                this.stopVideo();
                let index =  navBtn.dataset.videoIndex;
                this.changeVideo(index);
            })
        });

        this.showMoreBtn.addEventListener('click', () => {
            this.showMoreBtn.classList.remove('featured-films__details-btn--show');
            this.showMoreDetails();
        });

        this.showLessBtn.addEventListener('click', () => {
            this.showLessBtn.classList.remove('featured-films__details-btn--show');
            this.showLessDetails();
        });

        this.featuredVideoDescriptionArray.forEach((featuredVideoDescription) => {
            featuredVideoDescription.addEventListener('transitionend', () => {
                if (this.descriptionDetailsShowed) {
                    this.showMoreBtn.classList.add('featured-films__details-btn--show');
                    this.descriptionDetailsShowed = false;
                } else {
                    this.showLessBtn.classList.add('featured-films__details-btn--show');
                    this.descriptionDetailsShowed = true;
                }
            });
        });

    }

    showMoreDetails() {
        this.featuredVideoDescriptionArray.forEach((featuredVideoDescription) => {
            featuredVideoDescription.classList.remove('featured-films__description--slide-left');
        })
    }

    showLessDetails() {
        this.featuredVideoDescriptionArray.forEach((featuredVideoDescription) => {
           featuredVideoDescription.classList.add('featured-films__description--slide-left');
        });
    }

    hideImage() {
       this.featuredVideoImgArray.forEach((featuredVideoImg) => featuredVideoImg.style.display = 'none');
       this.playBtnArray.forEach((playBtn) => playBtn.style.display = 'none');
       this.showLessDetails();
    }

    showImage(index) {
        this.featuredVideoImgArray[index].style.display = 'block';
        this.playBtnArray[index].style.display = 'block';
    }

    changeVideo(index) {
    this.featuredFilmsSection.style.backgroundColor = '#10222b';
    this.featuredFilmArticleArray.forEach((featuredFilmArticle) => featuredFilmArticle.classList.remove('featured-films--showing'));
    this.featuredFilmArticleArray[index].classList.add('featured-films--showing');
        this.showImage(index);
    }

    playVideo(index) {
        this.hideImage();
        this.featuredFilmsSection.style.backgroundColor = '#000';
        this.videoContainerArray[index].style.display = 'block';
        this.videoContainerArray[index].innerHTML = this.featuredVideoArray[index];
    }

    stopVideo() {
        this.videoContainerArray.forEach((videoContainer) => {
            videoContainer.style.display = 'none';
            videoContainer.innerHTML = '';
        })
    }
}

window.addEventListener('load', () => new VideoManager());

