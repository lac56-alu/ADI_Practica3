<template>
  <div class="about">
    <h1>Lista de los lugares:</h1>
    {{getAllPlaces()}}
  </div>

</template>


<script>
import { getAllPlaces } from '../PlaceService'
export default {
  methods: {
    getAllPlaces() {
      getAllPlaces().then(response => {
        console.log(response)
        //this.places = response
      })
    },

  }
}
</script>

