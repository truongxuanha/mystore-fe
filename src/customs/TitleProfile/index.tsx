type Props = {
  title: string;
  subTitle?: string;
};
const TitleProfile = ({ title, subTitle }: Props) => {
  return (
    <div className="mb-6">
      <div className="text-3xl">{title}</div>
      <span className="text-xs">{subTitle}</span>
    </div>
  );
};

export default TitleProfile;
