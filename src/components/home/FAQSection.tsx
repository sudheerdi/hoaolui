
import Accordion from '../../../components/base/Accordion';

export default function FAQSection() {
  const faqs = [
    {
      question: 'How does CommUnity Connect help with payment collection?',
      answer: 'Our platform automates the entire payment process with recurring billing, multiple payment options (credit cards, ACH, checks), automatic late fee calculation, and detailed financial reporting. Residents receive automated reminders and can pay online 24/7.'
    },
    {
      question: 'Can board members approve requests remotely?',
      answer: 'Yes! Board members can review and approve architectural requests, modifications, and other community matters from anywhere using our mobile-friendly platform. All approvals are tracked with timestamps and digital signatures.'
    },
    {
      question: 'Is the voting system secure and anonymous?',
      answer: 'Absolutely. Our voting platform uses bank-level encryption and provides anonymous voting while maintaining complete audit trails. We track quorum requirements and provide real-time results with full transparency.'
    },
    {
      question: 'How do residents stay informed about community events?',
      answer: 'Residents receive automatic notifications about meetings, events, and important announcements via email and mobile push notifications. Our community calendar syncs with personal calendars and includes RSVP functionality.'
    },
    {
      question: 'What happens to our existing documents and data?',
      answer: 'We provide free data migration services to transfer all your existing documents, financial records, and resident information. Our team ensures a seamless transition with zero data loss.'
    },
    {
      question: 'Do you offer training and ongoing support?',
      answer: 'Yes! We provide comprehensive onboarding training for board members and administrators, plus ongoing support via email, phone, and our extensive knowledge base. Pro customers get dedicated account management.'
    },
    {
      question: 'Can the platform handle multiple communities?',
      answer: 'Our Pro plan supports multi-community management, perfect for property management companies overseeing multiple HOAs. Each community maintains separate data while providing centralized oversight capabilities.'
    },
    {
      question: 'Is there a mobile app for residents?',
      answer: 'Yes! We offer native mobile apps for both iOS and Android, plus our web platform is fully responsive. Residents can pay dues, submit requests, vote, and stay connected on any device.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to the most common questions about our HOA management platform
          </p>
        </div>

        <Accordion items={faqs} />

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: '#1FA372' }}
            >
              Contact Support
            </button>
            <button 
              className="border-2 px-6 py-3 rounded-lg font-semibold hover:text-white transition-all duration-200 cursor-pointer whitespace-nowrap"
              style={{ borderColor: '#1FA372', color: '#1FA372' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1FA372'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1FA372'; }}
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
