import FieldPassword from "@/components/FieldPassword";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";
import { getSession } from "next-auth/react";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session?.token?.accessToken)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  return {
    props: {
      session: await getSession(ctx),
    },
  };
}

const Center = styled.div`
  background-color: white;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormStyle = styled.form`
  border: 1px solid #aaa;
  border-radius: 8px;
  box-shadow: 2px 2px 2px 2px #ccc;
`;

const FieldsetStyle = styled.fieldset`
  position: relative;
  padding: 10px;
`;

const FieldsetStyleOther = styled.fieldset`
  border: none;
  border-top: 1px solid #aaa;
  position: relative;
`;

const LogInWithStyle = styled.div`
  position: absolute;
  top: 0;
  right: 50%;
  transform: translate(50%, -50%);
  background-color: #f0f0f0;
  white-space: nowrap;
  padding: 10px 0;
`;

const LabelStyle = styled.label`
  display: block;
  background-color: white;
  padding: 0 10px;
  position: absolute;
  top: -50%;
  transform: translateY(25%);
`;

function SignUpPage() {
  const { status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const route = useRouter();
  const onSubmit = async () => {
    try {
      const res = await axios.post("/api/user", {
        username,
        password,
        name,
        email,
      });
      if (res.status === 201) {
        route.replace("/");
      }
      signIn();
    } catch (err) {}
  };

  return (
    <Center>
      <FormStyle>
        <FieldsetStyle>
          <LabelStyle>Username</LabelStyle>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </FieldsetStyle>
        <FieldsetStyle>
          <LabelStyle>Password</LabelStyle>
          <FieldPassword
            onChange={(values) => {
              setPassword(values.target.value);
            }}
          />
        </FieldsetStyle>
        <FieldsetStyle>
          <LabelStyle>Name</LabelStyle>
          <input
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </FieldsetStyle>
        <FieldsetStyle>
          <LabelStyle>Email</LabelStyle>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </FieldsetStyle>
        <FieldsetStyle>
          <button type="button" onClick={onSubmit}>
            Submit
          </button>
        </FieldsetStyle>
      </FormStyle>
    </Center>
  );
}

export default SignUpPage;
