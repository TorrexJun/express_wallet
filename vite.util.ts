import {GetModuleInfo} from 'rollup'
export class SplitVendorChunkCache {
  public cache: Map<any, any>
  constructor() {
    this.cache = new Map()
  }
}
export function staticImportedByEntry(id: any, getModuleInfo: GetModuleInfo, cache: Map<any, any>, importStack: any[] = []) {
  if (cache.has(id)) {
    return !!cache.get(id)
  }
  if (importStack.includes(id)) {
      cache.set(id, false)
      return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false;
  }
  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}

export function manualChunks(id: string, getModuleInfo: GetModuleInfo) {
  const cache = new SplitVendorChunkCache()
  const cssLangs = `\\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\\?)`
  const cssLangRE = new RegExp(cssLangs)
  const isCSSRequest = (request: string): boolean => cssLangRE.test(request)
  // 分vendor包
  if (
      id.includes('node_modules') &&
      !isCSSRequest(id) &&
      staticImportedByEntry(id, getModuleInfo, cache.cache)
  ) {
    return 'vendor#' + id.toString().split('node_modules/')[1].split('/')[0].toString()
  } else if (
      // 分manifest包，解决chunk碎片问题
      ((getModuleInfo(id)!.importers.length + getModuleInfo(id)!.dynamicImporters.length) > 1) &&
      id.includes('src')
  ) {
    return 'manifest'
  }
}