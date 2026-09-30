import { defineClientConfig } from 'vuepress/client'

// import './theme/styles/custom.css' // import your custom styles / 导入自定义样式
import './custom.css'
import HomeJournal from './components/HomeJournal.vue'
import HomeLatest from './components/HomeLatest.vue'

export default defineClientConfig({
  enhance({ app }) {
    // do something...

    
    app.component('home-journal', HomeJournal)
    app.component('home-latest', HomeLatest)
  },

  
})
