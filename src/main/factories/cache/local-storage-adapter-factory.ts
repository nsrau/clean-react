import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { SetStorage } from '@/data/protocols/cache/set-storage'

const makeLocalStorageAdapter = (): SetStorage => {
  return new LocalStorageAdapter()
}

export default makeLocalStorageAdapter
