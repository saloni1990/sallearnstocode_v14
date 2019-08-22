<template>
    <div class="top">   
        <div class="py-4">
            <a href="#" class="toggleNav" v-on:click="toggleNav()" v-if="!isOpen"><i v-if="!isOpen" class="fas fa-bars"></i> Menu <i></i></a>
            <a href="#" class="toggleNav" v-on:click="toggleNav()" v-if="isOpen"><i v-if="isOpen" class="fas fa-times"></i> Close  <i></i></a>
        </div>
       
        <nav v-if="isOpen" class="flex flex-wrap">
             <slot />
        </nav>
       
    </div>
</template>


<script>
export default {
    data: function () {
        return {
            isOpen: false
        }
        
    },
    methods: {
        toggleNav(){
            if( this.isOpen === false ) {
                this.isOpen = true;
                console.log('open')
            } else {
                this.isOpen = false;
            }
        },
    }
}
</script>
