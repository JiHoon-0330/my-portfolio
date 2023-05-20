import ClientSaveToken from "@/app/auth/[provider]/ClientSaveToken";
import { googleLogin } from "@/app/auth/[provider]/google";
import { encrypt } from "@/lib/crypto";
import { prisma } from "@/lib/db";

export type Provider = "google";

export interface ProviderPageProps {
  params: {
    provider: Provider;
  };
  searchParams: {
    code: string;
    scope: string;
    authuser: string;
    prompt: string;
  };
}

async function login(props: ProviderPageProps) {
  const { params } = props;

  const mapLogin: Record<
    Provider,
    (props: ProviderPageProps) => Promise<{ provider: Provider; email: string }>
  > = {
    google: googleLogin,
  };

  const result = await mapLogin[params.provider](props);
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

  return token;
}

export default async function ProviderPage(props: ProviderPageProps) {
  const token = await login(props);

  return (
    <div>
      ...loading
      <ClientSaveToken token={token} />
    </div>
  );
}
