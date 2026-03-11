# 当前状态卡

> 唯一的"当前时间点状态覆盖文件"。都市题材侧重社会关系、资源网络、信息差。

```toml
schema_version = 1

[current_chapter]
chapter_number = 0
chapter_title = ""
volume = ""

[anchor]
time = ""            # 故事内时间，如 "2024年6月15日 周一上午"
location = ""        # 当前城市/区域
sub_location = ""    # 具体地点（写字楼/餐厅/法院）
opponent = ""        # 当前主要对手
goal = ""            # 主角即时目标

[protagonist]
name = ""
status = ""          # 正常/受伤/被拘/失业/...
occupation = ""      # 当前职业/职位
company = ""         # 所属公司/机构
public_image = ""    # 公众形象
hidden_agenda = ""   # 暗中进行的计划
financial_status = "" # 财务状况概述
key_relationships = "" # 核心人脉
threats = ""         # 当前威胁

[active_hooks]
hooks = []

[chapter_task]
type = ""            # 布局章/事件章/过渡章/回收章
main_conflict = ""
constraints = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| occupation | string | 当前职业和职位 |
| company | string | 所属公司或机构 |
| public_image | string | 外界对主角的印象 |
| hidden_agenda | string | 暗中推进的计划 |
| financial_status | string | 财务状况 |
| key_relationships | string | 核心人脉网络 |
