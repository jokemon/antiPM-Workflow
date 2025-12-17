# Antigravity PM Workflows 🚀

![Antigravity Compatible](https://img.shields.io/badge/Antigravity-Compatible-4285F4?style=flat-square&logo=google)
![Role](https://img.shields.io/badge/Role-Product_Manager-orange?style=flat-square)

## 📖 简介 (Introduction)

这是一个专为 **产品经理 (Product Managers)** 和 **业务分析师** 设计的 Google Antigravity 工作流合集。

在 AI 辅助编程的时代，需求文档（PRD）的质量直接决定了代码生成的质量。本仓库致力于通过标准化的 Workflow，帮助 PM 利用 AI 自动验证需求逻辑、检查行业规范、并确保文档符合 OpenSpec 标准。

## 📦 工作流列表 (Workflows)

### 1. `/validate-prd` - 智能需求验证官

**文件路径**: `.agent/workflows/validate-prd.md`

这是一个深度验证 PRD 的工作流，它会扮演“资深产品专家”和“AI 架构师”双重角色。

**核心能力**:

- ✅ **AI 可读性分析**: 确保文档结构能被 AI 精准理解。
- 🛡️ **行业规范审查**: 检查是否符合隐私、安全及通用 UX 标准。
- 🔄 **逻辑闭环验证**: 自动发现流程中的断点和死胡同。
- 🧪 **边缘情况模拟**: 针对异常流程（如断网、超限）进行压力测试。
- 🎨 **UI/逻辑一致性**: 确保界面描述与后端逻辑不冲突。

## 🛠 如何使用 (Usage)

1. **安装**: 将本仓库中的 `.agent/workflows/` 文件夹下的文件复制到你项目的对应目录中。
2. **触发**: 打开你的需求文档 (`.md` 格式)，在 Antigravity 聊天框输入 `/validate-prd`。
3. **查看报告**: AI 将生成一份 `PRD_Validation_Report.md`，包含具体的修改建议。

## 🤝 贡献 (Contribution)

欢迎提交 Issue 或 Pull Request 分享你的 PM 工作流！让我们一起定义 AI 时代的产品工作范式。

---

_Powered by Google Antigravity & Gemini 3_
