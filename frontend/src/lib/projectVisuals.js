import { Code2, HeartPulse, Layers, Leaf, Rocket, Sparkles } from 'lucide-react';
import img7Seers from '@/assets/project-7seers-ai.webp';
import imgEquipNet from '@/assets/project-equipnet.webp';
import imgComponentSystem from '@/assets/project-reusable-component-api-systems.webp';
import imgARVR from '@/assets/project-arvr-learning-experience.webp';
import imgGitHubTracker from '@/assets/project-github-time-tracking-extension.webp';

const PROJECT_COVERS = {
  '7seers-ai': img7Seers,
  'equipnet': imgEquipNet,
  'reusable-component-api-systems': imgComponentSystem,
  'arvr-learning-experience': imgARVR,
  'github-time-tracking-extension': imgGitHubTracker,
};

const TAG_ICONS = [
  { match: /ai/i, icon: Sparkles },
  { match: /health/i, icon: HeartPulse },
  { match: /wellness/i, icon: Leaf },
  { match: /platform/i, icon: Layers },
  { match: /full stack/i, icon: Code2 },
];

export function getProjectCover(projectOrSlugOrIndex, fallbackIndex = 0) {
  let slug = '';
  if (typeof projectOrSlugOrIndex === 'string') {
    slug = projectOrSlugOrIndex;
  } else if (projectOrSlugOrIndex && typeof projectOrSlugOrIndex === 'object') {
    slug = projectOrSlugOrIndex.slug || projectOrSlugOrIndex.image || '';
  }

  if (slug && PROJECT_COVERS[slug]) {
    return `url("${PROJECT_COVERS[slug]}")`;
  }

  const keys = Object.keys(PROJECT_COVERS);
  const idx = typeof projectOrSlugOrIndex === 'number' ? projectOrSlugOrIndex : fallbackIndex;
  const key = keys[idx % keys.length];
  return `url("${PROJECT_COVERS[key]}")`;
}

export function getProjectIcon(tag = '') {
  const found = TAG_ICONS.find((entry) => entry.match.test(tag));
  return found ? found.icon : Rocket;
}
