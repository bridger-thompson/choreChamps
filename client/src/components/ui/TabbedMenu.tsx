import { FC } from "react";
import { useSearchParams } from "react-router-dom";

export const TabbedMenu: FC<{
  tabs: {
    key: string;
    name: string;
    component: JSX.Element;
  }[];
  urlSearchParams?: URLSearchParams;
}> = ({ tabs, urlSearchParams }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const selectedTab = tab ? tab : tabs.length > 0 ? tabs[0].key : "";
  const setSelectedTab = (newKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (urlSearchParams) {
      urlSearchParams.forEach((value, key) => {
        newSearchParams.set(key, value);
      });
    }

    newSearchParams.set("tab", newKey);

    setSearchParams(newSearchParams);
  };

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key + " button"}
              className={
                "nav-link " + (selectedTab === tab.key ? "active" : "text-secondary")
              }
              id={`nav-${tab.key}-tab`}
              data-bs-toggle="tab"
              data-bs-target={`#nav-${tab.key}`}
              type="button"
              role="tab"
              aria-controls={`nav-${tab.key}`}
              aria-selected={selectedTab === tab.key}
              onClick={() => setSelectedTab(tab.key)}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        {tabs.map(({ key, component }) => (
          <div
            v-for="tab in tabs"
            key={key + "content"}
            className={`tab-pane fade ${selectedTab === key ? "show active" : ""
              }`}
            id={`nav-${key}`}
            role="tabpanel"
            aria-labelledby={`nav-${key}-tab`}
          >
            {component}
          </div>
        ))}
      </div>
    </>
  );
};
