---
title: markdown基础
createTime: 2024/12/08 22:02:39
tags:
  - markdown
permalink: /markdown/pv2jer4s/
---
*这是我查阅官方文档学习总结的，附：[markdown官方文档](https://markdown.com.cn/basic-syntax/)*

## 标题

*在标题前面加 `#`，有几个 `#` 就代表几级标题。注意 `#` 后需要一个空格隔开再写标题。*

### 1. 一级标题
```
# Heading level 1
```

# Heading level 1

### 2. 二级标题
```
## Heading level 2
```

## Heading level 2



## 段落

创建段落，使用空白行将一行或多行文本进行分隔。  
Markdown 通常会忽略段落开头的空格。如果在段落开头添加两个空格，  
渲染后可能会被视为无效。



## 换行

在一行的末尾添加两个或多个空格，然后回车，即可创建一个换行(`<br>`)。  
也可在行末尾使用 `<br>` 标签换行。



## 强调

在需强调部分前后添加 `*` 或 `**` 符号。

| 类型     | 语法             | 预览         |
|----------|------------------|--------------|
| 斜体     | `*斜体*`         | *斜体*       |
| 粗体     | `**粗体**`       | **粗体**     |
| 粗斜体   | `***粗斜体***`   | ***粗斜体*** |



## 引用

要创建块引用，在段落前添加一个 `>` 符号。  
块引用可以包含多个段落。为段落之间的空白行添加一个 `>` 符号。

```
> #### The quarterly results look great!
> 
> - Revenue was off the chart.
> - Profits were higher than ever.
> 
> *Everything* is going according to **plan**.
```

#### 预览：

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
> *Everything* is going according to **plan**.



## 列表

### 1.无序列表

在每个列表项前面添加破折号 (`-`)、星号 (`*`) 或加号 (`+`)。  
缩进一个或多个列表项可创建嵌套列表。

```
* First item
* Second item
* Third item
    * Indented item
    * Indented item
* Fourth item
```

#### 预览：

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item



### 2.有序列表

在每个列表项前添加数字并紧跟一个英文句点。数字不必按顺序排列，  
但是列表应当以数字 1 起始。

```
1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item
```

#### 预览：

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item



## 代码块

在代码块之前和之后的行上使用三个反引号(```)或三个波浪号(`~~~`)。

```
   ``` json //json 表示代码高亮
{
 "firstName": "John",
 "lastName": "Smith",
 "age": 25
}
    ```  
```

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "age": 25
}
```



## 分割线

在单独一行上使用三个或多个星号(`***`)、破折号(`---`)或下划线(`___`)，  
并且不能包含其他内容。

#### 示例：

```
Just

***

Go

---

For

_________________
It ！
```

#### 预览：

Just
***
Go

---

For

___

It！



## 链接

链接文本放在中括号内，链接地址放在后面的括号中。

```
[QQ](https://ti.qq "Nice to meet you!")
```

#### 预览：

手机加我 [QQ](https://ti.qq.com/open_qq/index2.html?url=mqqapi://userprofile/friend_profile_card?src_type=web&version=1.0&source=2&uin=752790033 "Nice to meet you!")!

### 网址和 Email 地址

使用尖括号可以很方便地把 URL 或 email 地址变成可点击的链接。

```
<https://shinedawn.top/>
<shinedawn.su@gmail.com>
```

#### 预览：

<https://ndon.top/>  
<shinedawn.su@gmail.com>



### 强调链接

在链接语法前后增加星号。

```
I love my school *[浙江师范大学](https://www.zjnu.edu.cn/)*!
I love my school **[浙江师范大学](https://www.zjnu.edu.cn/)**!
I love my school ***[浙江师范大学](https://www.zjnu.edu.cn/)***!
```

#### 预览：

I love my school *[浙江师范大学](https://www.zjnu.edu.cn/)*!  
I love my school **[浙江师范大学](https://www.zjnu.edu.cn/)**!  
I love my school ***[浙江师范大学](https://www.zjnu.edu.cn/)***!



## 图片

要添加图像，请使用感叹号 `!`，然后在方括号中添加替代文本，图片链接放在圆括号里。

```
![这是我的母校](https://www.zjnu.edu.cn/_upload/article/images/c1/6e/af7b994043ba90f9943ccb0abab2/b06d8dd7-7e28-4c7d-bbea-e836bb4879a7.jpg "浙江师范大学")
```

#### 预览：

![这是我的母校](https://www.zjnu.edu.cn/_upload/article/images/c1/6e/af7b994043ba90f9943ccb0abab2/b06d8dd7-7e28-4c7d-bbea-e836bb4879a7.jpg "浙江师范大学")

### 给图片加链接

将图像的 Markdown 括在方括号中，然后将链接添加在圆括号中。

```
[![初阳湖](https://www.zjnu.edu.cn/_upload/article/images/ba/80/a87c49be437aa154b07f8419664b/02ff728f-5bd8-46fc-a012-bde78a613509_s.jpg)](https://www.zjnu.edu.cn/6982/list.htm)
```

#### 预览：

[![初阳湖](https://www.zjnu.edu.cn/_upload/article/images/ba/80/a87c49be437aa154b07f8419664b/02ff728f-5bd8-46fc-a012-bde78a613509_s.jpg)](https://www.zjnu.edu.cn/6982/list.htm)



## 转义字符

在字符前面添加反斜杠(`\`)，显示原本用于格式化 Markdown 文档的字符。

```
\* Without the backslash, this would be a bullet in an unordered list.
```

#### 预览：

\* Without the backslash, this would be a bullet in an unordered list.
