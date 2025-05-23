import Breadcrumbs from "../components/Breadcrumbs";
import ErrorLayer from "../components/ErrorLayer";
import MasterLayout from "../masterLayout/MasterLayout";

const ErrorPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumbs />
        <ErrorLayer />
      </MasterLayout>
    </>
  );
};

export default ErrorPage;
