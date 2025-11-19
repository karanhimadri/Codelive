import { Code2, Sparkles, Users, MessageSquare, Palette, ShieldCheck, Clipboard, Key } from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: <Code2 className="w-10 h-10" />,
    title: "Real-time Code Editing",
    description: "Collaboratively edit code with instant synchronization powered by WebSocket rooms and Yjs shared text.",
    gradient: "from-blue-500 to-cyan-400",
    shadowColor: "shadow-blue-500/20",
    hoverShadow: "hover:shadow-blue-500/40",
  },
  {
    id: 2,
    icon: <Users className="w-10 h-10" />,
    title: "Live User Presence",
    description: "See who created the room and who joined in real-time with dynamic user counts and active lists.",
    gradient: "from-purple-500 to-pink-400",
    shadowColor: "shadow-purple-500/20",
    hoverShadow: "hover:shadow-purple-500/40",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-10 h-10" />,
    title: "In-Room Chat",
    description: "Exchange messages instantly while coding—integrated chat keeps collaboration focused and fast.",
    gradient: "from-green-500 to-emerald-400",
    shadowColor: "shadow-green-500/20",
    hoverShadow: "hover:shadow-green-500/40",
  },
  {
    id: 4,
    icon: <Sparkles className="w-10 h-10" />,
    title: "AI Code Generation",
    description: "Generate boilerplate, helper functions, and snippets right inside the editor with one prompt.",
    gradient: "from-emerald-500 to-green-400",
    shadowColor: "shadow-emerald-500/20",
    hoverShadow: "hover:shadow-emerald-500/40",
  },
  {
    id: 5,
    icon: <Palette className="w-10 h-10" />,
    title: "Language & Theme Switch",
    description: "Quickly change programming languages and toggle dark/light themes for a personalized workspace.",
    gradient: "from-indigo-500 to-blue-400",
    shadowColor: "shadow-indigo-500/20",
    hoverShadow: "hover:shadow-indigo-500/40",
  },
  {
    id: 6,
    icon: <Key className="w-10 h-10" />,
    title: "Room Access Codes",
    description: "Create and join secure 6-digit rooms—simple guest fallback usernames keep access frictionless.",
    gradient: "from-orange-500 to-red-400",
    shadowColor: "shadow-orange-500/20",
    hoverShadow: "hover:shadow-orange-500/40",
  },
  {
    id: 7,
    icon: <Clipboard className="w-10 h-10" />,
    title: "Code Utilities",
    description: "Fast actions: copy room code, copy editor content, clear workspace, and auto file naming.",
    gradient: "from-slate-600 to-gray-500",
    shadowColor: "shadow-slate-500/20",
    hoverShadow: "hover:shadow-slate-500/40",
  },
  {
    id: 8,
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Session Stability",
    description: "Automatic reconnection handling and graceful leave/join state ensure smooth collaboration.",
    gradient: "from-rose-500 to-pink-400",
    shadowColor: "shadow-rose-500/20",
    hoverShadow: "hover:shadow-rose-500/40",
  },
];

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group relative bg-white border border-green-200 hover:border-green-500 p-8 transition-colors cursor-pointer">
      {/* Icon container */}
      <div className="relative w-16 h-16 mx-auto mb-6 bg-white border border-green-700 text-green-700 flex items-center justify-center">
        {icon}
      </div>

      <div className="relative z-10 text-center">
        <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-800 transition-colors">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <section className="relative min-h-full bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 mb-6">
            <span className="text-sm font-semibold text-green-700">
              POWERFUL FEATURES
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Built for Modern
            <br />
            Development
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Everything you need to build, collaborate, and deploy amazing applications with your team
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuresData.map(({ id, icon, title, description }) => (
            <FeatureCard
              key={id}
              icon={icon}
              title={title}
              description={description}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <button className="px-8 py-4 border border-green-700 text-green-800 font-semibold hover:bg-green-700 hover:text-white transition-colors">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;