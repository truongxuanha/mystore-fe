import { ChatBubbleLeftRightIcon, ClockIcon, EllipsisHorizontalIcon, PaperAirplaneIcon, StarIcon } from "@heroicons/react/24/outline";
import { assets } from "assets";
import Button from "customs/Button";
import { useAppSelector } from "hooks/useAppDispatch";
import useAuthenticated from "hooks/useAuthenticated";
import { useState } from "react";
import noAvatar from "assets/no_avatar.jpg";

type Props = {
  setRating: (rating: number) => void;
  rating: number;
  handleCreateCmt: () => void;
  setContentComment: (content: string) => void;
};
const RatingComment = ({ setRating, rating, handleCreateCmt, setContentComment }: Props) => {
  const { isAdmin } = useAuthenticated();
  const [showRating, setShowRating] = useState(false);
  const { dataCommentById } = useAppSelector((state) => state.comment);
  const { currentUser, infoUser } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [star, setStar] = useState<number>(0);

  const ratings: any = {
    1: "Kém",
    2: "Tạm được",
    3: "Trung bình",
    4: "Tốt",
    5: "Rất Tốt",
  };
  const stars = [1, 2, 3, 4, 5];
  let commented = false;
  const topLevelComments = dataCommentById.filter((cmt: any) => {
    if (cmt.id_account === infoUser.id) {
      commented = true;
    }
    return cmt.parent_id === null;
  });
  const childComments = dataCommentById.reduce((acc: any, cmt: any) => {
    if (cmt.parent_id) {
      acc[cmt.parent_id] = acc[cmt.parent_id] || [];
      acc[cmt.parent_id].push(cmt);
    }
    return acc;
  }, {});

  return (
    <div>
      <div className="bg-white p-2 mt-2">
        {!isAdmin && (
          <div className="flex gap-3 mt-10">
            <div className="w-12 h-12">
              <img className="rounded-full w-full h-full border border-red-500" src={infoUser.avatar ?? noAvatar} alt="avatar" />
            </div>
            <div className={`${commented ? "cursor-pointer" : "cursor-wait"} bg-blue-600 flex items-center gap-2 px-2 py-1 rounded `}>
              {!commented && <PaperAirplaneIcon width={20} height={20} className="text-white" />}
              <Button disabled={commented} onClick={() => setShowRating(true)} width="auto" className="text-white">
                {commented ? "Bạn đã đánh giá sản phẩm" : "Viết đánh giá ngay"}
              </Button>
            </div>
          </div>
        )}
        {showRating && (
          <div className="flex flex-col gap-3 border-t-2 p-5 mt-5">
            <div className="flex items-center gap-3">
              {stars.map((item, index) => (
                <StarIcon
                  key={index}
                  color="#ff8f26"
                  fill={star >= index + 1 || rating >= index + 1 ? "#ff8f26" : "#fff"}
                  width={30}
                  height={30}
                  onMouseEnter={() => setStar(index + 1)}
                  onMouseLeave={() => setStar(0)}
                  onClick={() => setRating(index + 1)}
                />
              ))}
              <p>{ratings[rating] || "Chưa đánh giá"}</p>
            </div>
            <div className="flex mt-3 gap-2 w-2/4">
              <textarea onChange={(e) => setContentComment(e.target.value)} className="border rounded-sm px-2 py-2 flex-1" />
              <div className="w-20 h-10">
                <Button onClick={handleCreateCmt} className="bg-colorPrimary py-2">
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-10">
          {topLevelComments.map((userCmt: any) => (
            <div key={userCmt.id} className="gap-3 font-bold mt-5 pb-5 border-b-2 border-colorPrimary last:border-0">
              <div className="pb-2">
                <div className="flex gap-2 relative">
                  <img className="w-12 h-12 rounded-full border border-colorPrimary" alt="avatar" src={userCmt.avatar ?? assets.noAvatar} />
                  <div>
                    <div className="flex font-thin gap-2 text-[12px]">
                      <div>{userCmt.full_name ?? "No name"}</div>
                      <span>-</span>
                      <div className="text-red-500">{userCmt.permission === "customer" ? "Khách hàng" : "Quản trị viên"}</div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <div className="font-thin text-[10px] text-gray-500 flex gap-1 items-center">
                        <ClockIcon width={13} height={13} />
                        <p>{userCmt.createAt}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 -top-4 z-10">
                    <div className="font-thin text-sm px-2 pt-2 rounded-md relative cursor-pointer">
                      <EllipsisHorizontalIcon width={20} height={20} onClick={() => setIsOpen(userCmt.id)} />
                      <div className={`absolute w-28 ${isOpen === userCmt.id ? "flex" : "hidden"} flex-col bg-white shadow-lg -right-2`}>
                        <Button className="hover:bg-slate-100 p-1">Chỉnh sửa</Button>
                        <Button className="hover:bg-slate-100 p-1">Xóa</Button>
                        <Button className="hover:bg-slate-100 p-[2px]">Ẩn đánh giá</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ml-12">
                  <div className="font-thin text-xs px-2 pt-2 rounded-md relative">
                    <p>{userCmt.content}</p>
                    <button className="absolute bottom-1 right-2 cursor-pointer flex gap-1">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-red-500" />
                      <p>Trả lời</p>
                    </button>
                  </div>
                </div>
              </div>
              {childComments[userCmt.id]?.map((cmt: any) => (
                <div key={cmt.id} className="border-t ml-12 gap-3 font-bold mt-5 pt-2">
                  <div className="border-l-4 px-2 pt-2">
                    <div className="flex gap-2 relative">
                      <img className="w-12 h-12 rounded-full border border-colorPrimary" alt="avatar" src={cmt.avatar ?? assets.noAvatar} />
                      <div>
                        <div>{cmt.full_name}</div>
                        <div className="font-thin text-xs text-gray-500 flex gap-1 items-center">
                          <ClockIcon width={13} height={13} />
                          <p>{cmt.createAt}</p>
                        </div>
                      </div>
                      {currentUser?.user.id === cmt.id_account && <div className="text-xs text-blue-500 font-thin leading-5">- Tác giả</div>}
                      <div className="absolute right-0 -top-4 z-10">
                        <div className="font-thin text-sm px-2 pt-2 rounded-md relative cursor-pointer" onClick={() => setIsOpen(cmt.id)}>
                          <EllipsisHorizontalIcon width={20} height={20} />
                          <div className={`absolute w-28 ${isOpen === cmt.id ? "flex" : "hidden"} flex-col bg-white shadow-lg -right-2`}>
                            <Button className="hover:bg-slate-100 p-1">Chỉnh sửa</Button>
                            <Button className="hover:bg-slate-100 p-1">Xóa</Button>
                            <Button className="hover:bg-slate-100 p-[2px]">Ẩn đánh giá</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-12">
                      <div className="font-thin text-sm px-2 pt-2 rounded-md relative">
                        <p>{cmt.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingComment;
