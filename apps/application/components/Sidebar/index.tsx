import CompSidebar from "./Component";
import Image from "next/image";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="fixed left-0 top-[5vh] w-[55px]  h-full bg-slate-900 flex z-10 ">
      <div className="flex flex-col w-full mt-10 items-center gap-5">
        {/* Todo : Add Navigations as per need */}
        <CompSidebar />
        <CompSidebar />
        <CompSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

{
  /* Add Custom Sidebar's for Different Usecases */
}
{
  /* {State.includes(true) && (
    <div className="absolute top-[10%] left-[3%] h-[70vh] w-[20%] border-outline p-5 bg-slate-800 outline-blue-300 shadow-lg   rounded-md">
      {State[0] && <CompSidebar />}
      {State[1] && <CompSidebar />}
      {State[2] && <CompSidebar />}
      <div
        className="absolute top-0 -right-[12%] p-2 bg-black/50 rounded-md cursor-pointer hover:bg-white/10"
        onClick={() => handleClick(undefined)}
      >
        <PanelLeftClose />
      </div>
    </div>
  )} */
}
