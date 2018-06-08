<template>
  <div class="index_page">
    <div class="page_top">
      <div class="login">
        <a @click="go_login" v-if="this.$store.state.user==undefined">登录</a>
        <a @click="logout" v-if="this.$store.state.user!=undefined">退出</a>
      </div>
    </div>
    <div class="header">
      <img src="../assets/logo.png"/>
    </div>
    <div class="content">
      <div class="carousel">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item v-for="(img,index) in images" :key="index">
            <img v-bind:src="img.url"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="search">
        <input class="search_input" type="text" v-model="keyword"/>
        <div class="search_btn" @click="searchBook" style="cursor: pointer">搜索</div>
      </div>
    </div>
    <div class="font_carousel">
      <marquee direction="left" align="bottom" onmouseout="this.start()" onmouseover="this.stop()" scrollamount="2"
               scrolldelay="1">
        图书馆本周周一至周日正常开放，开馆时间：8:20,闭馆时间：22:00
      </marquee>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        keyword:'',
        images: [{
          url: require('../assets/slide-1.jpg')
        },
          {
            url: require('../assets/slide-2.jpg')
          },
          {
            url: require('../assets/slide-3.jpg')
          },
          {
            url: require('../assets/slide-4.jpg')
          },
        ]
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('logout').then(() => {
        })
      },
      go_login() {
        this.$router.push('/login')
      },
      searchBook(){
        this.$router.push({path:'/searchResult',query:{keyword:this.keyword}})
      }
    }
  }
</script>

<style scoped>

</style>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .index_page .page_top {
    width: 100%;
    height: 50px;
    background-color: #262F5A;
  }

  .index_page .login {
    color: #FFF;
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 17%;
  }

  .index_page .login a {
    color: #FFF;
    text-decoration: none;
    cursor: pointer;
  }

  .index_page .header {
    width: 100%;
    height: 120px;
  }

  .index_page .header img {
    display: inline-block;
    margin: 0px 0px 50px 150px;
    float: left;
  }

  .index_page .content {
    width: 100%;
    height: 400px;
  }

  .index_page .carousel {
    width: 900px;
    margin: auto;
  }

  .index_page .search {
    width: 500px;
    height: 80px;
    background-color: #FFF;
    border-radius: 10px;
    position: absolute;
    top: 405px;
    right: 233px;
    z-index: 100;
  }

  .index_page .search_input {
    width: 350px;
    height: 35px;
    border: 5px solid #262F5A;
    font-size: 20px;
    position: absolute;
    top: 17px;
    right: 120px;
  }

  .index_page .search_btn {
    width: 85px;
    height: 35px;
    background-color: #262F5A;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    position: absolute;
    top: 20px;
    right: 25px;
  }

  .index_page .font_carousel {
    width: 100%;
    height: 35px;
    position: absolute;
    top: 580px;
    background-color: #E2E2E2;
    font-size: 15px;
    line-height: 35px;
    color: #985F90;
    font-weight: bold;
  }


</style>
