// Dumps the frontend's bundled dataset as JSON so it can be diffed against the
// Python generator. Used by tools/check_parity.py.
import { mock } from '../frontend/src/data/mock.ts'
process.stdout.write(JSON.stringify(mock))
