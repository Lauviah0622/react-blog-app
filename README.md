## React Blog

[Demo URL](https://lauviah.io/mtr-04/blog/#/)

一個極其陽春的部落格

前端：使用 react 加上 redux 的 RTK，umm 大概是這樣。

後端：[Repo 在這邊](https://github.com/Lauviah0622/lidemy-student-json-api-server)。使用 huli 做好的 [Lidemy 學生專用 API Server](https://github.com/Lidemy/lidemy-student-json-api-server)，自己 host 在 AWS ec2 上面。  

原本的 server 註冊會員密碼因為測試用途會固定，修改成利用 bcrypt 做 hash ～

## 功能介紹

不需會員登入：
- 文章列表
- 文章內容
- 關於我
- 建立會員

需會員登入：
- 建立文章：點擊右上方 Newpost
- 刪除文章：進入文章後，點擊 `delete` 
- 編輯文章：進入文章後，點擊 `update` ，更改內容或標題後送出



