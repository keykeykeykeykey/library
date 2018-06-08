<template>
  <div class="login_page">
    <div class="page_top"></div>
    <div class="header">
      <img src="../assets/logo.png"/>
      <div class="hello_world">中山图书馆欢迎你</div>
      <div class="index_page"><a @click="go_index">首页</a></div>
    </div>
    <div class="login">
      <el-select v-model="value" placeholder="请选择" class="role">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-form ref="form" :modal="form" class="form">
        <el-form-item label="账号">
          <el-input v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">立即登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {name: '', password: ''},
        responseResult: [],
        options: [{
          value: '读者',
          label: '读者'
        }, {
          value: '图书管理员',
          label: '图书管理员'
        }, {
          value: '系统管理员',
          label: '系统管理员'
        }],
        value: '读者'
      }
    },
    methods: {
      login() {
        this.$message.error('密码或者用户名错误');
        if (this.value == "读者") {
          this.$axios
            .post('/user/login', {
              name: this.form.name,
              password: this.form.password
            })
            .then(successResponse => {
              var userinfo = successResponse.data.data[0];
              if (successResponse.data.message == "登陆成功") {
                this.$store.dispatch('login', '读者').then(() => {

                })
                this.$router.push({path: '/user', query: {id: userinfo[0], name: userinfo[1]}})
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
              }

            })
            .catch(failResponse => {
            })
        }
        if (this.value == "图书管理员") {
          this.$axios
            .post('/bookAdmin/login', {
              name: this.form.name,
              password: this.form.password
            })
            .then(successResponse => {
              if (successResponse.data.message == "登陆成功") {
                this.$store.dispatch('login', '图书管理员').then(() => {

                })
                var data = successResponse.data.data[0];
                this.$router.push({path: '/admin', query: {id: data[0],name:data[3]}})
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
              }
            })
            .catch(failResponse => {
            })
        }
        if (this.value == "系统管理员") {
          this.$axios
            .post('/systemAdmin/login', {
              name: this.form.name,
              password: this.form.password
            })
            .then(successResponse => {
              if (successResponse.data.message == "登陆成功") {
                this.$store.dispatch('login', '系统管理员').then(() => {

                })
                var data = successResponse.data.data[0];
                this.$router.push({path: '/system', query: {id: data[0], name: data[1]}});
                this.$message({
                  message: '登陆成功',
                  type: 'success'
                });
              }
            })
            .catch(failResponse => {
            })
        }
      },
      go_index() {
        this.$router.push('/')
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

  .login_page .page_top {
    width: 100%;
    height: 50px;
  }

  .login_page .header {
    width: 100%;
    height: 120px;
  }

  .login_page .header img {
    display: inline-block;
    margin: 0px 0px 50px 150px;
    float: left;
  }

  .login_page .hello_world {
    width: 350px;
    height: 70px;
    font-size: 20px;
    font-weight: bold;
    color: #0F558F;
    text-shadow: 0px 4px 2px #D0D2DF;
    text-align: center;
    line-height: 110px;
    margin: 0px 0px 50px 0px;
    float: left;
  }

  .login_page .index_page {
    width: 555px;
    height: 70px;
    font-size: 20px;
    font-weight: bold;
    color: #0F558F;
    text-shadow: 0px 4px 2px #D0D2DF;
    text-align: center;
    line-height: 110px;
    margin: 0px 0px 50px 0px;
    float: left;
  }

  .login_page .index_page a {
    text-decoration: none;
    cursor: pointer;
  }

  .login_page .login {
    width: 560px;
    height: 330px;
    border: 8px solid #BBDEF2;
    border-radius: 20px;
    margin-right: 100px;
    float: right;
  }

  .login_page .role {
    display: inline-block;
    margin: auto;
    border: none;
    font-size: 20px;
    font-weight: 900;
    color: #2369A3;
    text-align: center;
    margin: 25px 0px 5px 200px;
  }

  .login_page .form {
    width: 450px;
    margin-left: 50px;
  }
</style>
