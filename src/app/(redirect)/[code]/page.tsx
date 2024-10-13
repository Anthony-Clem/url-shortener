import prisma from "../../lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function RedirectPage({
  params,
}: {
  params: { code: string };
}) {
  const { code } = params;

  const url = await prisma.url.findUnique({
    where: {
      code,
    },
    select: {
      originalLink: true,
    },
  });

  if (!url) {
    return <p>404 - URL NOT FOUND</p>;
  }

  await prisma.url.update({
    where: {
      code,
    },
    data: {
      views: { increment: 1 },
    },
  });

  revalidatePath("/analytics");

  redirect(url.originalLink);
}
