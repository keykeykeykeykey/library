<template>
  <div v-if="this.$store.state.user=='系统管理员'" class="system">
    <div>
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
              <span slot="title">录入新读者</span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">删除读者</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title">修改读者信息</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">录入图书管理员</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">删除图书管理员</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-menu"></i>
              <span slot="title">修改管理员信息</span>
            </el-menu-item>
            <el-menu-item index="7">
              <i class="el-icon-menu"></i>
              <span slot="title">查看读者信息</span>
            </el-menu-item>
            <el-menu-item index="8">
              <i class="el-icon-menu"></i>
              <span slot="title">查看管理员信息</span>
            </el-menu-item>
            <el-menu-item index="9">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员中心</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="right">
          <div v-if="this.index==1" class="ad_data">
            <div class="data"><label>借阅号</label><input type="text" v-model="addUserLendNum"/></div>
            <div class="data"><label>用户ID</label><input type="text" v-model="addUserId"/></div>
            <div class="data"><label>姓名</label><input type="text" v-model="addUserName"/></div>
            <div class="data"><label>学院</label><input type="text" v-model="addUserDepartment"/></div>
            <div class="data"><label>专业</label><input type="text" v-model="addUserMajor"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="addUserPhone"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="addUserMail"/></div>
            <div class="data"><label>借阅上限</label><input type="text" v-model="addUserMax"/></div>
            <div class="data"><label>借阅期限</label><input type="text" v-model="addUserTime"/></div>
            <div class="btn" style="width: 150px;" @click="addUser">确认增加</div>
            <div class="btn" @click="cancelAddUser">取消</div>
          </div>
          <div v-if="this.index==2" class="ad_data">
            <div class="data"><label>借阅号</label><input type="text" v-model="deleteUserLendNum"/>
              <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="deleteSureUser">验证</div>
            </div>
            <div class="data"><label>用户ID</label><input type="text" v-model="deleteUserId" readonly="readonly"
                                                        style="background-color: darkgray"/></div>
            <div class="data"><label>学院</label><input type="text" v-model="deleteUserDepartment" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="data"><label>专业</label><input type="text" v-model="deleteUserMajor" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="deleteUserPhone" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="deleteUserMail" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="data"><label>借阅上限</label><input type="text" v-model="deleteUserMax" readonly="readonly"
                                                        style="background-color: darkgray"/></div>
            <div class="data"><label>借阅期限</label><input type="text" v-model="deleteUserTime" readonly="readonly"
                                                        style="background-color: darkgray"/></div>
            <div class="btn" style="width: 150px;" @click="deleteUser">确认删除</div>
            <div class="btn" @click="cancelDeleteUser">取消</div>
          </div>
          <div v-if="this.index==3" class="ad_data">
            <div class="data"><label>借阅号</label><input type="text" v-model="changeUserLendNum"/>
              <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="changeSureUser">验证</div>
            </div>
            <div class="data"><label>用户ID</label><input type="text" v-model="changeUserId"/></div>
            <div class="data"><label>学院</label><input type="text" v-model="changeUserDepartment"/></div>
            <div class="data"><label>专业</label><input type="text" v-model="changeUserMajor"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="changeUserPhone"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="changeUserMail"/></div>
            <div class="data"><label>借阅上限</label><input type="text" v-model="changeUserMax"/></div>
            <div class="data"><label>借阅期限</label><input type="text" v-model="changeUserTime"/></div>
            <div class="btn" style="width: 150px;" @click="changeUser">确认修改</div>
            <div class="btn" @click="cancelChangeUser">取消</div>
          </div>
          <div v-if="this.index==4" class="ad_data">
            <div class="data"><label>编号</label><input type="text" v-model="addAdminNum"/></div>
            <div class="data"><label>用户名</label><input type="text" v-model="addAdminName"/></div>
            <div class="data"><label>初始密码</label><input type="password" v-model="addAdminPassword"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="addAdminPhone"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="addAdminEmail"/></div>
            <div class="btn" style="width: 150px;" @click="addAdmin">确认增加</div>
            <div class="btn" @click="cancelAddAdmin">取消</div>
          </div>
          <div v-if="this.index==5" class="ad_data">
            <div class="data"><label>编号</label><input type="text" v-model="deleteAdminNum"/>
              <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="deleteSureAdmin">验证</div>
            </div>
            <div class="data"><label>用户名</label><input type="text" v-model="deleteAdminName" readonly="readonly"
                                                       style="background-color: darkgray"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="deleteAdminPhone" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="deleteAdminEmail" readonly="readonly"
                                                      style="background-color: darkgray"/></div>
            <div class="btn" style="width: 150px;" @click="deleteAdmin">确认删除</div>
            <div class="btn" @click="cancelDeleteAdmin">取消</div>
          </div>
          <div v-if="this.index==6" class="ad_data">
            <div class="data"><label>编号</label><input type="text" v-model="changeAdminNum"/>
              <div class="btn" style="position: relative;top: -45px;left: 195px;" @click="changeSureAdmin">验证</div>
            </div>
            <div class="data"><label>用户名</label><input type="text" v-model="changeAdminName"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="changeAdminPhone"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="changeAdminEmail"/></div>
            <div class="btn" style="width: 150px;" @click="changeAdmin">确认增加</div>
            <div class="btn" @click="cancelChangeAdmin">取消</div>
          </div>
          <div v-if="this.index==7" class="ad_data">
            <div class="search">
              <input type="text" placeholder="输入借阅号" v-model="userKeyword"/>
              <div class="btn" @click="searchBookInfo">搜索</div>
            </div>
            <div class="table">
              <el-table
                :data="userInfo"
                border
                style="width: 95%;margin: 10px auto;">
                <el-table-column
                  prop="lendNum"
                  label="借阅号"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="userId"
                  label="用户ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="department"
                  label="学院"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="major"
                  label="专业"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="邮箱"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="max"
                  label="借阅上限"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="time"
                  label="借阅期限">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="this.index==8" class="ad_data">
            <div class="search">
              <input type="text" placeholder="输入编号" v-model="adminKeyword"/>
              <div class="btn" @click="searchAdminInfo">搜索</div>
            </div>
            <div class="table">
              <el-table
                :data="adminInfo"
                border
                style="width: 95%;margin: 10px auto;">
                <el-table-column
                  prop="num"
                  label="编号"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="用户名"
                  width="230">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="电话"
                  width="200">
                </el-table-column>
                <el-table-column
                  prop="email"
                  label="邮箱">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="this.index==9" class="ad_data">
            <div class="data"><label>密码</label><input type="password" v-model="password"/></div>
            <div class="data"><label>新密码</label><input type="password" v-model="newPassword"/></div>
            <div class="data"><label>确认新密码</label><input type="password" v-model="surePassword"/></div>
            <div class="data"><label>电话</label><input type="text" v-model="phone"/></div>
            <div class="data"><label>邮箱</label><input type="text" v-model="email"/></div>
            <div class="btn" style="width: 150px;" @click="changeSystemInfo">确认修改</div>
            <div class="btn" @click="cancelSystemInfo">取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "system",
    data() {
      return {
        index: 1,
        addUserLendNum: '',
        addUserId: '',
        addUserName:'',
        addUserDepartment: '',
        addUserMajor: '',
        addUserPhone: '',
        addUserMail: '',
        addUserMax: '',
        addUserTime: '',
        deleteUserLendNum: '',
        deleteUserId: '',
        deleteUserDepartment: '',
        deleteUserMajor: '',
        deleteUserPhone: '',
        deleteUserMail: '',
        deleteUserMax: '',
        deleteUserTime: '',
        changeUserLendNum: '',
        changeUserId: '',
        changeUserDepartment: '',
        changeUserMajor: '',
        changeUserPhone: '',
        changeUserMail: '',
        changeUserMax: '',
        changeUserTime: '',
        addAdminNum: '',
        addAdminName: '',
        addAdminPassword: '',
        addAdminPhone: '',
        addAdminEmail: '',
        deleteAdminNum: '',
        deleteAdminName: '',
        deleteAdminPhone: '',
        deleteAdminEmail: '',
        changeAdminNum: '',
        changeAdminName: '',
        changeAdminPhone: '',
        changeAdminEmail: '',
        userInfo: [],
        userKeyword: '',
        adminInfo: [],
        adminKeyword: '',
        password: '',
        newPassword: '',
        surePassword: '',
        phone: '',
        email: '',
        systemId: this.$route.query.id,
        name: this.$route.query.name
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
        if (index == 9) {
          this.$axios
            .post('/systemAdmin/getSystem', {
              systemId: this.systemId
            })
            .then(successResponse => {
              console.log(successResponse)
              this.password = '',
                this.newPassword = '',
                this.surePassword = '',
                this.phone = successResponse.data.data[0][0];
              this.email = successResponse.data.data[0][1];
            })
        }
      },
      addUser() {
        if (this.addUserLendNum == "" || this.addUserId == "" || this.addUserDepartment == "" || this.addUserMajor == "" || this.addUserPhone == "" || this.addUserMail == "" || this.addUserMax == "" || this.addUserTime == "") {
          this.$message.error('有必填选项未填');
        }
        else {
          this.$axios
            .post('/systemAdmin/addUser', {
              addUserLendNum: this.addUserLendNum,
              addUserId: this.addUserId,
              addUserName:this.addUserName,
              addUserDepartment: this.addUserDepartment,
              addUserMajor: this.addUserMajor,
              addUserPhone: this.addUserPhone,
              addUserMail: this.addUserMail,
              addUserMax: this.addUserMax,
              addUserTime: this.addUserTime
            })
            .then(successResponse => {
              if (successResponse.data.message == 0) {
                this.$message.error('借阅号或者用户ID已存在');
              }
              else {
                this.$message({
                  message: '用户新增成功',
                  type: 'success'
                });
              }
              this.addUserLendNum = '',
                this.addUserId = '',
                this.addUserName = '',
                this.addUserDepartment = '',
                this.addUserMajor = '',
                this.addUserPhone = '',
                this.addUserMail = '',
                this.addUserMax = '',
                this.addUserTime = ''
            })
        }
      },
      cancelAddUser() {
        this.addUserLendNum = '',
          this.addUserId = '',
          this.addUserDepartment = '',
          this.addUserMajor = '',
          this.addUserPhone = '',
          this.addUserMail = '',
          this.addUserMax = '',
          this.addUserTime = ''
      },
      deleteSureUser() {
        if (this.deleteUserLendNum == "") {
          this.$message.error('借阅号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/sureUser', {
              lendNum: this.deleteUserLendNum
            })
            .then(successResponse => {
              if (successResponse.data.data.length == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.deleteUserLendNum = successResponse.data.data[0][1];
                this.deleteUserId = successResponse.data.data[0][2];
                this.deleteUserDepartment = successResponse.data.data[0][3];
                this.deleteUserMajor = successResponse.data.data[0][4];
                this.deleteUserPhone = successResponse.data.data[0][5];
                this.deleteUserMail = successResponse.data.data[0][6];
                this.deleteUserMax = successResponse.data.data[0][7];
                this.deleteUserTime = successResponse.data.data[0][8];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      deleteUser() {
        if (this.deleteUserLendNum == "") {
          this.$message.error('借阅号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/deleteUser', {
              lendNum: this.deleteUserLendNum
            })
            .then(successResponse => {
              console.log(successResponse);
              if (successResponse.data.message == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelDeleteUser() {
        this.deleteUserLendNum = '';
        this.deleteUserId = '';
        this.deleteUserDepartment = '';
        this.deleteUserMajor = '';
        this.deleteUserPhone = '';
        this.deleteUserMail = '';
        this.deleteUserMax = '';
        this.deleteUserTime = '';
      },
      changeSureUser() {
        if (this.changeUserLendNum == "") {
          this.$message.error('借阅号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/sureUser', {
              lendNum: this.changeUserLendNum
            })
            .then(successResponse => {
              if (successResponse.data.data.length == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.changeUserLendNum = successResponse.data.data[0][1];
                this.changeUserId = successResponse.data.data[0][2];
                this.changeUserDepartment = successResponse.data.data[0][3];
                this.changeUserMajor = successResponse.data.data[0][4];
                this.changeUserPhone = successResponse.data.data[0][5];
                this.changeUserMail = successResponse.data.data[0][6];
                this.changeUserMax = successResponse.data.data[0][7];
                this.changeUserTime = successResponse.data.data[0][8];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      changeUser() {
        if (this.changeUserLendNum == "" || this.changeUserId == "" || this.changeUserDepartment == "" || this.changeUserMajor == "" || this.changeUserPhone == "" || this.changeUserMail == "" || this.changeUserMax == "" || this.changeUserTime == "") {
          this.$message.error('有必填选项未填');
        }
        else {
          this.$axios
            .post('/systemAdmin/updateUser', {
              changeUserLendNum: this.changeUserLendNum,
              changeUserId: this.changeUserId,
              changeUserDepartment: this.changeUserDepartment,
              changeUserMajor: this.changeUserMajor,
              changeUserPhone: this.changeUserPhone,
              changeUserMail: this.changeUserMail,
              changeUserMax: this.changeUserMax,
              changeUserTime: this.changeUserTime
            })
            .then(successResponse => {
              if (successResponse.data.message == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.$message({
                  message: '用户修改成功',
                  type: 'success'
                });
              }
              this.changeUserLendNum = '',
                this.changeUserId = '',
                this.changeUserDepartment = '',
                this.changeUserMajor = '',
                this.changeUserPhone = '',
                this.changeUserMail = '',
                this.changeUserMax = '',
                this.changeUserTime = ''
            })
        }
      },
      cancelChangeUser() {
        this.changeUserLendNum = '',
          this.changeUserId = '',
          this.changeUserDepartment = '',
          this.changeUserMajor = '',
          this.changeUserPhone = '',
          this.changeUserMail = '',
          this.changeUserMax = '',
          this.changeUserTime = ''
      },
      addAdmin() {
        if (this.addAdminNum == "" || this.addAdminName == "" || this.addAdminPassword == "" || this.addAdminPhone == "" || this.addAdminEmail == "") {
          this.$message.error('有必填选项未填');
        }
        else {
          this.$axios
            .post('/systemAdmin/addAdmin', {
              addAdminNum: this.addAdminNum,
              addAdminName: this.addAdminName,
              addAdminPassword: this.addAdminPassword,
              addAdminPhone: this.addAdminPhone,
              addAdminEmail: this.addAdminEmail,
            })
            .then(successResponse => {
              if (successResponse.data.message == 0) {
                this.$message.error('编号已存在');
              }
              else {
                this.$message({
                  message: '管理员新增成功',
                  type: 'success'
                });
              }
              this.addAdminNum = '',
                this.addAdminName = '',
                this.addAdminPassword = '',
                this.addAdminPhone = '',
                this.addAdminEmail = ''
            })
        }
      },
      cancelAddAdmin() {
        this.addAdminNum = '',
          this.addAdminName = '',
          this.addAdminPassword = '',
          this.addAdminPhone = '',
          this.addAdminEmail = ''
      },
      deleteSureAdmin() {
        if (this.deleteAdminNum == "") {
          this.$message.error('编号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/sureAdmin', {
              adminNum: this.deleteAdminNum
            })
            .then(successResponse => {
              if (successResponse.data.data.length == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.deleteAdminName = successResponse.data.data[0][0];
                this.deleteAdminPhone = successResponse.data.data[0][2];
                this.deleteAdminEmail = successResponse.data.data[0][1];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      deleteAdmin() {
        if (this.deleteAdminNum == "") {
          this.$message.error('编号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/deleteAdmin', {
              adminNum: this.deleteAdminNum
            })
            .then(successResponse => {
              console.log(successResponse);
              if (successResponse.data.message == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelDeleteAdmin() {
        this.deleteAdminNum = '';
        this.deleteAdminName = '';
        this.deleteAdminPhone = '';
        this.deleteAdminEmail = '';
      },
      changeSureAdmin() {
        if (this.changeAdminNum == "") {
          this.$message.error('编号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/sureAdmin', {
              adminNum: this.changeAdminNum
            })
            .then(successResponse => {
              if (successResponse.data.data.length == 0) {
                this.$message.error('借阅号不存在');
              }
              else {
                this.changeAdminName = successResponse.data.data[0][0];
                this.changeAdminPhone = successResponse.data.data[0][2];
                this.changeAdminEmail = successResponse.data.data[0][1];
                this.$message({
                  message: '验证成功',
                  type: 'success'
                });
              }
            })
        }
      },
      changeAdmin() {
        if (this.changeAdminNum == "") {
          this.$message.error('编号不能为空');
        }
        else {
          this.$axios
            .post('/systemAdmin/updateAdmin', {
              adminNum: this.changeAdminNum,
              adminName: this.changeAdminName,
              adminPhone: this.changeAdminPhone,
              adminEmail: this.changeAdminEmail
            })
            .then(successResponse => {
              if (successResponse.data.message == 0) {
                this.$message.error('编号不存在');
              }
              else {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.changeAdminNum = '',
                  this.changeAdminName = '',
                  this.changeAdminPhone = '',
                  this.changeAdminEmail = ''
              }
            })
        }
      },
      cancelChangeAdmin() {

      },
      searchBookInfo() {
        this.userInfo = [];
        this.$axios
          .post('/systemAdmin/searchUserInfo', {
            keyword: this.userKeyword,
          })
          .then(successResponse => {
            var data = successResponse.data.data;
            if (data.length == 0) {
              this.$message({
                message: '暂无用户',
                type: 'success'
              });
            }
            else {
              for (var i = 0; i < data.length; i++) {
                var data3 = {};
                data3.lendNum = data[i][0];
                data3.userId = data[i][1];
                data3.department = data[i][2];
                data3.major = data[i][3];
                data3.phone = data[i][4];
                data3.email = data[i][5];
                data3.max = data[i][6];
                data3.time = data[i][7];
                this.userInfo.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
          })
      },
      searchAdminInfo() {
        this.adminInfo = [];
        this.$axios
          .post('/systemAdmin/searchAdminInfo', {
            keyword: this.adminKeyword,
          })
          .then(successResponse => {
            console.log(successResponse)
            var data = successResponse.data.data;
            if (data.length == 0) {
              this.$message({
                message: '暂无管理员',
                type: 'success'
              });
            }
            else {
              for (var i = 0; i < data.length; i++) {
                var data3 = {};
                data3.num = data[i][0];
                data3.name = data[i][1];
                data3.phone = data[i][3];
                data3.email = data[i][2];
                this.adminInfo.push(data3)
              }
              this.$message({
                message: '查询成功',
                type: 'success'
              });
            }
          })
      },
      changeSystemInfo() {
        if (this.password == "" || this.newPassword == "" || this.surePassword == "" || this.email == "" || this.phone == "") {
          this.$message.error('有选项未填');
        }
        else if (this.newPassword != this.surePassword) {
          this.$message.error('两次密码不一致');
        }
        else {
          this.$axios
            .post('/systemAdmin/updateSystemInfo', {
              systemId: this.systemId,
              password: this.password,
              newPassword: this.newPassword,
              phone: this.phone,
              email: this.email
            })
            .then(successResponse => {
              console.log(successResponse)
              if (successResponse.data.message == 0) {
                this.$message.error('密码错误');
              } else {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            })
        }
      },
      cancelSystemInfo() {
          this.surePassword = '',
          this.password = '',
          this.newPassword = '',
          this.phone = '',
          this.email = ''
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

  .system .header {
    width: 100%;
    height: 48px;
    background-color: #252E57;
  }

  .system .header img {
    width: 15%;
    display: inline-block;
    float: left;
  }

  .system .state {
    height: 48px;
    line-height: 48px;
    float: right;
  }

  .system .ad_name {
    font-size: 20px;
    font-weight: bold;
    padding-right: 40px;
    color: #FFF;
    display: inline-block;
  }

  .system .out {
    font-size: 20px;
    font-weight: bold;
    padding-right: 70px;
    color: #FFF;
    display: inline-block;
  }

  .system .content {
    width: 100%;
    height: 100%;
  }

  .system .left {
    width: 15%;
    height: 100%;
    background-color: #262537;
    float: left;
  }

  .system .right {
    width: 78%;
    height: 1000px;
    float: left;
  }

  .system .ad_data {
    width: 100%;
    height: 90%;
    margin: 30px 50px;
    padding-top: 30px;
    border: 2px solid #d3d4d5;
    border-radius: 15px;
  }

  .system .data {
    width: 100%;
    height: 45px;
    line-height: 35px;
    margin-bottom: 5px;
  }

  .system .data label {
    font-size: 14px;
    float: left;
    margin-left: 150px;
    color: #515567;
    font-weight: bold;
  }

  .system .data input {
    width: 500px;
    height: 20px;
    border: 1px solid #ccc;
    float: right;
    margin-right: 300px;
    font-size: 20px;
    border-radius: 5px;
    padding: 6px 12px;
  }

  .system .data .el-input__inner {
    width: 200px;
    height: 40px;
    position: relative;
    left: 49px;
  }

  .system .btn {
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

  .system  .add_btn {
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

  .system .search {
    width: 100%;
    height: 35px;
    margin-bottom: 30px;
  }

  .system .search input {
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
