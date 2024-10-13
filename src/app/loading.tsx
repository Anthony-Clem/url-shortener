import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 size={50} className="animate-spin text-gray-200" />
    </div>
  );
};

export default Loading;
