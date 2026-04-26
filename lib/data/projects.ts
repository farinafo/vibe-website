export type ProjectSlug =
  | "coursesnap"
  | "shanghai-house-price-forecasting"
  | "casa-rossi-valuation"
  | "monza-esports-hotel"
  | "hedonic-price-regression"
  | "cultural-asset-digital-commercialization"
  | "content-growth"
  | "pre-master"
  | "market-intelligence";

export interface ProjectSummary {
  slug: ProjectSlug;
  title: string;
  cardSubtitle: string;
  shortDescription: string;
  tags: string[];
}

export interface ProjectDetail extends ProjectSummary {
  subtitle: string;
  role: string;
  phase: string;
  headlineOutcome: string;
  overview: string;
  problem: string;
  whatIDid: string;
  analysisFlow?: {
    title: string;
    description: string;
  }[];
  result: string;
  keyOutputs?: string[];
  reflection: string;
  reportUrl?: string;
}

export const projectSummaries: ProjectSummary[] = [
  {
    slug: "coursesnap",
    title: "CourseSnap",
    cardSubtitle: "AI 学习资料整理工具",
    shortDescription: "把碎片化学习输入整理成可编辑、可复习、可复用的学习输出。",
    tags: ["AI产品", "学习效率", "MVP", "产品迭代"],
  },
  {
    slug: "shanghai-house-price-forecasting",
    title: "机器学习驱动的上海房价预测",
    cardSubtitle: "房价预测与可解释建模",
    shortDescription:
      "基于 2000-2024 年上海住房价格、宏观经济、金融、政策与情绪变量，构建 XGBoost 模型预测月度房价趋势，并用 SHAP 解释关键影响因素。",
    tags: ["机器学习", "房地产", "XGBoost", "SHAP", "预测建模"],
  },
  {
    slug: "casa-rossi-valuation",
    title: "Casa Rossi 房地产投资估值",
    cardSubtitle: "房地产投资估值",
    shortDescription:
      "基于市场比较法、租金收益模型、DCF 与 WACC，对 Casa Rossi 进行投资价值评估与回报测算。",
    tags: ["房地产投资", "DCF", "WACC", "估值", "风险评估"],
  },
  {
    slug: "monza-esports-hotel",
    title: "Monza 电竞酒店可行性研究",
    cardSubtitle: "酒店业态商业可行性",
    shortDescription:
      "围绕 Monza 电竞酒店概念，完成市场分析、用户需求、商业模式、收入结构与财务可行性评估。",
    tags: ["可行性研究", "商业模型", "酒店", "电竞", "投资分析"],
  },
  {
    slug: "hedonic-price-regression",
    title: "Hedonic 房价回归分析",
    cardSubtitle: "计量经济与房价分析",
    shortDescription:
      "使用 Hedonic Price Method 分析地铁等城市基础设施因素对房价的影响，建立回归模型解释房地产价格差异。",
    tags: ["计量经济", "房价分析", "回归模型", "城市交通", "数据分析"],
  },
  {
    slug: "cultural-asset-digital-commercialization",
    title: "文化资产数字化与商业化策略",
    cardSubtitle: "文化资产运营策略",
    shortDescription:
      "以昭化寺历史文化遗产为对象，设计保护、运营、商业化和数字化展示路径，实现文化价值与经济价值的平衡。",
    tags: ["文化资产", "商业化", "DCF", "数字化保护", "策略"],
  },
  {
    slug: "content-growth",
    title: "内容驱动增长",
    cardSubtitle: "内容运营与增长闭环",
    shortDescription: "用内容系统连接用户洞察、表达与转化，形成可复盘的增长闭环。",
    tags: ["增长", "内容策略", "用户洞察", "转化"],
  },
  {
    slug: "pre-master",
    title: "教育咨询业务 0 到 1",
    cardSubtitle: "从用户需求验证到课程产品、社群运营与交付体系搭建",
    shortDescription: "从用户需求验证到课程产品、社群运营与交付体系搭建。",
    tags: ["教育咨询", "社群运营", "商业化"],
  },
  {
    slug: "market-intelligence",
    title: "网易市场分析",
    cardSubtitle: "海外产品市场研究",
    shortDescription: "结构化竞品、用户与市场研究，提升海外产品团队决策效率。",
    tags: ["市场研究", "竞品分析", "商业判断", "决策支持"],
  },
];

