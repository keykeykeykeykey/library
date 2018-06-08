<template>
  <div v-if="this.$store.state.user=='读者'" class="userpwd">
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
        <li class="other_li" @click="go_userchange">修改资料</li>
        <li class="first_li">修改密码</li>
        <li class="other_li" @click="go_bookonline">在借图书</li>
        <li class="other_li" @click="go_userborrow">借阅记录</li>
      </ul>
    </div>
    <div class="content">
      <div class="data"><label>原密码</label>
        <input type="password" v-model="password"/>
      </div>
      <div class="data"><label>新密码</label>
        <input type="password" v-model="newPassword"/>
      </div>
      <div class="data"><label>确认新密</label>
        <input type="password" v-model="surePassword"/>
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
    name: "userchangepwd",
    data() {
      return {
        password: '',
        newPassword: '',
        surePassword: '',
        name: this.$route.query.name,
        id: this.$route.query.id
      }
    },
    methods: {
      go_index(){
        this.$router.push('/')
      },
      logout(){
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      },
      go_user() {
        this.$router.push({path: '/user', query: {id: this.id, name: this.name}});
      },
      go_userchange() {
        this.$router.push({path: '/userchange', query: {id: this.id, name: this.name}});
      },
      go_bookonline() {
        this.$router.push({path: '/bookonline', query: {id: this.id, name: this.name}});
      },
      go_userborrow(){
        this.$router.push({path: '/userborrow', query: {id: this.id, name: this.name}});
      },
      sure() {
        if (this.password == '' || this.newPassword == '' || this.surePassword == '') {
          this.$message.error('有选项未填');
        }
        else if (this.newPassword != this.surePassword) {
          this.$message.error('两次密码不一致');
        }
        else {
          this.$axios
            .post('/user/changepwd', {
              id: this.id,
              password: this.password,
              newPassword: this.newPassword
            })
            .then(successResponse => {
              if (successResponse.data.message == "修改成功") {
                this.$message({
                  message: '密码修改成功',
                  type: 'success'
                });
              }
              else {
                this.$message.error('密码修改失败');
              }
              this.password = '',
                this.newPassword = '',
                this.surePassword = ''
            })
            .catch(failResponse => {
            })
        }
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

  .userpwd .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
    line-height: 48px;
    font-size: 17px;
    color: #FFF;
    font-weight: bold;
  }

  .userpwd .header .home_logo {
    width: 20%;
    text-align: center;
    display: inline-block;
    font-size: 17px;
    font-weight: bold;
  }

  .userpwd .header .page_title {
    width: 58%;
    text-align: center;
    display: inline-block;
  }

  .userpwd .header .out_page {
    width: 20%;
    text-align: center;
    display: inline-block;
  }

  .userpwd .book_logo {
    margin-top: 75px;
  }

  .userpwd .book_logo img {
    width: 8%;
    display: block;
    margin: 0 auto;
  }

  .userpwd .reader_name {
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    color: #419EDC;
  }

  .userpwd .menu {
    height: 71px;
  }

  .userpwd .menu ul {
    width: 51%;
    margin: 0 auto;
    margin-top: 43px;
  }

  .userpwd .menu ul li {
    line-height: 68px;
    padding: 0 3%;
    list-style: none;
    float: left;
    background-color: #FFF;
    font-size: 23px;
    font-weight: bold;
    cursor: pointer;
  }

  .userpwd .other_li {
    border-top: 1px solid #D4D5D6;
    border-bottom: 2px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-left: 1px solid #D4D5D6;
  }

  .userpwd .first_li {
    border-top: 1px solid #D4D5D6;
    border-left: 1px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-bottom: 7px solid rgb(65, 158, 220);
    margin-top: -7px;
    color: rgb(65, 158, 220);
  }

  .userpwd .content {
    width: 90%;
    height: 650px;
    border: 5px solid #419EDC;
    margin: 0 auto;
    margin-top: 35px;
    border-radius: 15px;
    padding: 40px 0px;
  }

  .userpwd .data {
    width: 100%;
    height: 60px;
    line-height: 35px;
    margin-bottom: 5px;
  }

  .userpwd .data input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 300px;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .userpwd .change_btn {
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

  .userpwd .footer {
    width: 1366px;
    height: 48px;
    text-align: center;
    font-size: 14px;
    color: #FFF;
    background-color: #262F5A;
    margin-top: 35px;
  }
</style>
