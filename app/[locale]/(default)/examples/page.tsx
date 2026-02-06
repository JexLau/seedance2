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
      ? "Seedance 2.0 示例库 - AI 视频生成案例与 Prompt"
      : "Seedance 2.0 Examples - AI Video Generation Gallery with Prompts",
    description: isZh
      ? "探索 Seedance 2.0 生成的视频示例，包含完整 Prompt。涵盖对话场景、多语言唇形同步、音乐表演、产品广告等多种类型。"
      : "Explore Seedance 2.0 video examples with full prompts. Includes dialogue scenes, multi-language lip-sync, musical performances, product commercials, and more.",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/examples`,
    },
  };
}

export default async function ExamplesPage({
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
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 lg:text-5xl">
          {content.title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {content.subtitle}
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {content.categories.map((category, i) => (
          <a
            key={i}
            href={`#${category.id}`}
            className="px-4 py-2 rounded-full border border-border bg-card hover:bg-accent transition-colors text-sm font-medium"
          >
            {category.icon} {category.name}
          </a>
        ))}
      </div>

      {/* Examples by Category */}
      {content.categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="mb-20" id={category.id}>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">{category.icon}</span>
            <h2 className="text-2xl font-bold">{category.name}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {category.examples.map((example, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Thumbnail/Video Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-primary ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {example.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{example.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {example.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Prompt */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{content.promptLabel}</span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg text-sm font-mono text-muted-foreground max-h-32 overflow-y-auto">
                      {example.prompt}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="text-center py-16 px-6 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5">
        <h2 className="text-3xl font-bold mb-4">{content.cta.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          {content.cta.description}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://jimeng.jianying.com/ai-tool/seedance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8"
          >
            {content.cta.primaryButton}
          </a>
          <a
            href="/guide"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8"
          >
            {content.cta.secondaryButton}
          </a>
        </div>
      </section>
    </div>
  );
}

const enContent = {
  title: "Seedance 2.0 Examples",
  subtitle: "Explore what's possible with native audio-video synchronization",
  promptLabel: "Prompt",
  categories: [
    {
      id: "dialogue",
      name: "Dialogue Scenes",
      icon: "💬",
      examples: [
        {
          title: "Corporate Introduction",
          description: "Professional spokesperson with perfect English lip-sync",
          duration: "0:15",
          tags: ["English", "Corporate", "Lip-sync"],
          prompt:
            'A professional woman in a modern office lobby, wearing a navy blazer, speaks warmly to camera: "Welcome to InnovateTech. We\'ve been pioneering AI solutions for over a decade, and today I\'m thrilled to show you our latest breakthrough." Soft natural lighting, medium shot, corporate style.',
        },
        {
          title: "Customer Testimonial",
          description: "Authentic testimonial with emotional expressions",
          duration: "0:20",
          tags: ["English", "Testimonial", "Emotional"],
          prompt:
            'A young entrepreneur in a cafe setting, genuine smile, speaks enthusiastically: "Before using this platform, I spent hours on video editing. Now I create professional content in minutes. It\'s completely transformed my business." Natural lighting, close-up shot, casual documentary style.',
        },
        {
          title: "Multi-Language Greeting",
          description: "Same character speaking in three languages",
          duration: "0:30",
          tags: ["Multi-language", "Chinese", "English", "Japanese"],
          prompt:
            'A friendly host in a broadcast studio. Shot 1: Says in Chinese "欢迎收看今天的节目". Shot 2: Same host, now in English "Welcome to today\'s show". Shot 3: Now in Japanese "今日の番組へようこそ". Each with perfect lip-sync. Bright studio lighting, medium close-up.',
        },
      ],
    },
    {
      id: "music",
      name: "Musical Performances",
      icon: "🎵",
      examples: [
        {
          title: "Pop Singer Performance",
          description: "AI singer with synchronized vocals and movements",
          duration: "0:45",
          tags: ["Music", "Pop", "Performance"],
          prompt:
            'A young female pop singer on a neon-lit stage, energetic performance. Singing an upbeat pop song with lyrics about chasing dreams. Dynamic camera movements, concert lighting with purple and blue hues. Close-ups of singing face perfectly synced with audio, wide shots of dancing.',
        },
        {
          title: "Jazz Lounge",
          description: "Smooth jazz performance with ambient sounds",
          duration: "0:30",
          tags: ["Music", "Jazz", "Ambient"],
          prompt:
            'A jazz singer in a dimly lit lounge, vintage microphone, elegant black dress. Singing a slow, soulful jazz standard. Warm amber lighting, smoke effects, intimate close-up. Background sounds of glasses clinking, soft audience murmurs. Cinematic noir style.',
        },
      ],
    },
    {
      id: "commercial",
      name: "Product Commercials",
      icon: "📺",
      examples: [
        {
          title: "Tech Product Launch",
          description: "Sleek product reveal with voiceover",
          duration: "0:30",
          tags: ["Commercial", "Tech", "Voiceover"],
          prompt:
            'Shot 1: Close-up of a sleek smartphone slowly rotating on a white pedestal, soft ambient whoosh sound. Shot 2: Screen lights up showing interface, gentle chime. Shot 3: Pull back to reveal the device in hand. Voiceover: "Introducing the future of mobile technology." Minimalist studio lighting, Apple-style commercial aesthetic.',
        },
        {
          title: "Food Commercial",
          description: "Appetizing food shots with sizzling sounds",
          duration: "0:20",
          tags: ["Commercial", "Food", "Sound Effects"],
          prompt:
            'A juicy burger being assembled in slow motion. Sizzling sound as patty hits the grill, crisp lettuce placed, cheese melting. Camera circles around the finished burger. Steam rising, droplets of sauce. Rich, warm lighting. Sound of satisfying crunch as someone takes a bite off-screen.',
        },
      ],
    },
    {
      id: "narrative",
      name: "Multi-Shot Narratives",
      icon: "🎬",
      examples: [
        {
          title: "Morning Routine",
          description: "Cinematic daily life sequence",
          duration: "0:45",
          tags: ["Narrative", "Lifestyle", "Multi-shot"],
          prompt:
            'Shot 1: Sunrise through bedroom window, alarm clock rings. Shot 2: Close-up of eyes opening, stretching sounds. Shot 3: Coffee pouring into cup, rich aroma suggested by steam. Shot 4: Person stepping onto city balcony, deep breath, city sounds below. Shot 5: Walking out the door with determination. Warm morning light throughout.',
        },
        {
          title: "Thriller Sequence",
          description: "Suspenseful multi-shot scene with tension",
          duration: "0:40",
          tags: ["Narrative", "Thriller", "Suspense"],
          prompt:
            'Shot 1: Dark hallway, footsteps echoing. Shot 2: Close-up of hand reaching for door handle, heartbeat sound. Shot 3: Door creaks open slowly, revealing darkness. Shot 4: Flash of lightning illuminates a figure. Shot 5: Quick cut to running feet. Desaturated colors, high contrast lighting, horror film aesthetic.',
        },
      ],
    },
    {
      id: "education",
      name: "Educational Content",
      icon: "📚",
      examples: [
        {
          title: "Science Explainer",
          description: "Educational content with clear narration",
          duration: "0:45",
          tags: ["Education", "Science", "Explainer"],
          prompt:
            'A friendly scientist in a lab coat, standing before a holographic DNA helix. Explains enthusiastically: "DNA is the blueprint of life. These four base pairs - A, T, G, and C - contain all the instructions to build a living organism." Points to different parts of the hologram. Bright, clean laboratory setting, educational documentary style.',
        },
        {
          title: "Language Learning",
          description: "Language lesson with pronunciation focus",
          duration: "0:30",
          tags: ["Education", "Language", "Pronunciation"],
          prompt:
            'A language teacher in a bright classroom, speaking slowly and clearly. "Let\'s practice the French R sound. Watch my mouth: Rouge. R-r-rouge." Extreme close-up of mouth for pronunciation, then medium shot for context. Clear audio, emphasis on lip movements. Friendly, encouraging tone.',
        },
      ],
    },
    {
      id: "nature",
      name: "Nature & Documentary",
      icon: "🌿",
      examples: [
        {
          title: "Wildlife Documentary",
          description: "Nature scene with ambient sounds and narration",
          duration: "0:40",
          tags: ["Nature", "Documentary", "Wildlife"],
          prompt:
            'Shot 1: Wide shot of African savanna at golden hour, wind in grass sounds. Shot 2: Close-up of a lion resting, breathing sounds, flies buzzing. Shot 3: The lion stands, looking into distance. Narrator: "The king surveys his domain, ever vigilant." David Attenborough-style documentary, cinematic 2K quality.',
        },
        {
          title: "Ocean Serenity",
          description: "Calming ocean footage with ambient audio",
          duration: "0:30",
          tags: ["Nature", "Ocean", "Ambient"],
          prompt:
            'Waves gently lapping on a pristine beach at sunset. Sound of ocean, seagulls in distance. Camera slowly pans across the horizon. Orange and pink sky reflected in wet sand. Foam patterns on shore. Peaceful, meditative atmosphere. No dialogue, pure ambient soundscape.',
        },
      ],
    },
  ],
  cta: {
    title: "Create Your Own",
    description:
      "These examples showcase just a fraction of what Seedance 2.0 can do. Start creating your own AI videos with native audio synchronization.",
    primaryButton: "Try Seedance 2.0 Free",
    secondaryButton: "Read the Guide",
  },
};

const zhContent = {
  title: "Seedance 2.0 示例库",
  subtitle: "探索原生音视频同步的无限可能",
  promptLabel: "Prompt",
  categories: [
    {
      id: "dialogue",
      name: "对话场景",
      icon: "💬",
      examples: [
        {
          title: "企业介绍",
          description: "专业发言人，完美英语唇形同步",
          duration: "0:15",
          tags: ["英语", "企业", "唇形同步"],
          prompt:
            '一位专业女性在现代办公大厅，穿着海军蓝西装外套，温暖地对镜头说："欢迎来到创新科技。十多年来，我们一直在开拓 AI 解决方案，今天我很高兴向您展示我们的最新突破。" 柔和自然光，中景，企业风格。',
        },
        {
          title: "客户评价",
          description: "真实评价，情感表达丰富",
          duration: "0:20",
          tags: ["英语", "评价", "情感"],
          prompt:
            '一位年轻创业者在咖啡馆场景中，真诚微笑，热情地说："在使用这个平台之前，我花几个小时在视频剪辑上。现在几分钟就能创作专业内容。它彻底改变了我的业务。" 自然光，特写镜头，休闲纪录片风格。',
        },
        {
          title: "多语言问候",
          description: "同一角色使用三种语言",
          duration: "0:30",
          tags: ["多语言", "中文", "英语", "日语"],
          prompt:
            '一位友好的主持人在演播室。镜头 1：用中文说"欢迎收看今天的节目"。镜头 2：同一主持人，用英语说"Welcome to today\'s show"。镜头 3：用日语说"今日の番組へようこそ"。每段都完美唇形同步。明亮的演播室灯光，中特写。',
        },
      ],
    },
    {
      id: "music",
      name: "音乐表演",
      icon: "🎵",
      examples: [
        {
          title: "流行歌手表演",
          description: "AI 歌手，演唱和动作完美同步",
          duration: "0:45",
          tags: ["音乐", "流行", "表演"],
          prompt:
            '一位年轻女流行歌手在霓虹灯舞台上，充满活力的表演。唱着关于追梦的欢快流行歌曲。动态镜头运动，紫色和蓝色色调的演唱会灯光。唱歌面部特写与音频完美同步，跳舞全景镜头。',
        },
        {
          title: "爵士酒吧",
          description: "流畅的爵士表演配合环境音",
          duration: "0:30",
          tags: ["音乐", "爵士", "环境音"],
          prompt:
            '一位爵士歌手在灯光昏暗的酒吧，复古麦克风，优雅的黑色连衣裙。唱着一首缓慢深情的爵士经典。温暖的琥珀色灯光，烟雾效果，亲密特写。背景有玻璃杯碰撞声，观众轻声低语。电影黑色风格。',
        },
      ],
    },
    {
      id: "commercial",
      name: "产品广告",
      icon: "📺",
      examples: [
        {
          title: "科技产品发布",
          description: "时尚产品展示配合画外音",
          duration: "0:30",
          tags: ["广告", "科技", "画外音"],
          prompt:
            '镜头 1：一部时尚智能手机在白色底座上缓慢旋转的特写，柔和的环境风声。镜头 2：屏幕亮起显示界面，轻柔的提示音。镜头 3：拉远展示手中的设备。画外音："介绍移动技术的未来。" 极简主义工作室灯光，苹果风格广告美学。',
        },
        {
          title: "美食广告",
          description: "诱人的美食镜头配合滋滋声",
          duration: "0:20",
          tags: ["广告", "美食", "音效"],
          prompt:
            '一个多汁汉堡慢动作组装。肉饼放上烤架的滋滋声，放上脆生菜，奶酪融化。镜头环绕成品汉堡。蒸汽升腾，酱汁滴落。丰富温暖的灯光。画面外有人咬一口的满足脆响声。',
        },
      ],
    },
    {
      id: "narrative",
      name: "多镜头叙事",
      icon: "🎬",
      examples: [
        {
          title: "晨间日常",
          description: "电影级日常生活序列",
          duration: "0:45",
          tags: ["叙事", "生活方式", "多镜头"],
          prompt:
            '镜头 1：日出透过卧室窗户，闹钟响起。镜头 2：眼睛睁开的特写，伸懒腰的声音。镜头 3：咖啡倒入杯中，蒸汽暗示浓郁香气。镜头 4：人走上城市阳台，深呼吸，下方城市声音。镜头 5：坚定地走出门。全程温暖的晨光。',
        },
        {
          title: "悬疑序列",
          description: "充满张力的多镜头悬疑场景",
          duration: "0:40",
          tags: ["叙事", "悬疑", "惊悚"],
          prompt:
            '镜头 1：黑暗走廊，脚步声回响。镜头 2：手伸向门把手的特写，心跳声。镜头 3：门缓慢吱呀打开，露出黑暗。镜头 4：闪电照亮一个身影。镜头 5：快速切换到奔跑的脚。去饱和色彩，高对比度灯光，恐怖片美学。',
        },
      ],
    },
    {
      id: "education",
      name: "教育内容",
      icon: "📚",
      examples: [
        {
          title: "科学讲解",
          description: "清晰旁白的教育内容",
          duration: "0:45",
          tags: ["教育", "科学", "讲解"],
          prompt:
            '一位友好的科学家穿着白大褂，站在全息 DNA 螺旋前。热情地解释："DNA 是生命的蓝图。这四种碱基对 - A、T、G 和 C - 包含构建生物体的所有指令。" 指向全息图的不同部分。明亮整洁的实验室环境，教育纪录片风格。',
        },
        {
          title: "语言学习",
          description: "注重发音的语言课程",
          duration: "0:30",
          tags: ["教育", "语言", "发音"],
          prompt:
            '一位语言老师在明亮的教室里，说话缓慢清晰。"让我们练习法语 R 音。看我的嘴：Rouge。R-r-rouge。" 发音时嘴部极度特写，然后中景展示语境。清晰的音频，强调唇部动作。友好、鼓励的语气。',
        },
      ],
    },
    {
      id: "nature",
      name: "自然纪录片",
      icon: "🌿",
      examples: [
        {
          title: "野生动物纪录片",
          description: "自然场景配合环境音和旁白",
          duration: "0:40",
          tags: ["自然", "纪录片", "野生动物"],
          prompt:
            '镜头 1：黄金时段非洲大草原全景，风吹过草丛的声音。镜头 2：狮子休息的特写，呼吸声，苍蝇嗡嗡声。镜头 3：狮子站起来，望向远方。旁白："王者巡视他的领地，始终保持警觉。" 大卫·爱登堡风格纪录片，电影级 2K 画质。',
        },
        {
          title: "海洋宁静",
          description: "舒缓的海洋画面配合环境音",
          duration: "0:30",
          tags: ["自然", "海洋", "环境音"],
          prompt:
            '日落时分海浪轻轻拍打原始海滩。海浪声，远处海鸥叫声。镜头缓慢扫过地平线。橙色和粉色天空倒映在湿沙上。岸边泡沫图案。平静、冥想的氛围。无对话，纯环境音景。',
        },
      ],
    },
  ],
  cta: {
    title: "创作你自己的作品",
    description:
      "这些示例只展示了 Seedance 2.0 能力的一小部分。开始创作你自己的原生音频同步 AI 视频。",
    primaryButton: "免费体验 Seedance 2.0",
    secondaryButton: "阅读使用指南",
  },
};
