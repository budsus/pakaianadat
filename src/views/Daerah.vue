<template>
<div class="container">
    <!-- <div><nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page">{{$route.name}}</li>
    </ol>
    </nav></div> -->
  <div>
    <h3 class="text-center" style="margin-top:1rem">{{$route.name}}</h3><br>
    <hr>
  </div>
  <div class="row top-buffer">
      <div class="col-sm-2 col-md-2 col-lg-2" v-for="(i,index) in daerah" :key="index">
        <div class="card" style="width: 9.5rem; height:16.5rem">
        <router-link to="/DaftarPakaian">
          <!-- <div v-if="i.Kategori===Upacara"> -->
            <div @click="tampilListPakaian(i.idDaerah.value),tampilDbpedia(i.dbpedia.value)">
            <!-- <img class="card-img-top" src="../assets/Papua.jpg" alt="Card image cap">
            Gambar dari Protege -->
            <img v-if="i.gambar" class="card-img-top" style="width:9.25rem" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
            <img v-else class="card-img-top text-left" style="width:9.25rem" src="../assets/image_not_available.png" alt="Card image cap">
              <div class="card-body">
              <p class="card-text" style="font-size:14px">{{i.namaDaerah.value}}</p>
              </div>
            </div>
          <!-- </div>     -->
        </router-link>
        </div>
      </div>
  </div>
</div>
</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
    mounted(){
         this.$store.dispatch('tampilDaerah')
        // this.$store.dispatch('tampilListPakaian')
    },
    computed:{
        ...mapState([
            'daerah',
            // // 'listpakaian',
            // 'pakaian_upacara',
            // 'pakaian_harian'        
        ])
        // currentRouteName() {
        // return this.$route.name;
        // }
    },
    methods:{
      ...mapActions([
        // 'tampilAksesoris',
        // 'tampilPakaian',
        'tampilDbpedia',
        // 'tampilListPakaian',
        // 'tampilDaerah',
        'tampilListPakaian',
        // 'tampilPakaianHarian'
      ]),
    }
}
</script>
<style scoped>
.top-buffer {margin-left: 10px;margin-bottom: 50px;margin-top: 10px;}
.btn btn-primary{
  margin-bottom: 1%;
}
.breadcrumb{background-color: white;}
/* #judulHalaman{
  padding-top: 10px;
} */
/* .carousel-inner {
  height: 50%;
  width: 60%;
  margin: auto;
} */

/* .carousel-control-prev{
  outline: black;
} */

/* .carousel-control-prev-icon{
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23f00' viewBox='0 0 8 8'%3E%3Cpath d='M5.25 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E");
} */
</style>
