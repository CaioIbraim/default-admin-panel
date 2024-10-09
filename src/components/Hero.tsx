import Image from "next/image";
import Link from "next/link";
import heroImg from "../../public/1.png"; 

export const Hero = () => {
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${heroImg.src})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col justify-center items-center min-h-screen text-center text-white">
        <Link href="/">
          <span className="flex items-center justify-center space-x-2 text-2xl font-medium text-[#6495ED]">
            <Image
              src="/logo.png"
              alt="STIVESGPRO"
              width={150}
              height={150}
            />
          </span>
        </Link>
        <h1 className="text-4xl font-bold leading-snug tracking-tight lg:text-5xl xl:text-6xl">
          Bem-vindos!
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Junte-se a nós na jornada para um futuro mais livre.
        </p>
        <p className="mt-4 text-lg md:text-xl">
          Alcance seus sonhos trabalhando de onde quiser da maneria que quiser!
        </p>
        <div className="mt-8">
          <Link href="/auth/signin">
            <span className="inline-block px-8 py-4 text-lg font-medium text-center text-white bg-[#6495ED] rounded-md transform transition-transform duration-300 hover:scale-105 focus:scale-105 hover:bg-[#6495ED] focus:bg-[#6495ED]">
              Entrar
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};