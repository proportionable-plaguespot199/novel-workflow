# 角色档案

> 记录所有出场角色的当前状态。科幻题材侧重技术能力、阵营立场、物种特征。

```toml
schema_version = 1

[[characters]]
id = ""
name = ""
species = ""         # 人类/AI/外星种族/改造人
role = ""            # protagonist/antagonist/ally/neutral/minor
status = "active"    # active/dead/missing/hibernating/digital
rank = ""            # 军衔/职级
affiliation = ""     # 所属阵营/组织
specialization = ""  # 专业技能
augmentations = ""   # 增强/改造（如有）
motivation = ""
weakness = ""
known_info = ""
relationship_to_protagonist = ""
last_appearance = 0
notes = ""
```

## 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| species | string | 物种（人类/AI/外星种族/改造人等） |
| rank | string | 军事或组织中的等级 |
| specialization | string | 专业技能领域 |
| augmentations | string | 身体或认知增强 |
