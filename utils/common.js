import Axios from "axios";
import { useRef, useEffect } from "react";

export const getData = async ({
  selectedLand,
  selectedYear,
  selectedLaunch,
}) => {
  try {
    let url = "https://api.spacexdata.com/v3/launches?limit=100";
    if (selectedLand != null) url = url + `&land_success=${selectedLand}`;
    if (selectedYear) url = url + `&launch_year=${selectedYear}`;
    if (selectedLaunch != null) url = url + `&launch_success=${selectedLaunch}`;

    const res = await Axios.get(url);
    return { data: res.data, error: null };
  } catch (error) {
    return { error: true };
  }
};
export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, inputs);
}
