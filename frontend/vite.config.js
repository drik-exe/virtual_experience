import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/

const keyPath = './localhost-key.pem';
const certPath = './localhost.pem';

export default defineConfig({
    plugins: [react()],
    // server: {
    //     https: {
    //         key: fs.readFileSync(keyPath),
    //         cert: fs.readFileSync(certPath),
    //     },
    // },
})
