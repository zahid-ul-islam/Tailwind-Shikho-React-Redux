import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  saveDesign,
  updateDesign,
  setCurrentDesign,
} from "../store/designsSlice";
import { showAuthModal } from "../store/authSlice";

const designSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  tailwindClasses: z.string().optional(),
  content: z.string().min(5, "Please add some HTML content"),
});

type DesignFormData = z.infer<typeof designSchema>;

const DesignEditor: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentDesign } = useAppSelector((state) => state.designs);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<DesignFormData>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      title: "",
      tailwindClasses: "",
      content:
        '<div class="p-4 bg-blue-500 text-white rounded-lg">\n  Hello World\n</div>',
    },
  });

  const content = watch("content");

  useEffect(() => {
    if (currentDesign) {
      setValue("title", currentDesign.title);
      setValue("tailwindClasses", currentDesign.tailwindClasses || "");
      setValue("content", currentDesign.content || "");
    } else {
      reset({
        title: "",
        tailwindClasses: "",
        content:
          '<div class="p-4 bg-blue-500 text-white rounded-lg">\n  Hello World\n</div>',
      });
    }
  }, [currentDesign, setValue, reset]);

  const onSubmit = async (data: DesignFormData) => {
    const submissionData = {
      ...data,
      tailwindClasses: data.tailwindClasses || "",
      content: data.content,
    };

    if (!isAuthenticated) {
      dispatch(showAuthModal(submissionData));
      return;
    }

    if (currentDesign) {
      await dispatch(
        updateDesign({
          id: currentDesign._id,
          design: submissionData,
        })
      );
    } else {
      await dispatch(saveDesign(submissionData));
      reset();
    }
  };

  const handleClear = () => {
    dispatch(setCurrentDesign(null));
    reset();
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span>{currentDesign ? "✏️" : "✨"}</span>
        {currentDesign ? "Edit Design" : "Create New Design"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex-grow">
        <div className="animate-in fade-in duration-300">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Title
          </label>
          <input
            {...register("title")}
            className="block w-full rounded-lg bg-gray-800 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm p-3 border transition-all hover:border-gray-500"
            placeholder="My Awesome Component"
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="animate-in fade-in duration-300">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Code (HTML + Tailwind)
          </label>
          <textarea
            {...register("content")}
            rows={10}
            className="block w-full rounded-lg bg-gray-800 border-gray-600 text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm p-3 border font-mono transition-all hover:border-gray-500 resize-none"
            placeholder='<div class="bg-blue-500 text-white p-4">...</div>'
          />
          {errors.content && (
            <p className="text-red-400 text-xs mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 justify-center py-3 px-4 border border-transparent shadow-lg text-sm font-bold rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-100 active:scale-95"
          >
            {currentDesign ? "💾 Update Design" : "✨ Save Design"}
          </button>
          {currentDesign && (
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 justify-center py-3 px-4 border border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:border-gray-500"
            >
              ❌ Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 animate-in fade-in duration-300">
        <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center gap-2">
          <span>👁️</span>
          Live Preview
        </h3>
        <div className="p-8 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center bg-gray-800/50 min-h-[200px] relative overflow-hidden hover:border-indigo-500/50 transition-colors">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
          <div
            className="w-full"
            dangerouslySetInnerHTML={{
              __html:
                content ||
                '<div class="text-gray-500 text-center">Preview will appear here</div>',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;
