




class App {
    constructor(){
        console.log('start app...');

        // elements
        this.DOM = {el:document.querySelector('body')};
        this.DOM.app = this.DOM.el.querySelectorAll('.app');
        this.DOM.logo = this.DOM.el.querySelector('.logo');
        this.DOM.info = this.DOM.el.querySelectorAll('.info');
        this.DOM.follow = this.DOM.el.querySelector('.follow');
        this.DOM.links = this.DOM.el.querySelectorAll('.box a');



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
        this.unlockAnimation();
        this.buildStage();
        this.startStage();
        this.startListeners();
    }

    buildStage(){
        this.DOM.links.forEach((link) => {
            if(this.hasLinkDataImage(link)){
                //create element
                var newElement = document.createElement('div');
                newElement.appendChild(document.createTextNode('image'));
                link.appendChild(newElement);
                link.querySelector('div').classList.add('hover-image');
            }
        });
    }


    startStage(){
        var tlIntro = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

            tlIntro
            .from(this.DOM.logo,this.config.animation.speed.fast,{
                top: '-10em',
            },0)
            .from(this.DOM.info,this.config.animation.speed.fast,{
                top: '-10em',
            },.6)
            .from(this.DOM.follow,this.config.animation.speed.fast,{
                top: '-10em',
            },.6)
            ;
        
    }

    startListeners(){

        this.mouseenterFn = (ev) => {
            const follow = this.getFollow(ev);
            follow.style.display = `block`;
            !this.isAnimationLocked() && this.showFollow(ev);
        }

        this.mousemoveFn = (ev) => {
            this.moveFollow(ev);
        }

        this.mouseleaveFn = (ev) => {
            this.hideFollow(ev);
        }

        this.DOM.links.forEach((link) => {
            if(this.hasLinkDataImage(link)){
                link.addEventListener('mouseenter', this.mouseenterFn);
                link.addEventListener('mouseleave', this.mouseleaveFn);
                link.addEventListener('mousemove', this.mousemoveFn);
            }
        });

        //this.DOM.el.addEventListener('mousemove', this.mousemoveFn);

    }


    moveFollow(ev){
        const follow = this.getFollow(ev);
        const pos = this.getPosition(ev);
        follow.style.top = pos.top;
        follow.style.left = pos.left;

        // var tlm = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        //     tlm
        //     .to(this.DOM.follow,this.config.animation.speed.fast,{
        //         top: pos.top,
        //         left: pos.left,
        //     },0)
        //     ;
    }

    showFollow(ev){
        const follow = this.getFollow(ev);
        //this.lockAnimation();
        //ev.toElement.querySelector('.hover-image')
        follow.style.border = "2px solid blue";
        var tls = new TimelineMax({onComplete: () => this.unlockAnimation(),repeat:0,ease: this.config.animation.ease.power01});

        tls
        .add('begin')
        .add(new TweenMax(follow, this.config.animation.speed.fast, {
            ease: Sine.easeOut,
            width: '10em',
            autoAlpha: 1,
        }), 'begin')
        ;
    }

    hideFollow(ev){
        const follow = this.getFollow(ev);
       // this.lockAnimation();
       
        var tlh = new TimelineMax({onComplete: () => this.unlockAnimation(),repeat:0,ease: this.config.animation.ease.power01});

        tlh
        .to(follow,this.config.animation.speed.fast,{
            width: '0em',
            autoAlpha: 0,
        },0)
        ;
    }


/****
 * helpers
 */


    getPosition(ev){
        const mousePos = this.getMousePos(ev);
        const docScrolls = {
            left : document.body.scrollLeft + document.documentElement.scrollLeft, 
            top : document.body.scrollTop + document.documentElement.scrollTop
        };
        const elementTop = `${mousePos.y+20-docScrolls.top}px`;
        const elementLeft = `${mousePos.x+20-docScrolls.left}px`; 

        return { left : elementLeft, top : elementTop }
    }

    // get mouse position
    getMousePos(e){
        let posx = 0;
        let posy = 0;
        if (!e) e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY) 	{
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x : posx, y : posy }
    }

    lockAnimation(){
        this.animationLock = true;
    }

    unlockAnimation(){
        this.animationLock = false;
    }

    isAnimationLocked(){
        return this.animationLock === true;
    }

    getFollow(ev){
        return ev.toElement.querySelector('.hover-image');
    }
    
    hasLinkDataImage(link){
        return link.hasAttribute('data-image');
    }


    

}

const app = new App();

// const nextSlide = function(){
//     app.nextSlide();
// }
