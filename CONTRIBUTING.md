# 贡献指南 (Contributing Guide)

感谢您对 SimpleList 项目的关注！我们欢迎各种形式的贡献，包括代码、文档、测试、设计等。

## 🚀 如何开始

### 报告问题 (Bug Report)
如果您发现了 bug 或有功能建议，请通过以下方式提交：

1. 访问 [GitHub Issues](https://github.com/your-username/simplelist/issues)
2. 点击 "New Issue" 按钮
3. 选择合适的 issue 模板
4. 详细描述您遇到的问题或建议

### 提交代码 (Code Contribution)

#### 前置要求
- Node.js (版本 16 或更高)
- Rust (最新稳定版)
- Git

#### 开发流程

1. **Fork 项目**
   ```bash
   # 点击 GitHub 上的 "Fork" 按钮
   # 然后克隆您的 fork
   git clone https://github.com/your-username/simplelist.git
   cd simplelist
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或修复 bug
   git checkout -b fix/bug-description
   ```

3. **安装依赖**
   ```bash
   npm install
   ```

4. **开发模式测试**
   ```bash
   # 网页版本
   npm run serve
   
   # 桌面应用版本
   npm run dev
   ```

5. **运行测试**
   ```bash
   npm run test
   ```

6. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 添加新功能描述"
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 访问您的 fork 仓库
   - 点击 "Compare & pull request"
   - 填写详细的 PR 描述
   - 提交 PR

## 📋 代码规范

### 提交信息规范 (Commit Message Convention)
我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

类型说明：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响功能）
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat: 添加深色主题支持

- 实现自动主题检测
- 添加主题切换按钮
- 优化深色模式下的颜色对比度

Closes #123
```

### 代码风格

#### JavaScript
- 使用 ES6+ 语法
- 变量命名使用 camelCase
- 常量使用 UPPER_SNAKE_CASE
- 函数命名使用动词开头
- 添加适当的注释

#### CSS
- 使用 BEM 命名规范
- 类名使用 kebab-case
- 添加适当的注释说明

#### HTML
- 使用语义化标签
- 添加 alt 属性到图片
- 保持代码缩进一致

### 文件结构
```
src/
├── index.html          # 主页面
├── main.js             # 主要逻辑
├── styles.css          # 样式文件
├── languages.js        # 多语言支持
└── assets/             # 静态资源
```

## 🧪 测试指南

### 运行测试
```bash
# 运行所有测试
npm run test

# 运行特定测试文件
npx playwright test tests/specific-test.spec.ts
```

### 添加新测试
1. 在 `tests/` 目录下创建新的测试文件
2. 遵循现有的测试模式
3. 确保测试覆盖主要功能

## 🌍 国际化贡献

如果您想帮助翻译应用：

1. 编辑 `src/languages.js` 文件
2. 添加新的语言支持
3. 确保所有文本都有对应的翻译

## 🎨 设计贡献

如果您有设计方面的建议：
- 可以提交 UI/UX 改进建议
- 提供设计稿或原型
- 分享您的使用体验和改进想法

## 📚 文档贡献

文档永远可以改进！欢迎：
- 修复拼写错误或语法错误
- 添加更多使用示例
- 改进文档结构和清晰度
- 翻译文档到其他语言

## 🐛 Bug 修复流程

1. **复现问题** - 确保您能理解并复现问题
2. **创建分支** - `git checkout -b fix/bug-description`
3. **修复问题** - 编写修复代码
4. **添加测试** - 如果可能，添加测试用例
5. **提交修复** - 使用清晰的 commit message
6. **创建 PR** - 描述修复的问题和解决方案

## 💡 功能建议

如果您有新功能的想法：

1. 先查看是否已有类似的 issue
2. 创建新的 issue，使用 "Feature Request" 模板
3. 详细描述您的想法和使用场景
4. 等待社区讨论和反馈

## 🔒 安全贡献

如果您发现安全问题：
- 请不要公开披露
- 通过私信或安全渠道联系维护者
- 给我们时间修复问题再公开

## 📞 联系方式

- **Issues**: [GitHub Issues](https://github.com/your-username/simplelist/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/simplelist/discussions)

## 🙏 致谢

感谢所有为 SimpleList 项目做出贡献的开发者和用户！

---

**Happy Contributing! 🎉**