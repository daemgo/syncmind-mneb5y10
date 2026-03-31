# 对话摘要

---
### 2026-03-31
**Skills**: init-app
**变更**: 生成完整前端 Demo

- 系统类型：CRM 系统
- 模块：客户管理、跟进记录、销售漏斗、Dashboard
- 数据来源：用户对话

**项目结构**:
- 侧边导航：src/components/layout/sidebar.tsx
- 根布局：src/routes/__root.tsx
- 数据字典：src/lib/dict.ts
- Dashboard：src/routes/index.tsx
- 模块路由：src/routes/customers/、src/routes/activities/、src/routes/pipeline/
- 模块组件：src/components/customer/、src/components/activity/、src/components/pipeline/
- Mock 数据：src/mock/customer.ts、src/mock/activity.ts、src/mock/pipeline.ts
- 类型定义：src/types/customer.ts、src/types/activity.ts、src/types/pipeline.ts
