<template>
     <div class="container text-center judul">
        <div class="row">
            <div class="col-sm-8 col-md-8 col-lg-8">
                <h2>Pakaian Adat</h2><br>
            <p>Pakaian adat, (juga pakaian rakyat, busana daerah, busana nasional, atau pakaian tradisional) adalah kostum yang mengekspresikan identitas, yang biasanya dikaitkan dengan wilayah geografis atau periode waktu dalam sejarah. Pakaian adat juga dapat menunjukkan status sosial, perkawinan, atau agama.<br><i>Sumber: Wikipedia</i></p> 
            </div>
            <div class="col-sm-2 col-md-2 col-lg-2" v-for="(i,index) in kategori" :key="index">
                <div class="card" style="width: 9rem;">
                    <router-link to="DaftarPakaian">
                        <div @click="tampilListPakaian(i.idKategori.value),tampilDbpedia(i.dbpedia.value)">
                        <!-- <img class="card-img-top" src="../assets/Papua.jpg" alt="Card image cap">
                        Gambar dari Protege -->
                        <span v-if="i.gambar">
                        <img class="card-img-top" :src="require('../assets/' + i.gambar.value)" alt="Card image cap">
                        </span>
                            <div class="card-body">
                            <p class="card-text">Pakaian {{i.Kategori.value}}</p>
                            </div>
                        </div>
                    </router-link>
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
        this.$store.dispatch('tampilJenisKategori')
    },
    computed:{
        ...mapState([
            'kategori'
        ])
    },
        methods:{
      ...mapActions([
        'tampilListPakaian',
        'tampilDbpedia'
      ])
    }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Lexend+Deca|Manjari|Nunito|Quicksand|Raleway&display=swap');
.row{
    text-align: center;
    margin-top: 100px;
}
/* .col{
    text-align: center;
} */
.card{
    margin: 0 auto;
    float: none;
    margin-bottom: 10px;
}
.card-text{
    font: 1.3em;
    font-family: 'Manjari', sans-serif;
    color: black;
}
</style>