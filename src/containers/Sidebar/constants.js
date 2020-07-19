import ApartmentsLogo from "../../assets/apartments.svg";
import OccupantsLogo from "../../assets/occupants.svg";
import ChangePasswordLogo from "../../assets/edit.svg";
import routes from "../../router/RouterPaths";

export const sidebarLinks = [
  {
    pathname: routes.APARTMENTS,
    text: "Apartments",
    imgUrl: ApartmentsLogo,
    imgAlt: "apartments"
  },
  {
    pathname: routes.OCCUPANTS,
    text: "Occupants",
    imgUrl: OccupantsLogo,
    imgAlt: "occupants"
  },
  {
    pathname: routes.CHANGE_PASSWORD,
    text: "Change Password",
    imgUrl: ChangePasswordLogo,
    imgAlt: "change password"
  }
];
