"use client";
import { Code } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Image from "next/image";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown";

const CodePage = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // by default the loading state is false.
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: data.prompt,
      };

      // append user's input to existing messages array.
      const newMessages = [...messages, userMessage];

      // send all the messages to chatGPT. Including the existing ones.
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });
      setIsLoading(false);
      setMessages((current) => [...current, userMessage, response.data]);
      console.log(messages);
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403) {
          // Handle the 403 error here
          const errorMessage = axiosError.response.data;
          setError(true);
          console.error(errorMessage);
        } else {
          // Handle other types of Axios errors if needed
          console.error(axiosError.message);
        }
      } else {
        // Handle non-Axios errors here
        console.error(error);
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="md:px-20 px-10 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-x-3 flex items-center">
          <div className="bg-indigo-300 p-2 w-fit rounded-lg">
            <Code className="w-10 h-10 text-indigo-800" />
          </div>
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">
              Nebula | Code Generator
            </h1>
            <p className="text-slate-500 md:text-md text-sm">
              Our most advanced code generation model.{" "}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <Controller
            name="prompt"
            control={control}
            rules={{ required: "Prompt is required", minLength: 3 }}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className={`border p-2 md:py-8 rounded-lg focus:outline-none ${
                    errors.prompt ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Simple toggle button using react hooks"
                />
                {errors.prompt && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.prompt.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-slate-950 text-white rounded-lg px-4 py-2 w-full md:w-fit"
          >
            Generate
          </button>
        </div>
        <div className="space-y-4">
          {!isLoading && messages.length === 0 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-center mt-10">
                Start Coding with Nebula.
              </h1>
              <div className="flex justify-center">
                <Image alt="logo" src="/empty.png" width={150} height={150} />
              </div>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col space-y-2 bg-muted py-8 rounded-lg">
              <div className="animate-spin w-10 h-10 mx-auto">
                <Image alt="logo" fill src="/logo.png" />
              </div>
              <p className="text-center text-sm animate-pulse">
                Nebula is on a cosmic quest to fetch your answer...
              </p>
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-5">
            {messages.map((message) => (
              <div
                key={message.content}
                className={`flex items-center ${
                  message.role === "user"
                    ? "bg-white p-4 border border-black/10"
                    : "bg-muted p-4 rounded-lg"
                }`}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {message.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
          {error && (
            <div>
              <h1 className="text-center text-red-500 font-semibold">
                Free trial has expired. Please upgrade to pro.
              </h1>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CodePage;
