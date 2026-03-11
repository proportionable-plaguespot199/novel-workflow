# Changelog

## [0.1.0] - 2026-03-12

### Added

- 12 个 slash commands：init, style, setting, outline, write, review, check, polish, research, state, handoff, workflow
- 多模型角色 prompts：Claude writer/orchestrator, Codex reviewer/researcher, Gemini polisher/reader-reviewer
- 4 套题材模板：hongkong-crime, fantasy, urban, scifi（含 style_bible, expert_roles, forbidden_patterns, 状态文件骨架）
- 三温区上下文模型（Hot/Warm/Cold）贯穿 write 命令和 writer 角色
- 状态管理系统：双格式持久化（Markdown TOML block + JSON），原子写入 + 锁机制
- CLI 工具：init（交互式初始化）、update（重渲染模板）、doctor（环境自检）
- 模板渲染引擎：`{{KEY}}` 占位符在安装时注入绝对路径
- codeagent-wrapper 跨平台二进制分发（Win/macOS/Linux）

### Fixed

- `getPackageRoot()` 在 unbuild 打包后路径深度错误（`..` x2 → x1）
- 中文路径 URL 编码未解码（`import.meta.url` → `fileURLToPath`）
- 状态模板 fallback 降级无警告（添加 `console.warn`）
- 骨架文件名 `character_relationships.md` 与题材模板 `characters.md` 不一致
- `write.md` 与 `writer.md` 上下文分级冲突（统一 Hot/Warm/Cold 定义）
- `write.md` 大量重复 `writer.md` 规则（DRY 重构，command 引用 role prompt）
- `writer.md` Layer 4.4 "执行写作" 空节（填充完整写作规则）
- 写作自检 / 章节结算表格字段不一致（合并为统一权威版本）
