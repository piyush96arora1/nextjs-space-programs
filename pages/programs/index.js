import React, { useState, useEffect } from "react";
import { getData, useDidUpdateEffect } from "../../utils/common";
import { useRouter } from "next/router";
import ProgramCard from "../../components/Card";
const queryString = require("query-string");
import utilStyles from "../../styles/utils.module.css";
const { default: Filters } = require("../../components/Filters");
import Loader from "react-loader-spinner";
import Head from "next/head";

const Programs = ({ req, data, error }) => {
  const router = useRouter();
  const initialState = getInitialState(router.query);
  const [selectedYear, setSelectedYear] = useState(initialState.selectedYear);
  const [selectedLand, setSelectedLand] = useState(initialState.selectedLand);
  const [selectedLaunch, setSelectedLaunch] = useState(
    initialState.selectedLaunch
  );
  const [hasError, setHasError] = useState(error);

  const [pageLoading, setPageLoading] = useState(false);
  const [items, setData] = useState(data);
  useDidUpdateEffect(() => {
    const fetchData = async () => {
      setPageLoading(true);
      const { data, error } = await getData({
        selectedLand,
        selectedLaunch,
        selectedYear,
      });
      setData(data);
      setPageLoading(false);
      if (error) setHasError(true);
    };
    if (
      selectedLand != null ||
      selectedLaunch != null ||
      selectedYear != null ||
      (selectedLand === null &&
        selectedYear === null &&
        selectedLaunch === null)
    ) {
      const val = getSearchVal({ selectedLand, selectedLaunch, selectedYear });
      router.push(`/programs${val}`, undefined, { shallow: true });
      fetchData();
    }
  }, [selectedLaunch, selectedLand, selectedYear]);

  return (
    <React.Fragment>
      <Head>
        <title>SpaceX Programs</title>
        <meta name="description" content="Space programs with their details" />
        <meta
          name="og:description"
          content="Space programs with their details"
        />
        <meta name="og:title" content="SpaceX Programs" />
      </Head>

      <span className={utilStyles.headingBig}>SpaceX Launch Programs</span>
      <div className={utilStyles.rootContainer}>
        <div className={utilStyles.filterSection}>
          <div className={utilStyles.headingFilter}>Filters</div>
          <div>
            <span className={`${utilStyles.center} ${utilStyles.headingLight}`}>
              Launch Year
            </span>
            <section className={utilStyles.filterContainer}>
              <Filters
                selected={selectedYear}
                type="years"
                setSelectedYear={setSelectedYear}
              />
            </section>
          </div>
          <div>
            <span className={`${utilStyles.center} ${utilStyles.headingLight}`}>
              Successful Land
            </span>
            <section className={utilStyles.filterContainer}>
              <Filters
                selected={selectedLand}
                type="land"
                setSelectedLand={setSelectedLand}
              />
            </section>
          </div>
          <div>
            <span className={`${utilStyles.center} ${utilStyles.headingLight}`}>
              Successful Launch
            </span>

            <section className={utilStyles.filterContainer}>
              {" "}
              <Filters
                selected={selectedLaunch}
                type="launch"
                setSelectedLaunch={setSelectedLaunch}
              />
            </section>
          </div>
        </div>
        {pageLoading && !hasError && (
          <div className={utilStyles.loader}>
            <Loader type="Puff" color="#7cba01" height={100} width={100} />
          </div>
        )}
        {hasError && (
          <div className={utilStyles.loader}>Something went wrong.</div>
        )}
        {!pageLoading && !hasError && items && items.length === 0 && (
          <div className={utilStyles.loader}>No programs found.</div>
        )}
        <div className={utilStyles.gridContainer}>
          {!pageLoading &&
            items &&
            items.map((item, index) => {
              const obj = getProgramData(item);
              return <ProgramCard key={index} {...obj} />;
            })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Programs;

export async function getServerSideProps(context) {
  let query = context.query;
  const { selectedLand, selectedLaunch, selectedYear } = query;
  const { data, error } = await getData({
    selectedLand,
    selectedYear,
    selectedLaunch,
  });

  return {
    props: {
      data,
      error,
      req: context.req.url,
    },
  };
}

const getSearchVal = ({ selectedLand, selectedLaunch, selectedYear }) => {
  let obj = {};
  if (selectedLand != null) obj.selectedLand = selectedLand;
  if (selectedLaunch != null) obj.selectedLaunch = selectedLaunch;
  if (selectedYear) obj.selectedYear = selectedYear;
  const stringified = queryString.stringify(obj);

  return stringified ? `?${stringified}` : "";
};
const getInitialState = (query) => {
  let initialState = {
    selectedYear: null,
    selectedLand: null,
    selectedLaunch: null,
  };
  if (query.selectedYear)
    initialState.selectedYear = Number(query.selectedYear);
  if (query.selectedLand != null && query.selectedLand != undefined)
    initialState.selectedLand = JSON.parse(query.selectedLand);
  if (query.selectedLaunch != null && query.selectedLaunch != undefined)
    initialState.selectedLaunch = JSON.parse(query.selectedLaunch);
  return initialState;
};

const getProgramData = (obj) => {
  let item = {};
  const {
    links: { mission_patch_small } = {},
    rocket: { first_stage: { cores } = {} } = {},
    mission_name,
    flight_number,
    launch_year,
    mission_id,
    launch_success,
  } = obj || {};
  try {
    item.image = mission_patch_small;
    item.title = mission_name;
    item.flightNo = flight_number;
    item.launchYear = launch_year;
    item.missionId = mission_id || [];
    item.launchSuccess = launch_success;
    if (cores && cores[0]) item.landSuccess = cores[0].land_success;
    return item;
  } catch (error) {
    return {};
  }
};
