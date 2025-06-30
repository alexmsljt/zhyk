import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver';
}

export default function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const tierColors = {
    platinum: "from-gray-100 to-gray-300",
    gold: "from-[#FFD700]/10 to-[#FFD700]/30",
    silver: "from-gray-200 to-gray-400"
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="w-full sm:w-64 h-40 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
    >
      <div className={`bg-gradient-to-r ${tierColors[sponsor.tier]} h-2 w-full`}></div>
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center mb-3">
          <img 
            src={sponsor.logo} 
            alt={sponsor.name}
            className="w-12 h-12 object-contain mr-3"
          />
          <h3 className="font-bold text-[#001F3F]">{sponsor.name}</h3>
        </div>
        <p className="text-sm text-gray-600 flex-1 line-clamp-2">{sponsor.description}</p>
        <Link 
          to={sponsor.website} 
          target="_blank"
          onClick={(e) => {
            e.preventDefault();
            toast.success(`即将访问赞助商 ${sponsor.name} 的网站`);
            setTimeout(() => {
              window.open(sponsor.website, '_blank');
            }, 1000);
          }}
          className="mt-2 text-sm text-[#001F3F] hover:text-[#FFD700] transition-colors flex items-center"
        >
          访问网站 <i className="fa-solid fa-arrow-up-right-from-square ml-1 text-xs"></i>
        </Link>
      </div>
    </motion.div>
  );
}
