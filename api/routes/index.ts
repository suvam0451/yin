import {VercelResponse, VercelRequest} from "@vercel/node"
import {PrismaClient} from '@prisma/client'

import * as dotenv from "dotenv";

if (!process.env.VERCEL) {
  dotenv.config({path: './.env'});
}

async function post(req: VercelRequest, res: VercelResponse) {
  const prisma = new PrismaClient()

  const conflict = await prisma.user.findFirst({
    where: {
      username: "Effortless"
    }
  });

  if (conflict) {
    res.statusCode = 409
    return
  }

  const data = await prisma.user.create({
    data: {
      username: "Effortless"
    }
  });


  res.statusCode = 200;
  res.json({data});
  return
}

export async function get(req: VercelRequest, res: VercelResponse) {
  const prisma = new PrismaClient()
  const data = await prisma.user.findMany()

  res.statusCode = 200;
  res.json({data});
  return
}

async function main(req: VercelRequest, res: VercelResponse) {
  switch (req.method) {
    case "GET":
      return await get(req, res);
    case "POST":
      return await post(req, res);
  }
}

export default main;