
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const Inscription = () => {
  const router = useRouter();
  const { handleSubmit, register, formState: { errors } } = useForm<FormData>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Inscription réussie !");
        router.push("/auth/login");
      }
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(error?.response?.data?.error || "Une erreur est survenue. Veuillez réessayer.");
    }    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-orange-200 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-extrabold mb-4 text-blue-700">Inscription</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Nom</label>
            <input
              type="text"
              {...register("name", {
                required: "Veuillez saisir un nom",
                minLength: {
                  value: 5,
                  message: "Le nom doit contenir au moins 5 caractères",
                },
              })}
              className="border bg-white border-blue-500 rounded-md py-2 w-full"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Veuillez entrer votre email",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Adresse email invalide",
                },
              })}
              className="border bg-white border-blue-500 rounded-md py-2 w-full"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-semibold mb-2">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Veuillez entrer un mot de passe",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              className="border bg-white border-blue-500 rounded-md py-2 w-full pr-10"
            />
            {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-semibold mb-2">Confirmer le mot de passe</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("passwordConfirmation", {
                required: "Veuillez confirmer votre mot de passe",
                validate: (value, formValues) =>
                  value === formValues.password || "Les mots de passe ne correspondent pas",
              })}
              className="border bg-white border-blue-500 rounded-md py-2 w-full pr-10"
            />
            {errors.passwordConfirmation && <span className="text-red-600 text-sm">{errors.passwordConfirmation.message}</span>}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="text-center">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 rounded-full text-sm px-5 py-2.5 font-bold">
              S'inscrire
            </button>
          </div>
        </form>
        <div className="flex flex-col text-center mt-4">
          <h3 className="font-bold">Avez-vous déjà un compte ? </h3>
          <Link href="/auth/login">
            <button className="text-white bg-green-600 px-2.5 py-2 rounded-full font-bold">
              Se connecter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inscription;
