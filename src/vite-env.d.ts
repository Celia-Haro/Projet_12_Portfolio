/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: 'development' | 'production' | 'test';
  // tu peux ajouter d'autres variables d'environnement ici, par ex:
  // readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
