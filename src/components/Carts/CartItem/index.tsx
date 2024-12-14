import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import Button from "customs/Button";
import Input from "customs/Input";
import { Link } from "react-router-dom";
import { ProductOrderType } from "redux/order/type";
import { ProductsType } from "types";
import formatVND from "utils/formatVND";

type Props = {
  priceAfterDiscount: number;
  idItemCart: number;
  thumbnail: string;
  slug?: string;
  product_name: string;
  quantity: number;
  discount: number;
  updateQuantity: (id: number, quantity: number) => void;
  deleteItemCart: (id: number) => void;
  isSelected: boolean;
  handleSelectItem: (item: ProductOrderType, isSelected: boolean) => void;
} & ProductsType;

function CartItem(props: Props) {
  const { idItemCart, product_name, priceAfterDiscount, quantity, thumbnail, slug, updateQuantity, deleteItemCart, discount, isSelected, handleSelectItem } =
    props;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectItem(
      {
        ...props,
      },
      e.target.checked,
    );
  };

  return (
    <div className="grid grid-cols-12 min-w-[1200px] p-5 place-items-center gap-x-3">
      <div className="col-span-1">
        <Input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </div>
      <div className="col-span-2">
        <img src={thumbnail} className="border rounded-md" />
      </div>
      <div className="col-span-2">
        <Link to={`/product/${slug}?product_id=${props.id_product}`} className="text-xs sm:text-sm hover:underline">
          {product_name}
        </Link>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1">
        <span className="text-[11px] sm:text-xs md:text-sm">{formatVND(priceAfterDiscount, 0)}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <Button
          type="button"
          className="h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => updateQuantity(idItemCart, quantity > 0 ? quantity - 1 : quantity)}
        >
          <MinusIcon className="w-3 h-3 md:w-5 md:h-3" />
        </Button>
        <input type="text" disabled value={quantity} className="w-10 text-center bg-transparent text-xs md:text-sm font-medium text-gray-900 outline-none" />
        <Button
          type="button"
          className="h-4 w-4 md:h-5 md:w-5 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => updateQuantity(idItemCart, quantity + 1)}
        >
          <PlusIcon className="w-3 h-3 md:w-5 md:h-3" />
        </Button>
      </div>
      <div className="col-span-1">{formatVND(priceAfterDiscount * quantity, discount)}</div>
      <div className="col-span-1 mx-auto flex flex-col">
        <span className="block w-9 cursor-pointer" onClick={() => deleteItemCart(idItemCart)}>
          Xóa
        </span>
      </div>
    </div>
  );
}

export default CartItem;
