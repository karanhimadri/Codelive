import { Code2 } from "lucide-react";
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {

  const navLinks = ['Home', 'Features', 'Pricing', 'FAQs', 'About'];

  const socialLinks = [
    { icon: FaFacebook },
    { icon: FaYoutube },
    { icon: FaInstagram },
    { icon: FaTwitter },
  ];

  return (
    <footer className='bg-gradient-to-br from-green-50 to-green-100 border-t border-green-200'>
      <div className='max-w-7xl mx-auto px-6 py-12'>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">

          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white border border-green-700 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-green-700" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-green-800">CodeLive</span>
                <span className="text-xs text-gray-600 -mt-1">Real-time coding</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex justify-center">
            <ul className='flex flex-wrap items-center justify-center gap-6 lg:gap-8 text-gray-800 font-medium'>
              {navLinks.map((item) => (
                <li key={item} className='hover:text-green-700 transition-colors cursor-pointer relative group'>
                  {item}
                  <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-green-700 transition-all group-hover:w-full'></span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Media Icons */}
          <div className="flex justify-center lg:justify-end">
            <ul className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <li key={index} className="p-2 bg-white border border-green-200 text-green-800 hover:bg-green-50 transition-colors cursor-pointer">
                    <IconComponent size={16} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent my-8'></div>

        {/* Copyright */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-700'>
          <p className='flex items-center gap-2'>
            <span className='text-gray-600'>©</span>
            <span>2025 All rights reserved.</span>
          </p>
          <p className='text-center sm:text-right'>
            Design by <span className='font-semibold text-gray-800 hover:text-green-700 transition-colors'>Himadri Karan</span>
            <span className='ml-1 px-2 py-1 bg-green-50 text-green-800 border border-green-300 text-xs font-medium'>TECB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
