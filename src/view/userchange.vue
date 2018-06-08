<template>
  <div v-if="this.$store.state.user=='读者'" class="userchange">
    <div class="header">
      <div class="home_logo">
        <a @click="go_index" style="cursor: pointer">首页</a>
      </div>
      <div class="page_title">个人中心</div>
      <div class="out_page" @click="logout" style="cursor: pointer">退出</div>
    </div>
    <div class="book_logo">
      <img src="../assets/booklogo.png"/>
    </div>
    <div class="reader_name">{{name}}</div>
    <div class="menu">
      <ul>
        <li class="other_li" @click="go_user">基本资料</li>
        <li class="first_li">修改资料</li>
        <li class="other_li" @click="go_userchangepwd">修改密码</li>
        <li class="other_li" @click="go_bookonline">在借图书</li>
        <li class="other_li" @click="go_userborrow">借阅记录</li>
      </ul>
    </div>
    <div class="content">
      <div class="data"><label>电话</label>
        <input v-model="userinfo[4]"/>
      </div>
      <div class="data"><label>邮箱</label>
        <input v-model="userinfo[5]"/>
      </div>
      <div class="change_btn" @click="sure">确认修改</div>
    </div>
    <div class="footer">
      <br/>
      <p>@Copyright重庆理工大学中山图书馆</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userchange",
    data() {
      return {
        id: this.$route.query.id,
        userinfo: {},
        name: this.$route.query.name
      }
    },
    created: function () {
      this.refresh();
    },
    methods: {
      go_index() {
        this.$router.push('/')
      },
      logout() {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      },
      refresh() {
        this.$axios
          .post('/user/base', {
            id: this.id
          })
          .then(successResponse => {
            this.userinfo = successResponse.data.data[0];
            this.sendNum = successResponse.data.message;
          })
          .catch(failResponse => {
          })
      },
      sure() {
        this.$axios
          .post('/user/change', {
            id: this.id,
            phone: this.userinfo[4],
            email: this.userinfo[5]
          })
          .then(successResponse => {
            this.$message({
              message: '信息修改成功',
              type: 'success'
            });
            this.refresh();
          })
          .catch(failResponse => {
          })
      },
      go_user() {
        this.$router.push({path: '/user', query: {id: this.id, name: this.name}});
      },
      go_userchangepwd() {
        this.$router.push({path: '/userchangepwd', query: {id: this.id, name: this.name}});
      },
      go_bookonline() {
        this.$router.push({path: '/bookonline', query: {id: this.id, name: this.name}});
      },
      go_userborrow() {
        this.$router.push({path: '/userborrow', query: {id: this.id, name: this.name}});
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

  .userchange .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
    line-height: 48px;
    font-size: 17px;
    color: #FFF;
    font-weight: bold;
  }

  .userchange .header .home_logo {
    width: 20%;
    text-align: center;
    display: inline-block;
    font-size: 17px;
    font-weight: bold;
  }

  .userchange .header .page_title {
    width: 58%;
    text-align: center;
    display: inline-block;
  }

  .userchange .header .out_page {
    width: 20%;
    text-align: center;
    display: inline-block;
  }

  .userchange .book_logo {
    margin-top: 75px;
  }

  .userchange .book_logo img {
    width: 8%;
    display: block;
    margin: 0 auto;
  }

  .userchange .reader_name {
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    color: #419EDC;
  }

  .userchange .menu {
    height: 71px;
  }

  .userchange .menu ul {
    width: 51%;
    margin: 0 auto;
    margin-top: 43px;
  }

  .userchange .menu ul li {
    line-height: 68px;
    padding: 0 3%;
    list-style: none;
    float: left;
    background-color: #FFF;
    font-size: 23px;
    font-weight: bold;
    cursor: pointer;
  }

  .userchange .other_li {
    border-top: 1px solid #D4D5D6;
    border-bottom: 2px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-left: 1px solid #D4D5D6;
  }

  .userchange .first_li {
    border-top: 1px solid #D4D5D6;
    border-left: 1px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-bottom: 7px solid rgb(65, 158, 220);
    margin-top: -7px;
    color: rgb(65, 158, 220);
  }

  .userchange .content {
    width: 90%;
    height: 650px;
    border: 5px solid #419EDC;
    margin: 0 auto;
    margin-top: 35px;
    border-radius: 15px;
    padding: 40px 0px;
  }

  .userchange .data {
    width: 100%;
    height: 60px;
    line-height: 35px;
    margin-bottom: 5px;
  }

  .userchange .data input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 300px;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .userchange .change_btn {
    width: 100px;
    height: 35px;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #419EDC;
    border-radius: 5px;
    display: inline-block;
    margin: 10px 30px 10px 50px;
    cursor: pointer;
  }

  .userchange .footer {
    width: 1366px;
    height: 48px;
    text-align: center;
    font-size: 14px;
    color: #FFF;
    background-color: #262F5A;
    margin-top: 35px;
  }
</style>
