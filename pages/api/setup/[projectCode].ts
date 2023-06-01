import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'
import NextCors from 'nextjs-cors'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await NextCors(req, res, {
    methods: ['GET'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const { projectCode, firebaseAuthTenantId } = req.query

  if (!firebaseAuthTenantId) {
    res.status(400).send(null)
  }

  setCookie('projectCode', projectCode, { req, res })
  setCookie('firebaseAuthTenantId', firebaseAuthTenantId, { req, res })

  res.redirect(307, '/')
}
