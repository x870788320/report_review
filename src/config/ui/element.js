// element/index.js
import { 
  Button, 
  Select, 
  Option,
  Switch, 
  Input, 
  Table, 
  TableColumn, 
  Tabs, 
  TabPane, 
  Pagination, 
  Upload, 
  Collapse, 
  CollapseItem, 
  Loading, 
  Menu, 
  MenuItem, 
  MessageBox, 
  Message,
  Steps,
  Step,
  Progress,
  Cascader } from 'element-ui'

export default {
  install: function(Vue) {
    Vue.use(Button)
    Vue.use(Switch)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Input)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Pagination)
    Vue.use(Tabs)
    Vue.use(TabPane)
    Vue.use(Upload)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Loading)
    Vue.use(Steps)
    Vue.use(Step)
    Vue.use(Progress)
    Vue.use(Cascader)
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$message = Message
  }
}

let loadingCount = 0;
const loading = () => Loading.service({
  lock: true,
  text: '拼命加载中...',//可以自定义文字
  spinner:'el-icon-loading',//自定义加载图标类名
  background: 'rgba(0, 0, 0, 0.7)'//遮罩层背景色
});
const loadingEnd = () => loading().close()
export const showLoading = () => (loadingCount++ == 0) && loading();
 
export const hideLoading = () => {
  console.log(loadingCount)
  if (loadingCount <= 0) return true;
  if( --loadingCount === 0) loadingEnd();
  return true
}
