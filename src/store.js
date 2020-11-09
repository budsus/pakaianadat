import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex,axios)
var koneksi = 'https://app.alunalun.info/fuseki/pakaianadat/query';
// var koneksi = 'http://localhost:3030/pakaianadat/';
var dbpediakoneksi= 'https://cors-anywhere.herokuapp.com/http://id.dbpedia.org/sparql';
  export default new Vuex.Store({
  state: {   
    kategori:[],
    aksesoris:[],
    pakaian:[],
    daerah:[],
    list_pakaian:[],
    pakaian_daerah:[],
    pakaian_item:[],
    daerah_item:[],
    list_aksesoris:[],
    detail:[],
    hasilcari:[],
    hasildaripakaian:[],
    dbpedia_state:[],
    visualisasi_state:[],
    pakaianadat_state:[],
    get_individuals: [],
  },
  plugins: [new VuexPersistence().plugin],
  
  mutations: {
    tampilKategori(state, hasil){
      state.kategori = hasil
    },
    tampilDaerah(state, hasil){
      state.daerah = hasil
    },
    listPakaian(state, hasil){
      state.list_pakaian = hasil
    },
    listPakaianDaerah(state, hasil){
      state.pakaian_daerah = hasil
    },
    listAksesoris(state, hasil){
      state.list_aksesoris = hasil
    },
    Aksesoris(state, hasil){
      state.aksesoris = hasil
    },
    Pakaian(state, hasil){
      state.pakaian = hasil
    },
    tampil_detail(state, hasil){
      state.detail = hasil
    },
    set_pencarian(state, hasil){
      state.hasilcari = hasil
    },
    aksesorisDariPakaian(state, hasil){
      state.hasildaripakaian = hasil
    },
    digunakanPada(state, hasil){
      state.pakaian_item = hasil
    },
    daerahItem(state, hasil){
      state.daerah_item = hasil
    },
    dbpedia_mutations(state, hasil){
      state.dbpedia_state = hasil
    },
    visualisasi(state, hasil){
      state.visualisasi_state = hasil
    },
    pakaianadat(state,hasil){
      state.pakaianadat_state = hasil
    },
    GET_INDIVIDUALS(state, hasil) {
      state.get_individuals = hasil
    },
  },
  actions: {    
    tampilJenisKategori({commit}){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select ?idKategori ?Kategori ?gambar ?dbpedia
          where{
            ?idKategori rdfs:subClassOf :PakaianAdat.
            ?idKategori rdfs:label ?Kategori.
            OPTIONAL{
            	?idKategori dbo:dbpedia ?dbpedia}
            OPTIONAL{
               ?idKategori  schema:image	?gambar}
            }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('tampilKategori', hasil)
      });
    },
    tampilDaerah({commit}){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?namaDaerah ?idDaerah ?Daerah ?gambar ?dbpedia
            where{
              ?class rdfs:subClassOf* :PakaianAdat.
              ?idPakaian rdf:type	?class.
              ?class rdfs:label	?kategori.
              ?idPakaian :asalDaerah ?idDaerah.
              ?idDaerah dbo:location ?namaDaerah.
              ?idPakaian rdfs:label ?namaPakaian.
            OPTIONAL{
              ?idDaerah schema:image ?gambar}
            OPTIONAL{
            	?idDaerah dbo:dbpedia ?dbpedia}
          } ORDER BY ?namaDaerah`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('tampilDaerah', hasil) 
        //atas(mutations)
      });
    },
    tampilListPakaian({commit},id){
      axios.get(koneksi, {
        params: {
          query: `

          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
          
          SELECT ?idPakaian ?class ?namaPakaian ?kategori ?idDaerah ?namaDaerah ?dbpedia_listpakaian ?id ?labelId ?gambar
	      	WHERE{
          OPTIONAL{
            ?class rdfs:subClassOf* ?id.
            ?id rdfs:label ?labelId.
            ?idPakaian rdf:type	?class.
            ?class rdfs:label	?kategori.
            ?idPakaian :asalDaerah ?idDaerah.
            ?idDaerah dbo:location ?namaDaerah.
            ?idPakaian rdfs:label ?namaPakaian.
            optional{
              ?idPakaian schema:image ?gambar}
            optional{
            ?idPakaian dbo:dbpedia ?dbpedia_listpakaian}
            filter(<${id}>=?id)}
           
          OPTIONAL {?id dbo:location ?namaDaerah.
            ?id dbo:location ?labelId.
            ?idPakaian rdf:type ?class.
            ?class rdfs:label	?kategori.
            ?class rdfs:subClassOf* :PakaianAdat.
            ?idPakaian :asalDaerah ?id.
            ?idPakaian rdfs:label ?namaPakaian.
              optional{
            ?idPakaian schema:image ?gambar}
              optional{
            ?idPakaian dbo:dbpedia ?dbpedia_listpakaian}
              filter (<${id}>=?id)
            } }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result
        console.log(result)
        commit('listPakaian', hasil) 
        //atas(mutations)
      });
    },
    // tampilListPakaianDaerah({commit},id){
    //   axios.get(koneksi, {
    //     params: {
    //       query: `
    //       PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    //       PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    //       PREFIX owl: <http://www.w3.org/2002/07/owl#>
    //       PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
    //       PREFIX schema: <http://schema.org/>
    //       PREFIX dbo: <http://dbpedia.org/ontology/>
    //       PREFIX foaf: <http://xmlns.com/foaf/0.1/>


    //       select distinct ?namaDaerah ?idDaerah ?class ?idPakaian ?namaPakaian ?gambar 
    //         where{
    //         ?idDaerah dbo:location ?namaDaerah.
		// 	      ?idPakaian rdf:type ?class.
  	// 		    ?class rdfs:subClassOf* :PakaianAdat.
    //         ?idPakaian :asalDaerah ?idDaerah.
  	// 		    ?idPakaian rdfs:label ?namaPakaian
    //          optional{?idPakaian schema:image ?gambar}
 		//  	    filter (<${id}>=?idDaerah)
    //       } ORDER BY ?namaDaerah`
    //     }
    //   }).then((response) =>{
    //     const result = response.data.results.bindings;
    //     let hasil = result

    //     console.log(result)
    //     commit('listPakaianDaerah', hasil) 
    //     //atas(mutations)
    //   });
    // },


    tampilListAksesoris({commit}){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>


          select distinct ?namaAksesoris ?idAksesoris ?Aksesoris ?kategori ?gambar
            where{
  	        ?idAksesoris rdf:type ?Aksesoris.
            ?Aksesoris rdfs:subClassOf* :Aksesoris.
            ?Aksesoris rdfs:label ?kategori.
            ?idAksesoris rdfs:label ?namaAksesoris.
#            ?idPakaian :memilikiAksesoris ?idAksesoris
             optional{?idAksesoris schema:image ?gambar}
          } ORDER BY ?namaAksesoris`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('listAksesoris', hasil) 
        //atas(mutations)
      });
    },
    tampilPakaianAdat({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idPakaianAdat ?namaPakaian ?asalDaerah ?dbpedia_pakaianadat ?gambar ?sumber ?sumberGambar ?Suku ?deskripsi
          where{
            ?idPakaianAdat rdfs:label ?namaPakaian.
  		    	?idPakaianAdat :asalDaerah ?idDaerah.
            ?idDaerah dbo:location ?asalDaerah.
            OPTIONAL{
              ?idPakaianAdat :memilikiSuku ?idSuku.
              ?idSuku rdfs:label ?Suku.}
             OPTIONAL{
              ?idPakaianAdat schema:image ?gambar}
             OPTIONAL{
              ?idPakaianAdat dbo:dbpedia ?dbpedia_pakaianadat}
             OPTIONAL{
              ?idPakaianAdat rdfs:comment ?deskripsi}
             OPTIONAL{
              ?idPakaianAdat :SumberGambar ?sumberGambar}
             OPTIONAL{
              ?idPakaianAdat :Sumber ?sumber}
  			    filter ("${id}"=?namaPakaian)
		      }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('pakaianadat', hasil) 
        //atas(mutations)
      });
    },
    tampilAksesoris({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idPakaian ?namaPakaian ?aksesoris ?asaldaerah ?idAksesoris ?dbpedia_aksesoris ?kategori
          where{
            ?idPakaian rdfs:label ?namaPakaian.
            ?idPakaian :memilikiAksesoris ?idAksesoris.
            ?idAksesoris rdfs:label ?aksesoris.
            ?idAksesoris rdf:type ?idKategori.
          	?idKategori rdfs:label ?kategori.
            optional{
              ?idAksesoris dbo:dbpedia ?dbpedia_aksesoris}
  			    filter ("${id}"=?namaPakaian)
            }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('Aksesoris', hasil) 
        //atas(mutations)
      });
    },
    tampilPakaian({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idPakaian ?namaPakaian ?Pakaian ?asaldaerah ?dbpedia_pakaian
          where{
            ?idPakaianAdat rdfs:label ?namaPakaian.
            ?idPakaianAdat :memilikiPakaian ?idPakaian.
            ?idPakaian rdfs:label ?Pakaian.
             optional{
              ?idPakaian dbo:dbpedia ?dbpedia_pakaian}
  			    filter ("${id}"=?namaPakaian)
            }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('Pakaian', hasil) 
        //atas(mutations)
      });
    },
    tampilDetail({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idItem ?item ?asalDaerah ?idAsal ?gender ?idItem ?kategori ?gambar ?dbpedia ?sumber ?sumberGambar ?deskripsi
          where{
          ?idItem rdfs:label ?item.
 		      ?idItem rdf:type ?idKategori.
          ?idKategori rdfs:label ?kategori.
           OPTIONAL{
            ?idItem :asalDaerah ?idAsal.
            ?idAsal dbo:location ?asalDaerah.}
           OPTIONAL{
            ?idItem schema:image	?gambar}
           OPTIONAL{ 
            ?idItem :dikenakanOleh ?idGender.
            ?idGender rdfs:label ?gender.}
           OPTIONAL{
            ?idAsal dbo:dbpedia ?dbpedia}
            OPTIONAL{
              ?idItem rdfs:comment ?deskripsi}
           OPTIONAL{
            ?idItem :SumberGambar ?sumberGambar}
           OPTIONAL{
            ?idItem :Sumber ?sumber}
          filter("${id}"=?item)  
          }`
          // ASAL DAERAHNYA BELUM BENER
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('tampil_detail', hasil) 
        //atas(mutations)
      });
    },
    tampilAksesorisDariPakaian({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?namaPakaian ?pakaian ?idPakaianAdat
          where{
            ?idPakaianAdat rdfs:label ?namaPakaian.
            ?idPakaianAdat :memilikiAksesoris <${id}>.
            <${id}> rdfs:label ?pakaian.
            }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('aksesorisDariPakaian', hasil) 
        //atas(mutations)
      });
    },
    tampilDigunakanPada({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idItem ?Item ?idPakaianAdat ?namaPakaian ?Daerah ?idDaerah
          {{?idItem rdfs:label ?Item.
              ?idPakaianAdat :memilikiAksesoris ?idItem.
              ?idPakaianAdat rdfs:label ?namaPakaian.
              ?idPakaianAdat :asalDaerah ?idDaerah.
              ?idDaerah dbo:location ?Daerah
              filter ("${id}"=?Item)
          }union{?idItem rdfs:label ?Item.
              ?idPakaianAdat :memilikiPakaian ?idItem.
              ?idPakaianAdat rdfs:label ?namaPakaian.
              ?idPakaianAdat :asalDaerah ?idDaerah.
              ?idDaerah dbo:location ?Daerah
  			    	filter ("${id}"=?Item)
            }}`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('digunakanPada', hasil) 
        //atas(mutations)
      });
    },
    tampilDaerahItem({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?idItem ?Item ?Daerah ?idDaerah ?dbpedia_daerah
          {{?idItem rdfs:label ?Item.
              ?idPakaianAdat :memilikiAksesoris ?idItem.
              ?idPakaianAdat rdfs:label ?namaPakaian.
              ?idPakaianAdat :asalDaerah ?idDaerah.
              ?idDaerah dbo:location ?Daerah
              optional{
                ?idDaerah dbo:dbpedia ?dbpedia_daerah}
  			    	filter ("${id}"=?Item)
		        }
  			 union{?idItem rdfs:label ?Item.
              ?idPakaianAdat :memilikiPakaian ?idItem.
              ?idPakaianAdat rdfs:label ?namaPakaian.
              ?idPakaianAdat :asalDaerah ?idDaerah.
              ?idDaerah dbo:location ?Daerah
              optional{
                ?idDaerah dbo:dbpedia ?dbpedia_daerah}
  			    	filter ("${id}"=?Item)
		        }}`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('daerahItem', hasil) 
        //atas(mutations)
      });
    },
    tampilPencarian({commit},id){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            
          select distinct ?labelCari ?idItem ?Item ?Cari ?idItemPakaian ?gambar ?jenis ?asalDaerah{
            {?idItem rdfs:label ?labelCari.
              ?idItem rdfs:label ?Item.
              ?idItem rdf:type ?idJenis.
   					  ?idJenis rdfs:label ?jenis.
    		      OPTIONAL{?idItem schema:image ?gambar}
                filter (regex(?labelCari,"${id}","i"))
            } 
            union{?idCari rdfs:label ?labelCari.
              ?idItem rdf:type ?idJenis.
              ?idJenis rdfs:subClassOf* ?idCari.
              ?idJenis rdfs:label ?jenis.
              ?idItem rdfs:label ?Item.
              OPTIONAL{?idItem schema:image ?gambar}
                filter (regex(?labelCari,"${id}","i"))
            }
            #union{?idItemPakaian rdfs:label ?labelCari.
             # ?idItemPakaian :memilikiAksesoris ?idItem.
             # ?idItem rdfs:label ?Item.
             # ?idItem rdf:type ?idJenis.
  			     # ?idJenis rdfs:subClassOf ?idKategori.
   				   # ?idJenis rdfs:label ?jenis.
    		     # OPTIONAL{?idItem schema:image ?gambar}
              #  filter (regex(?labelCari,"${id}","i"))
            #}
            }order by ?jenis`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('set_pencarian', hasil) 
        //atas(mutations)
      });
    },
    tampilDbpedia({commit},id){
      axios.get(dbpediakoneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
          PREFIX owl: <http://www.w3.org/2002/07/owl#>
          PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
          PREFIX schema: <http://schema.org/>
          PREFIX dbo: <http://dbpedia.org/ontology/>
          PREFIX foaf: <http://xmlns.com/foaf/0.1/>
          PREFIX PROV-O: <http://www.w3.org/ns/prov#>

          select distinct ?id ?a ?link
            where{
            ?id rdfs:label "${id}"@id.
            ?id rdfs:comment ?a.
            ?id PROV-O:wasDerivedFrom ?link
            } `
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('dbpedia_mutations', hasil) 
        //atas(mutations)
      });
    },
    tampilVisualisasi({commit}){
      axios.get(koneksi, {
        params: {
          query: `
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                  PREFIX owl: <http://www.w3.org/2002/07/owl#>


                  SELECT ?domains ?propertys ?ranges ?labelsub ?label
                  WHERE {
                    {?property rdf:type owl:ObjectProperty.
   					        ?property rdfs:domain/(owl:unionOf/rdf:rest*/rdf:first)* ?domain;
#                   ?property rdfs:domain ?domain;
                              rdfs:range ?range.
                    ?domain rdfs:label ?domains.
                    ?property rdfs:label ?propertys.
                    ?range rdfs:label ?ranges.}
                    UNION
                    {
                     ?subject rdf:type owl:Class.
                     ?subject rdfs:label ?label.
                     ?subject rdfs:subClassOf ?subclass.
                     ?subclass rdfs:label ?labelsub.
                    }
                  }`
        }
      }).then((response) =>{
        const result = response.data.results.bindings;
        let hasil = result

        console.log(result)
        commit('visualisasi', hasil) 
        //atas(mutations)
      });
    },

    getIndividuals({ commit }, id) {
      axios.get(koneksi, {
          params: {
              query: `
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX schema: <http://schema.org/>
                PREFIX :  <http://alunalun.info/ontology/pakaianadat#>
                PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                PREFIX owl: <http://www.w3.org/2002/07/owl#>
                PREFIX foaf: <http://xmlns.com/foaf/0.1/>
                PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                PREFIX dbo: <http://dbpedia.org/ontology/>
                PREFIX PROV-O: <http://www.w3.org/ns/prov#>


                SELECT *
                WHERE {
                    ?subject rdfs:label ?subject_label.
                    ?individuals a ?subject.
                    OPTIONAL{
                      ?individuals rdfs:label ?label}
                    OPTIONAL{
                            ?individuals dbo:location ?label}
                    OPTIONAL{
                      ?individuals dbo:dbpedia ?dbpedia}
                filter(?subject_label="${id}")}`
          }
      }).then((response) => {
          const result = response.data.results.bindings
          let hasil = result
          commit('GET_INDIVIDUALS', hasil)
      })
    },

  }
})
