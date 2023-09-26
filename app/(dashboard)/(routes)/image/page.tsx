"use client";
import { Code, Download } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ImagePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // by default the loading state is false.

  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setImages([]);
      setIsLoading(true);
      console.log(isLoading);
      console.log(data);

      // send all the messages to chatGPT. Including the existing ones.
      const response = await axios.post("/api/image", data);
      const urls = response.data.map((image: { url: string }) => image.url);
      setImages(urls);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
          <div className="bg-green-300 p-2 w-fit rounded-lg">
            <Code className="w-10 h-10 text-green-800" />
          </div>
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">
              Celestia | Image Generator
            </h1>
            <p className="text-slate-500 md:text-md text-sm">
              Our most advanced image generation model.{" "}
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
                  placeholder="a picture of a horse in swiss alps"
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
        <div className="flex gap-5">
          <div className="flex flex-col space-y-1 md:w-[25%] w-[50%]">
            <Controller
              name="amount"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    className={`border p-2 rounded-lg focus:outline-none ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {/* Options from 1 to 5 */}
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>
          <div className="flex flex-col space-y-1 md:w-[25%] w-[50%]">
            <Controller
              name="resolution"
              control={control}
              defaultValue="512x512"
              render={({ field }) => (
                <>
                  <select
                    {...field}
                    className={`border p-2 rounded-lg focus:outline-none ${
                      errors.resolution ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {/* Options for different resolutions */}
                    <option value="256x256">256x256</option>
                    <option value="512x512">512x512</option>
                    <option value="1024x1024">1024x1024</option>
                    {/* Add more options as needed */}
                  </select>
                  {errors.resolution && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.resolution.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-slate-950 text-white rounded-lg px-4 py-2 w-full md:w-fit"
          >
            Generate
          </button>
        </div>
        <div className="space-y-4">
          {!isLoading && images.length === 0 && (
            <div className="space-y-5">
              <h1 className="text-2xl font-bold text-center mt-5">
                Generate images with Celestia now.
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
                Celestia is crafting images from the cosmos...
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-5 justify-center">
            {images.map((image) => (
              <Card className="p-2">
                <div>
                  <Image
                    src={image}
                    width={250}
                    height={250}
                    alt="Generated Image"
                    className="rounded-tl-lg rounded-tr-lg"
                  />
                </div>

                <CardFooter className="mt-3">
                  {!isLoading && (
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(image)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImagePage;
