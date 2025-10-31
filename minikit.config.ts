const ROOT_URL = process.env.NEXT_PUBLIC_ROOT_URL || 'https://your-app.vercel.app';

export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
  },
  miniapp: {
    version: "1",
    name: "Sudoku Challenge",
    subtitle: "Brain Puzzle Game",
    description: "Play classic Sudoku with three difficulty levels. Challenge yourself and improve your logic skills!",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#1e3a8a",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["sudoku", "puzzle", "brain", "logic", "game"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Train your brain with Sudoku",
    ogTitle: "Sudoku Challenge - Brain Puzzle Game",
    ogDescription: "Play classic Sudoku with three difficulty levels",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const;