const NetworkService = {
  checkExpress: checkExpress,
  getTodayCount: getTodayCount
}
const baseUrl = '/baseUrl'
// 接口方法封装
function loadingData (baseUrl, url, sendType, body) {
  return fetch(baseUrl + url, {
    method: sendType,
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json', // 'application/x-www-form-urlencoded'
      'Cache-Control': 'no-cache', // 不使用浏览器缓存
      Accept: 'application/json' // 通过头指定，获取的数据类型是JSON
    },
    body: sendType === 'GET' ? null : body
  })
    .then(response => {
      return response.json()
    })
    .catch(error => {
      return {
        code: 0,
        msg: error.toString()
      }
      // throw error
    })
}
// 查询快递信息
function checkExpress (logisticCode, shipperCode) {
  let url = '/api/check'
  let sendType = 'POST'
  let body = new FormData()
  body.append('logisticCode', logisticCode)
  body.append('shipperCode', shipperCode)
  return loadingData(baseUrl, url, sendType, body)
}

function getTodayCount () {
  let url = '/api/count'
  let sendType = 'GET'
  let body = null
  return loadingData(baseUrl, url, sendType, body)
}
export default NetworkService
