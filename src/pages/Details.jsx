import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";

const Detail = () => {
  const { loading, error, record } = usePostDetails();
  console.log(record);
  return (
    <Loading loading={loading} error={error}>
      <div>Title : {record?.titele}</div>
      <div>Description : {record?.description}</div>
    </Loading>
  );
};

export default Detail;
