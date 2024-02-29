import path from 'path'
import { fileURLToPath } from 'url'

// Attempt to fix 'ReferenceError: __dirname is not defined in ES module scope'
// It happens when the lib is used as a dependency in another project, in circumstances that are not well understood.
// eslint-disable-next-line @typescript-eslint/naming-convention
export const __dirname = path.dirname(fileURLToPath(import.meta.url))
