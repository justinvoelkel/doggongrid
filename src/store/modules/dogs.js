import { getRandomDogs, getBreed } from '../../api/dogs'

const parseBreed = (imageUrl) => {
  let breed = 'unknown'
  // not sure if these will always work so catch error and continue
  try{
    var regexp = /breeds\/([A-Za-z-]*)\//g
    let [,firstCap] = regexp.exec(imageUrl)
    breed = firstCap.replace('-', ' ').split(" ").reverse().join(" ")
  } catch (e) {
    console.error(e)
  }
  return breed
}

const formatBreed = (breed) => {
  return breed.split(" ").reverse()
}

const state = {
  // all random dogs
  all: [],
  // breed specific filter
  breedFilter: null,
  // show more of a specific breed
  breedStack: [],
  // ideally this would not be in this module but for brevity...
  loading: false
}

const mutations = {
  pushBreedStack(state, image) {
    state.breedStack.push(image)
  },
  setAllDogs(state, dogs) {
    // reset if we already have dogs
    if(state.all.length) state.all = []
    state.all = dogs
  },
  setBreedFilter(state, breed) {
    state.breedFilter = breed
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

const getters = {
  breeds: ({all}) => {
    const unique = new Set(all.map(({breed}) => breed))
    return [...unique].sort((a,b) => a.localeCompare(b))
  },
  dogsFiltered: ({all, breedFilter}) => {
    if(!breedFilter) return all
    return all.filter(dog => dog.breed === breedFilter)
  }
}

const actions = {
  getDogImages({ commit }, total){
    commit('setLoading', true)
    getRandomDogs(total)
      .then(({ data }) => {
        // map urls to objects with breed property gathered from regexp
        const dogObjects = data.message
              .map(image => ({breed: parseBreed(image), image}))
        commit('setAllDogs', dogObjects)
      })
      .finally(() => commit('setLoading', false))
  },
  getBreedImages({ commit }, breed){
    commit('setLoading', true)
    const [main, sub] = formatBreed(breed)
    getBreed(main, sub)
      .then(({ data }) => {
        const dogObjects = data.message.map(image => ({breed, image}))
        commit('setAllDogs', dogObjects)
      })
      .finally(() => commit('setLoading', false))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
