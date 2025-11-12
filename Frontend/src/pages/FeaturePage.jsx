import React from "react";
import { Code2, Cpu, Zap, ShieldCheck, GitBranch, Rocket, Terminal, Users } from "lucide-react";

const featuresData = [
    {
        id: 1,
        icon: <Code2 className="w-10 h-10" />,
        title: "Real-time Collaboration",
        description:
            "Code and debug together with your team instantly, no delays or sync issues.",
        gradient: "from-blue-500 to-cyan-400",
        shadowColor: "shadow-blue-500/20",
        hoverShadow: "hover:shadow-blue-500/40",
    },
    {
        id: 2,
        icon: <Cpu className="w-10 h-10" />,
        title: "Cloud-based IDE",
        description:
            "Access your projects from anywhere with a powerful cloud IDE that runs in your browser.",
        gradient: "from-purple-500 to-pink-400",
        shadowColor: "shadow-purple-500/20",
        hoverShadow: "hover:shadow-purple-500/40",
    },
    {
        id: 3,
        icon: <Zap className="w-10 h-10" />,
        title: "Instant Preview",
        description:
            "See your code changes in real-time with live preview for HTML, CSS, and JavaScript.",
        gradient: "from-green-500 to-emerald-400",
        shadowColor: "shadow-green-500/20",
        hoverShadow: "hover:shadow-green-500/40",
    },
    {
        id: 4,
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Secure & Reliable",
        description:
            "Your code and data are protected with state-of-the-art encryption and backups.",
        gradient: "from-indigo-500 to-blue-400",
        shadowColor: "shadow-indigo-500/20",
        hoverShadow: "hover:shadow-indigo-500/40",
    },
    {
        id: 5,
        icon: <GitBranch className="w-10 h-10" />,
        title: "Git Integration",
        description:
            "Seamless version control with built-in Git support, branch management, and merge conflict resolution.",
        gradient: "from-orange-500 to-red-400",
        shadowColor: "shadow-orange-500/20",
        hoverShadow: "hover:shadow-orange-500/40",
    },
    {
        id: 6,
        icon: <Rocket className="w-10 h-10" />,
        title: "One-Click Deploy",
        description:
            "Deploy your applications instantly to the cloud with automated CI/CD pipelines and monitoring.",
        gradient: "from-teal-500 to-cyan-400",
        shadowColor: "shadow-teal-500/20",
        hoverShadow: "hover:shadow-teal-500/40",
    },
    {
        id: 7,
        icon: <Terminal className="w-10 h-10" />,
        title: "Integrated Terminal",
        description:
            "Full-featured terminal access with package management, custom scripts, and development tools.",
        gradient: "from-slate-600 to-gray-500",
        shadowColor: "shadow-slate-500/20",
        hoverShadow: "hover:shadow-slate-500/40",
    },
    {
        id: 8,
        icon: <Users className="w-10 h-10" />,
        title: "Team Management",
        description:
            "Organize projects with role-based permissions, team workspaces, and collaborative workflows.",
        gradient: "from-rose-500 to-pink-400",
        shadowColor: "shadow-rose-500/20",
        hoverShadow: "hover:shadow-rose-500/40",
    },
];

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="group relative bg-white border border-green-200 p-8 transition-colors cursor-pointer">
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