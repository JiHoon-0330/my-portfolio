import ClientSaveToken from "@/component/client-save-token";
import { encrypt } from "@/lib/crypto";
import { prisma } from "@/lib/db";
import { googleLogin } from "@/lib/server-api/auth/google";
import { GetServerSideProps } from "next";

interface Props {
  token: string;
}

export type Provider = "google";

export interface ProviderPageQuery {
  provider: Provider;
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (req) => {
  const { query } = req as unknown as { query: ProviderPageQuery };

  const mapLogin: Record<
    Provider,
    (query: ProviderPageQuery) => Promise<{ provider: Provider; email: string }>
  > = {
    google: googleLogin,
  };

  const result = await mapLogin?.[query?.provider]?.(query);
  const token = encrypt(result);
  const hasEmail = await prisma.user.findUnique({
    where: {
      email: result.email,
    },
  });

  if (!hasEmail) {
    await prisma.user.create({
      data: result,
    });
  }

  await prisma.$disconnect();

  return {
    props: {
      token,
    },
  };
};

export default function AuthProviderPage({ token }: Props) {
  return (
    <div>
      ...loading
      <ClientSaveToken token={token} />
    </div>
  );
}
