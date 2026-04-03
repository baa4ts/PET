import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  splitting: false,
  minify: true,
  minifySyntax: true,
  sourcemap: true,
  clean: true,
})