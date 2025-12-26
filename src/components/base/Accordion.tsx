import { useState } from 'react';

interface AccordionProps {
  items?: {
    question: string;
    answer: string;
  }[];
  title?: string;
  children?: React.ReactNode;
}

export default function Accordion({ items, title, children }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // If used as a single accordion item (with title and children)
  if (title && children) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="bg-white rounded-lg shadow-md">
        <button
          className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-gray-900">{title}</span>
          <div className="w-6 h-6 flex items-center justify-center" style={{ color: '#1FA372' }}>
            <i className={`ri-${isOpen ? 'subtract' : 'add'}-line`}></i>
          </div>
        </button>
        {isOpen && (
          <div className="px-6 pb-4">
            {children}
          </div>
        )}
      </div>
    );
  }

  // If used with items array (original functionality)
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center cursor-pointer hover:bg-gray-50 rounded-lg"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="font-semibold text-gray-900">{item.question}</span>
            <div className="w-6 h-6 flex items-center justify-center" style={{ color: '#1FA372' }}>
              <i className={`ri-${openIndex === index ? 'subtract' : 'add'}-line`}></i>
            </div>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
