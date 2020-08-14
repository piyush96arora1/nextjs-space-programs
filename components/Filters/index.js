const { default: GreenTile } = require("../GreenTile.js");

const Filters = ({
  type,
  selected,
  setSelectedYear,
  setSelectedLand,
  setSelectedLaunch,
}) => {
  const isYearFilter = type === "years";
  const isLandFilter = type === "land";
  const isLaunchFilter = type === "launch";
  const onFilterSelect = ({ type, name, value }) => {
    if (isYearFilter) setSelectedYear(selected===value?null:value);
    if (isLandFilter) setSelectedLand(selected===value?null:value);
    if (isLaunchFilter) setSelectedLaunch(selected===value?null:value);
  };

  const arr = [
    {
      name: "2006",
      value: 2006,
    },
    {
      name: "2007",
      value: 2007,
    },
    {
      name: "2008",
      value: 2008,
    },
    {
      name: "2009",
      value: 2009,
    },
    {
      name: "2010",
      value: 2010,
    },
    {
      name: "2011",
      value: 2011,
    },
    {
      name: "2012",
      value: 2012,
    },
    {
      name: "2013",
      value: 2013,
    },
    {
      name: "2014",
      value: 2014,
    },
    {
      name: "2015",
      value: 2015,
    },
    {
      name: "2016",
      value: 2016,
    },
    {
      name: "2017",
      value: 2017,
    },
    {
      name: "2018",
      value: 2018,
    },
    {
      name: "2019",
      value: 2019,
    },
  ];
  const val = [
    {
      name: "True",
      value: true,
    },
    {
      name: "False",
      value: false,
    },
  ];

  const years = arr.map((item) => (
    <GreenTile
      key={item.name}
      name={item.name}
      onFilterSelect={onFilterSelect}
      selected={selected === item.value}
      value={item.value}
    />
  ));
  const land = val.map((item) => (
    <GreenTile
      key={item.name}
      name={item.name}
      onFilterSelect={onFilterSelect}
      selected={selected === item.value}
      value={item.value}
    />
  ));
  const launch = val.map((item) => (
    <GreenTile
      key={item.name}
      name={item.name}
      onFilterSelect={onFilterSelect}
      selected={selected === item.value}
      value={item.value}
    />
  ));
  if (isYearFilter) return years;
  if (isLandFilter) return land;
  if (isLaunchFilter) return launch;
};

export default Filters;
