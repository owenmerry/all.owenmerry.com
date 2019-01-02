class App {
    constructor(){
        console.log('start app...');

        // elements
        this.DOM = {el:document.querySelector('body')};
        this.DOM.app = this.DOM.el.querySelectorAll('.app');


        // settings
        this.direction = 'next';
        this.animationLock = false;
        this.config = {
            animation: {
                speed: {fast: 0.3, medium: 0.5, slow: 0.7},
                ease: {power01: 'Power2.easeInOut', quint01: 'Quint.easeOut'}
            }
        };
        this.current = 0;

        //photos db
        this.photos = [
            'alan-king-319143-unsplash.jpg',
            'alex-iby-317332-unsplash.jpg',
            'brunel-johnson-381896-unsplash.jpg',
            'candice-picard-808304-unsplash.jpg',
            'freestocks-org-197295-unsplash.jpg',
            'tamara-bellis-262617-unsplash.jpg',
            'tamara-bellis-427162-unsplash.jpg',
        ];

        //start animations
        this.startStage();
    }


    startStage(){
        var tlIntro = new TimelineMax({onComplete: () => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        this.setImage();

            tlIntro
            .from(this.DOM.logo,this.config.animation.speed.fast,{
                top: '-10em',
            },0)
            .from(this.DOM.controls,this.config.animation.speed.fast,{
                bottom: '-10em',
            },.5)
            .from(this.DOM.info,this.config.animation.speed.fast,{
                top: '-10em',
            },.6)
            .from(this.DOM.image,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .50)
            .from(this.DOM.bg,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .6)
            .from(this.DOM.title,this.config.animation.speed.slow,{
                left: '150%',
                transform: 'skewX(30deg)',
            },.5 + .3)
            ;
        
    }


/****
 * helpers
 */

    

}

const app = new App();

// const nextSlide = function(){
//     app.nextSlide();
// }
