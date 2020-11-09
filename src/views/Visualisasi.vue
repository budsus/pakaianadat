<template>
    <div>
        <h5 style="text-align:center; margin-top:2rem">Visualisasi Ontologi Pakaian Adat</h5>
      <div class="row justify-content-md-center" style="margin-top:0.5rem">
        <div class="col-lg-9" id="canvas"><br><br><br></div>
        <div class="col-lg-3 sidebar" style="background-color: #d2e08d; overflow:scroll; height:520px;">
        <nav>
          <div class="menu" >
            <br><br>
            <span v-if="showData">
              <h4 id="individu1">Name Class: </h4>
              <p id="individu2">{{name}}</p>
              <div id="individu3" v-if="Object.keys(get_individuals).length">
                <h4>Individuals: </h4>
                <div v-for="(i, index) in get_individuals" :key="index">
                    <!-- <p > -->
                    <div v-if="i.subject_label.value==='Upacara'||i.subject_label.value==='Harian'||i.subject_label.value==='Pernikahan'"><a v-on:click="tampilDbpedia(i.dbpedia.value)" :href="'/DetailPakaian/' + i.label.value">{{i.label.value}}
                    </a>
                    </div>
                    <!-- </p> -->
                    <div v-else-if="i.subject_label.value==='Provinsi'">
                    <router-link to="/DaftarPakaian">
                    <div @click="tampilListPakaian(i.individuals.value),tampilDbpedia(i.dbpedia.value)">{{i.label.value}}</div>
                    </router-link>
                    </div>
                    <div v-else>
                      <a :href="'/HalamanDetail/' + i.label.value">{{i.label.value}}</a>
                    </div>
                </div>
              </div>
            </span>
          </div>
        </nav>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            showData: false,
            name:null,
        }
    },
    methods:{
        ...mapActions([
            'getIndividuals',
            'tampilDbpedia',
            'tampilListPakaian'
        ]),
        showIndividuals(d){
            this.getIndividuals(d.name)
            this.name = d.name
            this.showData = true
        }
    },
    computed:{
        ...mapState([
            'visualisasi_state',
            'get_individuals'
        ])
    },
    mounted(){
			this.$store.dispatch('tampilVisualisasi')

			var data = this.visualisasi_state;
			var links = [];
            
            $.each(data, function(i,v){
                if(v.label){
                    links.push({source: v.label.value, target: v.labelsub.value, type: "resolved", status: "class", hubungan: "subClassOf"})
                }
                if(v.domains){
                    links.push({source: v.domains.value, target: v.ranges.value, type: "suit", status: "utama", hubungan: v.propertys.value})
                }
            })
            
            var nodes = {},
            nodeToStatus = {};

             // Compute the distinct nodes from the links.
            links.forEach(function(link) {
                link.source =
                nodes[link.source] || (nodes[link.source] = { name: link.source });
                link.target =
                nodes[link.target] || (nodes[link.target] = { name: link.target });
                nodeToStatus[link.source.name] = link.status;
            });

            var width = 1000,
            height = 459;

            var force = d3.layout
            .force()
            .nodes(d3.values(nodes))
            .links(links)
            .size([width, height])
            .linkDistance(200)
            .charge(-1500)
            .on("tick", tick)
            .start();

            var svg = d3.select("#canvas")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(d3.behavior.zoom().on("zoom", function () {
                svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            }))
            .append("g")

            // Per-type markers, as they don't inherit styles.
            svg.append("defs")
            .selectAll("marker")
            .data(["suit", "licensing", "resolved"])
            .enter()
            .append("marker")
            .attr("id", function(d) {
            return d;
            }).attr("viewBox", "0 -5 10 10")
            .attr("refX", 15)
            .attr("refY", -1.5)
            .attr("markerWidth", 10)
            .attr("markerHeight", 7)
            .attr("orient", "auto")
            .append("svg:path")
            .attr("d", "M0,-5L10,0L0,5");

            var path = svg.append("g")
            .selectAll("path")
            .data(force.links())
            .enter()
            .append("path")
            .attr("id", function(d) {
            return d.source.index + "_" + d.target.index;
            }).attr("class", function(d) {
            return "link " + d.type;
            }).attr("marker-end", function(d) {
            return "url(#" + d.type + ")";
            });

            var circle = svg.append("g")
            .selectAll("circle")
            .data(force.nodes())
            .enter()
            .append("circle")
            .attr("r", 10)
            .style("fill", function(d) {
            return d3.select(this).classed(nodeToStatus[d.name], true);
            }).call(force.drag)
            .on("mouseover.node", onMouseover)
            .on("mouseout.node", onMouseout)
            .on("click.node", this.showIndividuals)

            var text = svg
            .append("svg:g")
            .selectAll("g")
            .data(force.nodes())
            .enter()
            .append("svg:g");

            text
            .append("text")
            .attr("x", 2)
            .attr("y", ".31em")
            .attr("class", "shadow")
            .text(function(d) {
            return d.name;
            });

            text
            .append("svg:text")
            .attr("x", 2)
            .attr("y", ".31em")
            .text(function(d) {
            return d.name;
            });

            var path_label = svg
            .append("g")
            .selectAll(".path_label")
            .data(force.links())
            .enter()
            .append("text")
            .attr("class", "path_label")
            .append("textPath")
            .attr("startOffset", "50%")
            .attr("text-anchor", "middle")
            .attr("xlink:href", function(d) {
            return "#" + d.source.index + "_" + d.target.index;
            })
            .style("fill", "#000")
            .style("font-family", "Arial")
            .text(function(d) {
            return d.hubungan;
            });

            // Use elliptical arc path segments to doubly-encode directionality.
            function tick() {
                path.attr("d", linkArc);
                circle.attr("transform", transform);
                text.attr("transform", transform);
            }

            function linkArc(d) {
            var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
            return (
                "M" +
                d.source.x +
                "," +
                d.source.y +
                "A" +
                dr +
                "," +
                dr +
                " 0 0,1 " +
                d.target.x +
                "," +
                d.target.y
            );
            }

            function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
            }

            function onMouseover(d) {
            d3.select(this)
            .transition()
            .duration(500)
            .style("cursor", "pointer");
            }

            function onMouseout(d) {
            d3.select(this)
            .transition()
            .duration(500)
            .style("cursor", "normal")
            .attr("width", 40);
            }
    },
}
</script>

