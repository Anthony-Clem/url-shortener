"use server";

import { parseWithZod } from "@conform-to/zod";
import { formSchema } from "./schemas";
import prisma from "./db";
import { generateRandomCode, requireUser } from "./hooks";
import { revalidatePath } from "next/cache";
import { signOut } from "./auth";
import { Prisma } from "@prisma/client";

type UrlData = {
  code: string;
  originalLink: string;
  newUrl: string;
  userId?: string;
};

export const logout = async () => {
  await signOut();
};

export const shortenUrl = async ({ url }: { url: string }) => {
  const formData = new URLSearchParams({ url });

  const submission = parseWithZod(formData, {
    schema: formSchema,
  });

  if (submission.status !== "success") {
    return { error: submission.reply().error };
  }

  const session = await requireUser();

  const code = generateRandomCode(8);

  const newUrl = process.env.NEXT_PUBLIC_BASE_URL + `/${code}`;

  const urlData: UrlData = {
    code,
    originalLink: submission.value.url,
    newUrl,
  };

  let premiumError = undefined;

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        urls: true,
        isPremium: true,
      },
    });

    if (user) {
      if (user.isPremium || (!user.isPremium && user.urls.length <= 4)) {
        urlData.userId = session.user.id;
      } else {
        premiumError = true;
      }
    }
  }

  const generatedUrl = await prisma.url.create({
    data: urlData,
  });

  return { generatedUrl, premiumError };
};

export const deleteUrl = async (id: string) => {
  const session = await requireUser();

  if (!session) {
    return { error: "Not Authenticated" };
  }

  await prisma.url.delete({
    where: {
      id,
      userId: session.user?.id,
    },
  });

  revalidatePath("/analytics");
};
