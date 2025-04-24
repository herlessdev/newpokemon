import { useContext, useEffect, useRef, useState } from "react";
import { UserDataContext } from "../../context/UserDataProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import renderCanvasCharacter from "../../utils/renderCanvasCharacter";
import renderScoreDigits from "../../utils/renderScoreDigits";

const Profile = () => {
  const staticCanvasRef = useRef<HTMLCanvasElement>(null);
  const staticCanvasRef1 = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Obtiene la ubicación actual
  const [index, setIndex] = useState(0);

  const { username } = useParams<{ username: string }>();
  const { userData } = useContext(UserDataContext);

  useEffect(() => {
    const canvas = staticCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}profile/trainer-card.png`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 9, 327, 240, 160, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    const canvas = staticCanvasRef1.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const score = userData?.user?.user_id;

    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}profile/trainer-card.png`;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        14.5,
        18 + 154 * index,
        240,
        160,
        0,
        0,
        canvas.width * 1.058,
        canvas.height * 1.145
      );

      if (index === 0) {
        /* ID number */
        renderScoreDigits(ctx, img, 210, 5, 5, true, score);
        /* NAME */
        username && renderCanvasCharacter(ctx, img, 36, username);
        /* MONEY (actualizar cuando haya money)*/
        renderScoreDigits(ctx, img, 160, 56, 0, false, 0);
        /* POKÉDEX */
        renderScoreDigits(
          ctx,
          img,
          160,
          74,
          0,
          false,
          userData?.pokemons?.length
        );
      }
    };
  }, [index]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimating) return;

      if (event.key === "z") {
        setIndex((prev) => prev + 1);
        setIsAnimating(true);
        if (index === 1) {
          navigate("/world", { state: { someProp: { location } } });
        }
      }
      if (event.key === "x") {
        if (index > 0) {
          setIndex((prev) => prev - 1);
          setIsAnimating(true);
        } else {
          navigate("/world", { state: { someProp: { location } } });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, isAnimating, location, navigate]);

  return (
    <div className="relative w-full h-full border-2 border-black">
      <canvas ref={staticCanvasRef} className="w-full h-full absolute" />
      <motion.canvas
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isAnimating ? 0.01 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationComplete={() => setIsAnimating(false)} // Desactivar animación al terminar
        ref={staticCanvasRef1}
        className="w-[96%] h-[84%] absolute top-[8%] left-[2%] rounded-[24px]"
      />
    </div>
  );
};

export default Profile;
