---
layout: post
title: 安装 Docker (in WSL2)
date: 2025-12-20 20:23 +0800
author: cerberus
categories: [软件安装, 教程]
tags: [wsl2, docker]
description: 本文基于WSL2 + Ubuntu 22.04环境，使用Docker官方apt仓库安装Docker Engine，并针对WSL2中常见的Docker Hub访问失败问题给出稳定解决方案。
---

本文基于 **WSL2 + Ubuntu 22.04** 环境，使用 **Docker 官方 apt 仓库** 安装 Docker Engine，并针对 **WSL2 中常见的 Docker Hub 访问失败问题** 给出稳定解决方案。

------

## 一、前提条件确认（非常重要）

### 1️⃣ 确认 WSL 使用的是版本 2

在 **PowerShell（管理员）** 中执行：

```powershell
wsl -l -v
```

你应该看到类似输出：

```text
NAME            STATE   VERSION
Ubuntu-22.04    Running 2
```

如果 `VERSION` 不是 2，执行：

```powershell
wsl --set-version Ubuntu-22.04 2
```

------

### 2️⃣ 更新 Ubuntu 系统

在 **WSL Ubuntu 22.04 终端** 中执行：

```bash
sudo apt update
sudo apt upgrade -y
```

------

## 二、安装 Docker（官方 apt 仓库方式）

> **不要使用 `apt install docker.io`**，该包版本老且问题较多。
{: .prompt-warning }

------

### 1️⃣ 安装依赖包

```bash
sudo apt install -y \
  ca-certificates \
  curl \
  gnupg \
  lsb-release
```

------

### 2️⃣ 添加 Docker 官方 GPG Key

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
| sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

------

### 3️⃣ 添加 Docker 官方仓库

```bash
echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" \
| sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

------

### 4️⃣ 安装 Docker Engine

```bash
sudo apt update
sudo apt install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin
```

------

## 三、启动 Docker（WSL 特有步骤）

### 1️⃣ 启动 Docker 服务

```bash
sudo service docker start
```

验证安装是否成功：

```bash
docker version
```

------

### 2️⃣ 运行测试容器

```bash
sudo docker run hello-world
```

看到 `Hello from Docker!` 即表示 Docker Engine 工作正常 🎉

------

## 四、免 sudo 使用 Docker（强烈推荐）

每次执行 `sudo docker` 非常繁琐，推荐将当前用户加入 `docker` 组：

```bash
sudo usermod -aG docker $USER
```

> **必须重启 WSL 才能生效**。
{: .prompt-warning }

在 Windows PowerShell 中执行：

```powershell
wsl --shutdown
```

重新打开 Ubuntu，验证：

```bash
docker ps
```

无报错即表示配置成功。

------

## 五、Docker 自动启动（WSL 场景）

WSL 并非完整 systemd 环境（Ubuntu 22.04 默认未开启），推荐使用轻量方案。

编辑：

```bash
nano ~/.bashrc
```

在文件末尾添加：

```bash
if ! pgrep dockerd > /dev/null; then
  sudo service docker start > /dev/null
fi
```

------

## 六、Docker Compose 使用说明

新版 Docker 已内置 Compose 插件：

```bash
docker compose version
```

使用方式：

```bash
docker compose up -d
```

> 不再使用旧命令 `docker-compose`。

------

## 七、常见问题：无法拉取镜像

典型报错如下：

```text
failed to resolve reference "docker.io/library/hello-world:latest"
dial tcp 31.13.69.245:443: connect: connection refused
```

问题说明：

- Docker 服务 **已经正常启动**
- 客户端在尝试访问 Docker Hub
- 网络被拦截 / DNS 污染 / 公司网络限制

👉 **这是网络问题，不是 Docker 安装失败**。

------

## 八、解决方案：配置国内镜像加速器（推荐）

这是 **WSL2 场景下最稳定、最通用** 的解决方案。

### 1️⃣ 创建 daemon 配置文件

```bash
sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json
```

### 2️⃣ 写入镜像加速配置

```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://mirror.baidubce.com",
    "https://dockerproxy.com"
  ]
}
```

------

### 3️⃣ 重启 Docker 服务

```bash
sudo service docker restart
```

------

### 4️⃣ 再次测试

```bash
docker run hello-world
```

在 **90% 的环境中，此步骤将直接成功**。

------

## 九、安装windows桌面版docker

在 Windows 上使用 Docker，**Docker Desktop 是官方推荐方案**。它与 **WSL2 深度集成**，性能和使用体验都远好于早期的 Hyper-V 方案，非常适合本地开发、学习和测试环境。

### 安装前准备（务必检查）

在开始之前，请确保你的系统满足以下条件：

- Windows 10 19045+ / Windows 11（64 位）
- 已启用 **WSL2**
- 已安装并初始化至少一个 Linux 发行版（推荐 Ubuntu 22.04）

#### 1️⃣ 确认 WSL2 状态

在 **PowerShell（管理员）** 中执行：

```powershell
wsl -l -v
```

示例输出：

```text
NAME            STATE   VERSION
Ubuntu-22.04    Running 2
```

如果 VERSION 不是 2：

```powershell
wsl --set-version Ubuntu-22.04 2
```

------

### 下载 Docker Desktop

前往 Docker 官方下载页面：

👉 https://www.docker.com/products/docker-desktop/

选择：

> **Docker Desktop for Windows (x86_64)**

下载完成后，得到安装文件：

```text
Docker Desktop Installer.exe
```

> [百度网盘下载链接](https://pan.baidu.com/s/1ueq8ZrJR9ejKqyvQ6j1bvw?pwd=6d54 "点击跳转")
{: .prompt-tip }

------

### 安装 Docker Desktop

双击安装程序，安装过程中请注意以下选项：

#### 1️⃣ 使用 WSL2 后端（推荐）

安装向导中，**务必勾选**：

- ✅ *Use WSL 2 instead of Hyper-V*

这是性能和稳定性的关键。

#### 2️⃣ 等待安装完成

安装完成后，点击 **Finish**，Docker Desktop 会自动启动。

首次启动时间可能稍长，请耐心等待。

------

### Docker Desktop 基本配置（重要）

#### 1️⃣ 启用 WSL2 集成

打开 Docker Desktop → **Settings** → **Resources** → **WSL Integration**

- 开启：`Enable integration with my default WSL distro`
- 同时勾选你正在使用的发行版（如 `Ubuntu-22.04`）

点击 **Apply & Restart**

------

#### 2️⃣ 验证 Docker 是否可用

打开 **WSL Ubuntu 终端**，执行：

```bash
docker version
```

如果能看到 Client / Server 信息，说明 Docker 已可正常使用。

测试运行一个容器：

```bash
docker run hello-world
```

看到 `Hello from Docker!` 即表示安装成功 🎉

------

## 十、总结

至此，你已经完成：

- ✅ WSL2 + Ubuntu 22.04 Docker 官方安装
- ✅ 免 sudo 使用 Docker
- ✅ Docker Compose 新版使用方式
- ✅ WSL2 网络 / Docker Hub 访问问题解决

