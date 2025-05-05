
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react"; 

interface FormData {
  mailUtilisateur: string;
  motDePasse: string;
}

const Connexion = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.mailUtilisateur,
      password: data.motDePasse,
    });

    if (result?.error) {
      toast.error("Email ou mot de passe incorrect");
    } else {
      toast.success("Connexion réussie");
      router.push("/tasklist");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-orange-200 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-center text-2xl font-extrabold mb-4 text-green-600">Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              {...register("mailUtilisateur", {
                required: "Veuillez entrer votre mail",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Adresse email invalide",
                },
              })}
              className="w-full bg-white border border-blue-900 rounded-md py-2"
            />
            {errors.mailUtilisateur?.message && (
              <span className="text-red-600 text-sm">{errors.mailUtilisateur.message}</span>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-bold mb-2">Mot de passe</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("motDePasse", {
                required: "Veuillez entrer un mot de passe",
                minLength: {
                  value: 6,
                  message: "Le mot de passe doit contenir au moins 6 caractères",
                },
              })}
              className="w-full bg-white border border-blue-900 rounded-md py-2 pr-10"
            />
            {errors.motDePasse?.message && (
              <span className="text-red-600 text-sm">{errors.motDePasse.message}</span>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className=" h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              <h3 className="font-bold">Se connecter</h3>
            </button>
          </div>
        </form>
        <div className="flex flex-col text-center">
          <h3 className="font-bold">Nouveau ? </h3>
          <h3 className="font-bold text-blue-600">Créer un compte</h3>
          <Link href="/auth/register">
            <button className="text-white bg-blue-600 px-2.5 py-2 rounded-full font-bold">Clique moi</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Connexion;


