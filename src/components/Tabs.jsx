import { useState } from "react";

const findActiveTab = (a) => {
  return a.reduce((accumulator, currentValue, i) => {
    if (currentValue.props.active) return i;
    return accumulator;
  }, 0);
};

const tabValidator = (tab) => (tab.type.displayName === "Tab" ? true : false);

export function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  return (
    <>
      <div className="z-50 flex gap-2 p-2">
        {children.map((item, i) => {
          return (
            <div key={i}>
              {tabValidator(item) && (
                <Tab
                  key={`tab-{i}`}
                  currentTab={i}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                >
                  {item.props.children}
                </Tab>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-5">
        {children.map((item, i) => {
          return (
            <div key={i} className={` ${i === activeTab ? "visible" : "hidden"}`}>
              {item.props.component}
            </div>
          );
        })}
      </div>
    </>
  );
}

export function Tab({ children, activeTab, currentTab, setActiveTab }) {
  return (
    <div
      className={`px-5 py-2 rounded-full cursor-pointer 
          ${activeTab === currentTab ? "bg-[#73f4dc]" : "hover:bg-[#73F4dC]"}`}
      onClick={() => setActiveTab(currentTab)}
    >
      {children}
    </div>
  );
}

Tab.displayName = "Tab";
