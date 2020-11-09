<template>
<div class="container">
    <div v-for="(i,index) in detail.slice(detail.value,1)" :key="index">
        <div class="text-center">
            <h4 class="text-center">{{i.item.value}}</h4>
            <div id="bold-italic">Jenis: {{i.kategori.value}}</div><br>
            <!-- <div v-if="i.dbpedia">    
                <div v-for="(i,index) in dbpedia_state" :key="index ">
                <p>{{i.a.value}}</p>
                <p @click="openWindow(i.link.value)">Sumber: Dbpedia</p>
                </div>
            </div> -->
            <div v-if="i.deskripsi"><div>{{i.deskripsi.value}}</div>
            <small v-if="i.sumber">Sumber: {{i.sumber.value}}</small>
            </div>      
        </div>
        <hr>        
   
    <div class="row">
        <div class="col-lg-4 text-center">
            <div v-if="i.gambar"><img class="img-fluid" style="width: 13.5em;" :src="require('../assets/' + i.gambar.value)" alt=""></div>
            <div v-else><img class="img-fluid" style="width: 13.5em;" src="../assets/image_not_available.png" alt=""></div>
            <small v-if="i.sumberGambar">{{i.sumberGambar.value}}</small>
        </div>
        <div class="col-lg-8 text-left">
            <br>
                <div>Dikenakan oleh: 
                    <span v-if="i.gender">
                        {{i.gender.value}}
                    </span>
                    <span v-else> Tidak ada data
                    </span>
                </div>
                <hr>
                <div>Asal Daerah:
                    <div v-for="(i,index) in pakaian_item.slice(pakaian_item.value,1)" :key="index"> 
                        <div v-if="i.Daerah">
                            <div v-for="(i,index) in daerah_item" :key="index">
                            <span @click="tampilListPakaian(i.idDaerah.value),tampilDbpedia(i.dbpedia_daerah.value)">
                            <router-link to="/DaftarPakaian">
                            {{i.Daerah.value}}
                            </router-link>
                            </span>
                            </div>
                        </div>
                        <div v-else-if="i.asalDaerah">
                            <router-link to="/DaftarPakaian">
                            <span @click="tampilListPakaian(i.idAsal.value),tampilDbpedia(i.dbpedia.value)">
                            {{i.asalDaerah.value}}
                            </span>
                            </router-link>
                        </div>
                        <div v-else> Tidak ada data</div>
                    </div>
                </div>
                <hr>
                <div>Digunakan pada: 
                    <div v-for="(i,index) in pakaian_item" :key="index">
                        <a v-on:click="tampilDbpedia(i.dbpedia_listpakaian.value)" :href="'/DetailPakaian/' + i.namaPakaian.value">
                        <span v-if="i.namaPakaian">{{i.namaPakaian.value}}
                        </span>
                        <span v-else> Tidak ada data
                        </span>
                        </a>
                    </div>
                <hr>
                </div>
                
        </div>
        <!-- <div class="col-lg-4 text-left">
            <br>
                
        </div> -->
    </div>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    mounted(){
        this.$store.dispatch('tampilDetail', this.$route.params.id),
        this.$store.dispatch('tampilDigunakanPada', this.$route.params.id),
        this.$store.dispatch('tampilDaerahItem', this.$route.params.id)
        // this.$store.dispatch('tampilDbpedia',this.$route.params.id1)
    },
    computed:{
        ...mapState([
            'detail',
            'dbpedia_state',
            'pakaian_item',
            'daerah_item'
        ])
    },
    methods:{
        ...mapActions([
        // 'tampilDetail',
        'tampilDbpedia',
        'tampilListPakaian'
        ]),
        containsKey(obj,key){
            return Object.key(obj).includes(key);
        },
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
.row{
    margin-top: 15px;
}
#border{
    border-left: 4px solid #8FBC94;
    height: auto;
}
</style>