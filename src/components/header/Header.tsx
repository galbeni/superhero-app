interface IHeader {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header = ({ activeTab, setActiveTab }: IHeader ) => {
  const buttonStyle = {
    base: "rounded-md px-3.5 py-2.5 text-sm font-semibold text-white cursor-pointer shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
    active: "font-bold bg-sky-500/100",
    inactive: "bg-sky-500/75",
  };

  const switchTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex gap-4">
      <button 
        onClick={() => switchTab("heroes")} 
        className={`${buttonStyle.base} ${activeTab === "heroes" ? buttonStyle.active : buttonStyle.inactive}`}
        >
        All Heroes
      </button>
      <button 
        onClick={() => switchTab("favorites")} 
        className={`${buttonStyle.base} ${activeTab === "favorites" ? buttonStyle.active : buttonStyle.inactive}`}
        >
        Favorites
      </button>
    </div>
  );
};