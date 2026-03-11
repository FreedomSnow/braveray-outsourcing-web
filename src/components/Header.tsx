import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { language, setLanguage, messages } = useI18n();

  const navItems = [
    { name: messages.header.nav.home, href: '#home' },
    { name: messages.header.nav.services, href: '#services' },
    { name: messages.header.nav.cases, href: '#cases' },
    { name: messages.header.nav.team, href: '#team' },
  ];

  const languageOptions = [
    { value: 'zh-CN', label: '简体中文' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ja', label: '日本語' },
    { value: 'de', label: 'Deutsch' },
  ] as const;

  const currentLanguageLabel =
    languageOptions.find((option) => option.value === language)?.label ?? 'English';

  const LanguageMenu = ({
    buttonClassName
  }: {
    buttonClassName?: string;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-between gap-2 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
            buttonClassName ?? ''
          }`}
        >
          <span className="text-gray-500">{messages.header.languageLabel}</span>
          <span className="font-medium text-gray-900">{currentLanguageLabel}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => setLanguage(value as typeof language)}
        >
          {languageOptions.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200" data-cmp="Header">
      <div className="container-1440 px-6 md:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={`${import.meta.env.BASE_URL}webp/logo.webp`} alt={messages.header.logoAlt} className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            {messages.header.brandName}
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <LanguageMenu />
          <a
            href="#contact"
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            {messages.header.cta}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-900 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg p-6 flex flex-col gap-4">
          <LanguageMenu buttonClassName="w-full" />
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base font-medium text-gray-900 py-3 border-b border-gray-100 last:border-b-0"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 w-full text-center px-6 py-3 bg-gray-900 text-white font-medium rounded"
            onClick={() => setIsOpen(false)}
          >
            {messages.header.cta}
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;