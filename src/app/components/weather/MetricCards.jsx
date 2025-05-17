import { motion } from 'framer-motion';

// Component for individual weather metrics
export const MetricCard = ({ title, value, unit, icon }) => {
    console.log('MetricCard props:', { title, value, unit, icon });
    return (
        <motion.div
            className="metric-card bg-gray-800/80 p-4 rounded-xl backdrop-blur-sm shadow-sm"
            whileHover={{ scale: 1.05 }}
        >
            <div className="flex flex-row items-center justify-between">
                <div>
                    <p className="text-sm text-slate-400">{title}</p>
                    <p className="text-xl font-bold text-white">
                        {value ?? 'N/A'}
                        {unit && <span className="text-sm ml-1">{unit}</span>}
                    </p>
                </div>
                {icon && (
                    <div className="relative w-10 h-10">
                        {icon}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// Component for the main weather summary
export const WeatherHero = ({ location, temp, condition, icon }) => {
    console.log('WeatherHero props:', { location, temp, condition, icon });
    return (
        <motion.div
            className="hero-weather relative mb-8 h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/80 to-blue-400/80 p-8 shadow-2xl backdrop-blur-xl dark:from-slate-800/90 dark:to-slate-900/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-5xl font-bold text-white drop-shadow-xl">
                            {Math.round(temp ?? 0)}°
                            <span className="text-2xl">C</span>
                        </h1>
                        <p className="text-xl font-semibold text-white/90 capitalize">
                            {condition?.toLowerCase() ?? 'unknown'}
                        </p>
                        <p className="text-lg text-white/80">{location}</p>
                    </div>
                    <div className="relative w-24 h-24">
                        {icon}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Default export as MetricCard
export default MetricCard;