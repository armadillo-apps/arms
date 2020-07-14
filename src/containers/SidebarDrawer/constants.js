import ApartmentsLogo from "../../assets/apartments.svg";
import OccupantsLogo from "../../assets/occupants.svg";
import ChangePasswordLogo from "../../assets/edit.svg";

export const PUBLIC_MENU = [
  {
    pathname: "/apartments",
    text: "Apartments",
    imgUrl: ApartmentsLogo,
    imgAlt: "apartments"
  },
  {
    pathname: "/occupants",
    text: "Occupants",
    imgUrl: OccupantsLogo,
    imgAlt: "occupants"
  },
  {
    pathname: "/changePassword",
    text: "Password",
    imgUrl: ChangePasswordLogo,
    imgAlt: "change password"
  }
];
