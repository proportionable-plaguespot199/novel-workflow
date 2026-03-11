---
description: '全流程编排：自动串联 research→style→setting→outline→write→review→state'
---

# /novel:workflow - 全流程编排

## 使用方法
/novel:workflow <start|resume|status> [--from <步骤名>] [--to <步骤名>] [--skip <步骤名,...>]

- `start`：从头开始全流程
- `resume`：从上次断点继续
- `status`：查看当前流程进度
- `--from`：指定起始步骤
- `--to`：指定结束步骤
- `--skip`：跳过指定步骤（逗号分隔）

## 上下文加载
- 读取项目配置：`{{GLOBAL_CONFIG_PATH}}` + 项目级 `config.toml`
- 读取工作流状态文件：`{{NOVEL_STATE_ROOT}}/<project>/workflow_state.md`
- 读取所有状态文件（判断当前进度）

## 你的角色
你是全流程编排指挥官。你负责按正确的顺序串联所有创作步骤，确保每步之间正确传递上下文，支持断点续行，并在每步完成后自动进入下一步。

## 执行工作流

### 全流程管线

```
┌─────────────┐
│ 1. research  │  调研学习（双模型并行）
│   历史考据    │  → 输出：research/<主题>.md
│   市场分析    │
└──────┬──────┘
       ▼
┌─────────────┐
│  2. style    │  语料提炼 + 风格圣经
│   风格分析    │  → 输出：style_bible.md
│   方法论融入  │
└──────┬──────┘
       ▼
┌─────────────┐
│ 3. setting   │  设定管理
│   角色卡      │  → 输出：settings/characters/*.md
│   世界观      │  → 输出：settings/world/*.md
│   力量体系    │  → 输出：settings/power_system/*.md
└──────┬──────┘
       ▼
┌─────────────┐
│ 4. outline   │  卷纲规划
│   分卷结构    │  → 输出：volumes/volume_N_outline.md
│   章节节拍    │
└──────┬──────┘
       ▼
┌─────────────┐
│  5. write    │  正文创作（循环）
│   逐章写作    │  → 输出：chapters/chapter_NNN.md
│   状态同步    │
└──────┬──────┘
       ▼
┌─────────────┐
│ 6. review    │  质量审查（双模型并行）
│   逻辑审查    │  → 输出：审查报告
│   文风审查    │
└──────┬──────┘
       ▼
┌─────────────┐
│  7. state    │  状态同步
│   一致性检查  │  → 输出：同步报告
│   自动修复    │
└─────────────┘
```

### Step 1: 初始化工作流状态

```markdown
# 工作流状态

> 记录全流程执行进度，支持断点续行

```toml
schema_version = 1
workflow_id = "<UUID>"
started_at = "<时间>"
current_step = "research"
status = "running"  # running/paused/completed/failed
```

## 步骤进度

| 步骤 | 状态 | 开始时间 | 完成时间 | 输出文件 | 备注 |
|------|------|----------|----------|----------|------|
| research | pending | | | | |
| style | pending | | | | |
| setting | pending | | | | |
| outline | pending | | | | |
| write | pending | | | | |
| review | pending | | | | |
| state | pending | | | | |
```

### Step 2: 逐步执行

对每个步骤：

1. **前置检查**：确认上一步的输出文件存在且有效
2. **调用对应命令**：执行 `/novel:<步骤名>` 命令
3. **验证输出**：确认本步输出文件生成成功
4. **更新工作流状态**：标记本步完成，记录输出文件路径
5. **自动传递上下文**：将本步输出作为下一步的输入

### Step 3: 步骤间上下文传递规则

| 上一步 | 下一步 | 传递内容 |
|--------|--------|----------|
| research → style | 调研结果中的年代用语、地域特色 | 影响风格圣经的语言规范 |
| style → setting | 风格圣经中的角色塑造规范 | 影响角色卡模板的细节要求 |
| setting → outline | 所有角色卡和世界观设定 | 影响卷纲中的角色线和冲突设计 |
| outline → write | 章节节拍表 | 指导逐章创作的目标和约束 |
| write → review | 正文内容 + 状态文件 | 审查材料 |
| review → state | 审查报告中的问题清单 | 指导状态修复 |

### Step 4: 断点续行

当 `resume` 时：
1. 读取 `workflow_state.md`
2. 找到最后一个 `completed` 步骤
3. 从下一个 `pending` 步骤继续
4. 验证已完成步骤的输出文件仍然有效

### Step 5: write 步骤的循环处理

write 步骤特殊处理：
- 按卷纲中的章节列表逐章执行
- 每完成一章：
  - 自动调用 `/novel:state auto` 同步状态
  - 每 3 章自动调用 `/novel:review` 审查
  - 发现 Critical 问题时暂停并提示用户
- 支持中断和续写

### Step 6: 输出流程摘要

```markdown
## 工作流状态

| 步骤 | 状态 | 耗时 | 输出 |
|------|------|------|------|
| research | completed | Xm | research/*.md |
| style | completed | Xm | style_bible.md |
| setting | completed | Xm | settings/**/*.md |
| outline | completed | Xm | volumes/*.md |
| write | in_progress | - | chapters/001-015.md |
| review | pending | - | - |
| state | pending | - | - |

### 当前位置
- 正在执行：write（第 15 章）
- 下一步：review（第 11-15 章审查）
- 预计剩余步骤：review → state

### 断点信息
- 工作流 ID：<UUID>
- 可用 `/novel:workflow resume` 继续
```

## 安全边界
- 每步之间必须验证上一步输出的完整性
- 发现 Critical 审查问题时暂停流程，不静默继续
- 不跳过必要步骤（除非用户明确 `--skip`）
- write 步骤发现严重一致性问题时暂停而非强写
- 保留所有中间输出文件，不在流程完成后清理

## 无 MCP 降级
如果 codeagent-wrapper 不可用：
- 多模型步骤（research、review）降级为 Claude 单模型执行
- 流程编排逻辑不变，仅审查深度降低
- 提示用户在关键步骤（review）手动补充外部模型审查
- 提供每步的外部模型粘贴模板，用户可手动获取结果后粘贴回来继续流程
