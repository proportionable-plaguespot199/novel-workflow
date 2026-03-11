import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/cli'],
  externals: [
    'ansis',
    'cac',
    'fs-extra',
    'inquirer',
    'ora',
    'pathe',
    'smol-toml',
    'zod',
  ],
  rollup: {
    emitCJS: false,
  },
  declaration: true,
})
