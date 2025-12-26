import Card from "../../components/base/Card";

export default function FeaturesSection() {
  const features = [
    {
      icon: "ri-bank-card-line",
      title: "Smart Payments",
      description:
        "Automated HOA dues collection, late fee management, and financial reporting with multiple payment options.",
      color: "text-blue-600",
    },
    {
      icon: "ri-checkbox-circle-line",
      title: "Digital Approvals",
      description:
        "Streamline architectural requests, modifications, and community approvals with digital workflows.",
      color: "text-green-600",
    },
    {
      icon: "ri-alert-line",
      title: "Violation Management",
      description:
        "Track, document, and resolve community violations with automated notifications and follow-ups.",
      color: "text-red-600",
    },
    {
      icon: "ri-vote-line",
      title: "Community Voting",
      description:
        "Secure online voting for board elections, community decisions, and policy changes.",
      color: "text-green-600",
    },
    {
      icon: "ri-calendar-event-line",
      title: "Meeting Calendar",
      description:
        "Schedule board meetings, community events, and send automated reminders to residents.",
      color: "text-orange-600",
    },
    {
      icon: "ri-folder-line",
      title: "Document Hub",
      description:
        "Centralized storage for bylaws, meeting minutes, financial reports, and community documents.",
      color: "text-indigo-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything Your HOA Needs in One Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed specifically for homeowners associations
            to streamline operations and enhance community engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center ${feature.color}`}
              >
                <i className={`${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
