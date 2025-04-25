import React from 'react';
import { useParams } from 'react-router-dom';
export default function RecipeDetail() {
  const { id } = useParams();
  // load recipe by id
  return <div>Recipe Detail for {id}</div>;
}