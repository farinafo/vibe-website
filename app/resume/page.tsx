import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HomeCanvasBackground } from "@/components/home/HomeCanvasBackground";

export const metadata: Metadata = {
  title: "履历",
  description: "教育背景、代表经历、研究分析与能力概览。",
};

const topTags = ["AI 产品", "数据分析", "增长运营", "商业策略", "跨文化协作"];

const educationItems = [
  {
    school: "Politecnico di Milano 米兰理工大学",
    meta: "2022.09 – 2025.07｜建筑环境管理经济方向｜硕士",
  },
  {
    school: "KTH Royal Institute of Technology 瑞典皇家理工学院",
    meta: "2025.01 – 2025.06｜交换学习",
  },
  {
    school: "Huaiyin Institute of Technology 淮阴工学院",
    meta: "2014.09 – 2019.06｜国际经济与贸易 → 建筑学｜本科",
  },
  {
    school: "Chung Hua University 台湾中华大学",
    meta: "2016.09 – 2017.01｜交换学习",
  },
];

const experienceItems = [
  {
    title: "网易互娱海外事业部",
    role: "产品与市场实习生",
    time: "2024.02 – 2024.04",
    description:
      "围绕海外游戏工具产品进行竞品分析、用户反馈整理与市场研究。分析 GearUp、ExitLag 等竞品差评与用户痛点，处理 Trustpilot 文本与区域网络指标，并研究 Open Fiber、EOLO 等海外运营商业务模式，为产品优化、本地化策略和市场决策提供支持。",
  },
  {
    title: "教育咨询业务 0 到 1",
    role: "创始人",
    time: "2021.01 – 2023.06",
    description:
      "从 0 搭建教育咨询服务，完成课程产品、社群运营、内容获客和交付体系建设。通过知乎等渠道获得 4 篇阅读量过万文章，累计完成 150+ 付费咨询，好评率 100%；运营 1500+ 人社群，为 1000+ 用户提供教学服务，并管理 20+ 人团队推进产品迭代。",
  },
  {
    title: "米兰理工创业俱乐部",
    role: "数字内容运营与品牌增长",
    time: "2022.12 – 至今",
    description:
      "独立运营小红书、知乎、Bilibili、抖音等平台账号，完成内容定位、选题、脚本、拍摄剪辑、发布与数据复盘。单条内容最高获得 40 万+ 浏览和约 1.5 万赞藏互动，累计吸引多个科技、美妆、电商与平台类品牌合作邀约。",
  },
  {
    title: "EESTEC 欧洲电气电子工程学生组织",
    role: "项目经理",
    time: "2023.03 – 2025.07",
    description:
      "参与和执行学校开放日、短期研学营、全球学术研讨会、文化活动与国际交流项目，负责活动策划、外联沟通、团队协作、志愿者组织、预算控制与参与者反馈收集，提升跨文化协作和项目推进能力。",
  },
  {
    title: "上海华都建筑规划设计有限公司",
    role: "建筑师项目助理",
    time: "2020.06 – 2022.03",
    description:
      "参与建筑设计与规划项目，负责模型与图纸制作、建筑摄影、跨团队沟通与外部合作方协调，将概念方案推进为可汇报、可交付的设计成果。",
  },
];

const researchItems = [
  {
    title: "机器学习与市场趋势预测",
    description:
      "基于 Python、pandas、numpy 搭建数据处理流程，完成数据清洗、特征工程与滞后变量构建。使用 XGBoost 预测房价增长趋势，并通过 RMSE、MAE 验证模型表现，结合 SHAP 解释宏观经济、金融与政策变量对预测结果的影响。",
  },
  {
    title: "房地产投资与资产价值分析",
    description:
      "使用市场比较法、DCF、WACC、租金收益模型和风险评估框架，分析历史建筑和房地产资产的估值、现金流、投资回报与运营策略。",
  },
  {
    title: "区域与财务分析",
    description:
      "基于 Eurostat 数据使用 LQ、HHI、Shift-share 和回归分析研究区域经济结构；同时通过 ROA、ROE、利润率、资产周转率和资本结构等指标进行跨国企业财务对比分析。",
  },
  {
    title: "供应链与运营优化",
    description:
      "结合全球供应链、生产管理和企业运营案例，使用 ABC 分析、风险矩阵、库存和补货机制分析企业资源配置、交付效率和运营风险。",
  },
];

const capabilityGroups = [
  {
    title: "产品与用户",
    items: "AI 产品思考、用户研究、竞品分析、需求拆解、MVP 迭代、用户体验优化",
  },
  {
    title: "数据与分析",
    items: "Python、SQL、Excel、XGBoost、SHAP、回归分析、特征工程、数据可视化",
  },
  {
    title: "商业与策略",
    items: "市场研究、财务分析、DCF、WACC、商业模式设计、投资可行性分析",
  },
  {
    title: "增长与运营",
    items: "内容运营、社群运营、品牌合作、数据复盘、用户增长、商业化转化",
  },
  {
    title: "项目推进",
    items: "跨团队沟通、外部合作、活动执行、预算控制、多任务管理、国际协作",
  },
];

