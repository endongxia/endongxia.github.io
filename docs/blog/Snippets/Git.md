---
title: Git
createTime: 2023/03/16 20:25:15
tags:
  - Git
permalink: /blog/nqoxr642/
---
# Git

#### 一、基本命令

`git --version`	显示版本号，验证是否安装

`git config --global user.name "Your Name"`	配置用户名

`git config --global user.email "you@example.com"`	配置邮箱

`git iniit`	在当前目录初始化git仓库

`git status`	查看当前git仓库状态

`git add`	将文件放入暂存区

`git commit -m "提交说明"`	提交暂存区的内容

`git log`	查看commit记录

`git giff`	比较工作区和暂存区

`git giff --staged`	比较暂存区和当前分支最新一次提交

`git giff HEAD`	比较工作区和当前分支最新一次提交

*执行  git commit，并没有把暂存区清空，而是把暂存区的当前状态记录为一个新的版本。*

#### 二、代码回滚

`git restore`	撤销工作区的修改，恢复为暂存区的版本

`git restore --staged`	取消暂存

`git revert HEAD`	创建一个新的提交来撤销上一次提交（并没有删除需要撤销的提交）

`git revert commitID`	创建一个新的提交来撤销某次提交（并没有删除需要撤销的提交）

| 命令                       | HEAD（当前分支指向） | 暂存区                 | 工作区                 |
| -------------------------- | -------------------- | ---------------------- | ---------------------- |
| `git reset --hard HEAD~1`  | 回退到上一个提交     | 重置为上一个提交的内容 | 重置为上一个提交的内容 |
| `git reset --soft HEAD~1`  | 回退到上一个提交     | 保持不变               | 保持不变               |
| `git reset --mixed HEAD~1` | 回退到上一个提交     | 重置为上一个提交的内容 | 保持不变               |

- `--soft`：只动 HEAD
- `--mixed`：动 HEAD + 暂存区
- `--hard`：动 HEAD + 暂存区 + 工作区

#### 三、分支

`git branch`	查看分支

`git branch feature`	创建feature分支

`git switch feature`	切换到feature分支

`git switch -c feature`	创建并切换分支



分支合并，一般先执行`git switch main`切换到main分支再进行合并

`git merge feature`	把feature分支合并到当前分支



合并冲突：两个分支修改了同一文件中相互冲突的内容，Git 无法自动判断应该保留哪一个版本。

手动处理冲突文件，`git add` 标记冲突已解决并放入暂存区，`git commit` 完成合并

`git merge --abort`	取消合并



`git rebase main`	让功能分支跟上main分支的最新进展

若发生冲突，手动处理冲突，`git add`，`git rebase --continue`

`git rebase --abort`	放弃rebase



merge：把两条路线合到一起。

rebase：把自己的提交接到另一条路线后面。