import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Users, Zap } from "lucide-react";

const contactMethods = [
  {
    id: 1,
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    description: "Get in touch via email",
    contact: "support@codelive.apps24.tech",
    action: "Send Email"
  },
  {
    id: 2,
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    description: "Speak with our team",
    contact: "+91 9547717585",
    action: "Call Now"
  },
  {
    id: 3,
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Live Chat",
    description: "Chat with support",
    contact: "Available 24/7",
    action: "Start Chat"
  },
  {
    id: 4,
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "Salt Lake - Kolkata, WB, India",
    action: "Get Directions"
  }
];

const supportFeatures = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Expert Team",
    description: "Experienced developers"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Quick Response",
    description: "Average 2-hour response time"
  }
];

const ContactMethod = ({ method }) => {
  return (
    <div className="group bg-white border border-green-200 p-6 transition-colors">
      <div className={`w-14 h-14 rounded-xl bg-white p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <div className="text-green-700 border border-green-600 p-2 w-full h-full flex items-center justify-center">
          {method.icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {method.title}
      </h3>
      <p className="text-gray-700 mb-2">
        {method.description}
      </p>
      <p className="text-green-800 font-medium mb-4">
        {method.contact}
      </p>
      <button className="w-full py-2 px-4 border border-green-700 text-green-800 text-sm font-medium hover:bg-green-700 hover:text-white transition-colors">
        {method.action}
      </button>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    });
    setIsSubmitting(false);

    alert('Message sent successfully! We\'ll get back to you soon.');
  };

  return (
    <div className="bg-white border border-green-200 p-8">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Send us a Message
        </h3>
        <p className="text-gray-600">
          Fill out the form below and we'll get back to you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Inquiry Type
          </label>
          <select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
          >
            <option value="general">General Inquiry</option>
            <option value="sales">Sales</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600"
            placeholder="How can we help you?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-white border border-green-300 text-sm focus:outline-none focus:border-green-600 resize-none"
            placeholder="Tell us more about your inquiry..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full border border-green-700 text-green-800 font-medium py-3 px-6 text-sm hover:bg-green-700 hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const ContactUsSection = () => {
  return (
    <section className="relative min-h-full bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 mb-6">
            <span className="text-sm font-semibold text-green-800">
              GET IN TOUCH
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Let's Start a
            <br />
            Conversation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our platform? Need technical support? Or want to discuss a partnership? We're here to help.
          </p>
        </div>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {supportFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-white border border-green-700 text-green-700 flex items-center justify-center mx-auto mb-3">
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Choose Your Preferred Way to Connect
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactMethods.map((method) => (
                <ContactMethod key={method.id} method={method} />
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center p-8 bg-green-50 border border-green-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Developer Community
          </h3>
          <p className="text-gray-700 mb-6">
            Connect with thousands of developers, share knowledge, and get help from our community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 border border-green-700 text-green-800 font-medium hover:bg-green-700 hover:text-white transition-colors">
              Join Discord
            </button>
            <button className="px-6 py-3 bg-white text-green-800 font-medium border border-green-300 hover:bg-green-50 transition-colors">
              Browse Forum
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;