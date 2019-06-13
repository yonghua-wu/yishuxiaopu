export default function human(time) {
  function unify(time) {
    time -= 0
    if (("" + time).length === 10) {
      time *= 1000
    }
    return time
  }
  var ago, curTime, diff, int
  time = unify(time)
  int = parseInt
  curTime = +new Date()
  diff = curTime - time
  ago = ""
  if (1000 * 60 > diff) {
    ago = "刚刚"
  } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
    ago = int(diff / (1000 * 60)) + "分钟前"
  } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
    ago = int(diff / (1000 * 60 * 60)) + "小时前"
  } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
    ago = int(diff / (1000 * 60 * 60 * 24)) + "天前"
  } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
    ago = int(diff / (1000 * 60 * 60 * 24 * 30)) + "月前"
  } else {
    ago = int(diff / (1000 * 60 * 60 * 24 * 30 * 12)) + "年前"
  }
  return ago
}