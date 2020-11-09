<template>
    <nav class="navbar navbar-expand-lg navbar-light">
    <router-link to="/"><a class="navbar-brand text-center font-weight-bold" href="#">PAKAIAN ADAT INDONESIA</a></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Kategori</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <div v-for="(i,index) in kategori" :key="index"><router-link to="DaftarPakaian"><a class="dropdown-item" href="#"  @click="tampilListPakaian(i.idKategori.value)">Pakaian {{i.Kategori.value}}</a></router-link>
                <!-- <router-link to="ListPakaian"><a class="dropdown-item" href="#">Pakaian {{i.Kategori.value}}</a></router-link> -->
                </div>
                </div>
        </li>
        <li class="nav-item"><router-link to="/Daerah"><a class="nav-link" href="#">Daerah</a></router-link></li>
        <li class="nav-item"><router-link to="/Aksesoris"><a class="nav-link" href="#">Aksesoris</a></router-link></li>
        <router-link to="/Visualisasi"><li class="nav-item"><a class="nav-link" href="#">Visualisasi</a></li></router-link>
        <li class="nav-item">
            <form class="form-inline">
            <input v-model="tampungan" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <router-link to="/SearchPage">
            <button @click.prevent="siapCari" class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </router-link>
            </form>
        </li>
        
        </ul>
    </div>
    </nav>
    <!-- <div> -->
        <!-- <div class="container">
            <div class="row"> -->
                <!-- <nav class="navbar navbar-light">
                <router-link to="/"><a class="navbar-brand" href="#">Pakaian Adat</a></router-link>
                
                 <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                    </ul>
                </div> -->
                <!-- <router-link to="/SearchPage">Search</router-link> -->
                <!-- <ul class="navbar-nav mr-auto">
                <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Kategori</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Pakaian </a>
                </div>
                </li>
                </ul>           -->
                <!-- </nav> -->
            <!-- </div>
        </div> -->
    <!-- </div> -->
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
    data(){
        return{
            tampungan:''    
        }
    },
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
            'tampilPencarian',
            'tampilDetail',
            'tampilListPakaian'
        ]),
        siapCari(){
            if(this.tampungan.length > 2){
                this.tampilPencarian(this.tampungan)
                this.$router.push('/SearchPage')
            }
        }
    }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Lexend+Deca|Manjari|Nunito|Quicksand|Raleway&display=swap');
.navbar{
    background-color:#B2BD7E;
    /* background-color:#d2e08d; */
    background-image: none;
    background-repeat: no-repeat;
    color: black;
    font-family: 'Nunito', sans-serif;
 }
 #bold-italic{
    font-weight: bold;
    font-style: italic;
}

</style>
