<template>
  <div>
    <app-nav></app-nav>
    <router-view>
    </router-view>
    <app-foot></app-foot>
  </div>

</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default {
  components:{
    'app-nav':Navbar,
    'app-foot':Footer
  }
}
</script>
