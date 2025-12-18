# Antigravity PM Workflows 🚀

![Antigravity Compatible](https://img.shields.io/badge/Antigravity-Compatible-4285F4?style=flat-square&logo=google)
![Role](https://img.shields.io/badge/Role-Product_Manager-orange?style=flat-square)

## 📖 简介 (Introduction)

这是一个专为 **产品经理 (Product Managers)** 和 **业务分析师** 设计的 Google Antigravity 工作流合集。AntiGravity 中的 Workflow 基本等同于 Claude 中的 Skills，它们是相互兼容的。

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

1. **安装**:
   工作区使用：将本仓库中的 `.agent/workflows/` 文件夹下的文件复制到你项目的对应目录中。
   全局使用：将本仓库中的 `.agent/workflows/` 中的 md 文件复制到 `C:\Users\ [你的用户名]\ .gemini\antigravity\global_workflows`
   也可以在 Antigravity 的 IDE 中进行如下操作：
      - 点击右上的"..."
      - 再点击"Customizations"
      - 点击框体中的"Workflow"标签页
      - 点击"+Global"或"+Workspace"
      - 在弹框中输入"validate-prd"，按回车键
      - 将"validate-prd.md"文件中的内容复制到对应的内容栏中，保存即可使用。
   *Claude Skill 同理，工作区的目录名需要调整名称为`.claude/skills/`不赘述*
2. **触发**:
   打开你的需求文档 (`.md` 格式)，在 Antigravity Agent 窗口输入 `/validate-prd`。
   也可以直接在 Antigravity Agent 窗口输入 `/`，使用键盘选到`validate-prd`后，点击`Tab`。在输入`@` -> Files ->选择你的 PRD 文件后，按回车键即可。
3. **查看报告**:
   AI 将在 PRD 文件同目录生成一份 `PRD_Validation_Report.md`，包含具体的修改建议。
   可在`showcase/validate-prd/`目录下查看Workflow案例使用效果

## 🤝 贡献 (Contribution)

欢迎提交 Issue 或 Pull Request 分享你的 PM 工作流！让我们一起定义 AI 时代的产品工作范式。

---

_Powered by Google Antigravity & Gemini 3_
