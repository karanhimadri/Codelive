import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, FileText, Shield, Zap } from "lucide-react";

const faqData = [
    {
        id: 1,
        icon: <MessageCircle className="w-5 h-5" />,
        question: "How does real-time collaboration work?",
        answer: "Our real-time collaboration features allow multiple developers to work on the same project simultaneously. You can see live cursors, instant code changes, and communicate through integrated chat. All changes are synchronized in real-time with conflict resolution to ensure smooth teamwork.",
        category: "Collaboration"
    },
    {
        id: 2,
        icon: <Shield className="w-5 h-5" />,
        question: "Is my code and data secure?",
        answer: "Absolutely! We use enterprise-grade encryption for all data in transit and at rest. Your code is stored in secure, geo-distributed data centers with automatic backups. We're SOC 2 compliant and follow industry best practices for security and privacy.",
        category: "Security"
    },
    {
        id: 3,
        icon: <Zap className="w-5 h-5" />,
        question: "What programming languages and frameworks are supported?",
        answer: "We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, and more. Popular frameworks like React, Vue, Angular, Django, Flask, Spring Boot, and Node.js are fully supported with intelligent code completion and debugging.",
        category: "Development"
    },
    {
        id: 4,
        icon: <FileText className="w-5 h-5" />,
        question: "Can I import existing projects?",
        answer: "Yes! You can easily import projects from GitHub, GitLab, Bitbucket, or upload files directly. Our platform automatically detects project structure, dependencies, and sets up the appropriate development environment for you.",
        category: "Getting Started"
    },
    {
        id: 5,
        icon: <HelpCircle className="w-5 h-5" />,
        question: "What are the pricing plans?",
        answer: "We offer flexible pricing starting with a free tier for individual developers. Pro plans start at $10/month with advanced features, unlimited private projects, and priority support. Enterprise plans include custom integrations and dedicated support.",
        category: "Pricing"
    },
    {
        id: 6,
        icon: <MessageCircle className="w-5 h-5" />,
        question: "How do I deploy my applications?",
        answer: "Deployment is as simple as clicking a button! We integrate with major cloud providers like AWS, Google Cloud, and Azure. You can set up automated CI/CD pipelines, custom domains, and environment variables with just a few clicks.",
        category: "Deployment"
    },
    {
        id: 7,
        icon: <Shield className="w-5 h-5" />,
        question: "Do you offer customer support?",
        answer: "Yes! We provide 24/7 support through multiple channels including live chat, email, and community forums. Pro and Enterprise users get priority support with dedicated account managers and faster response times.",
        category: "Support"
    },
    {
        id: 8,
        icon: <Zap className="w-5 h-5" />,
        question: "Can I work offline?",
        answer: "While our platform is cloud-based, we offer offline capabilities for premium users. You can sync your work locally, continue coding without internet, and sync changes once you're back online. All your work is automatically backed up.",
        category: "Features"
    }
];

// Categories removed: simplifying FAQ page to a single list without filters

const FAQItem = ({ faq, isOpen, onToggle }) => {
    return (
        <div className="group bg-white border border-green-200 transition-colors overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full p-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500/20"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-green-600 text-green-700 flex items-center justify-center">
                        {faq.icon}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                            {faq.question}
                        </h3>
                    </div>
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-green-700 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div className={`overflow-hidden transition-all ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6">
                    <div className="pl-14">
                        <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FAQSection = () => {
    const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

    const toggleItem = (id) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    const filteredFAQs = faqData; // Show all FAQs without filtering

    return (
    <section className="relative min-h-full bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 blur-3xl"></div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 mb-6">
                        <span className="text-sm font-semibold text-green-700">
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Got Questions?
                        <br />
                        We've Got Answers
                    </h2>
                    <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        Find answers to the most common questions about our development platform
                    </p>
                </div>

                {/* Category filter removed for simplicity */}

                {/* FAQ Items */}
                <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openItems.has(faq.id)}
                            onToggle={() => toggleItem(faq.id)}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16 p-8 bg-green-50 border border-green-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-gray-700 mb-6">
                        Our support team is here to help you get started
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-green-700 text-white font-semibold border border-green-700 hover:bg-white hover:text-green-800 transition-colors">
                            Contact Support
                        </button>
                        <button className="px-6 py-3 bg-white text-green-800 font-semibold border border-green-300 hover:bg-green-50 transition-colors">
                            View Documentation
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;