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
  updateQuantity: (id: number, quantity: number, isUpdate?: boolean) => void;
  deleteItemCart: (id: number) => void;
  isSelected: boolean;
  handleSelectItem: (item: ProductOrderType, isSelected: boolean) => void;
} & ProductsType;

function CartItem(props: Props) {
  const {
    idItemCart,
    product_name,
    priceAfterDiscount,
    quantity,
    total_quantity,
    thumbnail,
    slug,
    updateQuantity,
    deleteItemCart,
    discount,
    isSelected,
    handleSelectItem,
  } = props;

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectItem(
      {
        ...props,
      },
      e.target.checked,
    );
  };

  return (
    <div className="grid grid-cols-12 min-w-[1200px] p-5 place-items-center bg-white my-2">
      <div className="col-span-1">
        <Input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </div>
      <div className="col-span-1">
        <img src={thumbnail} className="w-20 h-20 object-contain" />
      </div>
      <div className="col-span-2 uppercase text-sm">
        <Link to={`/product/${slug}?product_id=${props.id_product}`} className="text-xs sm:text-sm hover:underline">
          {product_name}
        </Link>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-1">
        <span className="text-sm">{formatVND(priceAfterDiscount, 0)}</span>
      </div>
      <div className="col-span-2 flex items-center border h-8">
        <Button type="button" className="h-full border-0 border-r hover:bg-gray-200" onClick={() => updateQuantity(idItemCart, quantity - 1, quantity > 1)}>
          <MinusIcon className="w-8 h-4" />
        </Button>
        <input type="text" disabled value={quantity} className="w-10 text-center bg-transparent text-xs md:text-sm font-medium text-gray-900 outline-none" />
        <Button
          type="button"
          className="h-full border-0 border-l hover:bg-gray-200"
          onClick={() => updateQuantity(idItemCart, quantity + 1, quantity < total_quantity)}
        >
          <PlusIcon className="w-8 h-4" />
        </Button>
      </div>
      <div className="col-span-1 text-sm text-red-500">{formatVND(priceAfterDiscount * quantity, discount)}</div>
      <div className="col-span-2 mx-auto flex flex-col hover:text-red-500">
        <span className="block w-9 cursor-pointer" onClick={() => deleteItemCart(idItemCart)}>
          Xóa
        </span>
      </div>
    </div>
  );
}

export default CartItem;
