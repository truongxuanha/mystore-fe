import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

interface ButtonActionProps {
  id: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

const ButtonAction = ({ id, onEdit, onDelete, onView }: ButtonActionProps) => {
  return (
    <div className="flex gap-1 justify-center">
      <Button onClick={() => onView(id)} padding="5px" background="#2f80ed" width="30px" height="30px" img={<EyeIcon className="text-white" />} />
      <Button onClick={() => onEdit(id)} padding="5px" background="#f86e2e" width="30px" height="30px" img={<PencilSquareIcon className="text-white" />} />
      <Button onClick={() => onDelete(id)} padding="5px" background="#ff0000" width="30px" height="30px" img={<TrashIcon className="text-white" />} />
    </div>
  );
};

export default ButtonAction;
