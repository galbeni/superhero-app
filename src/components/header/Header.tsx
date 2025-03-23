import { IHeader } from "../../types";

export const Header = ({ activeTab, setActiveTab }: IHeader ) => {
  const buttonStyle = {
    base: "p-3 cursor-pointer border-gray-400 dark:border-white text-white",
    active: "font-bold bg-sky-500/100",
    inactive: "bg-sky-500/75",
  };

  // Switch active tab
  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex">
        <button 
          onClick={() => switchTab("heroes")} 
          className={`${buttonStyle.base} ${activeTab === "heroes" ? buttonStyle.active : buttonStyle.inactive}`}
        >
          Heroes
        </button>
        <button 
          onClick={() => switchTab("favorites")} 
          className={`${buttonStyle.base} ${activeTab === "favorites" ? buttonStyle.active : buttonStyle.inactive}`}
        >
          Favorites
        </button>
      </div>
    </>
  );
};