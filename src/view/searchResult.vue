<template>
  <div class="searchResult">
    <div class="header">
      <div class="home_logo">
        <a @click="go_index" style="cursor: pointer;position: relative;right: 350px;">首页</a>
      </div>
      <div class="out_page">
        <a @click="go_login" style="cursor: pointer" v-if="this.$store.state.user==undefined">登陆</a>
        <a @click="logout" style="cursor: pointer" v-if="this.$store.state.user!=undefined">退出</a>
      </div>
    </div>
    <div class="ad_data">
      <div class="search">
        <input type="text" placeholder="输入图书名" v-model="keyword"/>
        <div class="btn" @click="searchBookInfo">搜索</div>
      </div>
      <div class="table">
        <el-table
          :data="bookInfo"
          border
          style="width: 95%;margin: 10px auto;">
          <el-table-column
            prop="bookNum"
            label="图书编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="bookName"
            label="图书名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="author"
            label="作者"
            width="80">
          </el-table-column>
          <el-table-column
            prop="translator"
            label="译者"
            width="80">
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="80">
          </el-table-column>
          <el-table-column
            prop="publish"
            label="出版社"
            width="150">
          </el-table-column>
          <el-table-column
            prop="comeTime"
            label="出版日期"
            width="150">
          </el-table-column>
          <el-table-column
            prop="isbn"
            label="ISBN编码"
            width="100">
          </el-table-column>
          <el-table-column
            prop="enterMen"
            label="入库者"
            width="80">
          </el-table-column>
          <el-table-column
            prop="enterTime"
            label="入库时间">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "search-result",
    data() {
      return {
        keyword: this.$route.query.keyword,
        bookInfo: []
      }
    },
    created: function () {
      this.refresh()
    },
    methods: {
      logout(){
        this.$store.dispatch('logout').then(() => {
        })
      },
      go_index() {
        this.$router.push('/')
      },
      go_login() {
        this.$router.push('/login')
      },
      searchBookInfo() {
        this.bookInfo = [];
        this.$axios
          .post('/bookAdmin/searchBookInfoAndStatus', {
            keyword: this.keyword,
          })
          .then(successResponse => {
            console.log(successResponse)
            var data = successResponse.data.data;
            if (data.length == 0) {
              this.$message({
                message: '暂无图书',
                type: 'success'
              });
            }
            else {
              for (var i = 0; i < data.length; i++) {
                var data3 = {};
                data3.bookNum = data[i][0];
                data3.bookName = data[i][1];
                data3.author = data[i][2];
                data3.translator = data[i][3];
                data3.price = data[i][4];
                data3.publish = data[i][6];
                data3.comeTime = this.timeParse(data[i][7]);
                data3.isbn = data[i][5];
                data3.enterMen = data[i][8];
                data3.enterTime = this.timeParse(data[i][9]);
                this.bookInfo.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
          })
      },
      refresh() {
        this.bookInfo = [];
        this.$axios
          .post('/bookAdmin/searchBookInfoAndStatus', {
            keyword: this.keyword,
          })
          .then(successResponse => {
            console.log(successResponse)
            var data = successResponse.data.data;
            if (data.length == 0) {
              this.$message({
                message: '暂无图书',
                type: 'success'
              });
            }
            else {
              for (var i = 0; i < data.length; i++) {
                var data3 = {};
                data3.bookNum = data[i][0];
                data3.bookName = data[i][1];
                data3.author = data[i][2];
                data3.translator = data[i][3];
                data3.price = data[i][4];
                data3.publish = data[i][6];
                data3.comeTime = this.timeParse(data[i][7]);
                data3.isbn = data[i][5];
                data3.enterMen = data[i][8];
                data3.enterTime = this.timeParse(data[i][9]);
                this.bookInfo.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
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

  .searchResult .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
    line-height: 48px;
    font-size: 17px;
    color: #FFF;
    font-weight: bold;
  }

  .searchResult .header .home_logo {
    width: 60%;
    text-align: center;
    display: inline-block;
    font-size: 17px;
    font-weight: bold;
  }

  .searchResult .header .out_page {
    width: 20%;
    text-align: center;
    display: inline-block;
  }

  .searchResult .data label {
    font-size: 14px;
    float: left;
    margin-left: 150px;
    color: #515567;
    font-weight: bold;
  }

  .searchResult .data input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 300px;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .searchResult .btn {
    width: 80px;
    height: 35px;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #d3d4d5;
    border-radius: 5px;
    display: inline-block;
    margin-top: 10px;
    margin-right: 30px;
    cursor: pointer;
  }

  .searchResult .search {
    width: 100%;
    height: 35px;
    margin-bottom: 30px;
  }

  .searchResult .search input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
    display: inline-block;
    margin-left: 100px;
  }
</style>
