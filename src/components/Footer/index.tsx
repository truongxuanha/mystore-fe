import { ContainerFooter, CopyrightNotice, ListApp, ListContact, MainFooter } from "./styled";
import youtobeIcon from "assets/youtobe_icon.svg";
import faceBookIcon from "assets/facebook_icon.svg";
import twitterIcon from "assets/twitter.svg";
import xIcon from "assets/x_icon.svg";
import githupIcon from "assets/githup_icon.svg";

const appIcon = [
  {
    id: 1,
    icon: faceBookIcon,
  },
  {
    id: 2,
    icon: twitterIcon,
  },
  {
    id: 3,
    icon: xIcon,
  },
  {
    id: 4,
    icon: githupIcon,
  },
  {
    id: 5,
    icon: youtobeIcon,
  },
];
const listContact = [
  {
    id: 6,
    content: "About",
    url: "",
  },
  {
    id: 7,
    content: "Blog",
    url: "",
  },
  {
    id: 8,
    content: "Jobs",
    url: "",
  },
  {
    id: 9,
    content: "Press",
    url: "",
  },
  {
    id: 11,
    content: "Accessibility",
    url: "",
  },
  {
    id: 12,
    content: "Partners",
    url: "",
  },
];
const Footer = () => {
  return (
    <ContainerFooter className="">
      <MainFooter className="container">
        <ListContact>
          {listContact.map((item) => (
            <div className="font-medium" key={item.id}>
              {item.content}
            </div>
          ))}
        </ListContact>
        <ListApp>
          {appIcon.map((item) => (
            <img key={item.id} src={item.icon} />
          ))}
        </ListApp>
        <CopyrightNotice>© 2024 My Store, Inc. All rights reserved.</CopyrightNotice>
      </MainFooter>
    </ContainerFooter>
  );
};
export default Footer;
