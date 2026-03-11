---
description: '一致性检查（仅Codex）：角色卡vs正文、时间线vs事件、数值vs账本、伏笔种vs收'
---

# /novel:check - 一致性检查

## 使用方法
/novel:check [--scope <full|recent|chapter>] [--chapter <章节号>]

- `--scope full`：全量检查（所有章节 vs 所有状态文件）
- `--scope recent`：最近 10 章检查（默认）
- `--scope chapter`：仅检查指定章节
- `--chapter`：与 `--scope chapter` 配合使用

## 上下文加载
- 读取项目配置
- 读取所有状态文件（状态卡、伏笔池、时间线、账本、角色关系）
- 读取目标范围的正文章节
- 读取角色卡和设定文件

## 你的角色
你是一致性审计师。你调用 Codex 进行结构化逻辑检查，确保小说的所有数据层面（人物、时间、数值、伏笔）严格一致。你不关心文风，只关心事实。

## 执行工作流

### Step 1: 确定检查范围
- 根据 `--scope` 参数确定需要检查的章节范围
- 收集所有相关的状态文件数据

### Step 2: 调用 Codex 执行结构化检查

```bash
{{WRAPPER_PATH}} --backend codex - "{{WORKDIR}}" <<'EOF'
ROLE_FILE: {{NOVEL_PROMPTS_DIR}}/codex/consistency_checker.md
<TASK>
对以下小说内容执行四维一致性检查，输出 JSON 格式报告。

## 检查维度

### 1. 角色卡 vs 正文描述
- 角色外貌特征是否前后一致
- 角色性格行为是否符合角色卡定义
- 角色关系是否与关系矩阵匹配
- 已退场/死亡角色是否意外出现
- 新出场角色是否已建卡

### 2. 时间线 vs 事件顺序
- 事件发生顺序是否合理
- 时间跨度是否与叙述匹配
- 是否存在时间矛盾（角色同时在两地）
- 历史/年代事件是否与设定时间线吻合

### 3. 数值变动 vs 账本
- 资源获取/消耗是否在账本中记录
- 数值增量是否合理（无跳变）
- 同类资源的增量比例是否一致
- 是否存在"暴涨""海量"等模糊数值

### 4. 伏笔种 vs 收状态
- 正文中回收的伏笔是否在伏笔池中存在
- 伏笔池中标记为"已回收"的是否在正文中确实回收
- 是否存在超期未回收的伏笔
- 新埋的伏笔是否已入池

输出格式：
{
  "check_scope": "full|recent|chapter",
  "chapters_checked": [起始, 结束],
  "dimensions": {
    "character": {
      "status": "pass|fail",
      "issues": [
        {
          "id": "C001",
          "severity": "Critical|Warning|Info",
          "character": "角色名",
          "chapter": 章节号,
          "expected": "角色卡定义",
          "actual": "正文描述",
          "suggestion": "修复建议"
        }
      ]
    },
    "timeline": {
      "status": "pass|fail",
      "issues": [...]
    },
    "numerical": {
      "status": "pass|fail",
      "issues": [...]
    },
    "hooks": {
      "status": "pass|fail",
      "issues": [...]
    }
  },
  "summary": {
    "total_issues": 数量,
    "critical": 数量,
    "warning": 数量,
    "info": 数量
  }
}
</TASK>
<CHAPTERS>
{{正文内容}}
</CHAPTERS>
<STATE_FILES>
{{状态卡 + 伏笔池 + 时间线 + 账本 + 角色关系}}
</STATE_FILES>
<CHARACTER_CARDS>
{{角色卡摘要}}
</CHARACTER_CARDS>
EOF
```

### Step 3: 解析并格式化报告
Claude 接收 Codex 的 JSON 报告后，转为可读格式：

```markdown
## 一致性检查报告

| 项目 | 值 |
|------|-----|
| 检查范围 | 第 X 章 - 第 Y 章 |
| 检查章节数 | N |
| 总问题数 | N |
| Critical | N |
| Warning | N |
| Info | N |

### 角色一致性 [通过/未通过]
| ID | 角色 | 章节 | 问题 | 修复建议 |
|----|------|------|------|----------|

### 时间线一致性 [通过/未通过]
| ID | 章节 | 问题 | 修复建议 |
|----|------|------|----------|

### 数值一致性 [通过/未通过]
| ID | 章节 | 期望值 | 实际值 | 修复建议 |
|----|------|--------|--------|----------|

### 伏笔一致性 [通过/未通过]
| ID | hook_id | 章节 | 问题 | 修复建议 |
|----|---------|------|------|----------|
```

### Step 4: 输出修复优先级
按影响范围排序，Critical 优先修复。

## 安全边界
- 检查结果仅报告，不自动修改正文或状态文件
- 不基于推测报告问题，必须引用具体证据
- 数值问题必须给出期望值和实际值

## 无 MCP 降级
如果 codeagent-wrapper 不可用：
- Claude 独立执行简化版一致性检查
- 检查深度有限（无法像 Codex 那样做大范围结构化比对）
- 建议用户将正文和状态文件粘贴到 Codex 执行检查
- 提供 Codex 粘贴模板（含检查 prompt）
