import { getCookies } from 'cookies-next'
import App, { AppContext } from 'next/app'
import sdk from 'sdk'

export const getAppInitialProps = (appContext: AppContext) => {
  const { req } = appContext.ctx
  const { projectCode, firebaseAuthTenantId } = getCookies({ req })

  sdk.setConfig({
    projectCode,
    firebaseAuthTenantId,
  })

  return App.getInitialProps(appContext)
}
