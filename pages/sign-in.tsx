import Page from "../components/Page";
import Input from "../components/Input";
import Field from "../components/Field";
import Button from "../components/Button";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "../hooks/user";

function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signInError, signInLoading } = useSignIn();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = await signIn(email, password);
    if (valid) {
      router.push("/");
    }
  };

  /**
   * 로그인 프로세스를 마치면 토큰이 발급됨 -> 해당 토큰을 저장해야하는데
   * option1 : 로컬스토리지 ===> 안전하지 않음 / 해당 페이지를 run하는 그 어떤 자바스크립트로 접근할 수 있어서 토큰 노출 위험이 있음
   * option2 : 쿠키
   *         : 쿠키는 서버로 셋팅된다 => API Route를 생성해야 한다. => 그 로직안에 쿠키를 읽고 쓸수 있다. => 외부 API를 직접 호출하는 대신 API 루트를 통해 외부 API를 호출.
   *         : 쿠키를 "httpOnly"로 셋팅하여 서버에서만 읽히게 할수 있다. (자바스크립트로 읽지 못하게 막을수 있음)
   *
   */

  return (
    <Page title="Sign In">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></Input>
        </Field>
        <Field label="Password">
          <Input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></Input>
        </Field>
        {signInError && <p className="text-red-700">Invalid credential</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit">Sign In</Button>
        )}
      </form>
    </Page>
  );
}

export default SignInPage;
