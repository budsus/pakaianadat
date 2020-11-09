<template>
    <div class="container">
        <div class="row text-center">
        <h4 class>Pakaian Adat</h4>
            <div class="col-12">
                <div>
                <h5 v-for="(i,index) in pakaian_upacara" :key="index">
                <router-link to="/DetailPakaian">
                <div @click="tampilAksesoris(i.idPakaian.value), tampilPakaian(i.idPakaian.value), tampilDbpedia(i.dbpedia.value)">Busana {{i.namaPakaian.value}}</div>
                </router-link>
                </h5>
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
            'pakaian_upacara',
            'pakaian_harian'        
        ])
    },
    methods:{
      ...mapActions([
        'tampilAksesoris',
        'tampilPakaian',
        'tampilDbpedia'
      ]),
    }
}
</script>