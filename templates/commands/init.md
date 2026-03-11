---
description: '初始化小说项目：创建目录结构、复制题材模板、初始化状态文件'
---

# /novel:init - 项目初始化

## 使用方法
/novel:init <项目名> [--genre <hongkong-crime|fantasy|urban|scifi>] [--platform <fanqie|feilu>]

## 上下文加载
- 解析 $ARGUMENTS：提取项目名（必填）、题材（默认 hongkong-crime）、平台（默认 fanqie）
- 读取全局配置：`{{GLOBAL_CONFIG_PATH}}`
- 检查项目是否已存在：`{{NOVEL_STATE_ROOT}}/<项目名>/`

## 你的角色
你是项目脚手架工程师。你的职责是快速、准确地搭建小说项目的完整目录结构和初始状态文件，确保后续所有命令都能正常工作。

## 执行工作流

### Step 1: 参数校验
- 检查项目名是否合法（仅允许中英文、数字、连字符、下划线）
- 检查目标目录是否已存在，若存在则提示用户确认是否覆盖
- 确认题材和平台参数有效

### Step 2: 创建项目目录结构
```
{{NOVEL_STATE_ROOT}}/<项目名>/
  ├── config.toml              # 项目级配置
  ├── style_bible.md            # 风格圣经（待填充）
  ├── status_card.md            # 当前状态卡
  ├── hooks_pool.md             # 伏笔池
  ├── timeline.md               # 时间线
  ├── ledger.md                 # 资源账本
  ├── character_relationships.md # 人物关系矩阵
  ├── volumes/                  # 卷纲目录
  ├── chapters/                 # 正文目录
  ├── settings/                 # 设定文件目录
  │   ├── characters/           # 角色卡
  │   ├── world/                # 世界观
  │   ├── power_system/         # 力量体系/金手指
  │   └── factions/             # 势力设定
  └── research/                 # 调研资料目录
```

### Step 3: 初始化项目配置
写入 `config.toml`：
```toml
schema_version = 1
project_name = "<项目名>"
genre = "<题材>"
platform = "<平台>"
created_at = "<当前时间>"
current_volume = 0
current_chapter = 0
word_count_target = 3000  # 单章保底字数

[platform_rules]
# 番茄：单章 4000 字达标，全勤奖 600-800/月
# 飞卢：节奏快、爽点密集、短章多更
min_chapter_words = 4000
paragraph_lines = "3-5"  # 移动端适配行数

[style]
bible_path = "style_bible.md"
show_dont_tell = true
salt_in_soup = true  # 盐溶于汤叙事法
five_senses = true   # 五感沉浸

[fatigue_words]
# 每 500 字限 1-2 次的高疲劳词
watch_list = ["了", "但是", "的一声", "冷笑", "瞳孔骤缩", "倒吸一口凉气", "全场震惊"]
max_per_500 = 2
```

### Step 4: 初始化状态文件骨架
根据题材初始化以下文件：

**status_card.md**（当前状态卡）：
```markdown
# 当前状态卡

> 唯一的当前时间点状态覆盖文件

| 字段 | 值 |
|------|-----|
| 当前章节 | 0 |
| 当前时间 | 待填写 |
| 当前地点 | 待填写 |
| 主角状态 | 待填写 |
| 当前目标 | 待填写 |
| 当前敌我 | 待填写 |
| 当前资源 | 待填写 |
```

**hooks_pool.md**（伏笔池）：
```markdown
# 伏笔池

> 记录所有待回收伏笔，每卷开篇前必读

| hook_id | 起始章 | 类型 | 状态 | 最近推进 | 预期回收窗口 | 备注 |
|---------|--------|------|------|----------|-------------|------|
```

**timeline.md**（时间线）：
```markdown
# 时间线

> 按时间顺序记录关键事件

| 序号 | 时间 | 事件 | 涉及人物 | 影响 | 章节 |
|------|------|------|----------|------|------|
```

**ledger.md**（资源账本）：
```markdown
# 资源账本

> 追踪主角资源变动，数值必须可追溯

| 章节 | 期初 | 变动来源 | 变动值 | 期末 | 依据 |
|------|------|----------|--------|------|------|
```

### Step 5: 输出初始化摘要
```markdown
## 项目初始化完成

| 项目 | 值 |
|------|-----|
| 项目名 | <项目名> |
| 题材 | <题材> |
| 平台 | <平台> |
| 项目路径 | {{NOVEL_STATE_ROOT}}/<项目名>/ |
| 单章字数 | >=3000 字（平台要求 >=4000） |
| 段落行数 | 3-5 行（移动端适配） |

### 下一步建议
1. `/novel:style` — 提炼风格圣经
2. `/novel:setting character` — 创建主角角色卡
3. `/novel:setting world` — 建立世界观
4. `/novel:outline` — 规划卷纲
```

## 安全边界
- 不覆盖已存在的项目目录（除非用户明确确认）
- 不修改全局配置文件
- 不预填虚假正文内容
- 状态文件骨架中标注"待填写"的字段，不伪造数据

## 无 MCP 降级
如果 codeagent-wrapper 不可用：
- 本命令为纯 Claude 单模型操作，无需外部模型
- 直接使用文件系统工具创建目录和文件
- 所有操作均在本地完成，无降级影响
