# 章节交接卡

> 跨会话续写时的上下文交接文件。每次创作会话结束时更新，下次会话开始时首先读取。

```toml
schema_version = 1

[last_session]
date = ""
chapter_completed = 0
chapter_in_progress = 0

[continuation_point]
last_paragraph = ""
scene_state = ""
social_context = ""  # 当前社交/商业情境
pending_calls = ""   # 等待回复的电话/消息

[pending_tasks]
tasks = []

[context_notes]
notes = []

[files_modified]
files = []
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| social_context | string | 当前所处的社交或商业情境 |
| pending_calls | string | 悬而未决的通讯（电话、消息、邮件） |
