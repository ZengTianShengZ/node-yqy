### 主页列表
```
url:    /homelist
method: post
```
```
request: {
  latitude: " ",  // 维度
  longitude: " ", // 经度
  pageNum: " ",   //请求页码
  pageSize: " "   //每页条数
}
```
```
response: {
    "data": {
        "listItems":[{
            id: 0,
            nickName: '曾田生',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKApG4aicW5835FUgOBY75jRDaYt8B84YIQL6v9J9lI4KEPA1nicGNxtdlI5iamIosXiaRqiavDAXmW2rQ/0',
            createTime: '今天 09：06',
            address: '福鼎家园',
            description: '说的就是开机定',
            imgList: [
                '../../images/matter/img7.jpeg',
                '../../images/matter/img8.jpeg'
            ]
         }],
         "pageNum":1
         "pageSize":10
         "totalPageNum":40
         "totalCount":400
    },
    "msg": "",
    "code": 0,
    "success": true
}
```
### 我的
```
url:    /mylist
method: post
```
```
request: {
  openid: " ",  // 唯一标识
  type: " ",    // 0：发表过的，1：参与过的
  pageNum: " ",   //请求页码
  pageSize: " "   //每页条数
}
```
```
response: {
    "data": {
        "listItems":[{
            id: 0,
            nickName: '曾田生',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKApG4aicW5835FUgOBY75jRDaYt8B84YIQL6v9J9lI4KEPA1nicGNxtdlI5iamIosXiaRqiavDAXmW2rQ/0',
            createTime: '今天 09：06',
            address: '福鼎家园',
            description: '说的就是开机定',
            imgList: [
                '../../images/matter/img7.jpeg',
                '../../images/matter/img8.jpeg'
            ]
         }],
         "pageNum":1
         "pageSize":10
         "totalPageNum":40
         "totalCount":400
    },
    "msg": "",
    "code": 0,
    "success": true
}
```

### 详情页
```
url:    /detail
method: post
```
```
request: {
  id: " ",  //
  pageNum: " ",   //请求页码  针对 commentList 如果 pageNum 入参大于1只返回 commentList 数据
  pageSize: " "   //每页条数
}
```
```
response: {
    "data": {
        "detail":[{
            id: 0,
            nickName: '曾田生',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKApG4aicW5835FUgOBY75jRDaYt8B84YIQL6v9J9lI4KEPA1nicGNxtdlI5iamIosXiaRqiavDAXmW2rQ/0',
            createTime: '今天 09：06',
            address: '福鼎家园',
            description: '说的就是开机定',
            imgList: [
                '../../images/matter/img7.jpeg',
                '../../images/matter/img8.jpeg'
            ]
         }],
         commentList: [{
            commentId: 0,
            nickName: '曾田生x',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKApG4aicW5835FUgOBY75jRDaYt8B84YIQL6v9J9lI4KEPA1nicGNxtdlI5iamIosXiaRqiavDAXmW2rQ/0',
            createTime: '今天 09：06',
            comment: '说的就案件的就是就看看模块时代是的搜东山口卡就是卡死进度款几十块几点开始',
            replyto: {
                nickName: '曾田生cc',
                comment: '说的就案件的就是就看看模块时代是的搜东山口卡就是卡死进度款几十块几点开始'
            }
         }],
         "pageNum":1
         "pageSize":10
         "totalPageNum":40
         "totalCount":400
    },
    "msg": "",
    "code": 0,
    "success": true
}
```

### 详情页评论
```
url:    /commentTo
method: post
```
```
request: {
  id: " ",  // 详情页 id
  nickName: "",
  avatarUrl: "",
  comment: "说的就案件的就是就看", // 评论内容,
  replyto: { // 回复某条评论，没有就传空
       nickName: '曾田生cc',
       comment: '说的就案件的就是就看看模块时代是的搜东山口卡就是卡死进度款几十块几点开始'
  }
}
```
```
response: {
    "data": {
    }
    "msg": "",
    "code": 0,
    "success": true
}
```


### 发布动态
```
url:    /sendDynamic
method: post
```
```
request: {
  openid: "",
  nickName: "",
  avatarUrl: "",
  address: "",                   // 地址
  description: '说的就是开机定',    // 描述
  imgList: [                     // 七牛图片链接
     '../../images/matter/img7.jpeg',
     '../../images/matter/img8.jpeg'
  ]
}
```
```
response: {
    "data": {
    }
    "msg": "",
    "code": 0,
    "success": true
}
```