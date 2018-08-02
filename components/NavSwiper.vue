<template>
  <div class="my-swiper">
    <div v-swiper:mySwiper="swiperOption" v-if="banners.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide item" v-for="(banner,index) in banners" :key="index">
          <img :src="banner.url">
          <nuxt-link :to="`/article/${banner._id}`" class="s-title">
            <span>{{banner.title}}</span>
          </nuxt-link>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
  </div>
</template>
<script>
const imgUrl = 'http://www.chinanews.com/part/society/508/U422P4T508D1F20424DT20180709135217.jpg'
export default {
  data() {
    return {
      banners: [

      ],
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true
        },
        on: {
          slideChange() {
            console.log('onSlideChangeEnd', this)
          },
          tap() {
            console.log('onTap', this)
          }
        }
      }
    }
  },
  methods: {
    async swiperList() {
      const params = {
        url: 'article/list',
        payload: {
          page: 1,
          size: 3
        }
      }
      const result = await this.post(params)
      console.log('看看结果swiper')
      console.log(result)
      this.banners = result.data.map(x => { return { url: x.img_list[0].url, _id: x._id, title: x.title } })
    }
  },
  mounted() {
    this.swiperList()
    // this.mySwiper.slideTo(1)
  }
}
</script>


<style lang="stylus" scoped>
.my-swiper {
  height: 360px;
  width: 100%;

  .swiper-wrapper {
    height: 100%;
    width: 100%;

    img {
      width: 100%;
      height: 360px;
    }
  }

  .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;

    .s-title {
      position: absolute;
      background: #fffcfcb3;
      padding-bottom: 24px;
      bottom: 0px;
      width: 100%;
      z-index: 9999;
      font-size: 20px;
      text-align: left;
    }
  }

  .swiper-pagination {
    > .swiper-pagination-bullet {
      background-color: red;
    }
  }
}
</style>
