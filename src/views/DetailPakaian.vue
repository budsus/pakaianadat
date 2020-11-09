<template>
<div class="container">
    <div v-for="(i,index) in pakaianadat_state" :key="index">
        <div class="text-center">
            <h4 class="text-center">{{$route.params.id}}</h4>
            <!-- <div id="bold-italic">Jenis: </div><br> -->
            <!-- <div v-if="i.dbpedia_pakaianadat">    
                <div v-for="(i,index) in dbpedia_state" :key="index">
                <p>{{i.a.value}}</p>
                <p @click="openWindow(i.link.value)">Pelajari lebih lanjut.</p>
                </div>
            </div> -->
            <div v-if="i.deskripsi"><div>{{i.deskripsi.value}}</div>
            <small v-if="i.sumber">Sumber: {{i.sumber.value}}</small></div>
        </div>
        <!-- <hr>
        <div class="text-center">Asal Daerah: {{i.asalDaerah.value}}</div> -->
        <hr>
        <div class="text-center">Asal Daerah: {{i.asalDaerah.value}} <span v-if="i.Suku"> , Suku: {{i.Suku.value}}</span></div>
        
        <hr>
        <div class="row">
            <div class="col-lg-3 text-left">
                <div v-if="i.gambar"><img class="img-fluid" style="width: 13.5rem;" :src="require('../assets/' + i.gambar.value)" alt=""></div>
                <div v-else><img class="img-fluid" style="width: 13.5rem;" src="../assets/image_not_available.png" alt=""></div>
                <small v-if="i.sumberGambar">{{i.sumberGambar.value}}</small>
            </div>
            <div id="border" class="col-lg-4 text-left">
                <!-- <ul> -->
                <h5>Pakaian:</h5>
                <div v-for="(i,index) in pakaian" :key="index">
                        <!-- <router-link to="/HalamanDetail"> -->
                    <span v-if="i.Pakaian">
                        <!-- @click="tampilDetail(i.idPakaian.value),tampilDbpedia(i.dbpedia.value)">- -->
                        <li><a v-on:click="tampilDbpedia(i.dbpedia_pakaian.value)" :href="'/HalamanDetail/' + i.Pakaian.value"> {{i.Pakaian.value}}</a></li></span> 
                            <!-- </router-link> -->
                        <!-- </li> -->
                </div>
            </div>
            <div id="border" class="col-lg-5 text-left">
                <h5>Aksesoris:</h5>
                <div v-for="(i,index) in aksesoris" :key="index">
                    <!-- <router-link to="/HalamanDetail"> -->
                    <span v-if="i.aksesoris">
                                 <!-- @click="tampilDetail(i.idAksesoris.value),tampilDbpedia(i.dbpedia.value)"> -->
                        <li><a v-on:click="tampilDbpedia(i.dbpedia_aksesoris.value)" :href="'/HalamanDetail/' + i.aksesoris.value"> {{i.aksesoris.value}} [{{i.kategori.value}}]</a></li></span>
                            <!-- </router-link> -->
                </div>
                        <!-- </li>   
                    </ul> -->
            </div>
        </div>
    </div>
</div>

</template>
<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
    mounted(){
        this.$store.dispatch('tampilPakaianAdat',this.$route.params.id)
        this.$store.dispatch('tampilAksesoris',this.$route.params.id)
        this.$store.dispatch('tampilPakaian',this.$route.params.id)
        // this.$store.dispatch('tampilDbpedia',this.$route.params.id1)
    },
    computed:{
        ...mapState([
            'aksesoris',
            'pakaian',
            'dbpedia_state',
            'pakaianadat_state'
        ])
    },

    methods:{
        ...mapActions([
            'tampilPakaianAdat',
            'tampilPakaian',
            'tampilAksesoris',
            'tampilDbpedia'
        ]),
        openWindow(link){
            window.open(link);
        }
    }
}
</script>


<style scoped>
.text-center{
    margin-top: 2%;
    align-self: center;
}
.col-lg-6{
    color: black;
}
.container{
    margin-bottom: 50px;
}
.row{
    margin-top: 15px;
}
#border{
    border-left: 4px solid #8FBC94;
    height: auto;
}
</style>