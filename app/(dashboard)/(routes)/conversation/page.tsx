"use client";
import { MessageSquare } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

const ConversationPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission here
    console.log(data);
  };

  return (
    <div className="md:px-20 px-10 mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-x-3 flex items-center">
          <div className="bg-indigo-300 p-2 w-fit rounded-lg">
            <MessageSquare className="w-10 h-10 text-indigo-800" />
          </div>
          <div>
            <h1 className="md:text-4xl text-2xl font-bold">Conversation</h1>
            <p className="text-slate-500 md:text-md text-sm">
              Our most advanced conversation model.{" "}
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
                  placeholder="How do I calculate the radius of a circle?"
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversationPage;
