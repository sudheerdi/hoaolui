interface PollOption {
  label: string;
  percentage: number;
  votes: number;
  color: string;
}

interface Poll {
  id: number;
  question: string;
  totalVotes: number;
  options: PollOption[];
}

interface PollCardProps {
  poll: Poll;
}

export default function PollCard({ poll }: PollCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Question */}
      <h3 className="text-sm font-medium text-gray-900 mb-6 min-h-[40px]">
        {poll.question}
      </h3>

      {/* Circular Progress */}
      <div className="flex justify-center mb-6">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="20"
            />
            
            {/* Progress segments */}
            {poll.options.map((option, index) => {
              const previousPercentages = poll.options
                .slice(0, index)
                .reduce((sum, opt) => sum + opt.percentage, 0);
              
              const circumference = 2 * Math.PI * 80;
              const offset = circumference - (circumference * previousPercentages) / 100;
              const dashArray = `${(circumference * option.percentage) / 100} ${circumference}`;
              
              return (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={option.color}
                  strokeWidth="20"
                  strokeDasharray={dashArray}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-gray-900">{poll.totalVotes}</div>
            <div className="text-sm text-gray-500">Total Votes</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: option.color }}
              ></div>
              <span className="text-gray-600">{option.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">{option.percentage}%</span>
              <span className="text-gray-500">{option.votes} votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
