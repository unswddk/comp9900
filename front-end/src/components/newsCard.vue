<template>
<Row>
<Col offset='2' span='18'>
<div>
<h3 slot="title">News</h3 >
 <md-list  v-for="item in news" :key="item.index">
      <div class="md-title"><a :href="item.url" target="_blank">{{ item.title }}</a>
</div>
<md-content>{{item.description}}</md-content>

<small style="float:right">{{ item.publishedAt }}</small>

 </md-list>

</div>
</Col>
</Row>
</template>
<script>
    export default {
        name: "newsCard",
        props:["message"],
        data(){return{
          news:[],
          }
        },
        watch:{
          message(){
               this.$http
      .get("https://newsapi.org/v2/everything?q="+this.message+"&from=2018-04-05&apiKey=320e46c256854087b0c1703e6de2d18e")
      .then(
        response => {
          this.news = [];
          this.news = response.data.articles;
        },
        response => {
          // 响应错误回调
          console.log("服务器请求失败");
        }
      );
          }
        },
        computed:{
          imageLink(){
            return 'https://picsum.photos/300/200/?image=' +parseInt(Math.random()*100)+'&gravity=east';
        }
        }
    }
</script>
<style scoped>

</style>
