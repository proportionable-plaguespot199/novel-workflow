# 章节交接卡

> 跨会话续写时的上下文交接文件。每次创作会话结束时更新，下次会话开始时首先读取。

```toml
schema_version = 1

[last_session]
date = ""                # 上次会话日期
chapter_completed = 0    # 完成到第几章
chapter_in_progress = 0  # 正在写第几章（未完成）

[continuation_point]
last_paragraph = ""      # 最后一段的内容摘要
scene_state = ""         # 场景状态（谁在哪里做什么）
dialogue_state = ""      # 对话状态（谁在说话，说到哪里）
mood = ""                # 当前情绪/氛围基调

[pending_tasks]
# 未完成的写作任务
tasks = []

[context_notes]
# 下次续写需要特别注意的事项
notes = []

[files_modified]
# 本次会话修改过的文件清单
files = []
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| date | string | 上次会话的日期 |
| chapter_completed | int | 已完成的最新章节号 |
| chapter_in_progress | int | 写到一半的章节号（0 表示无） |
| last_paragraph | string | 最后写到的内容摘要 |
| scene_state | string | 场景中各角色的位置和状态 |
| dialogue_state | string | 如果中断在对话中，记录对话进度 |
| mood | string | 当前叙事氛围 |
| tasks | array | 待完成的写作任务列表 |
| notes | array | 需要下次注意的要点 |
| files_modified | array | 本次会话修改过的文件路径 |