function SectionCard({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="rounded-2xl border border-line/40 bg-paper p-6 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:p-8"
    >
      <h2 className="font-mono text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-muted">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </Reveal>
  );
}

export default function ResumePage() {
  return (
    <div className="relative isolate min-h-screen">
      <HomeCanvasBackground mouseX={0.5} mouseY={0.5} />

      <Container size="wide" className="relative z-10 py-16 md:py-24">
        <Reveal>
          <div className="grid gap-8 rounded-2xl border border-line/40 bg-paper px-6 py-7 shadow-[0_24px_80px_-40px_rgb(0_0_0/0.22)] md:grid-cols-12 md:px-8 md:py-9">
            <div className="md:col-span-4">
              <h1 className="font-serif text-display-xs font-medium text-ink">
                经验与方向
              </h1>
            </div>
            <div className="md:col-span-8">
              <p className="max-w-measure-wide text-pretty text-sm leading-[1.95] text-muted md:text-base">
                这里集中梳理我在 AI 产品、数据分析、商业研究、增长运营与跨文化项目推进中的经历与能力。
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-line/60 px-3 py-2 font-mono text-[0.68rem] tracking-[0.16em] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-8 lg:col-span-7">
            <SectionCard title="个人概况">
              <div className="space-y-4 text-sm leading-[1.95] text-muted md:text-base">
                <p>
                  我拥有建筑环境管理经济方向硕士背景，并在瑞典皇家理工学院交换学习，经历横跨建筑环境、经济管理、数据分析与产品实践。相比单一职能，我更适合处理需要产品思维、市场理解、数据判断和跨团队推进共同参与的问题。
                </p>
                <p>
                  我关注 AI 产品、学习效率工具、内容增长和数据驱动决策，也希望把房地产、城市资产和商业分析背景转化为更具体的产品与策略能力。
                </p>
              </div>
            </SectionCard>

            <SectionCard title="代表经历" delay={0.04}>
              <div className="relative space-y-8 border-l border-line/50 pl-6 text-sm text-muted md:pl-8 md:text-base">
                {experienceItems.map((item) => (
                  <div key={`${item.title}-${item.time}`} className="relative">
                    <span
                      className="absolute -left-[1.92rem] top-1.5 h-2.5 w-2.5 rounded-full border border-ink/50 bg-paper md:-left-[2.42rem]"
                      aria-hidden
                    />
                    <p className="font-mono text-[0.88rem] tracking-[0.08em] text-muted">
                      {item.time}
                    </p>
                    <div className="mt-2">
                      <p className="font-medium text-ink">{item.title}</p>
                      <p className="mt-1 font-serif text-base text-ink/85">{item.role}</p>
                      <p className="mt-3 leading-[1.9] text-muted">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="研究与分析" delay={0.08}>
              <div className="space-y-6 text-sm leading-relaxed text-muted md:text-base">
                {researchItems.map((item) => (
                  <div key={item.title}>
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="space-y-8 lg:col-span-5">
            <SectionCard title="教育背景" delay={0.12}>
              <ul className="space-y-5 text-sm text-muted md:text-base">
                {educationItems.map((item) => (
                  <li key={item.school} className="border-l border-line/40 pl-5 sm:pl-6">
                    <p className="font-medium leading-relaxed text-ink">{item.school}</p>
                    <p className="mt-1 font-mono text-[0.84rem] leading-relaxed tracking-[0.04em] text-muted">
                      {item.meta}
                    </p>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="能力概览" delay={0.16}>
              <div className="space-y-5 text-sm leading-relaxed text-muted md:text-base">
                {capabilityGroups.map((group) => (
                  <div key={group.title}>
                    <p className="font-medium text-ink">{group.title}</p>
                    <p className="mt-1">{group.items}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="联系" delay={0.2}>
              <p className="max-w-measure-wide text-pretty text-sm leading-[1.95] text-muted md:text-base">
                我目前关注 AI 产品、数据驱动决策、商业分析与增长策略相关机会，尤其是那些需要产品理解、市场判断和分析能力结合起来的岗位或项目。
              </p>
              <a
                href="mailto:chenfan1949@163.com"
                className="mt-8 inline-block font-serif text-xl tracking-tight text-ink underline decoration-ink/20 decoration-1 underline-offset-[10px] transition-opacity hover:opacity-70 md:text-2xl"
              >
                chenfan1949@163.com
              </a>
            </SectionCard>
          </div>
        </div>
      </Container>
    </div>
  );
}
