import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LucideIcon } from "lucide-react"; // ✅ this is the correct type

interface StatCardProps {
  title: string;
  count: number;
  icon: LucideIcon; // ✅ strict type for Lucide icons
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon: Icon }) => (
  <Card>
    <CardContent style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <Icon size={24} /> {/* Lucide API: size, strokeWidth, color */}
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body1">{count}</Typography>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
