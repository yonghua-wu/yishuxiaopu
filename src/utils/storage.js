/**
 * 设置本地缓存
 * @param {String} k 键名
 * @param {String} v 值
 */
function set(k, v) {
  localStorage.setItem(k, v)
}

/**
 * 获取本地缓存
 * @param {String} k 键名
 */
function get(k) {
  return localStorage.getItem(k)
}

/**
 * 删除本地缓存
 * @param {String} k 键名
 */
function del(k) {
  localStorage.removeItem(k)
}

export default {
  set,
  get,
  del
}