import { hardhat } from '@wagmi/cli/plugins'
import { defineConfig } from '@wagmi/cli'
import { abi } from '~/utils/data'
import { react } from '@wagmi/cli/plugins'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: './',
    }),
    react(),
  ],
})
