# xpath 标注部分

**功能内容部分**

1. 顶端控制栏
2. 右侧pattern标注工具组
3. iframe 抓取内容模块
4. canvas 标注pannel
5. 信息pannel
6. 标注操作板面 (modify key and attribute)

-----
## 1.顶端控制栏
-----

- seed 地址输入栏
- enable JS 状态选取
- 标注按钮
- 显示/隐藏标注内容

-----
## 2.pattern 管理工具
-----

- annotations 部分 展示或修改标注值
  - field 属性的增删改查
- extracted items 部分
  - seed pattern 展示，修改删除
  - seed pattern 增加

-----
## 3. iframe 抓取内容模块
-----

- iframe 引入seed抓取内容
- 标注状态下： mouseover/mouseout 事件响应
- 所有状态下： click 标注的响应和浏览器默认行为的屏蔽

-----
## 4. canvas 标注控制版
-----

- hover 显示
- selected 显示：包含dom tree结构

----
## 5. 信息板
-----

- element 信息展示，对mouseover 有绑定 目标是不挡住操作版
- 已抓取内容展示：{content,pattern,url,[href|src]} 等常用字段

---
## 6. 标注操作板面
---

- 遮罩层
- 窗口选取工具
