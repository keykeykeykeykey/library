<template>
  <div v-if="this.$store.state.user=='图书管理员'" class="admin">
    <div class="header">
      <img src="../assets/logo.png"/>
      <div class="state">
        <div class="ad_name">{{name}}</div>
        <div class="out" @click="logout" style="cursor: pointer">退出</div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          @select="handleSelect"
          text-color="#fff"
          active-text-color="#ffd04b" style="height: 1000px">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">读者借书</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">读者还书</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-menu"></i>
            <span slot="title">新书入库</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">图书出库</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-menu"></i>
            <span slot="title">修改图书信息</span>
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-menu"></i>
            <span slot="title">查阅借阅记录</span>
          </el-menu-item>
          <el-menu-item index="7">
            <i class="el-icon-menu"></i>
            <span slot="title">查阅图书信息</span>
          </el-menu-item>
          <el-menu-item index="8">
            <i class="el-icon-setting"></i>
            <span slot="title">管理员中心</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <div v-if="this.index==1" class="ad_data">
          <div class="data"><label>借阅号</label><input type="text" v-model="userBorrowNum"/></div>
          <div class="data"><label>图书编号</label><input type="text" v-model="userBorrowBookNum"/></div>
          <div class="btn" @click="userBorrowBookSure">验证</div>
          <div class="btn" @click="userBorrowBookCancel">清空</div>
          <div class="table_div">
            <el-table
              :data="tableData"
              border
              style="width: 95%;margin: 10px auto;">
              <el-table-column
                prop="lenedNum"
                label="借阅号"
                width="300">
              </el-table-column>
              <el-table-column
                prop="bookName"
                label="图书名"
                width="300">
              </el-table-column>
              <el-table-column
                prop="shouldTime"
                label="应还日期">
              </el-table-column>
            </el-table>
          </div>
          <div class="add_btn" @click="sureBorrow">确认借阅</div>
        </div>
        <div v-if="this.index==2" class="ad_data">
          <div class="data"><label>图书编号</label><input type="text" v-model="returnBookNum"/></div>
          <div class="btn" style="width: 150px;" @click="returnBook">确认归还</div>
        </div>
        <div v-if="this.index==3" class="ad_data">
          <div class="data"><label>图书编号</label><input type="text" v-model="addBookNum"/></div>
          <div class="data"><label>图书名称</label><input type="text" v-model="addBookName"/></div>
          <div class="data"><label>作者</label><input type="text" v-model="addBookAuthor"/></div>
          <div class="data"><label>译者</label><input type="text" v-model="addBookTranslator" placeholder="非必须填"/></div>
          <div class="data"><label>价格</label><input type="text" v-model="addBookPrice"/></div>
          <div class="data"><label>ISBN编码</label><input type="text" v-model="addBookISBN"/></div>
          <div class="data"><label>出版社</label><input type="text" v-model="addBookPublish"/></div>
          <div class="data">
            <label>出版日期</label>
            <el-date-picker
              v-model="addPublishTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="data"><label>入库者</label><input type="text" v-model="addBookMen"/></div>
          <div class="btn" style="width: 150px;" @click="addBook">确认增加</div>
          <div class="btn" @click="cancelAddBook">取消</div>
        </div>
        <div v-if="this.index==4" class="ad_data">
          <div class="data"><label>图书编号</label><input type="text" v-model="deleteBookNum"/>
            <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="deleteSure">验证</div>
          </div>
          <div class="data"><label>图书名称</label><input type="text" readonly="readonly"
                                                      style="background-color: darkgray" v-model="deleteBookName"/>
          </div>
          <div class="data"><label>作者</label><input type="text" readonly="readonly" style="background-color: darkgray"
                                                    v-model="deleteBookAuthor"/>
          </div>
          <div class="data"><label>译者</label><input type="text" readonly="readonly" style="background-color: darkgray"
                                                    v-model="deleteBookTranslator"/>
          </div>
          <div class="data"><label>价格</label><input type="text" readonly="readonly" style="background-color: darkgray"
                                                    v-model="deleteBookPrice"/>
          </div>
          <div class="data"><label>ISBN编码</label><input type="text" readonly="readonly"
                                                        style="background-color: darkgray" v-model="deleteBookISBN"/>
          </div>
          <div class="data"><label>出版社</label><input type="text" readonly="readonly"
                                                     style="background-color: darkgray" v-model="deleteBookPublish"/>
          </div>
          <div class="data"><label>出版日期</label><input type="text" readonly="readonly"
                                                      style="background-color: darkgray"
                                                      v-model="deleteBookPublishTime"/></div>
          <div class="data"><label>入库者</label><input type="text" readonly="readonly"
                                                     style="background-color: darkgray" v-model="deleteBookEnterMen"/>
          </div>
          <div class="btn" style="width: 150px;" @click="sureDelete">确认删除</div>
          <div class="btn" @click="cancelDelete">取消</div>
        </div>
        <div v-if="this.index==5" class="ad_data">
          <div class="data"><label>图书编号</label><input type="text" v-model="changeBookNum"/>
            <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="changeSure">验证</div>
          </div>
          <div class="data"><label>图书名称</label><input type="text" v-model="changeBookName"/></div>
          <div class="data"><label>作者</label><input type="text" v-model="changeBookAuthor"/></div>
          <div class="data"><label>译者</label><input type="text" v-model="changeBookTranslator"/></div>
          <div class="data"><label>价格</label><input type="text" v-model="changeBookPrice"/></div>
          <div class="data"><label>ISBN编码</label><input type="text" v-model="changeBookISBN"/></div>
          <div class="data"><label>出版社</label><input type="text" v-model="changeBookPublish"/></div>
          <div class="data"><label>出版日期</label>
            <el-date-picker
              v-model="changeBookPublishTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="data"><label>入库者</label><input type="text" v-model="changeBookEnterMen"/></div>
          <div class="btn" style="width: 150px;" @click="sureChange">确认修改</div>
          <div class="btn" @click="cancelChange">取消</div>
        </div>
        <div v-if="this.index==6" class="ad_data">
          <div class="search">
            <input type="text" placeholder="图书名" v-model="keyword"/>
            <div class="btn" @click="searchRecords">搜索</div>
          </div>
          <div class="table">
            <el-table
              :data="borrowData"
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
                prop="lendedNum"
                label="借阅号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="shouldTime"
                label="应还日期"
                width="150">
              </el-table-column>
              <el-table-column
                prop="borrowTime"
                label="借阅日期"
                width="150">
              </el-table-column>
              <el-table-column
                prop="returnTime"
                label="实还日期">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="this.index==7" class="ad_data">
          <div class="search">
            <input type="text" placeholder="输入图书名" v-model="bookKeyword"/>
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
                width="100">
              </el-table-column>
              <el-table-column
                prop="bookName"
                label="图书名称"
                width="110">
              </el-table-column>
              <el-table-column
                prop="author"
                label="作者"
                width="50">
              </el-table-column>
              <el-table-column
                prop="translator"
                label="译者"
                width="50">
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格"
                width="50">
              </el-table-column>
              <el-table-column
                prop="publish"
                label="出版社"
                width="120">
              </el-table-column>
              <el-table-column
                prop="comeTime"
                label="出版日期"
                width="120">
              </el-table-column>
              <el-table-column
                prop="isbn"
                label="ISBN编码"
                width="120">
              </el-table-column>
              <el-table-column
                prop="enterMen"
                label="入库者"
                width="80">
              </el-table-column>
              <el-table-column
                prop="enterTime"
                label="入库时间"
                width="110">
              </el-table-column>
              <el-table-column
                prop="status"
                label="是否借出">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div v-if="this.index==8" class="ad_data">
          <div class="data"><label>密码</label><input type="password" v-model="password"/></div>
          <div class="data"><label>新密码</label><input type="password" v-model="newPassword"/></div>
          <div class="data"><label>确认新密码</label><input type="password" v-model="surePassword"/></div>
          <div class="data"><label>电话</label><input type="text" v-model="phone"/></div>
          <div class="data"><label>邮箱</label><input type="text" v-model="email"/></div>
          <div class="btn" style="width: 150px;" @click="changeInfo">确认修改</div>
          <div class="btn" @click="cancelInfo">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data() {
      return {
        adminId: this.$route.query.id,
        name: this.$route.query.name,
        password: '',
        newPassword: '',
        surePassword: '',
        phone: '',
        email: '',
        index: 1,
        tableData: [],
        borrowData: [],
        bookInfo: [],
        userBorrowNum: '',
        userBorrowBookNum: '',
        userTime: '',
        returnBookNum: '',
        addBookNum: '',
        addBookName: '',
        addBookAuthor: '',
        addBookTranslator: '',
        addBookPrice: '',
        addBookISBN: '',
        addBookPublish: '',
        addPublishTime: '',
        addBookMen: '',
        deleteBookNum: '',
        deleteBookName: '',
        deleteBookAuthor: '',
        deleteBookTranslator: '',
        deleteBookPrice: '',
        deleteBookISBN: '',
        deleteBookPublish: '',
        deleteBookPublishTime: '',
        deleteBookEnterMen: '',
        changeBookNum: '',
        changeBookName: '',
        changeBookAuthor: '',
        changeBookTranslator: '',
        changeBookPrice: '',
        changeBookISBN: '',
        changeBookPublish: '',
        changeBookPublishTime: '',
        changeBookEnterMen: '',
        keyword: '',
        bookKeyword: ''
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      },
      handleSelect(index) {
        this.index = index;
        if (index == 8) {
          this.$axios
            .post('/bookAdmin/getAdmin', {
              adminId: this.adminId
            })
            .then(successResponse => {
              this.password = '',
                this.newPassword = '',
                this.surePassword = '',
              this.phone = successResponse.data.data[0][1];
              this.email = successResponse.data.data[0][2];
            })
        }
      },
      userBorrowBookSure() {
        this.tableData = [];
        if (this.userBorrowNum == '' || this.userBorrowBookNum == '') {
          this.$message.error('借阅号或者图书编号不能为空');
        }
        else {
          this.$axios
            .post('/bookAdmin/userBorrowBookSure', {
              userBorrowNum: this.userBorrowNum,
              userBorrowBookNum: this.userBorrowBookNum
            })
            .then(successResponse => {
              console.log(successResponse);
              if (successResponse.data.data == null) {
                this.$message.error(successResponse.data.message);
              }
              else if (successResponse.data.data2 == null && successResponse.data.data == null) {
                this.$message.error(successResponse.data.message);
              }
              else if (successResponse.data.data2[0][6] < successResponse.data.data.length) {
                this.$message.error('该借阅号已到借阅数');
              }
              else {
                var data = successResponse.data.data;
                for (var i = 0; i < data.length; i++) {
                  var data3 = {};
                  data3.lenedNum = this.userBorrowNum;
                  data3.bookName = data[i][0];
                  data3.shouldTime = this.timeParse(data[i][3]);
                  this.tableData.push(data3)
                }
                this.userTime = successResponse.data.data2[0][7];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });

              }
            })
        }
      },
      userBorrowBookCancel() {
        this.userBorrowNum = '';
        this.userBorrowBookNum = '';
        this.tableData = [];
      },
      sureBorrow() {
        this.$axios
          .post('/bookAdmin/sureBorrow', {
            userBorrowNum: this.userBorrowNum,
            userBorrowBookNum: this.userBorrowBookNum,
            userTime: this.userTime
          })
          .then(successResponse => {
            this.$message({
              message: '借阅成功',
              type: 'success'
            });
          })
      },
      returnBook() {
        this.$axios
          .post('/bookAdmin/returnBook', {
            returnBookNum: this.returnBookNum
          })
          .then(successResponse => {
            console.log(successResponse);
            if (successResponse.data.message == 1) {
              this.$message.error('图书已归还或图书不存在');
            }
            else {
              this.$message({
                message: '图书归还成功',
                type: 'success'
              });
            }
          })
      },
      addBook() {
        if (this.addBookNum == "" || this.addBookName == "" || this.addBookAuthor == "" || this.addBookPublish == "" || this.addBookPrice == "" || this.addBookISBN == "" || this.addPublishTime == "" || this.addBookMen == "") {
          this.$message.error('有必填选项未填');
        }
        else {
          this.$axios
            .post('/bookAdmin/addBook', {
              addBookNum: this.addBookNum,
              addBookName: this.addBookName,
              addBookAuthor: this.addBookAuthor,
              addBookTranslator: this.addBookTranslator,
              addBookPrice: this.addBookPrice,
              addBookISBN: this.addBookISBN,
              addBookPublish: this.addBookPublish,
              addPublishTime: this.addPublishTime,
              addBookMen: this.addBookMen
            })
            .then(successResponse => {
              if (successResponse.data.message == 1) {
                this.$message.error('图书编号已存在');
              }
              else {
                this.$message({
                  message: '图书新增成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelAddBook() {
        this.addBookNum = "";
        this.addBookName = "";
        this.addBookAuthor = "";
        this.addBookPublish = "";
        this.addBookPrice = "";
        this.addBookISBN = "";
        this.addPublishTime = "";
        this.addBookMen = "";
        this.addBookTranslator = "";
      },
      deleteSure() {
        if (this.deleteBookNum == "") {
          this.$message.error('图书编号不能为空');
        }
        else {
          this.$axios
            .post('/bookAdmin/sureBook', {
              deleteBookNum: this.deleteBookNum
            })
            .then(successResponse => {
              console.log(successResponse);
              if (successResponse.data.data.length == 0) {
                this.$message.error('图书不存在');
              }
              else {
                this.deleteBookName = successResponse.data.data[0][1];
                this.deleteBookAuthor = successResponse.data.data[0][2];
                this.deleteBookTranslator = successResponse.data.data[0][3];
                this.deleteBookPrice = successResponse.data.data[0][4];
                this.deleteBookISBN = successResponse.data.data[0][5];
                this.deleteBookPublish = successResponse.data.data[0][6];
                this.deleteBookPublishTime = this.timeParse(successResponse.data.data[0][7]);
                this.deleteBookEnterMen = successResponse.data.data[0][8];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      sureDelete() {
        this.$axios
          .post('/bookAdmin/deleteBook', {
            deleteBookNum: this.deleteBookNum
          })
          .then(successResponse => {
            console.log(successResponse);
            if (successResponse.data.message == 1) {
              this.$message.error('图书不存在');
            }
            else {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            }
          })
      },
      cancelDelete() {
        this.deleteBookNum = "";
        this.deleteBookName = "";
        this.deleteBookAuthor = "";
        this.deleteBookTranslator = "";
        this.deleteBookPrice = "";
        this.deleteBookISBN = "";
        this.deleteBookPublish = "";
        this.deleteBookPublishTime = "";
        this.deleteBookEnterMen = "";
      },
      changeSure() {
        if (this.changeBookNum == "") {
          this.$message.error('图书编号不能为空');
        }
        else {
          this.$axios
            .post('/bookAdmin/sureBook', {
              deleteBookNum: this.changeBookNum
            })
            .then(successResponse => {
              if (successResponse.data.data.length == 0) {
                this.$message.error('图书不存在');
              }
              else {
                this.changeBookName = successResponse.data.data[0][1];
                this.changeBookAuthor = successResponse.data.data[0][2];
                this.changeBookTranslator = successResponse.data.data[0][3];
                this.changeBookPrice = successResponse.data.data[0][4];
                this.changeBookISBN = successResponse.data.data[0][5];
                this.changeBookPublish = successResponse.data.data[0][6];
                this.changeBookPublishTime = successResponse.data.data[0][7].split("+")[0] + "Z";
                this.changeBookEnterMen = successResponse.data.data[0][8];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      sureChange() {

        if (this.changeBookNum == "" || this.changeBookTranslator == "" || this.changeBookAuthor == "" || this.changeBookPublish == "" || this.changeBookPrice == "" || this.changeBookISBN == "" || this.changeBookPublishTime == "" || this.changeBookEnterMen == "") {
          this.$message.error('有必填选项未填');
        }
        else {
          console.log(this.changeBookTranslator)
          this.$axios
            .post('/bookAdmin/updateBook', {
              changeBookNum: this.changeBookNum,
              changeBookName: this.changeBookName,
              changeBookAuthor: this.changeBookAuthor,
              changeBookTranslator: this.changeBookTranslator,
              changeBookPrice: this.changeBookPrice,
              changeBookISBN: this.changeBookISBN,
              changeBookPublish: this.changeBookPublish,
              changeBookPublishTime: this.changeBookPublishTime,
              changeBookEnterMen: this.changeBookEnterMen
            })
            .then(successResponse => {
              if (successResponse.data.message == 0) {
                this.$message.error('图书编号不存在');
              }
              else {
                this.$message({
                  message: '图书修改成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelChange() {
        this.changeBookNum = "";
        this.changeBookName = "";
        this.changeBookAuthor = "";
        this.changeBookTranslator = "";
        this.changeBookPrice = "";
        this.changeBookISBN = "";
        this.changeBookPublish = "";
        this.changeBookPublishTime = "";
        this.changeBookEnterMen = "";
      },
      searchRecords() {
        this.borrowData = [];
        this.$axios
          .post('/bookAdmin/searchRecords', {
            keyword: this.keyword,
          })
          .then(successResponse => {
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
                data3.bookNum = data[i][1];
                data3.bookName = data[i][2];
                data3.lendedNum = data[i][0];
                data3.shouldTime = this.timeParse(data[i][5]);
                data3.borrowTime = this.timeParse(data[i][4]);
                if (data[i][3] != null) {
                  data3.returnTime = this.timeParse(data[i][3]);
                }
                else {
                  data3.returnTime = '未还';
                }
                this.borrowData.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
          })
      },
      searchBookInfo() {
        this.bookInfo = [];
        this.$axios
          .post('/bookAdmin/searchBookInfo', {
            keyword: this.bookKeyword,
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
                if (data[i][10] == 0) {
                  data3.status = '未借';
                }
                else {
                  data3.status = '已借';
                }
                this.bookInfo.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
          })
      },
      changeInfo() {
        if (this.password == "" || this.newPassword == "" || this.surePassword == "" || this.email == "" || this.phone == "") {
          this.$message.error('有选项未填');
        }
        else if (this.newPassword != this.surePassword) {
          this.$message.error('两次密码不一致');
        }
        else {
          this.$axios
            .post('/bookAdmin/updateInfo', {
              adminId:this.adminId,
              password: this.password,
              newPassword: this.newPassword,
              phone: this.phone,
              email: this.email
            })
            .then(successResponse => {
              console.log(successResponse)
              if(successResponse.data.message==0){
                this.$message.error('密码错误');
              }else{
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelInfo() {
        this.surePassword = '',
          this.password = '',
          this.newPassword = '',
          this.phone = '',
          this.email = ''
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

  .admin .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
  }

  .admin .header img {
    width: 15%;
    display: inline-block;
    float: left;
  }

  .admin .state {
    height: 48px;
    line-height: 48px;
    float: right;
  }

  .admin .ad_name {
    font-size: 20px;
    font-weight: bold;
    padding-right: 40px;
    color: #FFF;
    display: inline-block;
  }

  .admin .out {
    font-size: 20px;
    font-weight: bold;
    padding-right: 70px;
    color: #FFF;
    display: inline-block;
  }

  .admin .content {
    width: 100%;
    height: 100%;
  }

  .admin .left {
    width: 15%;
    height: 100%;
    background-color: #262537;
    float: left;
  }

  .admin .right {
    width: 78%;
    height: 1000px;
    float: left;
  }

  .admin .ad_data {
    width: 100%;
    height: 90%;
    margin: 30px 50px;
    padding-top: 30px;
    border: 2px solid #d3d4d5;
    border-radius: 15px;
  }

  .admin .data {
    width: 100%;
    height: 45px;
    line-height: 35px;
    margin-bottom: 5px;
  }

  .admin .data label {
    font-size: 14px;
    float: left;
    margin-left: 150px;
    color: #515567;
    font-weight: bold;
  }

  .admin .data input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 300px;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .admin .data .el-input__inner {
    width: 200px;
    height: 40px;
    position: relative;
    left: 49px;
  }

  .admin .btn {
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

  .admin .add_btn {
    width: 100px;
    height: 35px;
    font-size: 20px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #d3d4d5;
    border-radius: 5px;
    display: inline-block;
    margin-top: 10px;
    float: right;
    margin-right: 27px;
    cursor: pointer;
  }

  .admin .search {
    width: 100%;
    height: 35px;
    margin-bottom: 30px;
  }

  .admin .search input {
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
