import selection from "./case-study.selection.json";

type SourceLinked = { sourceIds: readonly string[] };

export type LincolnMedia = SourceLinked & {
  src: string;
  alt: string;
  caption: string;
  truthStatus: string;
};

export type LincolnDerivation = SourceLinked & {
  title: string;
  summary: string;
  points: readonly string[];
};

const approvedSourceIds = new Set(selection.units.map((unit) => unit.id));

function linked<T extends SourceLinked>(value: T): T {
  for (const sourceId of value.sourceIds) {
    if (!approvedSourceIds.has(sourceId)) {
      throw new Error(`Lincoln 案例研究引用了未知的源单元：${sourceId}`);
    }
  }
  return value;
}

function media(value: LincolnMedia): LincolnMedia {
  return linked(value);
}

function derivation(value: LincolnDerivation): LincolnDerivation {
  return linked(value);
}

export const lincolnCaseStudy = {
  projectId: "lincoln-text-expression",
  projectName: "林肯之道",
  title: "优化移动端文本输入与信息表达",
  status: "商业项目 · 已上线，证据边界有限定",
  hero: linked({
    sourceIds: ["lincoln-001", "lincoln-002"],
    proposition: "文本规则不应该从字段名或组件样式出发，而应该从内容本身承担的任务出发。",
    context: "客户需要我们进行整体的关于文字信息方面的优化。林肯之道是林肯面向车主的移动应用，涵盖车辆状态、社区交流、相关购买和官方车主服务。2022 年 8 月，我在外部合作方范围内担任唯一 UX 设计师，负责需求分析、竞品研究、文本规则定义、交互设计和设计规范。项目方案由客户产品负责人评审并批准。",
    evidenceBoundary: "七张主要截图展示的是应用当前已上线的体验。部分细节与 2022 年 8 月交付版本不同，因此这些截图只用于证明可观察的任务和状态；我的作者范围仅限于已确认的职责、规则与实施范围。",
    cover: media({
      sourceIds: ["lincoln-001"],
      src: "cover-display.webp",
      alt: "手机模型中展示的林肯之道车主应用",
      caption: "使用当前车辆绑定入口体验制作的作品集展示模型。",
      truthStatus: "展示素材；作品集模型中呈现的是当前产品界面。",
    }),
    meta: [
      { label: "角色", value: "唯一 UX 设计师 · 外部合作方" },
      { label: "周期", value: "约一个月" },
      { label: "范围", value: "研究 · 规则 · 交互 · 规范" },
    ],
    outcomes: [
      { label: "已确认贡献", value: "规则与交互规范", note: "姓名、昵称、VIN、帖子正文、计数方式与交互指导。" },
      { label: "批准方", value: "客户产品负责人", note: "核心规则已批准并实施；部分溢出规则和正文/话题细节仅部分实现。" },
      { label: "证据边界", value: "无法访问上线后分析数据", note: "不将完成率、效率或转化提升表述为已实现成果。" },
    ],
    questions: [
      { name: "受控短文本", examples: "姓名 · 昵称", property: "当用户进行短文本表单输入时，如何优化提示？", question: "焦点进入即展示规则，输入中实时校验——提示时机与编辑成本匹配。" },
      { name: "结构化唯一标识符", examples: "VIN", property: "当输入具有唯一性时，如何进行约束？", question: "重点不是计数，而是减少转录错误、保证信息被准确认准。" },
      { name: "开放长文本", examples: "帖子正文", property: "当用户输入长文本时，该在什么情况下作出什么样的交互反馈？", question: "允许超出是刻意的，配套错误色与恢复闭环。" },
    ],
  }),
  shortText: linked({
    sourceIds: ["lincoln-007", "lincoln-004", "lincoln-005", "lincoln-006", "lincoln-023"],
    title: "第一问｜受控短文本：当用户进行短文本表单输入时，如何优化提示？",
    summary: "姓名与昵称同为 14 单位短文本，却承担不同内容职责——姓名允许中文和拉丁字母、不对外显示；昵称允许下划线、承担所有外部身份展示。无效昵称会禁用保存；有效保存后出现成功提示并退出页面。",
    tradeoff: "姓名是真实姓名，从内容任务看其实不需要 14 的限制——真实姓名本身很短；但考虑到外国用户的名字（拉丁拼写可能较长），我们对姓名做了与昵称相同的 14 单位字符处理，为不同语言的用户保留足够的输入空间。昵称则相反，它承担所有外部身份展示，规则需要更明确。",
    decision: "短文本的限制核心不是数字，而是内容承担的任务。姓名与昵称共享 14 的上限，但理由不同：姓名是为了包容更长的名字，昵称是为了约束公开身份。当前昵称仍可输入超过 14，说明既定规则与线上实现并不完全一致，这一点需要分开陈述。",
    presentation: "短文本表单的交互核心是事前提示：焦点进入字段时就展示规则与约束（例如“最多 14 个字符、允许下划线”），让用户在输入前了解边界；输入过程中即时校验，错误在提交前就能被修正。长文本则相反，更依赖事后提示。一个可修复的短文本错误应说明：违反了长度还是字符规则、当前行为后果是什么、用户下一步怎样恢复。",
    media: [
      media({ sourceIds: ["lincoln-004"], src: "profile-overview-display.webp", alt: "展示姓名和昵称字段的当前个人资料页", caption: "姓名与昵称位于同一资料页面并共享相同数值上限，但承担不同的身份责任。", truthStatus: "当前上线证据；与 2022 年交付版本的差异尚未解决。" }),
      media({ sourceIds: ["lincoln-005"], src: "profile-name-invalid-display.webp", alt: "当前姓名字段拒绝拉丁字母输入 widisj", caption: "规则允许中文和拉丁字母，因此“widisj”应当有效。当前报错说明规则与实现不一致。", truthStatus: "已验证的预期规则 + 已验证的当前截图；根因未知。" }),
      media({ sourceIds: ["lincoln-006"], src: "profile-nickname-invalid-display.webp", alt: "昵称字段显示长度与特殊字符提示", caption: "昵称最多允许 14 个单位并允许下划线，但合并后的提示没有说明当前违反了哪条规则。", truthStatus: "已验证的当前行为。" }),
    ] satisfies LincolnMedia[],
    derivation: derivation({
      sourceIds: ["lincoln-023"],
      title: "表单短文本的呈现与交互方式",
      summary: "短文本表单的体验差异，主要体现在提示的时机与方式上——提示粒度应该与编辑成本匹配。",
      points: [
        "事前提示：焦点进入字段时就显示规则说明（如“最多 14 个字符、允许下划线”），让用户在输入前就知道边界，而不是输入后才被告知出错。",
        "输入中提示：实时计数与即时校验，在输入过程中就反馈“当前是否合法、还差多少”。",
        "事后提示：提交时统一校验，错误集中在提交后暴露——对短文本来说成本较高，用户要返回修改。",
      ],
    }),
  }),
  vin: linked({
    sourceIds: ["lincoln-010", "lincoln-008", "lincoln-009", "lincoln-024"],
    title: "第二问｜结构化唯一标识：当输入具有唯一性时，如何进行约束？",
    summary: "VIN 只有 17 位大写字母或数字，答案唯一。输入不足时无法继续，超过 17 或非法字符会被阻止，Latin 字母自动转成大写，最终校验发生在点击确认时。页面支持手动输入、相机扫描、查找帮助与空态禁用确认。",
    tradeoff: "这类字段的优先事项不是持续展示 0/17——VIN 错一个字母，就查错一辆车。",
    decision: "唯一标识的规则由“答案必须唯一且准确”决定。设计重点放在减少转录错误、提供扫描和查找帮助、归一化输入，并清楚表达能否继续。",
    presentation: "VIN 决定信息能否被准确认准、能否与真实车辆正确关联。对这类信息，输入方式的可靠性和准确性很重要。",
    evidenceBoundary: "扫描失败的具体反馈仍未知，不进入公开结论。",
    media: [
      media({ sourceIds: ["lincoln-009"], src: "vehicle-empty-display.webp", alt: "车辆绑定入口与车主服务价值", caption: "成功绑定后可连接车辆状态、金融、警告与服务预约，从而提高准确输入的价值。", truthStatus: "已验证的当前证据。" }),
      media({ sourceIds: ["lincoln-008"], src: "vin-entry-display.webp", alt: "带相机扫描与查找帮助的 VIN 输入界面", caption: "手动输入、扫描、查找帮助、规范化和确认状态共同支持唯一且准确的 17 位答案。", truthStatus: "已验证的交付范围；扫描失败反馈尚未解决。" }),
    ] satisfies LincolnMedia[],
    derivation: derivation({
      sourceIds: ["lincoln-024"],
      title: "为什么唯一标识最不受产品定位影响？",
      summary: "三类文本里，唯一标识的规则由外部标准决定，设计师的自由度在输入方式。",
      points: [
        "VIN、身份证号、订单号——规则由外部标准决定：17 位、18 位、特定字符集。",
        "设计师的自由度不在“定多少字”，而在输入方式：怎么降低转录错误、怎么格式化、什么时候校验。",
        "约束越硬，设计越要服务于准确。",
      ],
    }),
  }),
  longText: linked({
    sourceIds: ["lincoln-011", "lincoln-012", "lincoln-013", "lincoln-014", "lincoln-016", "lincoln-025"],
    title: "第三问｜开放长文本：当用户输入长文本时，该在什么情况下作出什么样的交互反馈？",
    summary: "帖子正文使用 1,000 单位上限与实时 X/1000 计数，没有标题字段。话题文字插入正文并共享同一个 1,000 额度，话题本身没有独立上限。当前 App 在超限后保留超出文字，但未实现我提出的错误色状态。",
    tradeoff: "短文本可以在边界处直接阻止，因为编辑成本低；长文本已经承载用户投入，超限后必须保留内容，让用户编辑回有效状态。正文与话题共享额度本身不是未知 bug；真正的设计问题是用户在选择前无法直观看到话题会占用多少，以及提示是否足以帮助恢复。",
    decision: "长文本承载表达投入，限制服务于表达——超限后必须保留内容、讲清后果、提供恢复，而不是像短文本那样直接阻止。",
    presentation: "正文决定表达投入是否被尊重、信息能否完整传递与恢复。长文本允许用户超出字符继续输入，是刻意的设计——用户投入越多，越不能在中途被截断；但同时要对超限状态做明确反馈：计数进入错误色（1009/1000），提示用户已超出、需要删改恢复。当前实现保留了超出文字，但错误色状态未实现。",
    countTitle: "一个可见字符并不是天然一致的实现单位",
    countSummary: "当前应用可以稳定复现以下计数：中文字符、拉丁字母、数字和空格计为一；换行计为零；不同 Emoji 分别计为二、三或四。缺少工程证据时，实现原因仍未知。规范必须连接完整链路，而不能反推某种编码模型。",
    chain: [
      { stage: "用户感知符号", responsibility: "用户理解为一个字符的内容" },
      { stage: "界面可见计数", responsibility: "哪些输入会改变界面显示的数字" },
      { stage: "输入限制", responsibility: "哪些规则标记或阻止溢出" },
      { stage: "提交校验", responsibility: "客户端接受哪些内容为有效输入" },
      { stage: "服务与存储", responsibility: "系统实际保存什么内容" },
      { stage: "再次显示与编辑", responsibility: "同一内容返回时是否保持相同计数" },
    ],
    testCases: [
      { input: "中文 · 拉丁字母 · 数字", increase: "各 +1", status: "可复现" },
      { input: "空格 · 换行", increase: "+1 · +0", status: "可复现" },
      { input: "😀", increase: "+2", status: "可复现" },
      { input: "👍🏽", increase: "+3", status: "可复现" },
      { input: "🇨🇳", increase: "+4", status: "可复现" },
    ],
    media: [
      media({ sourceIds: ["lincoln-013"], src: "post-overflow-display.webp", alt: "帖子正文显示 1009/1000，但没有明确无效状态", caption: "达到 1009/1000 时，超出文字仍保留可编辑。我提出错误色计数状态，但当前实现没有呈现。", truthStatus: "已验证的当前行为 + 已验证的设计提案；发布结果未知。" }),
      media({ sourceIds: ["lincoln-014"], src: "post-topic-limit-display.webp", alt: "接近文本上限时添加话题触发上限提示", caption: "话题文字会插入正文并共享 1000 单位额度。在 997/1000 时，所选话题已无法容纳。", truthStatus: "已验证的预期规则与当前证据。" }),
    ] satisfies LincolnMedia[],
    statesTitle: "四种反馈状态定义恢复闭环",
    statesSummary: "该模型区分正常输入、提前预警、无效溢出，以及重新回到有效发布状态。",
    states: [
      { state: "正常", behavior: "弱化计数显示，让表达保持主导。" },
      { state: "接近上限", behavior: "在到达边界前提高提示强调度。" },
      { state: "超出限制", behavior: "保留内容，同时指出超额量、后果与受影响对象。" },
      { state: "已恢复", behavior: "同时恢复计数颜色、解释信息和发布状态。" },
    ],
    allowance: "正文和话题共享额度本身不是未知 bug；真正的设计问题是用户在选择前无法直观看到话题会占用多少，以及提示是否足以帮助恢复——额度要回答“用户能否预判成本、能否恢复”。",
    derivation: derivation({
      sourceIds: ["lincoln-025"],
      title: "产品定位如何定义“长文本”？",
      summary: "什么是“长文本”由产品定位决定，字数上限是产品对“一次表达应承载多少信息”的回答。",
      points: [
        "林肯之道作为车主服务 App，1000 字帖子就是长文本——低频、功能性。",
        "小红书同样是 1000 字，却是“种草笔记”的核心载体。",
        "产品定位改变，长文本的定义、额度和溢出策略一起改变。",
      ],
    }),
  }),
  archetypes: linked({
    sourceIds: ["lincoln-003"],
    title: "从三个问题到三类文本原型",
    summary: "回头看，这三个问题不是四个字段，而是三类文本任务——每一类都在回答同一件事：这个输入的内容，之后如何被呈现、被理解、被信任？",
    rows: [
      ["受控短文本", "姓名、昵称", "短、规则集中、修改成本低", "是否直接阻止无效输入？怎样说明具体规则？"],
      ["结构化唯一标识", "VIN", "唯一答案、严格长度与字符集", "怎样提高输入准确率并完成最终校验？"],
      ["开放长文本", "帖子正文；评论仅作边界参照", "无唯一答案、用户投入高、可能与其他内容共享额度", "是否保留超出内容？怎样表达状态、后果和恢复？"],
    ],
    dimensions: ["内容结构", "长度与编辑成本", "答案确定性", "下游可见性", "失败后果", "跨对象耦合"],
  }),
  framework: linked({
    sourceIds: ["lincoln-017"],
    title: "从页面案例到文本规则决策工具",
    summary: "这套工具标准化的是判断顺序，而不是一个万能组件：文本原型、跨场景维度、计数单位、输入边界、校验时机、错误位置、恢复方式和端到端测试。",
    columns: ["决策维度", "受控短文本", "结构化唯一标识符", "开放长文本"],
    rows: [
      ["当前案例", "姓名 · 昵称", "VIN", "帖子正文"],
      ["答案与结构", "用户在规则内自行输入", "唯一答案且格式严格", "自由表达，没有唯一答案"],
      ["编辑成本", "低", "中等；对转录准确度敏感", "高；应保留用户已输入内容"],
      ["典型边界", "长度 · 允许字符 · 可见性", "固定长度 · 字符集 · 规范化", "总额度 · 共享对象 · 发布状态"],
      ["溢出策略", "阻止并准确解释", "阻止非法或超额输入；提交时校验", "保留内容；阻止无效发布；支持恢复"],
      ["反馈重点", "失败规则与修复方式", "扫描 · 查找 · 格式 · 确认", "状态 · 受影响对象 · 后果 · 恢复"],
      ["QA 边界", "中文 · 拉丁字母 · 符号 · 按钮状态", "17 位 · 大小写 · 扫描 · 非法输入", "中文 · 拉丁字母 · Emoji · 话题 · 粘贴 · 换行 · 恢复"],
    ],
  }),
  validation: linked({
    sourceIds: ["lincoln-019"],
    title: "交付成果与证据边界",
    summary: "这套方法可以沉淀，但成果必须有边界：交付后我无法访问上线分析数据，以下指标定义的是如何评估，不是已经实现的结果。",
    metrics: [
      { scenario: "受控短文本", measures: "首次保存成功率 · 规则识别 · 重复错误", question: "用户能否识别违反的规则并立即修复？" },
      { scenario: "VIN", measures: "首次输入成功率 · 完成时间 · 扫描采用率 · 校验失败", question: "专用输入方式与帮助是否降低了转录成本？" },
      { scenario: "开放长文本", measures: "溢出发生率 · 恢复率 · 恢复时间 · 放弃率", question: "保留内容与状态反馈是否支持恢复？" },
      { scenario: "正文 + 话题", measures: "共享额度理解度 · 添加话题失败率", question: "用户是否理解话题会占用正文额度？" },
      { scenario: "多语言 / Emoji", measures: "规则可预测性 · 前后端边界一致性", question: "用户理解与实现校验能否保持一致？" },
    ],
  }),
  closing: linked({
    sourceIds: ["lincoln-020"],
    statement: "最终建立的不是一组字段字数，而是一套判断文本结构、计数边界、输入限制、校验与恢复的方法——因为每一个字数决定，本质上都是在决定信息如何被呈现、被理解、被信任。",
  }),
} as const;

function countTextUnits() {
  return 2 + 1 + 2 + 2 + 2 + 1 + 1;
}

function countVisualUnits() {
  return 1
    + projectVisualCount(lincolnCaseStudy.shortText.media)
    + 3
    + projectVisualCount(lincolnCaseStudy.longText.media)
    + 1
    + projectVisualCount(lincolnCaseStudy.vin.media)
    + 1
    + 1;
}

function projectVisualCount(items: readonly LincolnMedia[]) {
  return items.length;
}

export const lincolnContentBalance = (() => {
  const textUnits = countTextUnits();
  const visualUnits = countVisualUnits();
  const visualShare = visualUnits / (visualUnits + textUnits);
  if (visualShare < 0.5) {
    throw new Error("Lincoln 案例研究的视觉内容占比必须保持在至少 50%");
  }
  return { textUnits, visualUnits, visualShare };
})();

export const caseStudyTitle = lincolnCaseStudy.title;
