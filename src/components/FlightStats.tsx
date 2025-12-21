'use client';

import { motion } from 'framer-motion';
import { Plane, Clock, Globe, MapPin } from 'lucide-react';
import { FlightStats as FlightStatsType } from '@/types';

interface FlightStatsProps {
  stats: FlightStatsType;
}

export default function FlightStats({ stats }: FlightStatsProps) {
  const totalHours = Math.floor(stats.totalMinutes / 60);
  const totalMinutesRemainder = stats.totalMinutes % 60;

  const statItems = [
    {
      icon: Plane,
      label: 'Flights',
      value: stats.totalFlights.toString(),
      color: 'text-blue-400',
    },
    {
      icon: Clock,
      label: 'Focus Time',
      value: totalHours > 0 ? `${totalHours}h ${totalMinutesRemainder}m` : `${stats.totalMinutes}m`,
      color: 'text-purple-400',
    },
    {
      icon: Globe,
      label: 'Cities',
      value: stats.uniqueCities.toString(),
      color: 'text-green-400',
    },
    {
      icon: MapPin,
      label: 'Distance',
      value: `${Math.round(stats.totalDistance).toLocaleString()} km`,
      color: 'text-orange-400',
    },
  ];

  if (stats.totalFlights === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/30 backdrop-blur-md rounded-2xl p-6 border border-zinc-800/30"
      >
        <div className="text-center">
          <Plane className="w-12 h-12 text-gray-600 mx-auto mb-3" strokeWidth={1.5} />
          <p className="text-gray-400 text-sm">No flights yet</p>
          <p className="text-gray-500 text-xs mt-1">Start your first focus session</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/30 backdrop-blur-md rounded-2xl p-4 border border-zinc-800/30"
    >
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Your Stats
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-zinc-800/30 rounded-xl p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <item.icon className={`w-4 h-4 ${item.color}`} strokeWidth={1.5} />
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
            <p className="text-lg font-bold text-white">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {stats.favoriteDestination && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 pt-3 border-t border-zinc-800/50"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Favorite Destination</span>
            <span className="text-sm font-bold text-white">{stats.favoriteDestination}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
