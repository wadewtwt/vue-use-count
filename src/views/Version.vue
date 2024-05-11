
<template>

  <div id="baseReport">
    <div id="content">
      <nav id="app">

        <ul id="tabs">
          <li v-for="(item, index) in appList" :class="{'current': index === 0}" id="tabA" @click="checkApp($event, item.id)">
            <a href="javascript:void(0)" >{{ item.name }}</a>
          </li>
        </ul>
      </nav>

      <section>
        <div class="demo">
          <div class="history">
            <div class="history-date">
              <ul>
                <h2 class="first">
                  <a href="javascript:void(0)">Release</a><img src="../static/img/img051.gif" alt="发展logo" />
                </h2>
                <!--							<li class="green"> 大一点-->

                <li v-for="(item, index) in list" v-show="index<num">
                  <img v-if="index === 0" src="../static/img/new.png" style="width: 80px">
                  <h3>
                    <span>版本号</span>{{ item.versionNumber }}
                  </h3>
                  <dl>
                    <dt>
										<span>
											<el-button type="primary" icon="el-icon-download" circle @click="openDownload(item.downloadUrl)"></el-button>&nbsp;&nbsp;
											<a href="javascript:void(0)" v-if="item.devProdVersion === 1" >标签：开发版</a>&nbsp;&nbsp;&nbsp;
											<a href="javascript:void(0)" v-if="item.devProdVersion === 2" >标签：正式版</a>&nbsp;&nbsp;&nbsp;

											<a href="javascript:void(0)">大小：{{ item.sizeStr }}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a href="javascript:void(0)">别名：{{ item.alias }}</a>
										</span><br/>
                      <p>
                        {{item.description}}
                      </p>
                      <span><i class="el-icon-time"></i>&nbsp;&nbsp;{{ item.updatedTime }}</span>
                    </dt>
                  </dl>
                  <br>
                </li>
              </ul>
            </div>
          </div>
          <a class="more-span" @click="handleMore">{{ moreTxt }}</a>&nbsp;

          <i class="el-icon-arrow-down" v-show="isShow"></i>
          <i class="el-icon-arrow-up" v-show="!isShow"></i>
        </div>
      </section>

    </div>
  </div>
</template>


<script>
// import {fetchList} from "@/api/downloadPage";

const defaultForm = {
  pageNo: 1,
  pageSize: 100,
  versionNumber: '',
  description: ''
}

