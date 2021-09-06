<template>
  <div class="card-scene">
    <div :class="cardStyles">
      <div class="card-face front" v-on:click="flip">
        <img v-if="!loading" :src="image"/>
        <div v-if="loading" class="loading-ring"/>
      </div>
      <div class="card-face back" v-on:click="flip">
        <div class="content">
          <h2>{{breed}}</h2>
          <button v-on:click.stop="getSpecificBreed" class="btn invert">See More</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapState } from 'vuex'
  export default{
    name: 'DogCard',
    props:{
      image: {
        required: true,
        type: String
      },
      breed: {
        required: true,
        type: String
      }
    },
    data(){
      return {
        flipped: false
      }
    },
    methods:{
      ...mapActions('dogs', ['getBreedImages']),
      flip(){
        this.flipped = !this.flipped
      },
      getSpecificBreed(){
        this.getBreedImages(this.breed)
        this.flip()
      }
    },
    computed:{
      ...mapState('dogs', ['loading']),
      cardStyles(){
        return ['card', {'is-flipped': this.flipped}]
      }
    }
  }
</script>
<style lang="scss">
.card-scene{
    min-width: 300px;
    min-height: 300px;
    flex:1;
    perspective: 400px;
    .card{
        width: 100%;
        height: 100%;
        position: relative;
        transition: transform 1s;
        transform-style: preserve-3d;

        .card-face{
            position:absolute;
            height: 100%;
            width: 100%;
            backface-visibility: hidden;

            img {
                height:100%;
                width: 100%;
                object-fit: cover;
            }

            &.back{
                background-color: var(--primary-color);
                color: var(--secondary-color);
                height:100%;
                width:100%;
                transform: rotateX(180deg);
                display: flex;

                .content{
                    text-align:center;
                    border:1px solid var(--secondary-color);
                    flex:1;
                    padding:calc(var(--base-spacing) * 2);
                    margin:calc(var(--base-spacing) * 2);
                }
            }
        }
        &.is-flipped{
            transform: rotateX(180deg);
        }
        &:not(.is-flipped){
            background:var(--primary-color);
        }
        &:hover:not(.is-flipped){
            transform: rotateX(-15deg);
        }
    }
  
  }
</style>
