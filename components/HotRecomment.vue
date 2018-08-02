<template>
  <div class="hot-recomment">
    <Row class="recomment-item" v-for="(item,index) in qiye" :key="index">
      <Col span="8">
      <img class="r-img" :src="item.img_list[0].url" alt="" v-if="item.img_list.length>0">
      <img class="r-img" v-else src="http://www.qiye.gov.cn/d/file/2018-07-02/a1f1adf66a24ffbaa4331f60b3202d77.png" alt="">
      </Col>
      <Col span="16">
      <div class="c-title">
        <a :href="`/article/${item._id}`" target="_blank">
          {{item.title}}
        </a>
      </div>
      <div class="c-content">
        {{item.description}}
      </div>
      <div class="info">

      </div>
      </Col>
    </Row>

  </div>
</template>
<script>
export default {
  data() {
    return {
      qiye: []

    }
  },
  methods: {
    // 获取企业新闻
    async  getQiye() {
      const params = {
        url: 'article/list',
        payload: {
          page: 1,
          size: 10,
          category: '5b62e1ea0974d417920f3763'
        }
      }
      const result = await this.post(params);
      this.qiye = result.data;
      console.log('看看企业新闻、企业新闻')
      console.log(this.qiye)
    }
  },
  mounted() {
    this.getQiye()
  }
}
</script>

<style lang="stylus">
.hot-recomment {
  height: 175px;
  padding: 2px;

  img {
    width: 100%;
    height: 100%;
  }

  .c-title {
    margin-left: 4px;
    font-size: 20px;
  }

  .c-content {
    margin-left: 4px;
    font-size: 14px;
  }

  .recomment-item {
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    padding: 3px;
    margin: 4px 0px;

    .r-img {
      width: 260px;
      height: 152px;
    }
  }
}
</style>
