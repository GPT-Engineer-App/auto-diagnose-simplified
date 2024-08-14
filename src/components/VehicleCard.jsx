import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VehicleCard = ({ vehicle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <p className="font-semibold text-gray-800">{vehicle.year} {vehicle.make} {vehicle.model}</p>
        </CardContent>
        <CardFooter>
          <Button variant="destructive" onClick={() => onDelete(vehicle.id)}>Remove</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default VehicleCard;