const projectDetails: Record<ProjectSlug, ProjectDetail> = {
  coursesnap: {
    ...projectSummaries[0],
    subtitle: "AI 学习资料整理工具",
    role: "产品定义与方案重构",
    phase: "MVP 方向收敛",
    headlineOutcome: "把产品重心从“AI 能做什么”收敛到“用户为什么会持续使用”。",
    overview:
      "CourseSnap 源于一个反复出现的学习问题：学生会持续收集课件、课堂笔记、截图、录音和聊天记录，却很难把这些材料整理成真正能用来复习的内容。",
    problem:
      "早期方案容易把重点放在自动识别或 AI 新鲜感上，但用户真正卡住的不是能不能识别，而是识别完之后有没有形成可持续使用的结果。",
    whatIDid:
      "我把产品重新定义为以学习资料整理为核心的 AI 工具，优先保证高频输入可以顺利进入流程，并把输出推进到更可编辑、更接近真实复习场景的结构化格式。",
    result:
      "项目形成了更完整的 MVP 叙事，输入、处理、输出链路被重新梳理后，产品不再只回答 AI 能做什么，而是更明确地回答用户为什么愿意持续使用。",
    reflection:
      "这段经历让我更确定，在 AI 产品里，复杂能力本身很难构成长期价值。真正有说服力的是用户是否更容易理解、是否更快得到可用结果，以及是否愿意持续信任这个流程。",
  },
  "shanghai-house-price-forecasting": {
    ...projectSummaries[1],
    reportUrl: "/files/shanghai-housing-price-ml.pdf",
    subtitle: "基于 XGBoost 与 SHAP 的上海月度房价趋势预测。",
    role: "机器学习建模与解释分析",
    phase: "数据清洗、建模、解释与评估",
    headlineOutcome:
      "最终模型 RMSE 320.06，MAE 176.82，明显优于线性回归，并识别上月价格增长、M2、股市指标、消费者信心等关键变量。",
    overview:
      "上海房地产市场波动明显，影响因素横跨宏观经济、金融环境、政策变化和市场情绪。传统线性模型很难捕捉这些变量之间的复杂关系。",
    problem:
      "这个项目关注两个问题：如何用机器学习预测短期房价趋势，以及如何解释影响价格变化的关键变量，而不是只得到一个黑箱预测结果。",
    whatIDid:
      "我完成数据清洗、特征工程、XGBoost 建模、线性回归对比和 SHAP 解释分析，将 2000-2024 年上海住房价格、宏观经济、金融、政策与情绪变量整合进同一套预测框架。",
    analysisFlow: [
      {
        title: "数据整理",
        description:
          "整合 2000–2024 年上海房价、宏观经济、金融、政策与情绪变量，并构建滞后特征。",
      },
      {
        title: "模型训练",
        description: "使用 XGBoost 建立预测模型，并以线性回归作为基准模型进行对比。",
      },
      {
        title: "模型评估",
        description: "通过 RMSE、MAE 验证预测效果，判断模型是否具备稳定解释价值。",
      },
      {
        title: "结果解释",
        description: "使用 SHAP 分析关键变量贡献，将模型输出转化为可理解的市场判断。",
      },
    ],
    result:
      "最终 XGBoost 模型 RMSE 为 320.06，MAE 为 176.82，明显优于线性回归。SHAP 结果显示，上月价格增长、M2、股市指标、消费者信心等变量对预测具有重要影响。",
    keyOutputs: [
      "上海房价月度趋势预测模型",
      "XGBoost 与线性回归模型对比",
      "RMSE / MAE 模型评估结果",
      "SHAP 变量重要性解释",
      "房地产市场影响因素分析",
      "可视化分析报告",
    ],
    reflection:
      "这个项目连接了房地产、宏观经济、机器学习和可解释 AI，是我从建筑环境管理转向数据驱动决策的核心项目。",
  },
  "casa-rossi-valuation": {
    ...projectSummaries[2],
    reportUrl: "/files/casa-rossi-dcf.pdf",
    subtitle: "基于 DCF 与 WACC 的房地产投资价值评估。",
    role: "房地产投资分析与估值建模",
    phase: "估值、现金流预测与风险判断",
    headlineOutcome: "形成 Casa Rossi 的物业估值、现金流预测与投资判断。",
    overview:
      "历史建筑类资产的投资判断需要同时考虑市场价值、租金收益、改造成本、维护成本和潜在风险，不能只依赖单一价格比较。",
    problem:
      "项目的核心问题是：目标物业是否具备投资可行性，主要收益和风险来自哪里，以及不同假设会如何影响最终判断。",
    whatIDid:
      "我使用市场比较法、DCF、WACC、租金收益测算和情景分析，对 Casa Rossi 的资产价值、未来现金流和投资回报进行评估。",
    analysisFlow: [
      {
        title: "资产与市场判断",
        description:
          "梳理 Casa Rossi 的物业属性、历史建筑特征、区位条件和市场参考价格。",
      },
      {
        title: "收益模型搭建",
        description: "基于租金假设、运营成本和交易成本，建立未来现金流测算框架。",
      },
      {
        title: "估值方法交叉验证",
        description: "结合市场比较法、DCF 和 WACC，对物业价值进行多角度判断。",
      },
      {
        title: "投资风险识别",
        description: "评估改造成本、出租率、维护成本、折现率变化对投资回报的影响。",
      },
    ],
    result:
      "项目形成了物业估值、现金流预测与投资判断，为是否进入该类历史建筑资产提供了结构化依据。",
    keyOutputs: [
      "Casa Rossi 物业估值框架",
      "租金收益与现金流预测",
      "DCF 投资测算模型",
      "WACC 折现逻辑",
      "投资回报与风险判断",
      "历史建筑资产运营建议",
    ],
    reflection:
      "这个项目体现了我用财务模型支持房地产投资决策的能力，也让我更重视假设透明度和风险解释。",
  },
  "monza-esports-hotel": {
    ...projectSummaries[3],
    reportUrl: "/files/monza-esports-hotel-feasibility.pdf",
    subtitle: "围绕电竞酒店复合业态的市场与财务可行性研究。",
    role: "商业分析与可行性研究",
    phase: "市场研究、商业模型与财务测算",
    headlineOutcome: "形成酒店与电竞复合业态的可行性判断和商业化路径。",
    overview:
      "电竞、旅游和酒店业态正在出现交叉机会，Monza 具备赛事资源和城市流量基础，适合探索新的酒店体验和消费场景。",
    problem:
      "项目需要回答电竞酒店是否有明确市场需求、目标用户是谁、收入结构是否成立，以及是否具备可持续商业回报。",
    whatIDid:
      "我围绕市场研究、竞品分析、用户定位、商业模式设计、现金流预测和投资可行性分析，搭建从机会识别到财务判断的完整框架。",
    analysisFlow: [
      {
        title: "市场机会识别",
        description: "分析 Monza 的城市流量、赛事资源、旅游基础和电竞消费趋势。",
      },
      {
        title: "用户与场景定义",
        description: "拆解电竞玩家、游客、赛事观众和社交娱乐用户的潜在需求。",
      },
      {
        title: "商业模型设计",
        description: "构建住宿、电竞空间、活动运营和配套服务组成的复合收入结构。",
      },
      {
        title: "财务可行性判断",
        description: "结合投资成本、运营成本、收入预测和现金流，评估项目商业可行性。",
      },
    ],
    result:
      "项目形成了酒店+电竞复合业态的可行性判断和商业化路径，明确了潜在客群、收入来源和投资评估逻辑。",
    keyOutputs: [
      "Monza 电竞酒店概念定位",
      "目标用户与消费场景拆解",
      "酒店 + 电竞复合商业模型",
      "收入结构与成本逻辑",
      "现金流与投资可行性判断",
      "商业化路径建议",
    ],
    reflection:
      "这个项目更接近真实商业分析，体现从市场机会到商业模型的完整判断过程。",
  },
  "hedonic-price-regression": {
    ...projectSummaries[4],
    reportUrl: "/files/hedonic-price-model.pdf",
    subtitle: "用 Hedonic Price Method 解释城市基础设施对房价的影响。",
    role: "计量模型与房地产数据分析",
    phase: "变量筛选、回归建模与结果解释",
    headlineOutcome: "识别影响房价的关键因素，并将模型结果转化为城市和投资决策参考。",
    overview:
      "城市交通设施会影响住房价值，但影响程度需要通过数据量化，才能为城市规划和房地产投资判断提供依据。",
    problem:
      "项目关注地铁距离等变量是否显著影响房价，以及这些变量如何与其他住房属性一起解释价格差异。",
    whatIDid:
      "我使用 Hedonic Price Method、双对数回归、变量筛选和结果解释，建立回归模型分析房地产价格差异。",
    analysisFlow: [
      {
        title: "变量框架构建",
        description: "将房价拆解为区位、交通、物业特征等多个解释维度。",
      },
      {
        title: "数据整理与变量筛选",
        description: "处理样本数据，并筛选与房价相关的核心解释变量。",
      },
      {
        title: "回归模型建立",
        description:
          "使用 Hedonic Price Method 建立回归模型，解释不同因素对房价的影响。",
      },
      {
        title: "结果解释与决策转化",
        description: "将模型结果转化为对城市交通、房地产价值和投资判断的参考。",
      },
    ],
    result:
      "模型帮助识别影响房价的关键因素，并将计量结果转化为城市和投资决策参考。",
    keyOutputs: [
      "Hedonic Price Method 回归模型",
      "房价影响因素识别",
      "城市交通与房价关系分析",
      "变量显著性与方向判断",
      "房地产价值解释框架",
      "城市与投资决策参考",
    ],
    reflection:
      "这个项目体现我用计量方法分析现实房地产问题的能力，也训练了我把统计结果翻译成业务判断的能力。",
  },
  "cultural-asset-digital-commercialization": {
    ...projectSummaries[5],
    reportUrl: "/files/cultural-asset-commercialization.pdf",
    subtitle: "昭化寺历史文化遗产的保护、运营与数字化商业化策略。",
    role: "文化资产策略与商业化分析",
    phase: "战略分析、商业模式与现金流路径设计",
    headlineOutcome: "提出文旅业态、数字展示、运营合作和现金流回收路径。",
    overview:
      "历史文化建筑具有重要文化价值，但常缺乏可持续运营模式，保护、开放、体验和商业化之间需要被放在同一套策略中平衡。",
    problem:
      "项目关注如何在保护边界内实现文化资产的长期运营和价值转化，让文化价值与经济价值形成正向循环。",
    whatIDid:
      "我使用 SWOT、PESTEL、商业模式设计、DCF、数字化保护与展示方案，设计昭化寺历史文化遗产的保护、运营和商业化路径。",
    analysisFlow: [
      {
        title: "文化资产评估",
        description: "识别历史建筑的文化价值、保护边界、资源优势和运营限制。",
      },
      {
        title: "外部环境分析",
        description: "使用 SWOT 和 PESTEL 分析政策、市场、文化消费和商业化风险。",
      },
      {
        title: "商业场景设计",
        description:
          "设计文旅融合、研学课程、主题展陈、文创产品和数字展示等运营场景。",
      },
      {
        title: "现金流与可持续性判断",
        description: "结合投入成本、运营收益和回收周期，判断项目长期运营可行性。",
      },
    ],
    result:
      "项目提出文旅业态、数字展示、运营合作和现金流回收路径，为历史文化资产的可持续运营提供策略方案。",
    keyOutputs: [
      "文化资产保护与运营框架",
      "SWOT / PESTEL 分析",
      "文旅融合商业场景",
      "数字化展示与互动体验方案",
      "现金流与投资回收逻辑",
      "文化价值与商业价值平衡策略",
    ],
    reflection:
      "这个项目体现了我在文化资产、商业策略和数字化场景之间建立连接的能力。",
  },
  "content-growth": {
    ...projectSummaries[6],
    subtitle: "用户增长、内容运营与商业化实践。",
    role: "内容策略与增长闭环搭建",
    phase: "持续运营与商业验证",
    headlineOutcome: "让内容从流量工具升级为信任资产和商业入口。",
    overview:
      "这项实践来自我长期在多个平台上的内容运营。相比把内容仅仅看成曝光工具，我更把它当作低成本、高反馈密度的增长系统。",
    problem:
      "很多增长工作的难点不是拿不到流量，而是流量与后续转化之间断层明显。注意力不天然等于信任，更不天然等于商业结果。",
    whatIDid:
      "我负责从定位、选题、脚本、制作、发布到复盘的完整链路，并把互动数据、评论反馈、私信问题和合作转化情况放回内容系统里迭代。",
    result:
      "表现较好的内容带来显著浏览和互动，同时也带来品牌合作机会。更重要的是，这套实践沉淀了选题判断、用户理解和商业化机会。",
    reflection:
      "好的增长内容不是依赖产量堆出来的，而是依赖对用户情绪、场景和时机的精准判断。",
  },
  "pre-master": {
    ...projectSummaries[7],
    subtitle: "从用户需求验证到课程产品、社群运营与交付体系搭建。",
    role: "业务搭建与团队推进",
    phase: "从验证到结构化运营",
    headlineOutcome: "完成早期商业验证，并把副项目逐步推向可复用的运营模型。",
    overview:
      "该项目最初以 Pre-Master 教育咨询服务形态启动。它从一场偏实验性质的创业尝试，逐步发展成更完整的教育服务系统。",
    problem:
      "教育服务早期几乎没有品牌资产可以依赖，用户购买决策高度依赖信任感，而信任既取决于前端表达，也取决于后端交付是否稳定。",
    whatIDid:
      "我参与并推动业务从前到后的关键环节，包括搭建早期内容引流、设计服务逻辑、管理团队、运营社群，以及在真实交付中调整咨询与服务流程。",
    result:
      "项目完成了付费咨询和用户服务的早期验证，并逐步从一次性副项目演化为更有结构的运营模型。",
    reflection:
      "0 到 1 的关键不只是创造新东西，而是持续降低不确定性，让团队知道什么可以标准化、什么需要保留弹性。",
  },
  "market-intelligence": {
    ...projectSummaries[8],
    subtitle: "为海外游戏产品决策提供竞品分析、市场研究与结构化输入。",
    role: "研究分析与决策支持",
    phase: "国际市场判断支撑",
    headlineOutcome: "把分散信息整理成产品与市场团队可直接讨论的判断材料。",
    overview:
      "在网易游戏实习期间，我参与竞品分析、用户反馈整理、区域市场研究，以及支持海外产品与市场判断的材料输出。",
    problem:
      "海外产品判断往往不缺数据，缺的是能够进入决策讨论的结构化信息。竞品、用户声音和本地化因素常常分散在不同来源里。",
    whatIDid:
      "我分析同类产品，归纳用户痛点、产品差异与潜在机会，并把用户反馈、性能问题、信任成本等信息整理成结构化内容。",
    result:
      "这项工作帮助团队把竞品信息、用户反馈与市场背景更有效地串联起来，提升围绕定位、本地化和市场机会判断的讨论效率。",
    reflection:
      "好的分析不是把资料收得越多越好，而是能否把复杂问题翻译成团队可以据此行动的判断框架。",
  },
};

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  if (slug in projectDetails) {
    return projectDetails[slug as ProjectSlug];
  }
  return undefined;
}

export function getAllProjectSlugs(): ProjectSlug[] {
  return projectSummaries.map((p) => p.slug);
}
