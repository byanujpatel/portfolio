import HeroFold1 from "@/components/HeroFold1";
import Fold2Proof from "@/components/Fold2_Proof";
import Fold3OS from "@/components/Fold3_OS";
import Fold4Receipts from "@/components/Fold4_Receipts";
import Fold5Thesis from "@/components/Fold5_Thesis";
import Fold6Handshake from "@/components/Fold6_Handshake";

/*
 * Root page — the full portfolio in lime.
 *
 * Folds:
 *   1. Hero with live agent input + socials dock in top bar
 *   2. Proof bento (4 perpetual-animation cards)
 *   3. Operating system rails
 *   4. Receipts timeline
 *   5. Thesis
 *   6. Handshake + footer
 */
export default function Home() {
  return (
    <main className="accent-lime mesh-bg min-h-[100dvh]">
      <div className="rim-line" data-rim aria-hidden />
      <HeroFold1 />
      <Fold2Proof />
      <Fold3OS />
      <Fold4Receipts />
      <Fold5Thesis />
      <Fold6Handshake />
    </main>
  );
}
