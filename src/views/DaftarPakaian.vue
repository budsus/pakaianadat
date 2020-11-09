<template>
    <div class="container">
        <div class="row" style="margin-top:2rem">
            <div class="col-12 text-left">
                <div v-for="(i,index) in list_pakaian.slice(list_pakaian.value,1)" :key="index">
                <h3 class="text-center">{{i.labelId.value}}</h3>
                    <div v-for="(i,index) in dbpedia_state" :key="index ">
                    <p class="text-justify">{{i.a.value}}</p>
                    <p class="text-center" @click="openWindow(i.link.value)">Sumber: Dbpedia</p>
                    </div>
                </div>  
                <hr>
                </div>
                <div class="row" style="margin-top:2rem">
                    <div class="card" style="width: 37rem" v-for="(i,index) in list_pakaian" :key="index">
                        <!-- <router-link to="/DetailPakaian"> -->
                        <!-- <div v-if="i.dbpedia_listpakaian">
                            <a :href="'/DetailPakaian/' + i.namaPakaian.value + '/' + i.dbpedia_listpakaian.value">
                            <img v-if="i.gambar" class="card-img-left col-4 text-left" style="width:10em" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                            <img v-else class="card-img-left col-4 text-left" style="width:10rem" src="../assets/image_not_available.png" alt="Card image cap">
                                <div class="col-10 text-left">
                                    <div class="card-body"> -->
                                        <!-- @click="tampilAksesoris(i.idPakaian.value), tampilPakaian(i.idPakaian.value), tampilPakaianAdat(i.idPakaian.value),tampilDbpedia(i.dbpedia.value)" -->
                                        <!-- <h5 class="card-title">{{i.namaPakaian.value}}</h5>
                                        <span class="card-text">Asal: {{i.namaDaerah.value}}</span><br>
                                        <span class="card-text" v-if="i.kategori">Kategori: {{i.kategori.value}}</span>
                                    </div>
                                </div> -->
                            <!-- </router-link>  -->
                            <!-- </a>
                        </div> -->
                        <div>
                            <a :href="'/DetailPakaian/' + i.namaPakaian.value">
                            <img v-if="i.gambar" class="card-img-left col-4 text-left" style="width:10em" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                            <img v-else class="card-img-left col-4 text-left" style="width:10rem" src="../assets/image_not_available.png" alt="Card image cap">
                                <div class="col-10 text-left">
                                    <div class="card-body">
                                        <h5 class="card-title">{{i.namaPakaian.value}}</h5>
                                        <span class="card-text">Asal: {{i.namaDaerah.value}}</span><br>
                                        <span class="card-text" v-if="i.kategori">Kategori: {{i.kategori.value}}</span>
                                    </div>
                                </div>
                            </a>
                        </div>    
                    </div>
                </div>
        </div>
    </div>
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
            'list_pakaian',
            'dbpedia_state'
           // 'pakaian_daerah'        
        ])
    },
    methods:{
      ...mapActions([
        // 'tampilAksesoris',
        // 'tampilPakaian',
        // 'tampilDbpedia',
        // 'tampilPakaianAdat'
      ]),
       openWindow(link){
            window.open(link);
        }
    }
}
</script>
<style scoped>
.card-img-left{
    float: left;
    padding-right: 1em;
    /* margin-top: -1.25em; */
}
</style>