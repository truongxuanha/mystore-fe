import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

type ButtonActionProps = {
  id: string | number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onView?: (id: string | number) => void;
};

const ButtonAction = ({ id, onEdit, onDelete, onView }: ButtonActionProps) => {
  return (
    <div className="flex gap-1 justify-center">
      {onView && (
        <Button
          onClick={() => onView?.(id)}
          className="p-[5px] my-1 mx-[2px]"
          background="#2f80ed"
          width="25px"
          height="25px"
          img={<EyeIcon className="text-white" />}
        />
      )}
      {onEdit && (
        <Button
          onClick={() => onEdit?.(id)}
          className="p-[5px] my-1 mx-[2px]"
          background="#f86e2e"
          width="25px"
          height="25px"
          img={<PencilSquareIcon className="text-white" />}
        />
      )}
      {onDelete && (
        <Button
          onClick={() => onDelete?.(id)}
          className="p-[5px] my-1 mx-[2px]"
          background="#ff0000"
          width="25px"
          height="25px"
          img={<TrashIcon className="text-white" />}
        />
      )}
    </div>
  );
};

export default ButtonAction;
