import ApartmentsLogo from "../../assets/apartments.svg";
import OccupantsLogo from "../../assets/occupants.svg";
import ChangePasswordLogo from "../../assets/edit.svg";

export const sidebarLinks = [
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
    text: "Change Password",
    imgUrl: ChangePasswordLogo,
    imgAlt: "change password"
  }
];
