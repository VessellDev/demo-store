import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectCode, firebaseAuthTenantId, redirectPath } = req.query

  if (!firebaseAuthTenantId) {
    res.status(400).send(null)
  }

  setCookie('projectCode', projectCode, { req, res })
  setCookie('firebaseAuthTenantId', firebaseAuthTenantId, { req, res })

  res.redirect(307, redirectPath ? String(redirectPath) : '/')
}
