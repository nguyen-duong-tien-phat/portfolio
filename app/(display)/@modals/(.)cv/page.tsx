import dynamic from "next/dynamic";
import React from "react";

const CV = dynamic(() => import("@/three/models/CV"), { ssr: false });

const CVPage: React.FC = () => {
  return (
    <div className="fixed inset-0 z-10 bg-black/90 flex items-center justify-center">
      <CV />
    </div>
  );
};

CVPage.displayName = "CVPage";
export default CVPage;
