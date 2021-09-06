<template>
  <div>
    <content-filter :options="breeds" :cb="setBreedFilter" name="breed"/>
    <responsive-grid>
      <transition-group name="fade">
        <grid-tile v-for="(dog, index) in dogsFiltered" :key="index">
          <dog-card v-bind="dog"/>
        </grid-tile>
        <grid-tile class="last-row"></grid-tile>
      </transition-group>
    </responsive-grid>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ContentFilter from './ContentFilter'
import GridTile from './GridTile'
import ResponsiveGrid from './ResponsiveGrid'
import DogCard from './DogCard'

  export default {
    name: 'DogsGrid',
    components: {
      ContentFilter,
      DogCard,
      GridTile,
      ResponsiveGrid
    },
    methods: {
      ...mapActions('dogs', ['getDogImages']),
      ...mapMutations('dogs', ['setBreedFilter'])
    },
    computed:{
      ...mapGetters('dogs', ['breeds', 'dogsFiltered'])
    },
    created(){
      this.getDogImages()
    }
  }
</script>
<style>
  .content-filter {
      margin: calc(var(--base-spacing) * 2);
  }
  .last-row {
    flex: 4;
  }
  .fade-enter-active, .fade-leave-active {
      transition: opacity .5s ease;
  }
  .fade-enter-from, .fade-leave-to {
      opacity: 0;
  }
</style>
