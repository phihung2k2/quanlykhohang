import { gql } from "@apollo/client";
import { useMutation as useMutationGql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserEntity } from "@/modules/user/models";
import { logger } from "@/utils";

import { useAuthStore } from "./../hooks/store/use-auth-store";
import { LoginInputI, LoginResponseI, RegisterInputI } from "./../models/index";

// login

const signinGql = gql`
    mutation signinGql($input: SigninInput!) {
        login(signinAuth: $input) {
            accessToken
            refreshToken
            expiredAt
            user {
                userId
                email
                role
            }
        }
    }
`;

export const useMutationLogin = () => {
    const navigate = useNavigate();

    const { setAuth } = useAuthStore();
    const [mutate, mutation] = useMutationGql<{ login: LoginResponseI }, { input: LoginInputI }>(signinGql, {
        onCompleted(data) {
            setAuth(data.login);
            logger().info("login", data.login);
            toast.success("login success");
            navigate("/");
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    const onLogin = (input: LoginInputI) => {
        mutate({
            variables: {
                input,
            },
        });
    };

    return { onLogin, mutation };
};

// register

const registerGql = gql`
    mutation register($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
            firstname
            lastname
            email
            role
            address
            dob
        }
    }
`;

export const useMutationRegister = () => {
    const [mutate, mutation] = useMutationGql<{ createUser: UserEntity }, { createUserInput: RegisterInputI }>(
        registerGql,
        {
            onCompleted(data) {
                // navigate("/");
                logger().info("register", data.createUser);
                toast.success("register success");
            },
            onError() {
                toast.error("register error");
            },
        }
    );

    const onRegister = (createUserInput: RegisterInputI) => {
        mutate({
            variables: {
                createUserInput,
            },
        });
    };

    return { onRegister, mutation };
};
