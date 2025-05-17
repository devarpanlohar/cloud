import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

// DataVisualizations component to render charts
const DataVisualizations = ({ data, type, title, xKey, yKey }) => {
    // Only support line charts for now
    if (type !== 'line') {
        return <p className="text-center text-gray-500">Chart type "{type}" not supported.</p>;
    }

    // Format the x-axis labels (e.g., "09:00:00" to "9 AM")
    const formatXAxis = (tick) => {
        if (!tick) return '';
        const [hour] = tick.split(':');
        const hourInt = parseInt(hour, 10);
        return `${hourInt % 12 || 12} ${hourInt >= 12 ? 'PM' : 'AM'}`;
    };

    return (
        <motion.div
            className="chart-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {title && <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>}
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                        dataKey={xKey}
                        tickFormatter={formatXAxis}
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis
                        stroke="#6b7280"
                        tick={{ fontSize: 12 }}
                        unit="°C"
                        domain={['auto', 'auto']}
                    />
                    <Tooltip
                        formatter={(value) => `${value}°C`}
                        labelFormatter={(label) => {
                            const [hour] = label.split(':');
                            const hourInt = parseInt(hour, 10);
                            return `${hourInt % 12 || 12} ${hourInt >= 12 ? 'PM' : 'AM'}`;
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey={yKey}
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#3b82f6' }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

DataVisualizations.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
};

export default DataVisualizations;