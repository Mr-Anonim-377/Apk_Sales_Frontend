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
            "imagePatch": "https://c7.hotpng.com/preview/193/1023/594/corn-on-the-cob-sweet-corn-clip-art-corn.jpg"
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
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
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
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
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
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
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
            "imagePatch": "https://mr-anonim-377.github.io/Sales/src/main/resources/static/CSS/pictures/Rick and Morty.png"
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
