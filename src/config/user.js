import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faLightbulb,
  faFlagCheckered,
  faFileMedicalAlt,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

const Chart = <FontAwesomeIcon icon={faChartPie} />;
const Bulb = <FontAwesomeIcon icon={faLightbulb} />;
const Flag = <FontAwesomeIcon icon={faFlagCheckered} />;
const File = <FontAwesomeIcon icon={faFileMedicalAlt} />;
const Gift = <FontAwesomeIcon icon={faGift} />;

export const USER_CENTER_SIDEMENU_NAV = [
  {
    name: "Dashboard",
    route: "/user/dashboard",
    icon: Chart,
  },
  {
    name: "Activities",
    route: "/user/activities",
    icon: Bulb,
  },
  // {
  //   name: "Ranking",
  //   route: "/user/ranking",
  //   icon: Flag,
  // },
  // {
  //   name: "Health Records",
  //   route: "/user/records",
  //   icon: File,
  // },
  {
    name: "Rewards",
    route: "/user/rewards",
    icon: Gift,
  },
];
