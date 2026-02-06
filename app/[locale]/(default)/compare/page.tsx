import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  return {
    title: isZh
      ? "Seedance 2.0 vs Sora vs Runway vs Veo 3 vs Kling - AI 视频生成器对比"
      : "Seedance 2.0 vs Sora vs Runway vs Veo 3 vs Kling - AI Video Generator Comparison",
    description: isZh
      ? "全面对比 2025 年最佳 AI 视频生成器。Seedance 2.0 在 Artificial Analysis 排名第一，原生音视频同步、唇形同步、2K 分辨率，比竞品快 30%。"
      : "Complete comparison of the best AI video generators in 2025. Seedance 2.0 ranks #1 on Artificial Analysis with native audio-video sync, lip-sync, 2K resolution, and 30% faster generation.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/compare`,
    },
    keywords: isZh
      ? "seedance 2.0 vs sora, seedance vs runway, seedance vs veo 3, seedance vs kling, AI视频生成器对比, 最佳AI视频工具"
      : "seedance 2.0 vs sora, seedance vs runway, seedance vs veo 3, seedance vs kling, AI video generator comparison, best AI video tool",
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === "zh";

  const content = isZh ? zhContent : enContent;

  return (
    <div className="container py-16">
      {/* Hero Section */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          🏆 {content.badge}
        </div>
        <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
          {content.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {content.subtitle}
        </p>
      </div>

      {/* Comparison Table */}
      <section className="mb-20 overflow-x-auto">
        <div className="min-w-[900px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold">{content.table.feature}</th>
                <th className="text-center p-4 bg-primary/5 border-x border-border">
                  <div className="font-bold text-primary">Seedance 2.0</div>
                  <div className="text-xs text-muted-foreground mt-1">ByteDance</div>
                </th>
                <th className="text-center p-4">
                  <div className="font-semibold">Sora</div>
                  <div className="text-xs text-muted-foreground mt-1">OpenAI</div>
                </th>
                <th className="text-center p-4">
                  <div className="font-semibold">Runway Gen-3</div>
                  <div className="text-xs text-muted-foreground mt-1">Runway</div>
                </th>
                <th className="text-center p-4">
                  <div className="font-semibold">Veo 3</div>
                  <div className="text-xs text-muted-foreground mt-1">Google</div>
                </th>
                <th className="text-center p-4">
                  <div className="font-semibold">Kling</div>
                  <div className="text-xs text-muted-foreground mt-1">Kuaishou</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {content.table.rows.map((row, i) => (
                <tr key={i} className="border-b border-border hover:bg-muted/50">
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="text-center p-4 bg-primary/5 border-x border-border">
                    <FeatureValue value={row.seedance} isHighlight />
                  </td>
                  <td className="text-center p-4">
                    <FeatureValue value={row.sora} />
                  </td>
                  <td className="text-center p-4">
                    <FeatureValue value={row.runway} />
                  </td>
                  <td className="text-center p-4">
                    <FeatureValue value={row.veo} />
                  </td>
                  <td className="text-center p-4">
                    <FeatureValue value={row.kling} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.advantages.title}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {content.advantages.items.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Comparisons */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.detailed.title}
        </h2>
        <div className="space-y-8">
          {content.detailed.comparisons.map((comp, i) => (
            <div
              key={i}
              className="p-8 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{comp.icon}</span>
                <h3 className="text-2xl font-bold">{comp.title}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-primary mb-3">
                    Seedance 2.0
                  </h4>
                  <p className="text-muted-foreground">{comp.seedance}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">{content.detailed.othersLabel}</h4>
                  <p className="text-muted-foreground">{comp.others}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmark Results */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">
          {content.benchmark.title}
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {content.benchmark.description}
        </p>
        <div className="max-w-3xl mx-auto">
          {content.benchmark.scores.map((score, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between mb-2">
                <span className={`font-medium ${i === 0 ? "text-primary" : ""}`}>
                  {score.name}
                </span>
                <span className={`font-bold ${i === 0 ? "text-primary" : ""}`}>
                  {score.score}
                </span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    i === 0 ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  style={{ width: `${score.percentage}%` }}
                />
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground text-center mt-8">
            {content.benchmark.source}
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          {content.useCases.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {content.useCases.items.map((useCase, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{useCase.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {useCase.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-primary font-medium">
                      {content.useCases.bestChoice}:
                    </span>
                    <span>Seedance 2.0</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
          🏆 #1 {content.cta.badge}
        </div>
        <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          {content.cta.description}
        </p>
        <a
          href="https://jimeng.jianying.com/ai-tool/seedance"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-12 px-8 text-base"
        >
          {content.cta.button}
        </a>
      </section>
    </div>
  );
}

function FeatureValue({
  value,
  isHighlight = false,
}: {
  value: string;
  isHighlight?: boolean;
}) {
  if (value === "✓") {
    return (
      <span className={`text-lg ${isHighlight ? "text-primary" : "text-green-500"}`}>
        ✓
      </span>
    );
  }
  if (value === "✗") {
    return <span className="text-lg text-red-500">✗</span>;
  }
  if (value === "~") {
    return <span className="text-lg text-yellow-500">~</span>;
  }
  return (
    <span className={isHighlight ? "text-primary font-medium" : ""}>
      {value}
    </span>
  );
}

const enContent = {
  badge: "Ranked #1 on Artificial Analysis",
  title: "Seedance 2.0 vs The Competition",
  subtitle:
    "See how Seedance 2.0 compares to Sora, Runway, Veo 3, and Kling in features, quality, and performance.",
  table: {
    feature: "Feature",
    rows: [
      {
        feature: "Native Audio-Video Sync",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "Phoneme-Level Lip Sync",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "✗",
        kling: "~",
      },
      {
        feature: "Multi-Language Support",
        seedance: "8+",
        sora: "~",
        runway: "~",
        veo: "~",
        kling: "2",
      },
      {
        feature: "Max Resolution",
        seedance: "2K",
        sora: "1080p",
        runway: "1080p",
        veo: "1080p",
        kling: "1080p",
      },
      {
        feature: "Multi-Shot Narratives",
        seedance: "✓",
        sora: "~",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "Generation Speed",
        seedance: "Fast",
        sora: "Slow",
        runway: "Medium",
        veo: "Medium",
        kling: "Medium",
      },
      {
        feature: "Sound Effects Generation",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "Free Tier",
        seedance: "✓",
        sora: "✗",
        runway: "✓",
        veo: "~",
        kling: "✓",
      },
      {
        feature: "API Access",
        seedance: "✓",
        sora: "✗",
        runway: "✓",
        veo: "✓",
        kling: "✓",
      },
      {
        feature: "Artificial Analysis Rank",
        seedance: "#1",
        sora: "#3",
        runway: "#4",
        veo: "#2",
        kling: "#5",
      },
    ],
  },
  advantages: {
    title: "Why Seedance 2.0 Leads",
    items: [
      {
        icon: "🔊",
        title: "Native Audio Generation",
        description:
          "Unlike competitors that generate video first and add audio later, Seedance 2.0 creates perfectly synchronized audio and video simultaneously using Dual-Branch DiT architecture.",
      },
      {
        icon: "👄",
        title: "Superior Lip Sync",
        description:
          "Phoneme-level lip synchronization in 8+ languages ensures characters speak naturally. No uncanny valley effects - just realistic, expressive digital humans.",
      },
      {
        icon: "🎬",
        title: "Multi-Shot Storytelling",
        description:
          "Create complex, cinematic sequences from a single prompt. Maintain character and scene consistency across multiple shots automatically.",
      },
      {
        icon: "⚡",
        title: "30% Faster",
        description:
          "Optimized generation pipeline delivers studio-quality results faster than any competitor without compromising quality.",
      },
      {
        icon: "📺",
        title: "2K Resolution",
        description:
          "Cinema-quality 2K output while competitors max out at 1080p. Professional-grade video suitable for distribution.",
      },
      {
        icon: "💰",
        title: "Free to Start",
        description:
          "Try all core features free with no credit card required. Upgrade only when you need more generations or higher resolution.",
      },
    ],
  },
  detailed: {
    title: "Detailed Feature Comparison",
    othersLabel: "Other Tools",
    comparisons: [
      {
        icon: "🔊",
        title: "Audio-Video Synchronization",
        seedance:
          "Uses Dual-Branch Diffusion Transformer to generate audio and video simultaneously. Sound effects, music, and dialogue are created in perfect sync with visual content from the start.",
        others:
          "Most tools generate video first, then attempt to add audio in post-processing. This leads to sync issues, unnatural timing, and the need for manual adjustments.",
      },
      {
        icon: "👄",
        title: "Lip Synchronization Quality",
        seedance:
          "Phoneme-level accuracy trained on 8+ languages. Each language has specific mouth movement patterns for natural speech. Characters' lip movements match audio perfectly regardless of language.",
        others:
          "Limited or no lip-sync capability. When available, often produces unnatural results or only works well in English. Multi-language support is rare or non-existent.",
      },
      {
        icon: "🎬",
        title: "Multi-Shot Narrative Generation",
        seedance:
          "Understands story structure and generates multiple coherent shots from a single prompt. Maintains character consistency, scene continuity, and proper transitions between shots.",
        others:
          "Typically generate single shots. Creating sequences requires multiple generations with no guarantee of consistency. Users must manually edit to create narratives.",
      },
    ],
  },
  benchmark: {
    title: "Benchmark Performance",
    description:
      "Based on Artificial Analysis comprehensive evaluation of video quality, audio sync, generation speed, and user satisfaction.",
    scores: [
      { name: "Seedance 2.0", score: "92/100", percentage: 92 },
      { name: "Veo 3", score: "87/100", percentage: 87 },
      { name: "Sora", score: "85/100", percentage: 85 },
      { name: "Runway Gen-3", score: "82/100", percentage: 82 },
      { name: "Kling", score: "79/100", percentage: 79 },
    ],
    source: "Source: Artificial Analysis AI Video Model Benchmark, 2025",
  },
  useCases: {
    title: "Best For These Use Cases",
    bestChoice: "Best Choice",
    items: [
      {
        icon: "🎙️",
        title: "Dialogue-Heavy Content",
        description:
          "Commercials, testimonials, or any content requiring natural speech with perfect lip-sync.",
      },
      {
        icon: "🌍",
        title: "Multi-Language Content",
        description:
          "Global marketing, localized content, or multi-language educational materials.",
      },
      {
        icon: "🎵",
        title: "Music Videos",
        description:
          "AI-generated musical performances with synchronized vocals and movements.",
      },
      {
        icon: "📖",
        title: "Narrative Storytelling",
        description:
          "Short films, trailers, or any content requiring multi-shot sequences.",
      },
      {
        icon: "📢",
        title: "Product Launches",
        description:
          "High-quality 2K commercials with synchronized audio and voiceover.",
      },
      {
        icon: "🎓",
        title: "Educational Content",
        description:
          "Explainer videos with clear narration and natural presenter lip-sync.",
      },
    ],
  },
  cta: {
    badge: "on Artificial Analysis",
    title: "Experience the Difference",
    description:
      "Join thousands of creators who've switched to Seedance 2.0 for superior AI video generation with native audio sync.",
    button: "Try Seedance 2.0 Free",
  },
};

const zhContent = {
  badge: "Artificial Analysis 排名第一",
  title: "Seedance 2.0 竞品对比",
  subtitle:
    "了解 Seedance 2.0 与 Sora、Runway、Veo 3、Kling 在功能、质量和性能上的对比。",
  table: {
    feature: "功能",
    rows: [
      {
        feature: "原生音视频同步",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "音素级唇形同步",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "✗",
        kling: "~",
      },
      {
        feature: "多语言支持",
        seedance: "8+",
        sora: "~",
        runway: "~",
        veo: "~",
        kling: "2",
      },
      {
        feature: "最高分辨率",
        seedance: "2K",
        sora: "1080p",
        runway: "1080p",
        veo: "1080p",
        kling: "1080p",
      },
      {
        feature: "多镜头叙事",
        seedance: "✓",
        sora: "~",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "生成速度",
        seedance: "快",
        sora: "慢",
        runway: "中等",
        veo: "中等",
        kling: "中等",
      },
      {
        feature: "音效生成",
        seedance: "✓",
        sora: "✗",
        runway: "✗",
        veo: "~",
        kling: "✗",
      },
      {
        feature: "免费版",
        seedance: "✓",
        sora: "✗",
        runway: "✓",
        veo: "~",
        kling: "✓",
      },
      {
        feature: "API 接口",
        seedance: "✓",
        sora: "✗",
        runway: "✓",
        veo: "✓",
        kling: "✓",
      },
      {
        feature: "Artificial Analysis 排名",
        seedance: "#1",
        sora: "#3",
        runway: "#4",
        veo: "#2",
        kling: "#5",
      },
    ],
  },
  advantages: {
    title: "Seedance 2.0 领先的原因",
    items: [
      {
        icon: "🔊",
        title: "原生音频生成",
        description:
          "与竞品先生成视频再添加音频不同，Seedance 2.0 使用双分支 DiT 架构同时创建完美同步的音频和视频。",
      },
      {
        icon: "👄",
        title: "卓越的唇形同步",
        description:
          "8+ 语言的音素级唇形同步确保角色自然说话。告别恐怖谷效应，呈现真实、富有表现力的数字人。",
      },
      {
        icon: "🎬",
        title: "多镜头叙事",
        description:
          "通过单个 Prompt 创建复杂的电影级序列。自动保持角色和场景在多个镜头间的一致性。",
      },
      {
        icon: "⚡",
        title: "快 30%",
        description:
          "优化的生成管道比任何竞品都快，在不牺牲质量的前提下交付工作室级结果。",
      },
      {
        icon: "📺",
        title: "2K 分辨率",
        description:
          "电影级 2K 输出，而竞品最高只有 1080p。专业级视频适合分发。",
      },
      {
        icon: "💰",
        title: "免费开始",
        description:
          "无需信用卡即可免费试用所有核心功能。只在需要更多生成次数或更高分辨率时升级。",
      },
    ],
  },
  detailed: {
    title: "详细功能对比",
    othersLabel: "其他工具",
    comparisons: [
      {
        icon: "🔊",
        title: "音视频同步",
        seedance:
          "使用双分支扩散 Transformer 同时生成音频和视频。音效、音乐和对话从一开始就与视觉内容完美同步。",
        others:
          "大多数工具先生成视频，再尝试后期添加音频。这会导致同步问题、不自然的时机，以及需要手动调整。",
      },
      {
        icon: "👄",
        title: "唇形同步质量",
        seedance:
          "基于 8+ 语言训练的音素级精度。每种语言都有特定的口型运动模式以实现自然语音。无论使用何种语言，角色的唇部动作都能完美匹配音频。",
        others:
          "唇形同步能力有限或没有。即使有，通常也会产生不自然的结果，或只在英语中效果较好。多语言支持罕见或不存在。",
      },
      {
        icon: "🎬",
        title: "多镜头叙事生成",
        seedance:
          "理解故事结构，从单个 Prompt 生成多个连贯的镜头。保持角色一致性、场景连续性和镜头之间的适当过渡。",
        others:
          "通常只生成单个镜头。创建序列需要多次生成，且无法保证一致性。用户必须手动剪辑来创建叙事。",
      },
    ],
  },
  benchmark: {
    title: "基准测试性能",
    description:
      "基于 Artificial Analysis 对视频质量、音频同步、生成速度和用户满意度的综合评估。",
    scores: [
      { name: "Seedance 2.0", score: "92/100", percentage: 92 },
      { name: "Veo 3", score: "87/100", percentage: 87 },
      { name: "Sora", score: "85/100", percentage: 85 },
      { name: "Runway Gen-3", score: "82/100", percentage: 82 },
      { name: "Kling", score: "79/100", percentage: 79 },
    ],
    source: "来源：Artificial Analysis AI 视频模型基准测试，2025",
  },
  useCases: {
    title: "最适合这些使用场景",
    bestChoice: "最佳选择",
    items: [
      {
        icon: "🎙️",
        title: "对话密集型内容",
        description: "广告、评价或任何需要完美唇形同步自然语音的内容。",
      },
      {
        icon: "🌍",
        title: "多语言内容",
        description: "全球营销、本地化内容或多语言教育材料。",
      },
      {
        icon: "🎵",
        title: "音乐视频",
        description: "AI 生成的音乐表演，演唱和动作完美同步。",
      },
      {
        icon: "📖",
        title: "叙事故事",
        description: "短片、预告片或任何需要多镜头序列的内容。",
      },
      {
        icon: "📢",
        title: "产品发布",
        description: "高质量 2K 广告，配合同步音频和画外音。",
      },
      {
        icon: "🎓",
        title: "教育内容",
        description: "讲解视频，清晰旁白和自然的主讲人唇形同步。",
      },
    ],
  },
  cta: {
    badge: "Artificial Analysis",
    title: "体验差异",
    description:
      "加入数千名已转向 Seedance 2.0 的创作者，体验原生音频同步的卓越 AI 视频生成。",
    button: "免费体验 Seedance 2.0",
  },
};
