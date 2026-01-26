import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
	plugins: [dts({ include: ['src'], rollupTypes: true })],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'TwzipcodeWebcomponent',
			formats: ['es'],
			fileName: format => (format === 'es' ? 'index.js' : `index.${format}.js`),
		},
		copyPublicDir: false,
		rollupOptions: {
			treeshake: 'recommended',
		},
	},
})
