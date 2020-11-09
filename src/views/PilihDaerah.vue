<template>
<div class="container">
  <div>
    <h3 class="text-center" style="margin-top:3rem">Pilih Pakaian Adat</h3><br>
  </div>
  <div class="row top-buffer">
      <!-- <div class="col-sm-8 col-md-8 col-lg-8" v-for="(i,index) in daerah" :key="index">
        <p>Pakaian adat, (juga pakaian rakyat, busana daerah, busana nasional, atau pakaian tradisional) adalah kostum yang mengekspresikan identitas, yang biasanya dikaitkan dengan wilayah geografis atau periode waktu dalam sejarah. Pakaian adat juga dapat menunjukkan status sosial, perkawinan, atau agama.</p> 
      </div> -->
      <div class="col-sm-2 col-md-2 col-lg-2" v-for="(i,index) in daerah" :key="index">
        <div class="card" style="width: 9.5rem; height:16.5rem">
        <router-link to="/PilihPakaian">
          <div v-if="i.Kategori===Upacara">
            <div @click="tampilPakaianUpacara(i.idDaerah.value)">
            <!-- <img class="card-img-top" src="../assets/Papua.jpg" alt="Card image cap">
            Gambar dari Protege -->
            <span v-if="i.gambar">
            <img class="card-img-top" style="width:9.25rem" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
            </span>
              <div class="card-body">
              <p class="card-text" style="font-size:14px">{{i.namaDaerah.value}}</p>
              </div>
            </div>
          </div>
          <div v-else-if="i.Kategori===Harian">
            <div @click="tampilPakaianHarian(i.idDaerah.value)">
            <!-- <img class="card-img-top" src="../assets/Papua.jpg" alt="Card image cap">
            Gambar dari Protege -->
            <img v-if="i.gambar" class="card-img-top" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
            <img v-else class="card-img-top" src="../assets/image_not_available.png" alt="Card image cap">
              <div class="card-body">
              <p class="card-text">{{i.namaDaerah.value}}</p>
              </div>
            </div>
          </div>
        </router-link>
        </div>
      </div>
  </div>
      <!-- <h4 class="text-center" id="judulHalaman">Pilih Daerah</h4><br>
      <div class="row marginRow"> -->
<!-- <div class="card" style="width: 18rem;">
                            <div @click="tampilDaerah(i.pakaianadat.value)">
                            <img class="card-img-top" src="../assets/Maluku.png" alt="Card image cap">
                            <div class="card-body">
                            <p class="card-text">Pakaian Adat {{i.Kategori.value}}</p>
                            </div>
                            </div>
                    </div> -->




        <!-- <div class="col-2" v-for="(i,index) in daerah" :key="index">
            <button v-if="i.Kategori===Upacara" class="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" @click="tampilPakaianUpacara(i.idDaerah.value)">
            {{i.namaDaerah.value}}
            </button>
            <button v-else-if="i.Kategori===Harian" class="btn btn-outline-secondary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" @click="tampilPakaianHarian(i.idDaerah.value)">
            {{i.namaDaerah.value}}
            </button>
        <br>
      </div>         -->
    <!-- </div> -->
    <!-- <div class="row"> -->
      <!-- <div class="col-12">
        <h4>Pakaian Adat
          </h4><br>
        <div  v-for="(i,index) in pakaian_upacara" :key="index">
          
      <div class="collapse" id="collapseExample">
        <h5>
          <router-link to="/DetailPakaian">
          <div @click="tampilAksesoris(i.idPakaian.value), tampilPakaian(i.idPakaian.value), tampilDbpedia(i.idPakaian.value)">Busana {{i.namaPakaian.value}}</div>
          </router-link>
        </h5>
        </div>
      </div>
      </div>
    </div> -->
</div>


<!-- <div class="collapse" id="collapseExample">
          <div class="row">
            Anim pariatur cliche reprehenderit
          </div>          
        </div> -->


</template>
<script>
import {mapState, mapActions} from 'vuex'

export default {
    mounted(){
        // this.$store.dispatch('tampilDaerah')
        // this.$store.dispatch('tampilListPakaian')
    },
    computed:{
        ...mapState([
            'daerah',
            // 'listpakaian',
            'pakaian_upacara',
            'pakaian_harian'        
        ])
    },
    methods:{
      ...mapActions([
        'tampilAksesoris',
        'tampilPakaian',
        'tampilDbpedia',
        // 'tampilListPakaian',
        'tampilDaerah',
        'tampilPakaianUpacara',
        'tampilPakaianHarian'
      ]),
    }
}
</script>
<style scoped>

.top-buffer { margin-top:20px; }
.btn btn-primary{
  margin-bottom: 1%;
}
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