export default {
  name: "baseReport",
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      list: [],
      appList: [],
      num: 1,
      isShow: true,
      moreTxt: '显示全部',
    }
  },
  methods:{
    fetchData() {
      this.listLoading = true
      // fetchList(this.postForm).then(response => {
        this.list = [
          {
            "id": 34,
            "versionNumber": "1.0.7.2",
            "versionNumberDouble": 1.072,
            "alias": "1.0.7.2",
            "description": "增加深度判断",
            "downloadUrl": "https://www.xxx.com/app/backend/2023/12/07/一个应用app1.0.7.2.apk",
            "sizeStr": "81.34MB",
            "appId": 1,
            "createId": 1,
            "createName": "admin",
            "createdTime": "2023-11-29 10:28:00",
            "updateId": 0,
            "updateName": "",
            "updatedTime": "2023-11-29 10:28:00",
            "devProdVersion": 1
          },
          {
            "id": 32,
            "versionNumber": "1.0.7.1",
            "versionNumberDouble": 1.071,
            "alias": "1.0.7.1版本",
            "description": "增加深度判断",
            "downloadUrl": "https://www.xxx.com/app/backend/2023/12/07/一个应用app1.0.7.1.apk",
            "sizeStr": "47.79MB",
            "appId": 1,
            "createId": 1,
            "createName": "admin",
            "createdTime": "2023-11-20 14:15:55",
            "updateId": 0,
            "updateName": "",
            "updatedTime": "2023-11-20 14:15:55",
            "devProdVersion": 1
          },
          {
            "id": 11,
            "versionNumber": "1.0.6",
            "versionNumberDouble": 1.06,
            "alias": "一个应用演示Demo",
            "description": "v1.0.增加深度判断",
            "downloadUrl": "https://www.xxx.com/app/backend/2023/12/07/一个应用app1.0.6.apk",
            "sizeStr": "47.77MB",
            "appId": 1,
            "createId": 1,
            "createName": "admin",
            "createdTime": "2023-10-26 10:12:18",
            "updateId": 1,
            "updateName": "admin",
            "updatedTime": "2023-11-01 13:55:41",
            "devProdVersion": 1
          }
        ]
        this.appList =  [
          {
            "id": 1,
            "name": "一个应用app",
            "isDel": 0,
            "createId": 0,
            "createdTime": "2023-10-31 11:46:00",
            "updateId": 0,
            "updatedTime": "2023-10-31 11:46:00"
          },
          {
            "id": 3,
            "name": "十指高亮Demo",
            "isDel": 0,
            "createId": 0,
            "createdTime": "2023-10-31 11:46:00",
            "updateId": 0,
            "updatedTime": "2023-10-31 11:46:00"
          },
          {
            "id": 4,
            "name": "L服务端",
            "isDel": 0,
            "createId": 0,
            "createdTime": "2023-10-31 11:46:00",
            "updateId": 0,
            "updatedTime": "2023-10-31 11:46:00"
          },
          {
            "id": 6,
            "name": "其他",
            "isDel": 0,
            "createId": 1,
            "createdTime": "2023-11-16 14:38:50",
            "updateId": 0,
            "updatedTime": "2023-11-16 14:38:50"
          }
        ]

        this.total = 20
        this.listLoading = false
      // })
    },
    openDownload(downloadUrl) {
      if (downloadUrl === '') {
        alert('无下载地址id')
        return ''
      }
      console.log("downloadUrl is:" + downloadUrl)
      window.open(downloadUrl, '_blank')
    },
    checkApp(e, id){
      console.log("app id is:", id)
      this.postForm.appId = id;
      // 处理高亮
      const siblings = e.currentTarget.parentNode.children;
      console.log("siblings length is:" + siblings.length)
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('current');
      }
      e.currentTarget.classList.add('current')
      // 拉最新数据
      this.fetchData()
      // 使下拉都收起
      this.num = 1;
      this.moreTxt = '显示全部';
      console.log("切换了，isShow现在是：" + this.isShow + ",而我现在要改成false")
      this.isShow = true
    },
    handleMore(){
      console.log("点击更多了，现在isShow是：" + this.isShow)

      this.isShow = !this.isShow;
      console.log('isShow已被切换成相反的，现在是：' + this.isShow);
      this.num = this.isShow? 1: this.total;
      console.log("同时现在num是：" + this.num);
      this.moreTxt = this.isShow?  '显示全部':'收起'
    }
  },
  created() {
    this.baseUrl = process.env.VUE_APP_BASE_API

    // ajax请求数据
    this.fetchData()

    // 加载多个js到页面中
    var arrUrl = [
      // '/static/js/jquery.1.4.2-min.js',
      // '/static/js/jquery.tools.min.js',
      // 'https://unpkg.com/vue@2/dist/vue.js',
      // '/static/js/tab.js',
      // '/static/js/jquery.easing.1.3.js',
      // 'https://unpkg.com/element-ui/lib/index.js',
      '/static/js/process.js',
    ]
    let i;
    for (i= 0; i< arrUrl.length; i++){
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = arrUrl[i];
      document.body.appendChild(script);
    }

  },
  mounted(){
  },
};
</script>

<style scoped>
/*@import "https://unpkg.com/element-ui/lib/theme-chalk/index.css";*/
@import '../static/css/tab.css';
@import "../static/css/process.css";
</style>

