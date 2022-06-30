import { Dispatch } from "@reduxjs/toolkit";
import { getNewsAll } from "../redux/slices/newsSlice";
import { loginToken } from "../redux/slices/userSlice";


export function Initializer(dispatch: Dispatch<any>) {
  //const dispatch = useDispatch()

  dispatch(getNewsAll())
  dispatch(loginToken())
}