<style>
/* .div{
font-family: 'Nunito', sans-serif;
} */
#judul{
  text-align: center;
 
}
.utama{
    fill: yellow;
}

ul {
  list-style: none;
}

.link {
  fill: none;
  stroke: #666;
  stroke-width: 1.5px;
}

#licensing {
  fill: green;
}

.link.licensing {
  stroke: red;
}

.link.resolved {
  stroke-dasharray: 0, 2 1;
}

circle {
  fill: #ccc;
  stroke: #333;
  stroke-width: 1.5px;
}

text {
  font: 10px sans-serif;
  pointer-events: none;
  text-shadow: 0 1px 0 #fff, 1px 0 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff;
}

text.shadow {
  stroke: #fff;
  stroke-width: 3px;
  stroke-opacity: 0.8;
}

.class {
  fill: green;
}

.external {
  fill: blue;
}

.tema{
  fill:yellow;
}

.sidebar {
  background-color: #ededed;
  margin-top: -20px;
  border-radius: 10px;
  padding-bottom: 200px;
  padding-right: 40px;
  text-decoration: none;
}

.bullets {
  list-style: none;
}

.menu {
  /* font-family: ubuntu; */
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
  font-size: 17px;
  text-decoration: none;
  cursor: pointer;
  color: #000;
}

.isi {
  margin-top: 25px;
  margin-left: 30px;
  margin-bottom: 100px;
}

li :hover {
  color: blue;
}

#link {
  text-decoration: none;
  color: #000;
}

#individu1{
  padding-left: 20px;
}

#individu2{
  padding-left: 20px;
}

#individu3{
  padding-left: 20px;
}
</style>
