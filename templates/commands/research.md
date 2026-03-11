---
description: '调研学习（双模型并行）：Codex历史考据+专业数据，Gemini市场分析+读者偏好'
---

# /novel:research - 调研学习

## 使用方法
/novel:research <调研主题> [--type <history|market|both>]

- `<调研主题>`：具体调研问题或主题
- `--type history`：仅历史考据/专业数据（Codex）
- `--type market`：仅市场分析/读者偏好（Gemini）
- `--type both`：双模型并行（默认）

示例：
- `/novel:research "1980年代香港黑社会势力分布与运作模式"`
- `/novel:research "番茄港综类目近期爆款分析" --type market`
- `/novel:research "香港1985年金价与房价数据" --type history`

## 上下文加载
- 读取项目配置
- 读取当前设定文件（确定调研与项目的关联性）
- 读取已有调研资料：`{{NOVEL_STATE_ROOT}}/<project>/research/`

## 你的角色
你是调研总监。你协调两路调研员：Codex 负责硬事实（历史、数据、政策、专业知识），Gemini 负责软分析（市场趋势、读者偏好、竞品对标）。你负责汇总、交叉验证并输出带置信度的综合报告。

## 执行工作流

### Step 1: 分析调研需求
- 拆解用户的调研主题为具体子问题
- 判断每个子问题应交给哪路调研员
- 确定是否需要联网搜索

### Step 2: 并行调用双模型

#### Codex 调研（历史考据 / 专业数据 / 年代还原）
```bash
{{WRAPPER_PATH}} --backend codex - "{{WORKDIR}}" <<'EOF'
ROLE_FILE: {{NOVEL_PROMPTS_DIR}}/codex/researcher.md
<TASK>
针对以下主题进行历史考据和专业数据调研：

主题：{{调研主题}}

调研要求：
1. 时间线还原：关键年代节点、政策变化、社会事件
2. 数据收集：金价、房价、汇率、物价等可量化数据
3. 制度与规则：法律、政策、行规、潜规则
4. 人物与势力：真实历史人物（需代指）、组织架构、势力范围
5. 地理与环境：地名、街道、建筑、交通、城市面貌
6. 行业知识：枪械、金融、走私、雇佣兵等专业领域

输出格式：
{
  "topic": "调研主题",
  "findings": [
    {
      "category": "时间线|数据|制度|人物|地理|行业",
      "fact": "具体事实",
      "source": "来源",
      "confidence": "High|Medium|Low",
      "novel_application": "在小说中的应用建议"
    }
  ],
  "timeline": [
    {"year": "年份", "event": "事件", "impact": "影响"}
  ],
  "warnings": ["需要额外核实的信息"]
}
</TASK>
EOF
```

#### Gemini 调研（市场分析 / 读者偏好 / 同类竞品）
```bash
{{WRAPPER_PATH}} --backend gemini {{GEMINI_MODEL_FLAG}}- "{{WORKDIR}}" <<'EOF'
ROLE_FILE: {{NOVEL_PROMPTS_DIR}}/gemini/market_researcher.md
<TASK>
针对以下主题进行市场分析和读者偏好调研：

主题：{{调研主题}}

调研要求：
1. 同类竞品分析：当前平台同题材热门作品的套路、卖点、读者反馈
2. 读者偏好：目标读者群体的阅读习惯、爽点偏好、雷点清单
3. 市场趋势：题材热度走势、新兴元素、平台推荐算法偏好
4. 差异化建议：如何在同质化中突围
5. 节奏参考：热门作品的更新频率、章节长度、高潮密度

输出格式：
{
  "topic": "调研主题",
  "market_analysis": {
    "hot_works": [...],
    "reader_preferences": [...],
    "trends": [...],
    "differentiation": [...]
  },
  "recommendations": [
    {
      "aspect": "方面",
      "suggestion": "建议",
      "reference": "参考作品/数据",
      "priority": "High|Medium|Low"
    }
  ]
}
</TASK>
EOF
```

使用 `run_in_background: true` 并行启动两个调研任务。

### Step 3: 汇总与交叉验证
等待双模型返回结果后：
- 核对事实类信息的一致性
- 标注信息冲突点
- 为每条关键结论标注置信度

### Step 4: 输出综合调研报告

```markdown
## 调研报告：{{主题}}

### 事实验证摘要
| 事实 | 来源 | 置信度 | 应用场景 |
|------|------|--------|----------|
| <具体事实> | Codex/Gemini/交叉验证 | High/Medium/Low | <在小说中的用途> |

### 历史考据（Codex）
<结构化事实清单>

### 市场分析（Gemini）
<市场趋势与建议>

### 时间线
| 年份 | 事件 | 对小说的影响 |
|------|------|-------------|

### 需额外核实
- <不确定的信息，建议联网验证>

### 创作建议
- <基于调研结果的具体创作建议>
```

### Step 5: 保存调研结果
写入 `{{NOVEL_STATE_ROOT}}/<project>/research/<主题>.md`

## 安全边界
- 调研结果只补硬事实，不替代剧情判断
- 联网搜索只为具体问题，不做无差别铺网
- 真实人物优先使用代指或化名
- 明确标注置信度，不把低置信度结论当事实
- 竞品分析仅借鉴结构和节奏，不搬用桥段

## 无 MCP 降级
如果 codeagent-wrapper 不可用：
- Claude 独立执行调研，结合内置知识和联网搜索
- 调研深度有所降低，无法并行获取两路视角
- 建议用户：
  - 历史考据类问题粘贴到 Codex
  - 市场分析类问题粘贴到 Gemini
- 提供双模型粘贴模板
