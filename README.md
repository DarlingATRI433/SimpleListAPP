# 极简打卡 (SimpleList)

一个简洁优雅的目标追踪和打卡应用，支持多平台运行。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android%20%7C%20Windows%20%7C%20Linux%20%7C%20Web-lightgrey.svg)
![Language](https://img.shields.io/badge/language-JavaScript%20%7C%20Rust-orange.svg)

## 🌟 功能特性

### 核心功能
- ✅ **目标管理** - 创建、编辑、删除个人目标
- ✅ **每日打卡** - 简单点击完成每日目标
- ✅ **进度追踪** - 实时显示目标完成进度
- ✅ **数据统计** - 查看打卡记录和统计信息
- ✅ **日历视图** - 直观查看每日打卡情况
- ✅ **数据导出/导入** - 支持JSON格式数据备份

### 界面特性
- 🎨 **响应式设计** - 完美适配桌面和移动设备
- 🌓 **主题切换** - 支持浅色/深色/自动切换主题
- 🌍 **多语言支持** - 简体中文、繁體中文、English
- 📱 **现代化UI** - 简洁优雅的用户界面
- ⚡ **流畅交互** - 丝滑的用户体验

### 技术特性
- 🔧 **跨平台** - 基于Tauri框架，支持Android、Windows、Linux、网页
- 🚀 **高性能** - 安装包体极小，性能高效
- 🔒 **隐私保护** - 数据完全存储在本地，无需登录即可使用
- 📱 **PWA支持** - 可作为网页应用安装

## 🎯 快速开始

### 作为网页应用使用
1. 克隆项目到本地
```bash
git clone https://github.com/your-username/simplelist.git
cd simplelist
```

2. 启动本地服务器
```bash
# 使用Python
python -m http.server 8080

# 或使用Node.js
npx http-server -p 8080
```

3. 打开浏览器访问 `http://localhost:8080/src/`

### 作为桌面应用使用

#### 前置要求
- [Node.js](https://nodejs.org/) (版本 16 或更高)
- [Rust](https://rustup.rs/) (最新稳定版)

#### 安装步骤
1. 克隆项目
```bash
git clone https://github.com/your-username/simplelist.git
cd simplelist
```

2. 安装依赖
```bash
npm install
```

3. 构建桌面应用
```bash
# 开发模式
npm run tauri dev

# 构建发布版本
npm run tauri build
```

## 📖 使用说明

### 创建目标
1. 点击主界面右上角的"+ 添加目标"按钮
2. 填写目标名称（最多10个字符）
3. 设置每日目标次数（1-100次）
4. 选择开始日期
5. （可选）设置结束日期
6. 点击"创建目标"按钮

### 每日打卡
1. 在主界面找到要打卡的目标
2. 点击目标卡片上的"+"按钮
3. 每次点击增加一次打卡次数
4. 达到目标次数后显示完成状态

### 查看记录
1. 点击底部导航的"功能"按钮
2. 选择"打卡记录"查看详细记录
3. 选择"目标管理"管理所有目标

### 数据管理
- **导出数据**：设置 → 数据管理 → 导出数据
- **导入数据**：设置 → 数据管理 → 导入数据

## 🛠️ 开发指南

### 项目结构
```
simplelist/
├── src/                    # 前端源代码
│   ├── index.html         # 主页面
│   ├── main.js             # 主要逻辑
│   ├── styles.css          # 样式文件
│   ├── languages.js        # 多语言支持
│   └── assets/             # 静态资源
├── src-tauri/              # Tauri后端代码
│   ├── src/                # Rust源代码
│   ├── icons/              # 应用图标
│   └── tauri.conf.json     # Tauri配置
├── tests/                  # 测试文件
└── README.md              # 项目文档
```

### 技术栈
- **前端**：HTML5, CSS3, JavaScript (ES6+)
- **后端**：Rust
- **构建工具**：Tauri CLI
- **测试**：Trae+Kimi K2+Puppeteer

### 开发命令
```bash
# 启动开发服务器
npm run tauri dev

# 构建应用
npm run tauri build

# 运行测试
npm run test
```

## 🌍 国际化

支持以下语言：
- 简体中文 (zh-CN)
- 繁體中文 (zh-TW) 
- English (en)

## 📱 截图展示

### 主界面
*简洁的目标列表界面，清晰显示每个目标的进度*
![主界面](https://img.kookapp.cn/assets/2025-09/23/j2ExjJJeKl1hc0so.png)
### 添加目标
*直观的目标创建表单，支持自定义目标参数*
![添加目标](https://img.kookapp.cn/assets/2025-09/23/KFg06Hxyng1hc0so.png)
### 打卡记录
*以周为单位的打卡记录，清晰展示每个目标的完成情况*
![打卡记录](https://img.kookapp.cn/assets/2025-09/23/mMRmNpQuQ41hc0so.png)
### 目标管理
*目标列表展示所有目标，支持编辑、删除和排序*
![目标管理](https://img.kookapp.cn/assets/2025-09/23/q13qKkWqTr1hc0so.png)
### 主题切换
*支持浅色和深色主题，适配不同使用场景*
![主题切换](https://img.kookapp.cn/assets/2025-09/23/Nuzv6BVo6C1hc0so.png)

欢迎提交Issue和Pull Request来改进这个项目！

### 协助开发流程
1. 在 Github 上 Fork 这个项目
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

### 代码规范
- 使用语义化的HTML标签
- CSS采用BEM命名规范
- JavaScript遵循ESLint规则
- 提交前请运行测试

## 📝 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tauri](https://tauri.app/) - 跨平台应用框架
- 所有贡献者和支持者
---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！
