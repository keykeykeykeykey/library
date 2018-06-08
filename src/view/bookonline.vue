<template>
  <div v-if="this.$store.state.user=='读者'" class="bookOnline">
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
        <li class="other_li" @click="go_userchangepwd">修改密码</li>
        <li class="first_li">在借图书</li>
        <li class="other_li" @click="go_userborrow">借阅记录</li>
      </ul>
    </div>
    <div class="content">
      <div class="book_num">
        <div class="borred">
          已借
          <span>{{this.tableData.length}}</span>
          本
        </div>
        <div class="borred">
          剩余可借
          <span>{{canBorrow}}</span>
          本
        </div>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 80%;margin: 40px auto;">
        <el-table-column
          prop="index"
          label="序号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="borrowNum"
          label="借阅号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="bookName"
          label="图书名">
        </el-table-column>
        <el-table-column
          prop="returnTime"
          label="应还日期">
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <br/>
      <p>@Copyright重庆理工大学中山图书馆</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bookonline",
    data() {
      return {
        name: this.$route.query.name,
        id: this.$route.query.id,
        tableData: [],
        canBorrow:''
      }
    },
    created: function () {
      this.refresh();
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
      go_userchangepwd() {
        this.$router.push({path: '/userchangepwd', query: {id: this.id, name: this.name}});
      },
      go_userborrow(){
        this.$router.push({path: '/userborrow', query: {id: this.id, name: this.name}});
      },
      refresh() {
        this.$axios
          .post('/user/getborrow', {
            id: this.id,
            status:1
          })
          .then(successResponse => {
            var data = successResponse.data.data;
            var data2 = successResponse.data.data2;
            for (var i = 0; i < data.length; i++) {
              var data3 = {};
              data3.index = i + 1;
              data3.borrowNum = data2[0][1];
              data3.bookName = data[i][0];
              data3.returnTime = this.timeParse(data[i][3]);
              this.tableData.push(data3)
            }
            this.canBorrow = data2[0][6] - data.length;
          })
          .catch(failResponse => {
          })
      },
      timeParse(key) {
        var time = new Date(key);
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        var beginAt = year + '-' + month + '-' + date
        return beginAt;
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

  .bookOnline .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
    line-height: 48px;
    font-size: 17px;
    color: #FFF;
    font-weight: bold;
  }

  .bookOnline .header .home_logo {
    width: 20%;
    text-align: center;
    display: inline-block;
    font-size: 17px;
    font-weight: bold;
  }

  .bookOnline .header .page_title {
    width: 58%;
    text-align: center;
    display: inline-block;
  }

  .bookOnline .header .out_page {
    width: 20%;
    text-align: center;
    display: inline-block;
  }

  .bookOnline .book_logo {
    margin-top: 75px;
  }

  .bookOnline .book_logo img {
    width: 8%;
    display: block;
    margin: 0 auto;
  }

  .bookOnline .reader_name {
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-top: 25px;
    color: #419EDC;
  }

  .bookOnline .menu {
    height: 71px;
  }

  .bookOnline .menu ul {
    width: 51%;
    margin: 0 auto;
    margin-top: 43px;
  }

  .bookOnline .menu ul li {
    line-height: 68px;
    padding: 0 3%;
    list-style: none;
    float: left;
    background-color: #FFF;
    font-size: 23px;
    font-weight: bold;
    cursor: pointer;
  }

  .bookOnline .other_li {
    border-top: 1px solid #D4D5D6;
    border-bottom: 2px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-left: 1px solid #D4D5D6;
  }

  .bookOnline .first_li {
    border-top: 1px solid #D4D5D6;
    border-left: 1px solid #D4D5D6;
    border-right: 1px dashed #D4D5D6;
    border-bottom: 7px solid rgb(65, 158, 220);
    margin-top: -7px;
    color: rgb(65, 158, 220);
  }

  .bookOnline .content {
    width: 90%;
    height: 650px;
    border: 5px solid #419EDC;
    margin: 0 auto;
    margin-top: 35px;
    border-radius: 15px;
    padding: 40px 0px;
  }

  .bookOnline .book_num{
    font-size: 17px;
    font-weight: bold;
    padding-left: 20px;
  }

  .bookOnline .borred{
    display: inline-block;
    margin-left: 20px;
  }

  .bookOnline .borred span{
    color: #419EDE;
  }

  .bookOnline .footer {
    width: 1366px;
    height: 48px;
    text-align: center;
    font-size: 14px;
    color: #FFF;
    background-color: #262F5A;
    margin-top: 35px;
  }
</style>
