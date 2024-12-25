import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Globe, MessageCircle, Github, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function ModernFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20">
      {/* Background gradient overlay - Made darker */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/80 to-indigo-950/95 pointer-events-none" />
      
      {/* Glass cards section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* About Card */}
          <div className="backdrop-blur-lg bg-black/30 rounded-2xl p-6 border border-white/20 hover:border-purple-500/70 transition-colors">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/assets/Review4All.png" alt="Review4All" className="h-12 w-18" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
                Review4All
              </span>
            </Link>
            <p className="text-gray-200 mb-4">
              Empowering voices, connecting experiences. Join our global community of reviewers making informed decisions together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="backdrop-blur-lg bg-black/30 rounded-2xl p-6 border border-white/20 hover:border-purple-500/70 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-300" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'About Us', path: '/about' },
                { text: 'Best Reviews', path: '/reviews' },
                { text: 'Trending', path: '/trending' },
                { text: 'Categories', path: '/categories' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-200 hover:text-purple-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-purple-300 group-hover:w-2 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="backdrop-blur-lg bg-black/30 rounded-2xl p-6 border border-white/20 hover:border-purple-500/70 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-300" />
              Community
            </h3>
            <ul className="space-y-3">
              {[
                { text: 'Join Discord', path: '#' },
                { text: 'Forum', path: '#' },
                { text: 'Blog', path: '/blog' },
                { text: 'Help Center', path: '/help' }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-200 hover:text-pink-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-pink-300 group-hover:w-2 transition-all" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="backdrop-blur-lg bg-black/30 rounded-2xl p-6 border border-white/20 hover:border-purple-500/70 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-300" />
              Connect
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-blue-300" />
                <span className="text-gray-200">Global Community</span>
              </div>
              <div className="flex gap-4">
                {[
                  { Icon: Github, href: 'https://github.com', color: 'hover:text-gray-200' },
                  { Icon: Twitter, href: '#', color: 'hover:text-blue-300' },
                  { Icon: Instagram, href: '#', color: 'hover:text-pink-300' },
                  { Icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { Icon: Linkedin, href: '#', color: 'hover:text-blue-300' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-300 transition-colors ${social.color}`}
                  >
                    <social.Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {currentYear} Review4All. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-300">
              <Link to="/privacy" className="hover:text-purple-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-purple-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-purple-300 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}