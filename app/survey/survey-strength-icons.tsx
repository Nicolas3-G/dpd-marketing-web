import {
  FaBinoculars,
  FaBullseye,
  FaCircleNodes,
  FaCompass,
  FaCompress,
  FaDiagramProject,
  FaGlasses,
  FaHandshake,
  FaLightbulb,
  FaPuzzlePiece,
  FaRocket,
  FaScaleBalanced,
  FaSitemap,
  FaTriangleExclamation,
} from "react-icons/fa6";

export type StrengthIconKey =
  | "organize"
  | "solve"
  | "complexity"
  | "precision"
  | "anticipate";

export const STRENGTH_ICONS: Record<StrengthIconKey, typeof FaSitemap> = {
  organize: FaSitemap,
  solve: FaPuzzlePiece,
  complexity: FaDiagramProject,
  precision: FaBullseye,
  anticipate: FaBinoculars,
};

export type PerceptionIconKey = "constriction" | "judgment" | "stress" | "misread";

export const PERCEPTION_ICONS: Record<PerceptionIconKey, typeof FaSitemap> = {
  constriction: FaCompress,
  judgment: FaScaleBalanced,
  stress: FaTriangleExclamation,
  misread: FaGlasses,
};

export type TeamDynamicsIconKey =
  | "translate"
  | "direct"
  | "system"
  | "open"
  | "momentum";

export const TEAM_DYNAMICS_ICONS: Record<TeamDynamicsIconKey, typeof FaSitemap> = {
  translate: FaLightbulb,
  direct: FaCompass,
  system: FaCircleNodes,
  open: FaHandshake,
  momentum: FaRocket,
};
