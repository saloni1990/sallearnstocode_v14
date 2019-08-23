

$(document).ready(function(){
    $('.single-item').slick();

});

import Vue from 'vue';
Vue.config.devtools = true;
Vue.config.ignoredElements = ['trix-editor', 'trix-toolbar']

Vue.component('card-modal', require('./components/cardModal.vue').default);
Vue.component('mobile-nav', require('./components/mobileNav.vue').default);



Vue.component('about-close', {


    template: `
        <div>Close</div>
    `
});

Vue.component('about-message', {

    props: ['experience'],
    template: `
        <div>
            <p>{{experience}}</p>
        </div>
    
    `
});


//Component within component

Vue.component('colors-list', {
    template: '<div><colors v-for="color in defineColors">{{color}}</colors></div>',

    data(){
        return { 
            defineColors: [
                'Red',
                'Orange',
                'Blue',
                'Green',
                'Yellow'
            ]
        }
    }
});

 Vue.component('colors', {
    template: '<li><slot></slot></li>',

});

Vue.component('playground-message', {
    props: ['title', 'body'],
    data(){
        return {
            isVisible: true
        }
    },
    template: `
    <article class="message" v-show="isVisible">
        <div class="message-header">
            {{ title }}
            <button type="button" v-on:click="isVisible = false">X</button>
        </div>

        <div class="message-body">
            {{ body }}
        </div>
    </article>
    `,
    
})

var app = new Vue ({
    el: '#app',
    data: {
        exampleModalShowing: false,
        mainMessage:'Hello World',
        message:'My Favourite TV Series',
        red:'red',
        newSeries:'',
        series:[
            'Breaking Bad',
            'Killing Eve',
            'The Handmaids Tale',
            'Stranger Things'
        ],
        title:'this is a the title when someone hovers.',
        className:'color-blue',
        isLoading: false,
        disabledButton: true,
        isHalfWidth: false,
        showText: false,
        completed: 'completed',
        movies:[
            { title:'Dr Strange', positive:true },
            { title:'Captain America', positive:true },
            { title:'Batman', positive:false },
            { title:'Hulk', positive:true },
            { title:'X-Men', positive:false },
            { title:'Venom', positive:false }
        ]
    },
    methods:{
        addSeries(){
            this.series.push(this.newSeries);
            this.newSeries = '';
        },
        toggleClass() {
            if(this.isLoading === false){
                this.isLoading = true;
            
            } else {
                this.isLoading = false;
            }
        },
        togglePic() {
            if(this.isHalfWidth === false){
                this.isHalfWidth=true;
            } else { 
                this.isHalfWidth=false;
            }
        },
        
        toggleRating: function toggleRating(movie){
            movie.positive = !movie.positive;
        },
    },
    computed:{
        reversedMessage() {
            return this.mainMessage.split('').reverse().join('');
        },
        positiveRating(){
            return this.movies.filter(movie => movie.positive);
        },
        negativeRating(){
            return this.movies.filter(movie => !movie.positive);
        },
        noMoviesPos(){
            var filteredPos = this.movies.filter(movie  => movie.positive)
            if(filteredPos.length === 0  ){
                return this.showText = true;
            } 
        },
        noMoviesNeg(){
            var filteredNeg = this.movies.filter(movie  => !movie.positive)
            if(filteredNeg.length === 0 ){
                return this.showText = true;
            } 
        },
    }
});
