import { Navigate } from "react-router";
import { useUserInfoQuery } from "../redux/app/services/auth/authApi";

// eslint-disable-next-line no-unused-vars
export default function withPublic(Component) {
  return function PublicWrapper() {
    const { data, isLoading } = useUserInfoQuery();

    if (!isLoading && data?.data?.email) {
      return <Navigate to="/" replace />;
    }

    return <Component />;
  };
}
