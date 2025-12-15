---
title: vscode+c-peizhi
author: cerberus
date: 2025-12-15 10:40:00 +0800
categories: [Blogging, Tutorial]
tags: [vscode]
---

# 安装vscode以及c/c++扩展

![C/C++ 扩展](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/cpp-extension.png)

# 安装MSYS2

![image-20251025204840902](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025204840902.png)

![image-20251025204920161](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025204920161.png)

一直点next，直到完成（如果卡在50%，退回上一步再重新安装）

![image-20251025205258132](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025205258132.png)

![image-20251025205313809](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025205313809.png)

## msys2窗口字体放大

![image-20251025214749535](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214749535.png)

![image-20251025214757515](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214757515.png)

![image-20251025214803773](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214803773.png)

点击应用，apply即可。

## pacman 的配置（换源）

![image-20251025205635571](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025205635571.png)

## 安装 MinGW-w64 工具链

```bash
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```

接受其中默认的包数量`toolchain`按 Enter 键进行分组。

![image-20251025210239676](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025210239676.png)

输入Y继续安装

![image-20251025210340956](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025210340956.png)

安装成功

![image-20251025210402319](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025210402319.png)

# 添加环境变量

```txt
C:\msys64\ucrt64\bin
```

![image-20251025211129114](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025211129114.png)

添加环境变量后，依次点三个确定，才可以设置成功。

# 检查c/c++环境是否配置成功

打开一个新的命令提示符并输入:

```shell
gcc --version
g++ --version
gdb --version
```

![image-20251025211542916](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025211542916.png)

输出显示已安装的 GCC、g++ 和 GDB 版本。

# 创建helloworld文件

`helloworld.cpp`

```c++
#include <iostream>
#include <vector>
#include <string>

using namespace std;

int main()
{
    vector<string> msg {"Hello", "C++", "World", "from", "VS Code", "and the C++ extension!"};

    for (const string& word : msg)
    {
        cout << word << " ";
    }
    cout << endl;
}

```

# 运行代码

点击编辑器右上角的运行按钮。

![image-20251025212305674](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212305674.png)

从系统上检测到的编译器列表中选择 **C/C++:g++.exe** 构建和调试活动文件。

![image-20251025212338197](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212338197.png)

构建成功后,**Terminal**您的程序输出将显示在集成终端中。

![image-20251025212546283](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212546283.png)

# 调试程序

设置断点

![image-20251025212728672](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212728672.png)

从运行按钮旁边的下拉菜单中选择 **调试 C/C++ 文件**。

![image-20251025212814999](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212814999.png)

选择 **C/C++:g++ 构建和调试活动文件** 从系统上检测到的编译器列表中(您只有在首次运行或调试时才需要选择编译器) `helloworld.cpp`)

![image-20251025212905013](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025212905013.png)

![image-20251025213009495](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025213009495.png)

逐步执行代码，直到退出本次调试

![image-20251025213047331](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025213047331.png)

![image-20251025213124329](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025213124329.png)

# 添加额外的c/c++设置

可以通过运行`Ctrl+Shift+P`命令来查看C/C++配置UI。

![image-20251025213535884](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025213535884.png)

![image-20251025214019719](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214019719.png)

![image-20251025214025057](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214025057.png)

![image-20251025214057227](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214057227.png)

![image-20251025214102505](https://cloud-080910t-1316343199.cos.ap-beijing.myqcloud.com/assets/image-20251025214102505.png)



# 参考链接

- [msys2 | 镜像站使用帮助 | 清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/help/msys2/)
- [将 GCC 与 MinGW 结合使用](https://code.visualstudio.com/docs/cpp/config-mingw)

# 下载链接(任选一个即可)

- 通过网盘分享的文件：msys2-x86_64-20241208.exe
  链接: https://pan.baidu.com/s/1VJT7O8zZxgAwhioEoAqpQg?pwd=bhyh 提取码: bhyh 
  --来自百度网盘超级会员v5的分享
- https://github.com/msys2/msys2-installer/releases/download/2024-12-08/msys2-x86_64-20241208.exe