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
    id: 1,
    icon: twitterIcon,
  },
  {
    id: 1,
    icon: xIcon,
  },
  {
    id: 1,
    icon: githupIcon,
  },
  {
    id: 1,
    icon: youtobeIcon,
  },
];
const listContact = [
  {
    id: 1,
    content: "About",
    url: "",
  },
  {
    id: 1,
    content: "Blog",
    url: "",
  },
  {
    id: 1,
    content: "Jobs",
    url: "",
  },
  {
    id: 1,
    content: "Press",
    url: "",
  },
  {
    id: 1,
    content: "Accessibility",
    url: "",
  },
  {
    id: 1,
    content: "Partners",
    url: "",
  },
];
const Footer = () => {
  return (
    <ContainerFooter className=" bg-corlorHeader">
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
