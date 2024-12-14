type Props = {
  title: string;
  subTitle?: string;
  center?: boolean;
};
const TitleProfile = ({ title, subTitle, center }: Props) => {
  return (
    <div className={`mb-6 ${center ? "text-center" : ""}`}>
      <div className="text-3xl">{title}</div>
      <span className="text-xs">{subTitle}</span>
    </div>
  );
};

export default TitleProfile;
