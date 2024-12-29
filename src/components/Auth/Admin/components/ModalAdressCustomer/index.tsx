import { XMarkIcon } from "@heroicons/react/24/outline";
import { BodyModal, ContainerModalAddress, ContentModal, TitleModal } from "./styled";
type Props = {
  setShow: (show: boolean) => void;
};
const ModalAdressCustomer = ({ setShow }: Props) => {
  return (
    <ContainerModalAddress>
      <BodyModal>
        <TitleModal>Địa chỉ khách hàng</TitleModal>
        <ContentModal>
          <div className="grid grid-cols-5 bg-gray-200 px-5 py-2">
            <div className="col-span-1">Id</div>
            <div className="col-span-4">Địa chỉ</div>
          </div>
          <div className="grid grid-cols-5 px-5 py-3">
            <div className="col-span-1">36</div>
            <div className="col-span-4">Trường, 0987666555, Thanh Xuân Hà Nội, Phường Khương Trung, Quận Thanh Xuân, Thành phố Hà Nội</div>
          </div>
        </ContentModal>
        <XMarkIcon onClick={() => setShow(false)} width={50} height={50} color="white" className="absolute -top-12 right-0" />
      </BodyModal>
    </ContainerModalAddress>
  );
};

export default ModalAdressCustomer;
