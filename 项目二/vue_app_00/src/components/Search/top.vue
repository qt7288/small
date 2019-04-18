<template>
<div style="{'-webkit-overflow-scrolling': scrollMode}">
<head_content :head-title='title' goBack="true"></head_content>
<top-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
  <ul class="list_container">
    <li v-for="(item, index) in pageList" :key="index" class="list_li">
      <div style="float:left; padding-left:0.3rem">
          <span>{{item.c_jklx}}</span>
      </div>
      <span>
          <svg class="arrow-svg" fill="#bbb">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
      </span>
    </li>
  </ul>
</top-loadmore>
</div>
</template>

<script>
import { Loadmore } from 'mint-ui'
import header from '@/components/head'
import Qs from 'qs'
export default {
  components: {
    'top-loadmore': Loadmore,
    'head_content': header
  },
  data () {
    return {
      title: '错误日志报文',
      pageList: null,
      searchCondition: {
        PageNo: 1,
        PageSize: 10
      },
      haveMore: true,
      allLoaded: false, // 是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: 'auto' // 移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    }
  },
  mounted () {
    this.getDate()
  },
  methods: {
    loadTop: function () {
      this.searchCondition.PageNo = 1
      // 组件提供的下拉触发方法
      this.getDate()
      this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom: function () {
      this.more() // 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded()
    },
    loadPageList: function () {
      this.isHaveMore(this.haveMore)
      this.pageList = this.pageList
      this.$nextTick(function () {
        this.scrollMode = 'touch'
      })
      // 查询数据
      /*
      this.loadPageList(this.searchCondition).then(data => {
        this.isHaveMore(data.result.haveMore)
        this.pageList = data.result.pageList
        this.$nextTick(function () {
          this.scrollMode = 'touch'
        })
      }) */
    },
    more: function () {
      // 分页查询
      this.searchCondition.PageNo = this.searchCondition.PageNo + 1
      this.getDate()
      this.isHaveMore(this.haveMore)
    },
    getDate: function () {
      let param = Qs.stringify(
        {
          type: 2001,
          data: JSON.stringify({n_ym: this.searchCondition.PageNo})
        }
      )
      this.$http({
        method: 'post',
        url: '/dev/app/request',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: param
      }).then(function (response) {
        if (this.searchCondition.PageNo === 1) {
          this.pageList = response.data.data.list
        } else {
          this.pageList = this.pageList.concat(response.data.data.list)
          this.isEndPage(response.data.data.size, response.data.data.pageRow)
        }
      }.bind(this)).catch(function (response) {
        console.log(response)
      })
    },
    isEndPage: function (size, pageRow) {
      var endPage = Math.ceil(Number(size) / Number(pageRow))
      if (this.searchCondition.PageNo >= endPage) {
        this.haveMore = false
      }
    },
    isHaveMore: function () {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true // true是禁止上拉加载
      if (this.haveMore) {
        this.allLoaded = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import 'src/style/mixin';
.list_li{
  display: fixed;
  width: 100%;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 1.1rem 1.1rem 2.0rem 1.1rem;
}
.list-svg{
  float: left;
  @include wh(1.1rem,1.1rem);
  svg{
      @include wh(100%,100%);
  }
}
.arrow-svg{
  float: right;
  @include wh(.56667rem,.566667rem);
  svg{
      @include wh(100%,100%);
  }
}
</style>