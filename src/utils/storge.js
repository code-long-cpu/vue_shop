// 数据保存本地持久化
// 约定一个通用的键名
const INFO_KEY = 'hm_shopping_info'
const HISTORY_KEY = 'hm_history_list'

// 持久化保存个人id与token
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userID: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}
// 存储个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 持久化保存搜索历史
// 获取搜索历史
export const getHistory = () => {
  const result = localStorage.getItem('HISTORY_KEY');
  return result ? JSON.parse(result) : [];
}
// 存储搜索记录
export const setHistory = (arr) => {
  localStorage.setItem('HISTORY_KEY', JSON.stringify(arr))
}
