import { roles } from "@/data/constant";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const protectAuthenticatedPage: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return session
    ? { props: { session } }
    : { redirect: { destination: "/signin", permanent: false } };
};

export const protectUnAuthenticatedPage: GetServerSideProps = async ({
  req,
}) => {
  const session = await getSession({ req });
  return session
    ? { redirect: { destination: "/", permanent: false } }
    : { props: { session } };
};

export const protectAuthorizedPage: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return session
    ? session.user.role === roles.admin
      ? { props: { session } }
      : { redirect: { destination: "/", permanent: false } }
    : { redirect: { destination: "/signin", permanent: false } };
};
