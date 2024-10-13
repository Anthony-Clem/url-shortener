"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import GeneratedUrl from "./generated-url";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { shortenUrl } from "@/app/lib/action";
import { formSchema } from "@/app/lib/schemas";
import { GeneratedUrlProps } from "@/app/lib/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { FaCrown } from "react-icons/fa";
import { toast } from "sonner";

const ShortenUrlForm = () => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast.success("Subscription Confirmed");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }

    if (query.get("canceled")) {
      console.log("Order Cancelled - Something went wrong");
    }
  }, []);

  const [generatedUrl, setGeneratedUrl] = useState<
    GeneratedUrlProps | undefined
  >(undefined);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await shortenUrl(values);

    if (res?.error) {
      const error = res.error.url?.join("");
      form.setError("url", { type: "server", message: error });
      return;
    }

    if (res.generatedUrl) {
      setGeneratedUrl(res.generatedUrl);

      if (res.premiumError) {
        setOpenDialog(true);
      }
    }
  };

  return (
    <>
      <Card className="max-w-[500px] w-full mx-auto p-4 mt-24">
        <CardHeader>
          <CardTitle>Shorten Your URL</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-2 mb-3"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="Enter your url..." {...field} />
                  </FormControl>
                  <FormMessage className="text-left text-xs" />
                </FormItem>
              )}
            />

            <Button className="w-full" size="lg">
              Shorten
            </Button>
          </form>
        </Form>

        {generatedUrl && (
          <>
            <div className="border-b border-gray-200" />
            <GeneratedUrl generatedUrl={generatedUrl} />
          </>
        )}
      </Card>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader className="mx-auto capitalize font-bold text-xl">
            Become a premium member
          </DialogHeader>
          <p className="text-sm text-muted-foreground text-center max-w-96 mx-auto">
            You have reached your limit of{" "}
            <span className="font-bold text-indigo-500">5</span> urls saved.
            <br />
            You can continue to generate urls but they will not save and will
            deactivate after a week.
          </p>
          <p className="text-center font-bold">
            <span className="font-extrabold text-indigo-500">$20</span> today
            and become a premium member for{" "}
            <span className="font-extrabold underline uppercase text-indigo-500 ">
              life
            </span>
          </p>
          <DialogFooter className="mx-auto max-sm:h-20 max-sm:gap-2 w-full flex">
            <Button
              variant="secondary"
              className="flex-1 font-bold"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <form
              action="/api/checkout_session"
              method="POST"
              className="flex-1"
            >
              <Button
                type="submit"
                size="lg"
                className="flex items-center justify-center gap-2 font-bold w-full h-full"
              >
                <p>Premium</p>
                <FaCrown size={20} className="text-[#FFD700]" />
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShortenUrlForm;
