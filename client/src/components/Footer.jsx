import {
  Email as EmailIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon
} from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // <footer className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
    <footer className="w-full bg-gradient-to-r from-slate-800 to-cyan-800 text-white mt-4">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">🎓</span> EduConnect
            </h3>
            <p className="text-indigo-100 text-sm">
              Connecting learners and educators through innovative networking solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'Explore', 'Network', 'Courses', 'About Us'].map((link) => (
                <li key={link}>
                  <Link 
                    href="#" 
                    className="text-indigo-100 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              {['Help Center', 'Community', 'Guides', 'Blog', 'Support'].map((link,i) => (
                <li key={i}>
                  <Link
                    to="#" 
                    className="text-indigo-100 hover:text-white transition-colors duration-300 ease-in-out"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              {[
                { Icon: FacebookIcon, link: '#' },
                { Icon: TwitterIcon, link: '#' },
                { Icon: InstagramIcon, link: '#' },
                { Icon: LinkedInIcon, link: '#' },
                { Icon: EmailIcon, link: '#' }
              ].map(({ Icon, link },i) => (
                <Link 
                  key={i} 
                  href={link} 
                  className="text-indigo-100 hover:text-white transition-transform duration-300 transform hover:scale-110"
                >
                  <Icon />
                </Link>
              ))}
            </div>
            <div className="text-sm text-indigo-100">
              <p>Email: support@educonnect.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-indigo-500 mt-8 pt-4 text-center">
          <p className="text-sm text-indigo-200">
            © {new Date().getFullYear()} EduConnect. All Rights Reserved. 
            <span className="ml-2 hidden md:inline">
              Bridging Educational Opportunities
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;