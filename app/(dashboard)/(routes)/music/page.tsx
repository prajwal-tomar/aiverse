"use client";
import { Music } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false); // by default the loading state is false.

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setMusic(undefined);

      const response = await axios.post("/api/music", data);
      setMusic(response.data.audio);
      setIsLoading(false);

      console.log(response);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div className="md:px-20 px-10 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-x-3 flex items-center">
          <div className="bg-orange-300 p-2 w-fit rounded-lg">
            <Music className="w-10 h-10 text-orange-800" />
          </div>
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">Music</h1>
            <p className="text-slate-500 md:text-md text-sm">
              Turn your prompt into Music.
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
                  placeholder="Piano solo"
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
          {!isLoading && !music && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-center mt-10">
                No music generated yet.
              </h1>
              <div className="flex justify-center">
                <Image
                  alt="empty music"
                  src="/emptyMusic.png"
                  width={150}
                  height={150}
                />
              </div>
            </div>
          )}
          {isLoading && (
            <div className="flex flex-col space-y-2 bg-muted py-8 rounded-lg">
              <div className="animate-spin w-10 h-10 mx-auto">
                <Image alt="logo" fill src="/logo.png" />
              </div>
              <p className="text-center text-sm animate-pulse">
                Musically is thinking...
              </p>
            </div>
          )}
          {music && (
            <audio controls src="">
              <source src={music} />
            </audio>
          )}
        </div>
      </form>
    </div>
  );
};

export default MusicPage;
