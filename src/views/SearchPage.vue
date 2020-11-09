<template>
    <div class="container">
        <div class="row" style="margin-top:1.5rem">
            <div class="col-lg-12 text-left">
                <!-- <div v-for="(i,index) in hasilcari.slice(hasilcari,1)" :key="index"> -->
                <h3 class="text-center">Hasil Pencarian</h3>
                 <!-- untuk kata kunci "{{i.labelCari.value}}" -->
                <!-- <div v-if="hasilcari.length=0">
                <br><h4 class="text-center">Hasil Tidak Ditemukan</h4>
                </div> -->
                <div class="row" style="margin-top:1.5rem">
                    <div class="card" style="width: 37rem" v-for="(i,index) in hasilcari" :key="index">
                    <p v-if="i.jenis.value==='Upacara'||i.jenis.value==='Harian'||i.jenis.value==='Pernikahan'">
                        <a v-on:click="tampilDbpedia(i.dbpedia.value)" :href="'/DetailPakaian/' + i.Item.value">
                        <img v-if="i.gambar" class="card-img-left col-4 text-left" style="width:10em" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                        <img v-else class="card-img-left col-4 text-left" style="width:10rem" src="../assets/image_not_available.png" alt="Card image cap">
                        <div class="col-10 text-left">
                            <div class="card-body">
                            <h5 class="card-title" @click="tampilDetail(i.idItem.value)">{{i.Item.value}}</h5>
                            <!-- <span class="card-text" v-if="i.asalDaerah">Asal: {{i.asalDaerah.value}} </span><br> -->
                            <span class="card-text" v-if="i.jenis">Jenis:  {{i.jenis.value}}</span>
                            </div>
                        </div>
                        </a>
                    </p>
                    <p v-else>
                        <a :href="'/HalamanDetail/' + i.Item.value">
                        <img v-if="i.gambar" class="card-img-left col-4 text-left" style="width:10em" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                        <img v-else class="card-img-left col-4 text-left" style="width:10rem" src="../assets/image_not_available.png" alt="Card image cap">
                        <div class="col-10 text-left">
                            <div class="card-body">
                            <h5 class="card-title" @click="tampilDetail(i.idItem.value)">{{i.Item.value}}</h5>
                            <!-- <span class="card-text" v-if="i.asalDaerah">Asal: {{i.asalDaerah.value}} </span><br> -->
                            <span class="card-text" v-if="i.jenis">Jenis:  {{i.jenis.value}}</span>
                            </div>
                        </div>
                        </a>
                    </p>
                    </div>
                </div>
                <!-- </div>s -->
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    // data(){
    //     return{  
    //     }
    // },
    computed:{
        ...mapState([
            'hasilcari'
        ])
    },
    methods:{
        ...mapActions([
            'tampilDetail',
            'tampilDbpedia'
        ]),
        // siapCari(){
        //     if(this.tampungan.length > 2){
        //         this.tampilPencarian(this.tampungan)
        //         this.$router.push('/SearchPage')
        //     }
        // }
    }
}
</script>


<style scoped>

/* .input-group.md-form.form-sm.form-2 input.lime-border {
border: 1px solid #cddc39;
margin-top: 2%
} */
.card-img-left{
    float: left;
    padding-right: 1em;
    /* margin-top: -1.25em; */
}
</style>