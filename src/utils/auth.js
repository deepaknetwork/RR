import axios from "axios";
import { getBaseUrl } from "./api";

export async function loginUser(userphone, userpassword) {

  var errr = null;
  await axios.post(`${getBaseUrl()}common/login/phone`, {
    phone: userphone,
    password: userpassword
  }).then((res) => {
    storeUserData(res.data)
    return errr
  }).catch((err) => {
    errr = err.response.data.message
  })
  return errr
}

export async function loginUserMail(usermail, userpassword) {
  var errr = null;
  await axios.post(`${getBaseUrl()}common/login/email`, {
    email: usermail,
    password: userpassword
  }).then((res) => {
    storeUserData(res.data)
    return errr
  }).catch((err) => {
    errr = err.response.data.message
  })
  return errr
}

export function storeUserData(userData) {
  localStorage.setItem('roomiereserveuser', JSON.stringify(userData));
};

export function removeUserData() {
  localStorage.removeItem('roomiereserveuser');
};

export function getUserData() {
  const user = localStorage.getItem('roomiereserveuser');
  return user ? JSON.parse(user) : null;
};

export function getId() {
  const user = getUserData();
  return user ? user.id : null;
};

export function getRole() {
  const user = getUserData();
  return user ? user.role : null;
};

export function getName() {
  const user = getUserData();
  return user ? user.name : null;
};


