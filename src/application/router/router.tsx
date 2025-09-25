import { Routes, Route } from 'react-router-dom';

import { RecipesPage } from '@/application/pages/recipes/recipes';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<RecipesPage />} />
      <Route path="*" element={<div>404 - Page not found 😵</div>} />
    </Routes>
  );
}
