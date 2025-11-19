import { useState, useEffect } from "react";
import { Code, Users, GraduationCap, ArrowRight, Play, Star, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const HomePage = () => {
  // Mock navigation function for demo
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Code with your team",
      description: "Open a Codeshare editor, write or copy code, then share it with friends and colleagues. Pair program and troubleshoot together in real-time.",
      buttonText: "Start Collaboration",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Interview developers",
      description: "Set coding tasks and observe in real-time when interviewing remotely or in person. Streamlined technical interviews made simple.",
      buttonText: "Begin Interview",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Teach programming",
      description: "Share your code with students and peers, then educate them effectively. Universities worldwide trust our platform for coding education.",
      buttonText: "Start Teaching",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  const handleNavigation = () => {
    navigate("/code-space");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          {/* Hero Content */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded bg-green-100 text-green-800 text-sm font-medium mb-8">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 100,000+ developers worldwide
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Share Code in{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Real-time
              </span>
              <br />
              with Developers
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
              The most intuitive online code editor for interviews, collaboration, teaching, and troubleshooting.
              Code together, anywhere, anytime.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleNavigation}
                className="px-8 py-3 border border-green-700 text-green-800 text-sm font-medium tracking-wide hover:bg-green-700 hover:text-white transition-colors flex items-center"
              >
                Start Sharing
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button className="px-8 py-3 border border-green-300 text-green-800 text-sm font-medium tracking-wide hover:bg-green-200 transition-colors flex items-center">
                <Play className="w-4 h-4 mr-2" />
                Demo
              </button>
            </div>

            <p className="text-sm text-green-700">Free to use • No signup required • Works everywhere</p>
          </div>

          {/* Video Showcase */}
          <div className={`mt-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Main Video */}
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute inset-0"></div>
                  <div className="relative bg-white p-2 border border-green-200">
                    <video
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={assets.coding_video} type="video/mp4" />
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <Code className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-600">Demo Video Placeholder</p>
                        </div>
                      </div>
                    </video>
                  </div>
                </div>
              </div>

              {/* Side Videos */}
              <div className="hidden lg:flex flex-col gap-6">
                {[1, 2].map((index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0"></div>
                    <div className="relative bg-white p-2 border border-green-200">
                      <video
                        className="w-full h-32 sm:h-40 lg:h-44 object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={assets.coding_video} type="video/mp4" />
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <Code className="w-8 h-8 text-green-500" />
                        </div>
                      </video>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <blockquote className="text-xl sm:text-2xl font-medium text-gray-700 italic">
            "Trusted by software engineers at leading companies and universities worldwide"
          </blockquote>
        </div>
      </div>

      {/* AI Powered Section */}
      <div className="py-14 bg-gradient-to-r from-emerald-50 via-green-100 to-emerald-50 border-y border-green-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 text-xs font-semibold tracking-wide mb-4">
              <Sparkles className="w-4 h-4" /> AI POWERED
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Supercharge Collaboration with <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">AI Code Generation</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-xl">
              Instantly generate boilerplate, helper functions, test cases and more directly inside your shared editor. Our integrated AI helps teams move faster, stay focused and explore solutions together.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-sm text-gray-700">
              <li className="flex items-start gap-2"><span className="text-green-600">•</span> Context-aware code insertion</li>
              <li className="flex items-start gap-2"><span className="text-green-600">•</span> Generates clean, readable output</li>
              <li className="flex items-start gap-2"><span className="text-green-600">•</span> Works seamlessly with real-time sessions</li>
              <li className="flex items-start gap-2"><span className="text-green-600">•</span> Safe fallback when editor not active</li>
            </ul>
            <button
              onClick={handleNavigation}
              className="px-8 py-3 border border-green-700 text-green-800 text-sm font-medium tracking-wide hover:bg-green-700 hover:text-white transition-colors inline-flex items-center">
              Try AI Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="relative bg-white border border-green-200 p-5 shadow-sm">
              <div className="absolute -top-3 -left-3 w-14 h-14 bg-green-600 text-white flex items-center justify-center rounded-full shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <pre className="text-xs bg-gray-900 text-green-100 p-4 overflow-auto leading-relaxed font-mono border border-gray-800">
                <code>{`# AI Example\n# Prompt: "Generate a function to reverse words in a sentence"\n\nfunction reverseWords(sentence) {\n  return sentence\n    .split(/\n| /)\n    .map(word => word.split('').reverse().join(''))\n    .join(' ');\n}\n\nconsole.log(reverseWords('Code Live Together'));`}</code>
              </pre>
              <p className="mt-4 text-xs text-gray-600">Generated sample output. Actual results adapt to your prompt.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                code together
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Whether you're collaborating with teammates, conducting interviews, or teaching students,
              we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative bg-white p-6 border border-green-200 hover:border-green-500 transition-colors ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 text-green-700">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-green-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-green-800 mb-5 leading-relaxed">
                  {feature.description}
                </p>
                <button
                  onClick={handleNavigation}
                  className="px-5 py-2 border border-green-700 text-green-800 text-xs font-medium tracking-wide hover:bg-green-700 hover:text-white transition-colors inline-flex items-center"
                >
                  {feature.buttonText.replace(/Start |Begin |Start /gi, '').trim() || 'Open'}
                  <ArrowRight className="w-3 h-3 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to start coding together?
          </h2>
          <p className="text-xl text-green-100 mb-10">
            Join thousands of developers who trust our platform for their coding needs.
          </p>

          <button
            onClick={handleNavigation}
            className="px-10 py-4 border border-green-200 text-white text-sm font-medium tracking-wide hover:bg-white hover:text-green-800 transition-colors flex items-center mx-auto"
          >
            Get Started
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <p className="text-green-100 mt-6 text-sm">
            No credit card required • Start in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
