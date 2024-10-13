import React from "react";
import { requireUser } from "../../lib/hooks";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "../../lib/db";
import AnalyticsTable from "@/components/analytics-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AnalyticsPage() {
  const session = await requireUser();

  if (!session) {
    redirect("/");
  }

  const urls = await prisma.url.findMany({
    where: {
      userId: session.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <Card className="max-w-[800px] w-full">
        <CardHeader>
          <CardTitle className="text-center text-xl">Analytics</CardTitle>
        </CardHeader>
        {urls.length > 0 ? (
          <>
            <AnalyticsTable urls={urls} />
            <CardFooter className="text-xs font-bold text-muted-foreground border-t border-muted">
              <p className="mx-auto mt-3">Graphs added soon!!</p>
            </CardFooter>
          </>
        ) : (
          <CardContent className="my-4 flex">
            <div className="mx-auto flex flex-col items-center gap-2">
              <h2 className="font-bold text-xl">
                Get started by generating your first url!!
              </h2>
              <Button asChild size="lg">
                <Link href="/">Generate Url</Link>
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
