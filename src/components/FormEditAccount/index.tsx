import { FaCamera, FaRegSave, FaShare } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import getTime from "../../../utils/timenow";
import "./style.scss";
import NoBody from "../../../assets/images/no-body.jpg";
import { staffSelector, accountSelector, customerSelector } from "../../../redux/selector";
import ShowToast from "../../../utils/ShowToast";
import { staffActions } from "../../../redux/slice/staffSlice";
import { customerActions } from "../../../redux/slice/customerSlice";

function AdminModalEditAccount({ typeModal, selectedId, showModal, hidden, method, currentPage, setCurrentPage, querySearch, permission, sex }) {
  const staffState = useSelector(staffSelector);
  const customerState = useSelector(customerSelector);
  const accountList = useSelector(accountSelector);
  const dispatch = useDispatch();

  let title = "";
  if (method === "add") {
    title = "Thêm mới nhân viên";
  }
  if (method === "show") {
    title = "Chi tiết tài khoản";
  }
  if (method === "update") {
    title = "Cập nhật tài khoản";
  }
  if (method === "remove") {
    title = "Xóa tài khoản";
  }

  const formData = useFormik({
    initialValues: {
      id: "",
      account_name: "",
      avatar: "",
      full_name: "",
      email: "",
      phone: "",
      sex: 0,
      birthday: "",
      createAt: "",
      permission: 0,
      status: 0,
      type: 0,
    },
    validationSchema: Yup.object({
      account_name: Yup.string()
        .required("Chưa nhập tên tài khoản!")
        .min(4, "Tên tài khoản tối thiểu 4 ký tự!"),
      phone: Yup.string()
        .required("Chưa nhập số điện thoại!")
        .matches(/(84|0[3|5||7|8|9])+([0-9]{8})/, "Số điện thoại không đúng định dạng!"),
      email: Yup.string()
        .required("Chưa nhập email!")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng!"),
    }),
    onSubmit: (values) => {
      if (method === "add" && typeModal === "staff") {
        if (staffState.isFetching === false) {
          if (values.birthday === "") {
            delete values["birthday"];
          }
          values.createAt = getTime();
          values.password = "Mystoreshop123#";
          delete values["avatar"];
          delete values["id"];
          dispatch(staffActions.addStaff({ values, currentPage, ShowToast, querySearch, permission, hidden, handleSetDefaultForm }));
        }
      }
      if (method === "update" && typeModal === "staff") {
        if (staffState.isFetching === false) {
          values.updateAt = getTime();
          dispatch(staffActions.updateStaff({ values, ShowToast, hidden, handleSetDefaultForm }));
        }
      }
      if (method === "remove" && typeModal === "staff") {
        if (staffState.isFetching === false) {
          const id = values.id;
          if (id == accountList.currentUser.user.id) {
            ShowToast("Tài khoản đang đăng nhập trên thiết bị này, không thể xóa!", "error");
          } else {
            dispatch(staffActions.removeStaff({ id, ShowToast, currentPage, setCurrentPage, querySearch, permission }));
          }
          handleSetDefaultForm();
          hidden();
        }
      }
      if (method === "update" && typeModal === "customer") {
        if (customerState.isFetching === false) {
          values.updateAt = getTime();
          dispatch(customerActions.updateCustomer({ values, ShowToast }));
          handleSetDefaultForm();
          hidden();
        }
      }
      if (method === "remove" && typeModal === "customer") {
        if (staffState.isFetching === false) {
          const id = values.id;
          dispatch(customerActions.removeCustomer({ id, ShowToast, currentPage, setCurrentPage, querySearch, sex }));
          handleSetDefaultForm();
          hidden();
        }
      }
    },
  });

  function handleSetDefaultForm() {
    formData.setValues({
      id: "",
      account_name: "",
      full_name: "",
      avatar: "",
      email: "",
      phone: "",
      sex: 0,
      birthday: "",
      createAt: "",
      permission: 0,
      status: 0,
      type: 0,
    });
    formData.setTouched({}, false);
  }

  const handleCloseModal = () => {
    handleSetDefaultForm();
    hidden();
  };

  useEffect(() => {
    if (selectedId !== null && typeModal === "staff") {
      const data = staffState.staffList.filter((item) => item.id === selectedId);
      formData.setValues({
        ...data[0],
      });
    }
    if (selectedId !== null && typeModal === "customer") {
      const data = customerState.customerList.filter((item) => item.id === selectedId);
      formData.setValues({
        ...data[0],
      });
    }
  }, [selectedId, showModal]);

  return (
    <div className="mda">
      <div
        className="mda_overlay"
        onClick={handleCloseModal}
        style={
          showModal
            ? {
                transform: "translateY(0%)",
                opacity: 1,
              }
            : {
                transform: "translateY(-120%)",
                opacity: 0,
              }
        }
      ></div>
      <div
        className="mda_container"
        style={
          showModal
            ? {
                transform: "translateY(0%)",
                opacity: 1,
              }
            : {
                transform: "translateY(-120%)",
                opacity: 0,
              }
        }
      >
        <h3 className="mda_header">{title}</h3>
        <form className="mda_body" onSubmit={formData.handleSubmit}>
          <ul className="mda_body_list">
            <li className="mda_body_item">
              <div className="mda_body_item_img">
                <img src={formData.values.avatar || NoBody} alt="avatar" />
              </div>
            </li>
            {method !== "add" && (
              <li className="mda_body_item">
                <div className="mda_body_item_group">
                  <label className="mda_body_item_group_label" htmlFor="mda_body_input_id">
                    Mã nhân viên:
                  </label>
                  <input
                    className="mda_body_item_group_input"
                    id="mda_body_input_id"
                    placeholder="Nhập mã nhân viên..."
                    name="id"
                    readOnly={true}
                    value={formData.values.id}
                    onChange={formData.handleChange}
                    onBlur={formData.handleBlur}
                  />
                </div>
              </li>
            )}
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_account_name">
                  Tên tài khoản:
                </label>
                <input
                  className="mda_body_item_group_input"
                  id="mda_body_input_account_name"
                  placeholder="Nhập tên tài khoản..."
                  name="account_name"
                  readOnly={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  value={formData.values.account_name}
                  onChange={formData.handleChange}
                  onBlur={formData.handleBlur}
                />
                <p className="mda_body_item_group_error">{formData.touched.account_name && formData.errors.account_name && formData.errors.account_name}</p>
              </div>
            </li>
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_full_name">
                  Họ và tên:
                </label>
                <input
                  className="mda_body_item_group_input"
                  id="mda_body_input_full_name"
                  placeholder="Nhập họ và tên..."
                  readOnly={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  name="full_name"
                  value={formData.values.full_name}
                  onChange={formData.handleChange}
                  onBlur={formData.handleBlur}
                />
                <p className="mda_body_item_group_error">{formData.touched.full_name && formData.errors.full_name && formData.errors.full_name}</p>
              </div>
            </li>
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_email">
                  Email:
                </label>
                <input
                  className="mda_body_item_group_input"
                  id="mda_body_input_email"
                  placeholder="Nhập email..."
                  type="email"
                  readOnly={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  name="email"
                  value={formData.values.email}
                  onChange={formData.handleChange}
                  onBlur={formData.handleBlur}
                />
                <p className="mda_body_item_group_error">
                  {formData.values.type == 0 && formData.touched.email && formData.errors.email && formData.errors.email}
                </p>
              </div>
            </li>
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_phone">
                  Số điện thoại:
                </label>
                <input
                  className="mda_body_item_group_input"
                  id="mda_body_input_phone"
                  placeholder="Nhập số điện thoại..."
                  name="phone"
                  readOnly={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  value={formData.values.phone}
                  onChange={formData.handleChange}
                  onBlur={formData.handleBlur}
                />
                <p className="mda_body_item_group_error">{formData.touched.phone && formData.errors.phone && formData.errors.phone}</p>
              </div>
            </li>
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_birthday">
                  Ngày sinh:
                </label>
                <input
                  className="mda_body_item_group_input"
                  id="mda_body_input_birthday"
                  type="date"
                  placeholder="Nhập ngày sinh..."
                  name="birthday"
                  readOnly={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  value={formData.values.birthday}
                  onChange={formData.handleChange}
                  onBlur={formData.handleBlur}
                />
                <p className="mda_body_item_group_error">{formData.touched.birthday && formData.errors.birthday && formData.errors.birthday}</p>
              </div>
            </li>
            {method !== "add" && (
              <li className="mda_body_item">
                <div className="mda_body_item_group">
                  <label className="mda_body_item_group_label" htmlFor="mda_body_input_createat">
                    Ngày hoạt động:
                  </label>
                  <input
                    className="mda_body_item_group_input"
                    id="mda_body_input_createat"
                    type="date"
                    name="createAt"
                    readOnly={true}
                    value={formData.values.createAt}
                    onChange={formData.handleChange}
                    onBlur={formData.handleBlur}
                  />
                  <p className="mda_body_item_group_error">{formData.touched.createAt && formData.errors.createAt && formData.errors.createAt}</p>
                </div>
              </li>
            )}
            {method !== "add" && (
              <li className="mda_body_item">
                <div className="mda_body_item_group">
                  <label className="mda_body_item_group_label" htmlFor="mda_body_input_type">
                    Loại tài khoản:
                  </label>
                  <input
                    className="mda_body_item_group_input"
                    id="mda_body_input_type"
                    readOnly={true}
                    name="type"
                    value={formData.values.type == 0 ? "Đăng ký" : formData.values.type == 1 ? "Facebook" : "Google"}
                  />
                </div>
              </li>
            )}
            <li className="mda_body_item">
              <div className="mda_body_item_group">
                <label className="mda_body_item_group_label" htmlFor="mda_body_input_sex">
                  Giới tính:
                </label>
                <input
                  id="mda_body_input_sex_man"
                  type="radio"
                  name="sex"
                  disabled={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  value={0}
                  checked={formData.values.sex == 0 ? true : false}
                  onChange={formData.handleChange}
                />
                <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_sex_man">
                  Nam
                </label>
                <input
                  id="mda_body_input_sex_woman"
                  type="radio"
                  disabled={method === "show" || method === "remove" || typeModal === "customer" ? true : false}
                  name="sex"
                  value={1}
                  checked={formData.values.sex == 1 ? true : false}
                  onChange={formData.handleChange}
                />
                <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_sex_woman">
                  Nữ
                </label>
              </div>
            </li>
            {typeModal === "staff" && (
              <li className="mda_body_item">
                <div className="mda_body_item_group">
                  <label className="mda_body_item_group_label" htmlFor="mda_body_input_permission">
                    Chức vụ:
                  </label>
                  <input
                    id="mda_body_input_permission_admin"
                    type="radio"
                    disabled={method === "show" || method === "remove" ? true : false}
                    name="permission"
                    value={0}
                    checked={formData.values.permission == 0 ? true : false}
                    onChange={formData.handleChange}
                  />
                  <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_permission_admin">
                    Quản lý
                  </label>
                  <input
                    id="mda_body_input_permission_staff"
                    type="radio"
                    name="permission"
                    value={2}
                    checked={formData.values.permission == 2 ? true : false}
                    disabled={method === "show" || method === "remove" ? true : false}
                    onChange={formData.handleChange}
                  />
                  <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_permission_staff">
                    Nhân viên
                  </label>
                </div>
              </li>
            )}
            {method !== "add" && (
              <li className="mda_body_item">
                <div className="mda_body_item_group">
                  <label className="mda_body_item_group_label" htmlFor="mda_body_input_status">
                    Hoạt động:
                  </label>
                  <input
                    id="mda_body_input_status_on"
                    type="radio"
                    name="status"
                    value={0}
                    checked={formData.values.status == 0 ? true : false}
                    disabled={method === "show" || method === "remove" ? true : false}
                    onChange={formData.handleChange}
                  />
                  <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_status_on">
                    Bật
                  </label>
                  <input
                    id="mda_body_input_status_off"
                    type="radio"
                    name="status"
                    value={1}
                    checked={formData.values.status == 1 ? true : false}
                    disabled={method === "show" || method === "remove" ? true : false}
                    onChange={formData.handleChange}
                  />
                  <label className="mda_body_item_group_label-radio" htmlFor="mda_body_input_status_off">
                    Tắt
                  </label>
                </div>
              </li>
            )}
          </ul>
          <div className="mda_body_control">
            {method === "add" && (
              <button type="submit" style={staffState.isFetching ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
                <i>
                  <FaRegSave />
                </i>
                Thêm mới
              </button>
            )}
            {method === "update" && (
              <button type="submit" style={staffState.isFetching ? { cursor: "not-allowed" } : { cursor: "pointer" }}>
                <i>
                  <FaRegSave />
                </i>
                Cập nhật
              </button>
            )}
            {method === "remove" && (
              <button type="submit">
                <i>
                  <FaRegSave />
                </i>
                Xóa
              </button>
            )}
            <button type="button" onClick={handleCloseModal}>
              <i>
                <FaShare />
              </i>
              Thoát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminModalEditAccount;
