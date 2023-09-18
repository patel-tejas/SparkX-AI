"use client"
import { useRouter } from "next/navigation";

import * as z from "zod"
import { useForm } from "react-hook-form";
import { Music, Video } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

import Heading from "@/components/Heading";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Empty } from "@/components/Empty";
import Loader from "@/components/loader";
import { toast } from "react-toastify";

const VideoPage = () => {
    const [video, setVideo] = useState<string>()
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setVideo(undefined)
            const response = await axios.post("/api/video", values)
            setVideo(response.data[0])
        }
        catch (error) {
            toast.error('Something went wrong ! Try again later..', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title="Video Creator"
                description="Our most advanced video generator model"
                icon={Video}
                iconColor="text-orange-500"
                bgColor="bg-orange-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
                            <FormField name="prompt" render={({ field }) =>
                                <FormItem className="col-span-12 lg:col-span-10 ">
                                    <FormControl className="m-0 p-0 ">
                                        <Input
                                            className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="Clown fish swimming around a coral reef"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            } />
                            <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4 ">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!video && !isLoading && (
                        <Empty label="No video has been generated" />
                    )}
                    {video && (
                        <video className="w-full aspect-video my-8 rounded-lg border bg-black" controls>
                            <source src={video} />
                        </video>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VideoPage;