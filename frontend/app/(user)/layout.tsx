import Tab from "./Tab";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-26 flex h-[calc(100vh-66px)] gap-x-10">
      <div className="w-70 flex flex-col gap-y-5 border-r-2 border-r-gray-700 py-10 h-full overflow-auto pr-5 text-gray-300">
        <div className="flex flex-col gap-y-1">
          <Tab name="Profile" />
          <Tab name="Settings" />
          <Tab name="Notifications" />
          <Tab name="Data" />
          <Tab name="Feedback" />
        </div>
      </div>
      <div className="flex-1 overflow-auto pr-30">{children}</div>
    </div>
  );
}

export default Layout;
