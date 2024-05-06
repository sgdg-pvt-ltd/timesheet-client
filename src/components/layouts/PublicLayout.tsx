import { memo } from "react";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <div className="min-h-screen min-w-screen">
      <Outlet />
    </div>
  );
}

export default memo(PublicLayout);
