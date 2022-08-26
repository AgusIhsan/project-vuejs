<template>
<button class="btn btn-primary">Buttonn</button>
</template>

<script>
import axios from 'axios'
export default {
  data: function() {
    return {
      items:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    async getData(){
      const data = axios.get('https://gorest.co.in/public/v2/users')
      console.log('data', data)
    }
  }
}
</script>