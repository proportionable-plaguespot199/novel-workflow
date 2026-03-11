# novel-workflow

多 AI 协作的网文创作工具链，为 [Claude Code](https://github.com/anthropics/claude-code) 用户提供从语料提炼到正文交付的全流程 slash commands。

## 特性

- **12 个 Slash Commands** — 覆盖语料提炼、设定管理、大纲规划、正文创作、质量审查、状态同步、跨会话接力等全流程
- **多模型协作** — Claude 主写 + Codex 审逻辑 + Gemini 润文风，通过 `codeagent-wrapper` 编排
- **三温区上下文** — Hot/Warm/Cold 分级加载，避免机械堆量，保障因果闭环
- **状态管理系统** — 双格式持久化（Markdown + JSON），跨会话不丢设定
- **4 套题材模板** — 港综犯罪、玄幻仙侠、都市现实、科幻未来，开箱即用
- **无 MCP 可降级** — 核心工作流无外部依赖，纯文件系统模式可用

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/sum2yang/noval-workflow.git
cd noval-workflow

# 安装依赖 & 构建
pnpm install && pnpm build
# 或
npm install && npm run build

# 初始化项目（交互式选择题材和平台）
node bin/novel-workflow.mjs init
```

初始化完成后，在 Claude Code 中即可使用 `/novel:*` 系列命令。

## 命令一览

| 命令 | 说明 | 多模型 |
|------|------|:------:|
| `/novel:init` | 初始化项目：目录结构、题材模板、状态文件 | Claude |
| `/novel:style` | 语料提炼 + 风格圣经生成 | Claude + Gemini |
| `/novel:setting` | 角色卡、世界观、金手指、时间线管理 | Claude |
| `/novel:outline` | 卷纲规划：分卷结构 + 章节节拍表 | Claude + Codex |
| `/novel:write` | 正文创作：续写/改写/扩写，含写作自检 + 章节结算 | Claude |
| `/novel:review` | 质量审查：Codex 审逻辑 + Gemini 审读者体验 | Codex + Gemini |
| `/novel:check` | 一致性检查：角色卡 vs 正文、时间线 vs 事件 | Codex |
| `/novel:polish` | 文风润色：去 AI 味、对话优化、五感补充 | Gemini |
| `/novel:research` | 调研学习：历史考据 + 市场分析 | Codex + Gemini |
| `/novel:state` | 状态同步：全量/差异模式，一致性校验 | Claude |
| `/novel:handoff` | 跨会话接力：保存/加载创作进度 | Claude |
| `/novel:workflow` | 全流程编排：research → write → review → state | 全部 |

## 推荐工作流

```
/novel:style     → 提炼风格圣经
/novel:setting   → 创建角色卡与世界观
/novel:outline   → 规划卷纲
/novel:write 1   → 开始第一章
/novel:review    → 质量审查
/novel:state     → 同步状态
/novel:handoff   → 保存进度，下次接力
```

## 项目结构

```
novel-workflow/
├── bin/                        # CLI 入口
├── src/
│   ├── cli.ts                  # cac 命令注册
│   ├── paths.ts                # 安装路径解析
│   ├── config/                 # TOML 配置加载/合并
│   ├── state/                  # 状态管理（schema + io + lock）
│   ├── installer/              # 模板渲染 + 资产安装
│   └── commands/               # init / update / doctor
├── templates/
│   ├── commands/               # 12 个 slash command 模板
│   ├── prompts/                # 多模型角色 prompts
│   │   ├── claude/writer.md    # 主写手角色定义
│   │   ├── codex/              # Codex 审查/调研角色
│   │   └── gemini/             # Gemini 润色/读者视角角色
│   └── state/genres/           # 4 套题材模板
│       ├── hongkong-crime/
│       ├── fantasy/
│       ├── urban/
│       └── scifi/
├── build.config.ts
├── package.json
└── tsconfig.json
```

## 安装产物

`novel-workflow init` 将模板安装到以下位置：

| 产物 | 路径 |
|------|------|
| Slash Commands | `~/.claude/commands/novel/*.md` |
| 角色 Prompts | `~/.claude/.novel/prompts/` |
| 状态文件 | `~/.claude/.novel/state/` |
| 全局配置 | `~/.claude/.novel/config.toml` |
| Wrapper 二进制 | `~/.claude/bin/codeagent-wrapper[.exe]` |

## 开发

```bash
pnpm install
pnpm build          # 构建 dist/cli.mjs
pnpm dev            # stub 模式开发（unbuild --stub）
```

## 致谢

- **原创文本与创作思路** — [宁河图](https://linux.do/u/user2609/summary)，本项目的全部创作方法论、Prompt 设计和题材模板均源自其实战经验分享
- **多模型协作架构** — [CCG Workflow](https://github.com/anthropics/claude-code)，本项目复用了 `codeagent-wrapper` 多模型编排工具和 CCG 的 Prompt 工程范式（四层继承模型、双模型交叉审查、多模型并行调度）

## 许可证

MIT
