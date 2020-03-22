<template>
  <div id="mainPageComponent">
    <Header/>
    <Navigation/>
    <CurrentBaner :baners="baners"/>
    <BodyPage :baners="baners"/>
    <Footer/>
  </div>
</template>
<script>
import Header from '@/components/unitComponents/Header'
import Navigation from '@/components/unitComponents/Navigation'
import CurrentBaner from '@/components/unitComponents/CurrentBaner'
import BodyPage from '@/components/unitComponents/BodyPage'
import Footer from '@/components/unitComponents/Footer'
export default {
  data() {
    return {
      baners: [
        {
          "banerId": 1,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 2,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://img08.rl0.ru/afisha/c1200x600/daily.afisha.ru/uploads/images/5/cd/5cd921a30fd7f4e6b82f6602493fc787.jpg"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 3,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://www.ridus.ru/images/2019/12/16/1022839/in_article_b8ebe3cc8b.jpg_large"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_CENTRAL",
          "banerUsesStatus": true
        },
        {
          "banerId": 4,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Banner_red.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 5,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/baner_small.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 6,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 7,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        },
        {
          "banerId": 8,
          "image": {
            "imageId": "e9ee5032-e87a-4ab8-bdba-2ee521b0f349",
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/product.png"
          },
          "title": "Банер банерный",
          "page": "MAIN",
          "pageLocation": "MAIN_SMALL",
          "banerUsesStatus": true
        }
      ]
    }
  },
  // created: function init() {
  //   fetch('http://ec2-13-58-76-77.us-east-2.compute.amazonaws.com:8080/baners/allByStatusByPage?page=MAIN&status=true', {
  //     method: 'get'
  //   }).then(response => response.json())
  //   // eslint-disable-next-line
  //     .then(commits => this.baners = commits)
  // },
  name: 'mainPageComponent',
  components: {
    Header,
    Navigation,
    CurrentBaner,
    BodyPage,
    Footer
  }
}
</script>

<style scoped>

</style>
