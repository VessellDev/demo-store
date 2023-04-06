import VessellSDK from '@vessell/sdk'
import { getCookies } from 'cookies-next'

const SDK = VessellSDK()

if (typeof window !== 'undefined') {
  const { projectCode, firebaseAuthTenantId } = getCookies()

  SDK.setConfig({
    projectCode,
    firebaseAuthTenantId,
  })
}

export default SDK
