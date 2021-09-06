import axios from 'axios'

const baseUrl = 'https://dog.ceo/api'

export const getRandomDogs = (total = 50) => {
  return axios.get(`${baseUrl}/breeds/image/random/${total}`)
}

export const getBreed = (main, sub = null, total = 50) => {
  let url = `${baseUrl}/breed/${main}`
  if(sub){
    url = `${url}/${sub}`
  }
  url = `${url}/images/random/${total}`
  return axios.get(url)
}
