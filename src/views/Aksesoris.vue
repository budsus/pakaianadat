<template>
    <div class="container">
         <!-- <div><nav aria-label="breadcrumb">
            <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{$route.name}}</li>
            </ol>
            </nav>
        </div> -->
        <div>
            <h3 class="text-center" style="margin-top:1rem">{{$route.name}}</h3><br>
            <hr>
        </div>
        <!-- <div class="row">
                    <div class="card" style="width: 50rem" v-for="(i,index) in list_aksesoris" :key="index">
                    <router-link to="/HalamanDetail">
                        
                        <img class="card-img-left col-4 text-left" style="width:8.5rem" src="../assets/image_not_available.png" alt="Card image cap">
                        <div class="col-8 text-left">
                            <div class="card-body">
                            <h5 class="card-title" @click="tampilDetail(i.idAksesoris.value),tampilDbpedia(i.dbpedia.value)">{{i.namaAksesoris.value}}</h5>
                            <span class="card-text">Jenis: {{i.kategori.value}}</span>
                            </div>
                        </div>
                    </router-link> 
                    </div>
                </div> -->
                
        <div class="row top-buffer">
            <div class="col-sm-3 col-md-3 col-lg-3"  v-for="(i,index) in list_aksesoris" :key="index">
                <a v-on:click="tampilDbpedia(i.dbpedia.value)" :href="'/HalamanDetail/' + i.namaAksesoris.value">
                <div class="card" style="width: 11rem; height:16.5rem">
                <div> 
                    <!-- <img class="card-img-top" src="../assets/Papua.jpg" alt="Card image cap">
                    Gambar dari Protege -->
                    <img v-if="i.gambar" class="card-img-top" style="width:9.25rem" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                    <img v-else class="card-img-top text-left" style="width:9.25rem" src="../assets/image_not_available.png" alt="Card image cap">
                    <div class="card-body">
                    <p class="card-text" style="font-size:14px">{{i.namaAksesoris.value}}</p>
                    <!-- <p class="card-text" style="font-size:14px">Jenis: {{i.kategori.value}}</p> -->
                    </div>
                <!-- </div>     -->
                </div>
                </div></a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    mounted(){
        this.$store.dispatch('tampilListAksesoris')
        // this.$store.dispatch('tampilListPakaian')
    },
    computed:{
        ...mapState([
            'list_aksesoris',  
        ]),
    },
    methods:{
      ...mapActions([
        'tampilDetail',
        'tampilDbpedia'
      ]),
    }
}
</script>
<style scoped>
.card-img-left{
    float: left;
    padding-right: 1em;
    /* margin-top: -1.25em; */
}
.row{
    margin-top: 1px;
}
.breadcrumb{background-color: white;}
</style>