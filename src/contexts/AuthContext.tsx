import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { CreateCompanyProps } from "../interfaces/companyProps";
import { PackageProps } from "../interfaces/packageProps";
import { SignInProps, UserProps } from "../interfaces/userProps";
import { api, configHeaders } from "../services/api";
import { MESSAGE } from "../utils/utilsMessages";

interface AuthContextType {
  signIn: (data: SignInProps) => Promise<any>;
  signOut: () => void;
  user: UserProps;
  editUser: (
    values: UserProps,
    idUser: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  createPackage: (
    values: PackageProps
  ) => Promise<AxiosResponse<any, any> | undefined>;
  createCompany: (
    values: CreateCompanyProps
  ) => Promise<AxiosResponse<any, any> | undefined>;
  editCompany: (
    values: CreateCompanyProps,
    idCompany: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
}

interface Props {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [cookies, setCookie, removeCookie] = useCookies(["@reszon.token"]);

  const token = cookies["@reszon.token"];

  const signOut = () => {
    removeCookie("@reszon.token", { path: "/" });
    router.push("/");
  };

  const signIn = async ({
    email,
    senha,
    manter_conectado,
  }: SignInProps): Promise<any> => {
    try {
      const response = await api.post("/login", { email, senha });

      if (response.data.user.perfil === "promoter") {
        setUser(response.data.user);
        setCookie("@reszon.token", response.data.token, { path: "/" });
        router.push("/dashboard/promoter");
      }

      if (response.data.user.perfil === "company") {
        setUser(response.data.user);
        setCookie("@reszon.token", response.data.token, { path: "/" });
        router.push("/dashboard/company");
      }

      if (response.data.user.perfil === "admin") {
        setUser(response.data.user);
        setCookie("@reszon.token", response.data.token, { path: "/" });
        router.push("/payments");
      }
      return response;
    } catch (error) {
      toast.error("Erro interno no servidor, tente novamente mais tarde!");
    }
  };

  const editUser = async (values: UserProps, idUser: string) => {
    try {
      const response = await api.put(
        `/users/${idUser}`,
        values,
        configHeaders(token)
      );

      return response;
    } catch (error) {
      toast.error("Ocorreu um erro no servidor, tente novamente mais tarde!");
    }
  };

  const createPackage = async (values: PackageProps) => {
    try {
      const formData = new FormData();

      formData.append("file", values.contrato);
      formData.append("package", JSON.stringify(values));

      const response = await api.post(
        `/packages`,
        formData,
        configHeaders(token, "multipart/form-data")
      );

      return response;
    } catch (error) {
      toast.error("Ocorreu um erro no servidor, tente novamente mais tarde!");
    }
  };

  const editPackage = async (values: PackageProps) => {
    try {
      const formData = new FormData();

      formData.append("file", values.contrato);
      formData.append("package", JSON.stringify(values));

      const response = await api.put(
        `/packages`,
        formData,
        configHeaders(token, "multipart/form-data")
      );

      return response;
    } catch (error) {
      toast.error("Ocorreu um erro no servidor, tente novamente mais tarde!");
    }
  };

  const createCompany = async (values: CreateCompanyProps) => {
    try {
      const response = await api.post(
        `/companies`,
        values,
        configHeaders(token)
      );

      return response;
    } catch (error) {
      toast.error(MESSAGE.SERVER_ERROR);
    }
  };

  const editCompany = async (values: CreateCompanyProps, idCompany: string) => {
    try {
      const response = await api.put(
        `/companies/${idCompany}`,
        values,
        configHeaders(token)
      );

      return response;
    } catch (error) {
      toast.error(MESSAGE.SERVER_ERROR);
    }
  };

  const getDataUser = useCallback(async () => {
    try {
      const response = await api.get("/get-user", configHeaders(token));
      setUser(response.data);
    } catch (error) {
      console.error(
        "🚀 ~ file: AuthContext.tsx:172 ~ getDataUser ~ error:",
        error
      );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getDataUser();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,

        editUser,
        createPackage,
        createCompany,
        editCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
