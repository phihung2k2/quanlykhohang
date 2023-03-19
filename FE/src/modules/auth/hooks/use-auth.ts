import { useNavigate } from "react-router-dom";

import { useAuthStore } from "./store/use-auth-store";

export const useAuth = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    function onLogout() {
        logout();
        navigate("/");
    }

    return { onLogout };
};
