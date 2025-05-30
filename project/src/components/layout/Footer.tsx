import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Logo and About */}
          <div>
            <div 
              onClick={() => handleLinkClick('/')} 
              className="flex items-center space-x-2 text-blue-600 cursor-pointer"
            >
              <Heart className="h-6 w-6" />
              <span className="text-xl font-bold">Family Lab</span>
            </div>
            <p className="mt-4 text-gray-600">
              学術的根拠をもとに夫婦・家族のエンゲージメントを診断・関係構築をサポートします。
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">クイックリンク</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <span
                  onClick={() => handleLinkClick('/faq')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  よくある質問
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleLinkClick('/relationship-tips')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  関係性向上のヒント
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleLinkClick('/contact')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  お問い合わせ
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleLinkClick('/terms')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  利用規約
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleLinkClick('/privacy')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  プライバシーポリシー
                </span>
              </li>
              <li>
                <span
                  onClick={() => handleLinkClick('/references')}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                >
                  参考文献
                </span>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">お問い合わせ</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <span>080-7137-0449</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5 flex-shrink-0 text-blue-600" />
                <span>masato.kourogi@and-adapt.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Family Lab. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            <span
              onClick={() => handleLinkClick('/privacy')}
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              プライバシーポリシー
            </span>
            <span
              onClick={() => handleLinkClick('/terms')}
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              利用規約
            </span>
            <span
              onClick={() => handleLinkClick('/cookie-policy')}
              className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
            >
              Cookieポリシー
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};