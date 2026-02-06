import { getTranslations } from "next-intl/server";
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
      ? "Seedance 2.0 使用指南 - Prompt 技巧与最佳实践"
      : "Seedance 2.0 Guide - Prompt Tips & Best Practices",
    description: isZh
      ? "学习如何使用 Seedance 2.0 生成高质量 AI 视频。掌握 Prompt 编写技巧、多语言唇形同步设置、多镜头叙事创作方法。"
      : "Learn how to create high-quality AI videos with Seedance 2.0. Master prompt writing, multi-language lip-sync, and multi-shot narrative techniques.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/guide`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === "zh";

  const content = isZh ? zhContent : enContent;

  return (
    <div className="container py-16 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
          {content.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {content.subtitle}
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6" id="quick-start">
          {content.quickStart.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {content.quickStart.steps.map((step, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-lg">{step.title}</h3>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prompt Guide */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6" id="prompt-guide">
          {content.promptGuide.title}
        </h2>
        <p className="text-muted-foreground mb-8">
          {content.promptGuide.intro}
        </p>

        {/* Prompt Structure */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {content.promptGuide.structure.title}
          </h3>
          <div className="p-6 rounded-xl border border-border bg-muted/50">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {content.promptGuide.structure.template}
            </pre>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {content.promptGuide.examples.title}
          </h3>
          <div className="space-y-4">
            {content.promptGuide.examples.items.map((example, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <h4 className="font-medium mb-2">{example.category}</h4>
                <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm">
                  {example.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {content.promptGuide.tips.title}
          </h3>
          <ul className="space-y-3">
            {content.promptGuide.tips.items.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Multi-Language Lip Sync */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6" id="lip-sync">
          {content.lipSync.title}
        </h2>
        <p className="text-muted-foreground mb-6">
          {content.lipSync.intro}
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {content.lipSync.languages.map((lang, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-border bg-card text-center"
            >
              <span className="text-2xl mb-2 block">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Shot Narratives */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6" id="multi-shot">
          {content.multiShot.title}
        </h2>
        <p className="text-muted-foreground mb-6">
          {content.multiShot.intro}
        </p>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-3">{content.multiShot.example.title}</h3>
          <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm whitespace-pre-wrap">
            {content.multiShot.example.prompt}
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6" id="best-practices">
          {content.bestPractices.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {content.bestPractices.items.map((practice, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-border bg-card"
            >
              <div className="text-2xl mb-3">{practice.icon}</div>
              <h3 className="font-semibold mb-2">{practice.title}</h3>
              <p className="text-muted-foreground text-sm">
                {practice.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5">
        <h2 className="text-2xl font-bold mb-4">{content.cta.title}</h2>
        <p className="text-muted-foreground mb-6">{content.cta.description}</p>
        <a
          href="https://jimeng.jianying.com/ai-tool/seedance"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
        >
          {content.cta.button}
        </a>
      </section>
    </div>
  );
}

const enContent = {
  title: "Seedance 2.0 Guide",
  subtitle: "Master AI video generation with native audio synchronization",
  quickStart: {
    title: "Quick Start",
    steps: [
      {
        title: "Access Seedance 2.0",
        description:
          "Visit Jimeng AI platform and select Seedance 2.0 from the video generation tools.",
      },
      {
        title: "Write Your Prompt",
        description:
          "Describe your scene, characters, dialogue, and audio in detail. Be specific about mood and setting.",
      },
      {
        title: "Configure Settings",
        description:
          "Choose language for lip-sync, resolution (up to 2K), and visual style.",
      },
      {
        title: "Generate & Download",
        description:
          "Click generate and wait for your synchronized audio-video to be ready for download.",
      },
    ],
  },
  promptGuide: {
    title: "Prompt Writing Guide",
    intro:
      "Effective prompts are key to getting great results. Here's how to structure your prompts for optimal output.",
    structure: {
      title: "Prompt Structure",
      template: `[Scene Setting]: Describe the environment and atmosphere
[Characters]: Who appears, their appearance, expressions
[Action]: What happens in the scene
[Dialogue/Audio]: Spoken words or sound effects
[Camera]: Shot type, movement, angle
[Style]: Visual style and mood`,
    },
    examples: {
      title: "Example Prompts",
      items: [
        {
          category: "Dialogue Scene",
          prompt:
            'A woman in a modern office, smiling warmly, speaks directly to camera: "Welcome to our company. I\'m excited to show you around today." Professional lighting, medium close-up shot, corporate style.',
        },
        {
          category: "Action with Sound",
          prompt:
            "A chef in a busy kitchen, chopping vegetables rapidly on a wooden cutting board. The sound of knife hitting board rhythmically. Steam rising from pots in background. Cinematic lighting, dynamic camera movements.",
        },
        {
          category: "Multi-Shot Narrative",
          prompt:
            "Shot 1: Wide shot of a serene forest at dawn, birds singing. Shot 2: Close-up of a hiker's boots stepping on fallen leaves, crunching sounds. Shot 3: Medium shot of the hiker stopping to admire the view, taking a deep breath.",
        },
      ],
    },
    tips: {
      title: "Pro Tips",
      items: [
        "Be specific about emotions and expressions for better lip-sync",
        "Include audio descriptions for synchronized sound effects",
        "Specify camera movements for more dynamic shots",
        "Use scene transitions for multi-shot narratives",
        "Mention lighting conditions for consistent visual quality",
        "Keep dialogue natural and conversational",
      ],
    },
  },
  lipSync: {
    title: "Multi-Language Lip Sync",
    intro:
      "Seedance 2.0 supports phoneme-level lip synchronization in 8+ languages. Simply include dialogue in your prompt and specify the language.",
    languages: [
      { flag: "🇺🇸", name: "English" },
      { flag: "🇨🇳", name: "Chinese" },
      { flag: "🇯🇵", name: "Japanese" },
      { flag: "🇰🇷", name: "Korean" },
      { flag: "🇪🇸", name: "Spanish" },
      { flag: "🇫🇷", name: "French" },
      { flag: "🇩🇪", name: "German" },
      { flag: "🇧🇷", name: "Portuguese" },
    ],
  },
  multiShot: {
    title: "Multi-Shot Narratives",
    intro:
      "Create complex, cinematic sequences with multiple shots from a single prompt. Seedance 2.0 maintains character and scene consistency across shots.",
    example: {
      title: "Multi-Shot Example",
      prompt: `Scene: A tense job interview

Shot 1: Wide shot of a modern office. An applicant walks in nervously. Door closing sound.

Shot 2: Close-up of the interviewer's face, stern expression. "Tell me about yourself."

Shot 3: Medium shot of the applicant, gaining confidence. "I've spent five years perfecting my craft..."

Shot 4: Two-shot of both, interviewer nodding approvingly. "Impressive. When can you start?"`,
    },
  },
  bestPractices: {
    title: "Best Practices",
    items: [
      {
        icon: "🎯",
        title: "Be Specific",
        description:
          "Vague prompts lead to unpredictable results. Include details about setting, lighting, and mood.",
      },
      {
        icon: "🔊",
        title: "Describe Audio",
        description:
          "Always include audio descriptions - dialogue, sound effects, ambient sounds - for full synchronization.",
      },
      {
        icon: "👤",
        title: "Character Details",
        description:
          "Describe character appearance, clothing, and expressions for consistent generation.",
      },
      {
        icon: "🎬",
        title: "Camera Direction",
        description:
          "Specify shot types (close-up, wide, medium) and camera movements for cinematic quality.",
      },
      {
        icon: "⚡",
        title: "Keep It Focused",
        description:
          "One clear concept per generation works better than cramming multiple ideas.",
      },
      {
        icon: "🔄",
        title: "Iterate & Refine",
        description:
          "Start with a basic prompt and refine based on results. Small changes can make big differences.",
      },
    ],
  },
  cta: {
    title: "Ready to Create?",
    description: "Start generating stunning AI videos with native audio sync",
    button: "Try Seedance 2.0 Free",
  },
};

const zhContent = {
  title: "Seedance 2.0 使用指南",
  subtitle: "掌握原生音视频同步的 AI 视频生成",
  quickStart: {
    title: "快速开始",
    steps: [
      {
        title: "访问 Seedance 2.0",
        description:
          "进入即梦 AI 平台，从视频生成工具中选择 Seedance 2.0。",
      },
      {
        title: "编写 Prompt",
        description:
          "详细描述场景、角色、对话和音频。具体说明情绪和环境设置。",
      },
      {
        title: "配置设置",
        description:
          "选择唇形同步语言、分辨率（最高 2K）和视觉风格。",
      },
      {
        title: "生成并下载",
        description:
          "点击生成，等待同步音视频准备完成后下载。",
      },
    ],
  },
  promptGuide: {
    title: "Prompt 编写指南",
    intro:
      "有效的 Prompt 是获得优质结果的关键。以下是如何构建 Prompt 以获得最佳输出。",
    structure: {
      title: "Prompt 结构",
      template: `[场景设置]: 描述环境和氛围
[角色]: 出场人物、外貌、表情
[动作]: 场景中发生什么
[对话/音频]: 台词或音效
[镜头]: 镜头类型、移动、角度
[风格]: 视觉风格和情绪`,
    },
    examples: {
      title: "示例 Prompt",
      items: [
        {
          category: "对话场景",
          prompt:
            '一位女性在现代办公室中，温暖微笑，面对镜头说："欢迎来到我们公司。今天我很高兴带您参观。" 专业灯光，中景特写，商务风格。',
        },
        {
          category: "带音效的动作",
          prompt:
            "一位厨师在繁忙的厨房里，在木砧板上快速切菜。刀声有节奏地响起。背景中锅里蒸汽升腾。电影级灯光，动态镜头运动。",
        },
        {
          category: "多镜头叙事",
          prompt:
            "镜头 1：黎明时分宁静森林的全景，鸟鸣声。镜头 2：徒步者靴子踩在落叶上的特写，沙沙声。镜头 3：徒步者停下欣赏风景的中景，深呼吸。",
        },
      ],
    },
    tips: {
      title: "专业技巧",
      items: [
        "具体描述情感和表情以获得更好的唇形同步",
        "包含音频描述以实现同步音效",
        "指定镜头运动以获得更动态的画面",
        "使用场景过渡来实现多镜头叙事",
        "说明灯光条件以保持一致的视觉质量",
        "保持对话自然流畅",
      ],
    },
  },
  lipSync: {
    title: "多语言唇形同步",
    intro:
      "Seedance 2.0 支持 8+ 语言的音素级唇形同步。只需在 Prompt 中包含对话并指定语言。",
    languages: [
      { flag: "🇺🇸", name: "英语" },
      { flag: "🇨🇳", name: "中文" },
      { flag: "🇯🇵", name: "日语" },
      { flag: "🇰🇷", name: "韩语" },
      { flag: "🇪🇸", name: "西班牙语" },
      { flag: "🇫🇷", name: "法语" },
      { flag: "🇩🇪", name: "德语" },
      { flag: "🇧🇷", name: "葡萄牙语" },
    ],
  },
  multiShot: {
    title: "多镜头叙事",
    intro:
      "通过单个 Prompt 创建包含多个镜头的复杂电影级序列。Seedance 2.0 在镜头之间保持角色和场景的一致性。",
    example: {
      title: "多镜头示例",
      prompt: `场景：一场紧张的工作面试

镜头 1：现代办公室全景。求职者紧张地走进来。门关闭的声音。

镜头 2：面试官面部特写，表情严肃。"请介绍一下你自己。"

镜头 3：求职者中景，逐渐自信起来。"我花了五年时间精进我的技能..."

镜头 4：两人同框，面试官赞许地点头。"令人印象深刻。你什么时候能开始？"`,
    },
  },
  bestPractices: {
    title: "最佳实践",
    items: [
      {
        icon: "🎯",
        title: "具体明确",
        description:
          "模糊的 Prompt 会导致不可预测的结果。包含场景、灯光和情绪的细节。",
      },
      {
        icon: "🔊",
        title: "描述音频",
        description:
          "始终包含音频描述 - 对话、音效、环境音 - 以实现完整同步。",
      },
      {
        icon: "👤",
        title: "角色细节",
        description:
          "描述角色外貌、服装和表情，以获得一致的生成效果。",
      },
      {
        icon: "🎬",
        title: "镜头指导",
        description:
          "指定镜头类型（特写、全景、中景）和镜头运动，以获得电影级质量。",
      },
      {
        icon: "⚡",
        title: "保持专注",
        description:
          "每次生成一个清晰的概念比塞入多个想法效果更好。",
      },
      {
        icon: "🔄",
        title: "迭代优化",
        description:
          "从基础 Prompt 开始，根据结果进行优化。小改变可以带来大不同。",
      },
    ],
  },
  cta: {
    title: "准备好创作了吗？",
    description: "开始生成原生音频同步的精彩 AI 视频",
    button: "免费体验 Seedance 2.0",
  },
};
