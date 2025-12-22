---
layout: post
title: 安装 WSL2 和 Ubuntu 22.04
date: 2025-12-19 10:46 +0800
author: cerberus
categories: [软件安装, 教程]
tags: [wsl2, ubuntu22.04]
description: 本文记录在Windows 11环境下，通过离线方式安装WSL2 + Ubuntu22.04，并完成基础配置与VS Code联动，适合网络受限或希望可控安装流程的用户。
---

本文记录在 **Windows 11** 环境下，通过 **离线方式** 安装 **WSL2 + Ubuntu 22.04**，并完成基础配置与 VS Code 联动，适合网络受限或希望可控安装流程的用户。

------

## 本文涉及的软件

> [**下载链接**](https://pan.baidu.com/s/1TD2TmJcL_bkfH4FrjnydKw?pwd=528z "按住Ctrl点击跳转百度网盘")
{: .prompt-tip }

- **WSL 离线安装包**：`wsl-windows-x64.msi`
- **Ubuntu 22.04 发行版**：`.appx`

> 建议将所有安装包统一放在 `Downloads` 目录，便于后续操作。
{: .prompt-tip }

------

## 开启 CPU 虚拟化

> 若该选项未开启，WSL2 将无法使用。
{: .prompt-danger }

<img src="https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/Pasted%20image%2020250403104942.png" alt="Pasted image 20250403104942" style="zoom: 50%;" />

------

## 启用 Windows 功能

在开始菜单搜索并打开 **“启用或关闭 Windows 功能”**，勾选以下两项：

- ☑ Windows Subsystem for Linux
- ☑ Virtual Machine Platform

完成后 **重启电脑**。

<img src="https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/Pasted%20image%2020250403105058.png" alt="Pasted image 20250403105058" style="zoom:80%;" />

------

## 安装 WSL（离线方式）

本文仅介绍 **离线安装**，在线安装可参考微软官方文档。

### 下载 WSL 安装包

访问 **Microsoft 官方 GitHub 发布页**：

- https://github.com/microsoft/WSL/releases

下载文件：

```text
wsl-windows-x64.msi
```

双击安装即可，整个过程通常非常迅速。

------

## 验证 WSL 版本

安装完成后，打开 PowerShell：

```powershell
wsl -v
```

确认 **WSL version = 2**。

------

## 安装 Ubuntu 22.04（离线）

### 获取发行版信息

从镜像站拉取发行版描述文件（示例使用 `raw.gitmirror.com`）：

```powershell
curl -o wsl-distros.json https://raw.gitmirror.com/microsoft/WSL/master/distributions/DistributionInfo.json
```

查看可用发行版：

```powershell
Get-Content wsl-distros.json | ConvertFrom-Json | Select-Object -ExpandProperty Distributions
```

复制 **Ubuntu 22.04** 对应的下载地址，在浏览器中下载 `.appx` 文件。

------

### 安装发行版

```powershell
# 切换到下载目录
cd ~\Downloads

# 安装 Ubuntu 22.04
Add-AppxPackage .\Ubuntu2204LTS-230518_x64.appx

# 设置默认 WSL 版本
wsl --set-default-version 2

# 启动 Ubuntu
ubuntu2204
```

首次启动会进入初始化流程。

------

### 设置 Linux 用户名与密码

根据提示创建默认用户，该用户将作为 WSL 中的日常使用账号。

------

### 配置 sudo 免密（可选）

> 仅建议在 **个人开发环境** 中使用。
{: .prompt-warning }

```bash
sudo -E visudo
```

在文件末尾添加：

```text
你的用户名 ALL=(ALL:ALL) NOPASSWD:ALL
```

保存退出即可生效。

------

## 与 VS Code 配合使用

官方文档：

- https://learn.microsoft.com/windows/wsl/tutorials/wsl-vscode

### 安装扩展

在 VS Code 扩展市场搜索并安装：

```text
Remote Development
```

安装完成后，即可通过 **WSL 连接 Ubuntu 环境** 进行开发。

------

## Ubuntu 基础配置

### 查看当前软件源

```bash
grep -v '^#' /etc/apt/sources.list.d/ubuntu.sources | grep -v '^$'
```

### 更换国内镜像源（推荐）

- 清华大学镜像站：https://help.mirrors.cernet.edu.cn/ubuntu/

根据官方说明替换内容。

------

### 更新系统

```bash
sudo apt-get update
```

安装常用基础工具：

```bash
sudo apt-get install -y wget ca-certificates
```

------

## 完成 🎉

至此，**WSL2 + Ubuntu 22.04 + VS Code** 已全部配置完成。

你现在可以在 Windows 上，享受一个 **接近原生 Linux 的开发环境**，并且与编辑器、终端无缝协作。

后续可继续安装：Docker、Node.js、Java、Python、Jekyll / Chirpy 等开发工具。