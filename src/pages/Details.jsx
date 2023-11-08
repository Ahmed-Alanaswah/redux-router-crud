import { useEffect } from "react";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { cleanRecored } from "../store/postSlice";
const Detail = () => {
  const { loading, error, record } = usePostDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cleanRecored());
    };
  }, [dispatch]);
  return (
    <Loading loading={loading} error={error}>
      <div>Title : {record?.titele}</div>
      <div>Description : {record?.description}</div>
    </Loading>
  );
};

export default Detail;
