import { Prisma } from "@prisma/client";

export const CliarsRimsByInputArgs = (data: Prisma.RimsWhereInput) => {

  return {
    id: data?.id ?? undefined,
    sizeR: data.sizeR ?? undefined,
    studHoles: data.studHoles ?? undefined,
    pcd: data.pcd ?? undefined,
    centerBore: data.centerBore ?? undefined,
    rimModel: data?.rimModel ?? undefined,
    width: data?.width ?? undefined,
    color: data?.color ?? undefined,
    gram: data?.gram ?? undefined
  }
}