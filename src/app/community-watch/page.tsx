
import CommunityWatchScreen from './CommunityWatchScreen';
import Sidebar from '../../components/Sidebar';

export default function CommunityWatchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <CommunityWatchScreen />
      </div>
    </div>
  );
}
